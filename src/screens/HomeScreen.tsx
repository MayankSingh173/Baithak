import React, {useState, useRef, useEffect} from 'react';
import {Layout} from '@ui-kitten/components';
import Button from './Button';
import GettingCall from './GettingCall';
import MeetScreen from './MeetScreen';
import {
  MediaStream,
  RTCPeerConnection,
  EventOnAddStream,
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Util from '../utils/utils';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};

const HomeScreen = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = useState<boolean>(false);

  useEffect(() => {
    //document for call
    try {
      const cRef = firestore().collection('meet').doc('chatId');

      const subscribe = cRef.onSnapshot((snapshot) => {
        const data = snapshot.data();

        //On Answer start the call
        if (
          pc.current &&
          !pc.current.remoteDescription &&
          data &&
          data.answer
        ) {
          pc.current.setRemoteDescription(
            new RTCSessionDescription(data.answer),
          );
        }

        //If there's offer for chatId set the getting call flag
        if (data && data.offer && !connecting.current) {
          setGettingCall(true);
        }

        //On delete of the connection, hangup
        const subscribeDelete = cRef
          .collection('callee')
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type == 'removed') {
                hangUp();
              }
            });
          });

        return () => {
          subscribe();
          subscribeDelete();
        };
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  const setUpWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);

    //get local stream
    const stream = await Util.getStream();

    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    //Get the remote stream once it is available
    pc.current.onaddstream = (event: EventOnAddStream) => {
      if (event.stream) setRemoteStream(event.stream);
    };
  };

  const create = async () => {
    try {
      console.log('Calling');

      connecting.current = true;

      //setup webrtc
      await setUpWebrtc();

      //document for call
      const cRef = firestore().collection('meet').doc('chatId');

      //Exchange the ICE candidate between caller and callee
      collectICECandidate(cRef, 'caller', 'callee');

      if (pc.current) {
        //Create offer for the call
        //Store the offer under the document
        const offer = await pc.current.createOffer();
        pc.current.setLocalDescription(offer);

        const cWithOffer = {
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
        };

        await cRef.set(cWithOffer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const join = async () => {
    try {
      console.log('Joining the call');
      connecting.current = true;
      setGettingCall(false);

      //document for call
      const cRef = firestore().collection('meet').doc('chatId');
      const offer = (await cRef.get()).data()?.offer;

      if (offer) {
        //setup webrtc
        await setUpWebrtc();

        //Exchange the ICE candidates
        //Check the paramenters, it is reversed. Since the joing is calle
        collectICECandidate(cRef, 'callee', 'caller');

        if (pc.current) {
          await pc.current.setRemoteDescription(
            new RTCSessionDescription(offer),
          );

          //create the answer for the call
          //update the document with answer
          const answer = await pc.current.createAnswer();

          await pc.current.setLocalDescription(answer);
          const cWithAnwer = {
            answer: {
              type: answer.type,
              sdp: answer.sdp,
            },
          };
          cRef.update(cWithAnwer);
        }
      }
    } catch (err) {
      console.log('Error in joining the call', err);
    }
  };

  /*
  For disconnecting the call close the connection, release the stream
  And delete the document for the call
  */
  const hangUp = async () => {
    console.log('HangUp');
    setGettingCall(false);
    connecting.current = false;
    await streamCleanUp();
    await firestoreCleanUp();

    if (pc.current) {
      pc.current.close();
    }
  };

  //Helper Functions
  const collectICECandidate = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    try {
      const collectionCandidate = cRef.collection(localName);

      if (pc.current) {
        //On new ICE Candidate added to firestore
        pc.current.onicecandidate = (event) => {
          if (event.candidate) {
            collectionCandidate.add(event.candidate);
          }
        };
      }

      // Get the ICE candidate added to firestore and update the local pc
      cRef.collection(remoteName).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(
              change.doc.data() as RTCIceCandidateType,
            );
            if (candidate && pc.current)
              pc.current
                .addIceCandidate(candidate)
                .then((doc) => console.log('Candidate ->', doc))
                .catch((err) => console.log('Connect -> ', err));
          }
        });
      });
    } catch (err) {
      console.log('Connect', err);
    }
  };

  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  const firestoreCleanUp = async () => {
    //document for call
    const cRef = firestore().collection('meet').doc('chatId');

    if (cRef) {
      const calleeCandidate = await cRef.collection('callee').get();
      calleeCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });

      const callerCandidate = await cRef.collection('caller').get();
      callerCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });

      cRef.delete();
    }
  };

  //If call is comming display getting call
  if (gettingCall) {
    return <GettingCall hangUp={hangUp} joinCall={join} />;
  }

  //if stream is there display video
  if (localStream) {
    return (
      <MeetScreen
        remoteStream={remoteStream}
        localStream={localStream}
        hangUp={hangUp}
      />
    );
  }

  return (
    <Layout
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      level="1">
      <Button backgroundColor="#0D5973" onPress={create} iconName="star" />
    </Layout>
  );
};

export default HomeScreen;
