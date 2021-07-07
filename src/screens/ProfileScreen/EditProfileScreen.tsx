import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  useTheme,
  useStyleSheet,
  Layout,
  Text,
  Input,
  Button,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import useOnEditProfile from '../../hooks/User/useOnEditProfile';
import ModalActivityIndicator from '../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import BackHeader from '../../components/Headers/BackHeader/BackHeader';
import {editProfileSchema} from '../../utils/validators/user';
import {
  RALEWAY_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../constants/Fonts/Fonts';
import {
  DescriptionIcon,
  EmailIcon,
  FacebookIcon,
  GithubIcon,
  InstaIcon,
  LinkedInIcon,
  NameIcon,
  TagIcon,
  TwitterIcon,
} from '../../components/Icons/Icons';
import FullDivider from '../../components/Divider/FullDivider';

const EditProfileScreen = (props: any) => {
  const appTheme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const {initialFormState, isLoading, handleSubmit} = useOnEditProfile(
    firebaseUser,
    props.navigation,
  );

  return (
    <Layout level="1" style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalActivityIndicator modalVisible={isLoading} />
        <BackHeader
          leftIconColor={theme === 'dark' ? 'white' : 'black'}
          leftIcon="arrow-back-outline"
          onLeftPress={() => props.navigation.goBack()}
        />
        <Text category="h3" style={styles.heading}>
          Edit
          <Text
            category="h2"
            style={[
              styles.heading,
              {color: appTheme['color-primary-default']},
            ]}>
            {' '}
            Profile
          </Text>
        </Text>
        <Formik
          initialValues={initialFormState}
          onSubmit={handleSubmit}
          validationSchema={editProfileSchema}
          validateOnBlur>
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={[styles.nameInput, {marginTop: 0}]}
                status="basic"
                label="Name"
                placeholder="Name"
                onBlur={() => formikProps.setFieldTouched('name')}
                keyboardType="default"
                accessoryLeft={NameIcon}
                value={formikProps.values.name}
                onChangeText={formikProps.handleChange('name')}
                size="large"
                caption={
                  formikProps.errors.name && formikProps.touched.name
                    ? formikProps.errors.name
                    : ''
                }
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Email"
                label="Email"
                onBlur={() => formikProps.setFieldTouched('email')}
                keyboardType="email-address"
                caption={
                  formikProps.errors.email && formikProps.touched.email
                    ? formikProps.errors.email
                    : ''
                }
                accessoryLeft={EmailIcon}
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                size="large"
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                label="Tag-Line"
                placeholder="Tag-Line"
                onBlur={() => formikProps.setFieldTouched('tagLine')}
                keyboardType="default"
                accessoryLeft={TagIcon}
                value={formikProps.values.tagLine}
                onChangeText={formikProps.handleChange('tagLine')}
                size="large"
                caption={
                  formikProps.errors.tagLine && formikProps.touched.tagLine
                    ? formikProps.errors.tagLine
                    : ''
                }
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM, minHeight: 70}}
                style={styles.descriptionInput}
                status="basic"
                placeholder="Add Bio"
                label="Bio"
                onBlur={() => formikProps.setFieldTouched('bio')}
                value={formikProps.values.bio}
                onChangeText={formikProps.handleChange('bio')}
                size="large"
                multiline={true}
              />
              <Text category="h6" style={styles.social}>
                Social Account
              </Text>
              <FullDivider />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Profile link"
                label="Instagram"
                onBlur={() => formikProps.setFieldTouched('instagram')}
                keyboardType="default"
                accessoryLeft={() => (
                  <InstaIcon
                    style={{marginHorizontal: 8, height: 24, width: 24}}
                  />
                )}
                value={formikProps.values.instagram}
                onChangeText={formikProps.handleChange('instagram')}
                size="large"
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Profile link"
                label="Facebook"
                onBlur={() => formikProps.setFieldTouched('facebook')}
                keyboardType="default"
                accessoryLeft={FacebookIcon}
                value={formikProps.values.facebook}
                onChangeText={formikProps.handleChange('facebook')}
                size="large"
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Profile link"
                label="LinkedIn"
                onBlur={() => formikProps.setFieldTouched('linkedIn')}
                keyboardType="default"
                accessoryLeft={LinkedInIcon}
                value={formikProps.values.linkedIn}
                onChangeText={formikProps.handleChange('linkedIn')}
                size="large"
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Profile link"
                label="GitHub"
                onBlur={() => formikProps.setFieldTouched('github')}
                keyboardType="default"
                accessoryLeft={(style) =>
                  GithubIcon(style, theme === 'light' ? 'black' : '#fafafa')
                }
                value={formikProps.values.github}
                onChangeText={formikProps.handleChange('github')}
                size="large"
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Profile link"
                label="Twitter"
                onBlur={() => formikProps.setFieldTouched('twitter')}
                keyboardType="default"
                accessoryLeft={TwitterIcon}
                value={formikProps.values.twitter}
                onChangeText={formikProps.handleChange('twitter')}
                size="large"
              />
              <Button
                style={styles.createButton}
                size="large"
                onPress={formikProps.handleSubmit}>
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleSheet.create({
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
  social: {
    fontFamily: RALEWAY_BOLD,
    marginTop: 30,
    marginBottom: 5,
  },
  nameInput: {
    borderRadius: 10,
    marginTop: 20,
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
});

export default EditProfileScreen;
