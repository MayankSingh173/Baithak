import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  useStyleSheet,
  useTheme,
  Button,
  Icon,
} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import BackHeader from '../../Headers/BackHeader/BackHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {Group} from '../../../models/Messages/interface';
import FastImage from 'react-native-fast-image';
import {
  DEFAULT_AVATAR,
  DEFAULT_GROUP_IMAGE,
} from '../../../constants/Images/Images';
import {
  RALEWAY_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import FullDivider from '../../Divider/FullDivider';
import moment from 'moment';
import {DEFAULT_USER_NAME} from '../../../constants/User/User';
import useGroupInfo from '../../../hooks/Messages/Group/useGroupInfo';
import ModalActivityIndicator from '../ModalActivityIndicator/ModalActivityIndicator';
import {REMOTE_USER_PROFILE_SCREEN} from '../../../constants/Navigation/Navigation';
import SelectImage from '../SelectImage/SelectImage';

interface props {
  group: Group;
  onBackDropPress: () => void;
  modalVisible: boolean;
  navigation: any;
}

const GroupInfoModal = (props: props) => {
  if (!props.group) return null;

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const appTheme = useTheme();

  const {
    isLoading,
    confirmEnd,
    selectImage,
    onCaptureImage,
    onCloseSelectImage,
    onSelectFromLibrary,
    imageUrl,
  } = useGroupInfo(props.group, firebaseUser.uid, props.navigation);

  const styles = useStyleSheet(themedStyles);

  return (
    <Modal
      isVisible={props.modalVisible}
      hasBackdrop={true}
      onBackdropPress={props.onBackDropPress}
      style={styles.modal}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      coverScreen={true}
      useNativeDriver
      onBackButtonPress={props.onBackDropPress}>
      <Layout style={styles.main} level="1">
        <ModalActivityIndicator modalVisible={isLoading} />
        <SelectImage
          modalVisible={selectImage}
          onBackDropPress={onCloseSelectImage}
          onCaptureImage={onCaptureImage}
          onSelectFromGallery={onSelectFromLibrary}
        />
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <BackHeader
              leftIcon="arrow-back-outline"
              onLeftPress={props.onBackDropPress}
              leftIconColor={theme === 'dark' ? 'white' : 'black'}
              centerTextColor={theme === 'dark' ? 'white' : 'black'}
            />
          </View>
          <View style={styles.imgView}>
            <FastImage
              style={{
                borderColor: theme === 'dark' ? 'white' : 'black',
                height: 120,
                width: 120,
                borderRadius: 30,
                borderWidth: 2,
              }}
              source={{
                uri: imageUrl,
              }}
            />
            <TouchableOpacity
              onPress={onCloseSelectImage}
              style={[styles.iconView, {backgroundColor: 'white'}]}>
              <Icon
                name="camera-outline"
                style={styles.editIcon}
                fill={appTheme['color-primary-default']}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.nameView}>
              <Text
                category="h5"
                style={[
                  styles.name,
                  {color: appTheme['color-primary-default']},
                ]}>
                {props.group.groupName}
              </Text>
              <Text appearance="hint" style={styles.time}>
                {moment(props.group.createdAt).format('h:mm A, DD/MM/YY')}
              </Text>
            </View>
            <FullDivider style={{marginVertical: 20}} />
            <View style={styles.descView}>
              <Text category="h6" style={styles.description}>
                Description
              </Text>
              <Text style={{fontFamily: RALEWAY_REGULAR, marginTop: 10}}>
                {props.group.description
                  ? props.group.description
                  : 'Hey! there'}
              </Text>
            </View>
            <FullDivider style={{marginVertical: 20}} />
            <View style={styles.partiView}>
              <Text category="h6" style={styles.description}>
                Members
              </Text>
              <View style={{paddingVertical: 10}}>
                {props.group.membersDetails.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 10,
                      }}
                      onPress={() => {
                        props.navigation.navigate(REMOTE_USER_PROFILE_SCREEN, {
                          myProfile: false,
                          uid: item.uid,
                        });
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <FastImage
                          source={{
                            uri: item.imageUrl ? item.imageUrl : DEFAULT_AVATAR,
                          }}
                          style={{height: 50, width: 50, borderRadius: 50}}
                        />
                      </View>
                      <View
                        style={{
                          flex: 4,
                          justifyContent: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text style={styles.name}>
                          {item.name ? item.name : DEFAULT_USER_NAME}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <Button
            size="large"
            status="danger"
            appearance="outline"
            style={styles.button}
            onPress={confirmEnd}>
            Leave group
          </Button>
        </ScrollView>
      </Layout>
    </Modal>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  modal: {
    flex: 1,
    margin: 0,
  },
  header: {},
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    flex: 4,
  },
  name: {
    fontFamily: RALEWAY_BOLD,
  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 10,
  },
  descView: {},
  description: {
    fontFamily: RALEWAY_BOLD,
  },
  partiView: {},
  no: {
    alignSelf: 'center',
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  },
  iconView: {
    padding: 3,
    borderRadius: 30,
    marginLeft: 60,
    marginTop: -20,
  },
  editIcon: {
    height: 25,
    width: 25,
  },
});

export default GroupInfoModal;
