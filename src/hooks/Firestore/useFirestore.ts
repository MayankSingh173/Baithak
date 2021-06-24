import {useState, useEffect} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const useFirestore = (
  docRef: any,
  defaultState: any,
  type: string,
  onSuccessCallback?: any,
  onFailCallback?: any,
  onCleanup?: any,
  id?: string,
) => {
  const [state, setState] = useState(defaultState);
  const [errorState, setErrorState] = useState(null);
  const [modalVisible, toggleModal] = useState(true);

  // console.log('state', id);

  // use effect to make the callback
  useEffect(() => {
    let unsubscribe: any = null;

    if (docRef) {
      // fetching
      toggleModal(true);

      // create listener
      unsubscribe = docRef.onSnapshot(
        (snapshot: any) => {
          // if fetching a query snapshot
          if (type === 'querySnapshot') {
            const docList: any[] = [];
            snapshot.forEach((document: any) => {
              docList.push(document.data());
            });

            if (onSuccessCallback) {
              onSuccessCallback(docList);
            }

            setState(docList);
          } else {
            if (snapshot.exists) {
              const docData = snapshot.data();

              if (onSuccessCallback) {
                onSuccessCallback(docData);
              }
              // update state
              setState({
                ...docData,
              });
            } else {
              if (onFailCallback) {
                onFailCallback();
              }
            }
          }

          // toggle modal
          toggleModal(false);
        },
        (error: any) => {
          // update error state
          console.log('error', error);
          setErrorState(error);
          toggleModal(false);

          // toggle on fail
          if (onFailCallback) {
            onFailCallback(error);
          }
        },
      );
    } else {
      toggleModal(false);
    }

    // unsubscribe listener on dep change
    return () => {
      if (unsubscribe) {
        unsubscribe();

        if (onCleanup) {
          onCleanup();
        }
      }
    };
  }, [docRef, type, onSuccessCallback, onFailCallback, onCleanup]);

  return {
    data: state,
    updateState: setErrorState,
    errorState: errorState,
    dispatchError: setErrorState,
    modalVisible: modalVisible,
  };
};

export default useFirestore;
