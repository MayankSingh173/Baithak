import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {useEffect} from 'react';
import {handelMeetLinks} from '../../utils/Meeting/Methods/handelMeetLinks';

const useDynamicLink = () => {
  // app in foreground
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(
      (link: FirebaseDynamicLinksTypes.DynamicLink) => {
        handelMeetLinks(link.url);
      },
    );
    // When the is component unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  // app in background
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
        if (link) {
          handelMeetLinks(link.url);
        }
      });
  }, []);
};

export default useDynamicLink;
