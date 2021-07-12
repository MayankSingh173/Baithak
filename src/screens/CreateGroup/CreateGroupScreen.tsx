import {
  Layout,
  Text,
  useTheme,
  Input,
  Button,
  Icon,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import BackHeader from '../../components/Headers/BackHeader/BackHeader';
import {DescriptionIcon, NameIcon} from '../../components/Icons/Icons';
import ModalActivityIndicator from '../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import SelectImage from '../../components/Modals/SelectImage/SelectImage';
import {
  RALEWAY_BOLD,
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../constants/Fonts/Fonts';
import useOnCreateGroup from '../../hooks/Messages/Group/useOnCreateGroups';
import {RootState} from '../../store/rootReducer';
import {createGroupSchema} from '../../utils/validators/message';

const CreateGroupScreen = (props: any) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  if (!props.route.params.selectedUsers) return null;

  const {
    initialFormState,
    handleSubmit,
    loading,
    imageURL,
    selectImage,
    onCloseSelectImage,
    onCaptureImage,
    onSelectFromLibrary,
  } = useOnCreateGroup(props.route.params.selectedUsers, props.navigation);

  const appTheme = useTheme();

  return (
    <Layout level="1" style={styles.main}>
      <SelectImage
        modalVisible={selectImage}
        onBackDropPress={onCloseSelectImage}
        onCaptureImage={onCaptureImage}
        onSelectFromGallery={onSelectFromLibrary}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalActivityIndicator modalVisible={loading} />
        <BackHeader
          leftIcon="arrow-back-outline"
          leftIconColor={theme === 'dark' ? 'white' : 'black'}
          onLeftPress={() => props.navigation.goBack()}
        />
        <Text category="h3" style={styles.heading}>
          Create a
          <Text
            category="h2"
            style={[
              styles.heading,
              {color: appTheme['color-primary-default']},
            ]}>
            {' '}
            Group
          </Text>
        </Text>
        <View style={styles.imageView}>
          <FastImage source={{uri: imageURL}} style={styles.image} />
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
        <Formik
          initialValues={initialFormState}
          onSubmit={handleSubmit}
          validationSchema={createGroupSchema}
          validateOnBlur>
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Group Name"
                onBlur={() => formikProps.setFieldTouched('name')}
                keyboardType="email-address"
                accessoryLeft={NameIcon}
                value={formikProps.values.groupName}
                onChangeText={formikProps.handleChange('groupName')}
                size="large"
                caption={
                  formikProps.errors.groupName && formikProps.touched.groupName
                    ? formikProps.errors.groupName
                    : ''
                }
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM, minHeight: 70}}
                style={styles.descriptionInput}
                status="basic"
                placeholder="Description (optional)"
                onBlur={() => formikProps.setFieldTouched('description')}
                accessoryLeft={DescriptionIcon}
                value={formikProps.values.description}
                onChangeText={formikProps.handleChange('description')}
                size="large"
                multiline={true}
              />
              <Button
                style={styles.createButton}
                size="large"
                onPress={formikProps.handleSubmit}>
                Create
              </Button>
              <View
                style={{
                  marginTop: '40%',
                  flex: 1,
                }}>
                <Text style={styles.worry}>
                  Wanna chat with{' '}
                  <Text
                    category="h6"
                    style={[
                      styles.security,
                      {color: appTheme['color-primary-default']},
                    ]}>
                    Friends
                  </Text>{' '}
                  ?
                </Text>
                <Text
                  style={[
                    styles.tagLine,
                    {color: appTheme['color-basic-500']},
                  ]}>
                  Head on to create a group and have fun!
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: RALEWAY_BOLD,
    marginTop: 20,
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
    paddingTop: 30,
  },
  nameInput: {
    borderRadius: 10,
  },
  createButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  passwordInput: {
    borderRadius: 10,
    marginTop: 20,
  },
  descriptionInput: {
    borderRadius: 10,
    marginTop: 20,
  },
  worry: {
    fontFamily: RALEWAY_BOLD,
    alignSelf: 'center',
    marginBottom: 5,
  },
  tagLine: {
    fontFamily: RALEWAY_REGULAR,
    alignSelf: 'center',
  },
  security: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  iconView: {
    padding: 3,
    borderRadius: 30,
    marginLeft: 50,
    marginTop: -30,
  },
  editIcon: {
    height: 25,
    width: 25,
  },
});

export default CreateGroupScreen;
