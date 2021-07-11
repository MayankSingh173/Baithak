import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Text, Icon, useTheme, Layout} from '@ui-kitten/components';
import {onboardingScreens} from '../../constants/onboarding/onboarding';
import LinearGradient from 'react-native-linear-gradient';
import {
  ONBOARDING_SCREEN_NAME,
  SIGN_IN_SCREEN,
} from '../../constants/Navigation/Navigation';
import {
  RALEWAY_BOLD,
  RALEWAY_EXTRA_BOLD,
  RALEWAY_REGULAR,
} from '../../constants/Fonts/Fonts';

const iconSize = 36;
const BACK_SIZE = 48;
const HEADER_TOP_COLOR = 'rgba(0, 0, 0, 0)';
const BACK_BUTTON_COLOR = 'rgba(0, 0, 0, 0.3)';

const OnboardingScreen: React.FC<any> = (props) => {
  const index = props.route.params.index;
  const params = props.route.params;

  const theme = useTheme();

  const onPressRight = () => {
    if (index < onboardingScreens.length - 1) {
      props.navigation.navigate(`${ONBOARDING_SCREEN_NAME}-${index + 1}`, {
        uiButtonNavigation: params.uiButtonNavigation,
      });
    } else {
      props.navigation.navigate(
        params.uiButtonNavigation ? params.uiButtonNavigation : SIGN_IN_SCREEN,
      );
    }
  };

  return (
    <Layout style={styles.main} level="4">
      <ScrollView
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <ImageBackground
            source={{
              uri: onboardingScreens[index].image,
            }}
            style={styles.imageStyle}>
            <LinearGradient
              style={styles.main}
              colors={[
                HEADER_TOP_COLOR,
                HEADER_TOP_COLOR,
                theme['background-basic-color-1'],
              ]}
              locations={[0, 0.75, 1]}
            />

            {params.backVisible || params.index > 0 ? (
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={[
                  styles.backButton,
                  {
                    backgroundColor: BACK_BUTTON_COLOR,
                    top: 20,
                  },
                ]}>
                <Icon
                  name="chevron-left-outline"
                  width={iconSize}
                  height={iconSize}
                  fill={theme['color-basic-100']}
                />
              </TouchableOpacity>
            ) : null}
          </ImageBackground>
        </View>

        <LinearGradient
          style={styles.main}
          colors={[
            theme['background-basic-color-1'],
            theme['background-basic-color-2'],
          ]}
          locations={[0, 1]}>
          <View style={styles.contentHolder}>
            <View style={styles.content}>
              <View style={styles.heading}>
                <Text category="h4" style={{fontFamily: RALEWAY_BOLD}}>
                  {onboardingScreens[index].heading}
                  {onboardingScreens[index].headingPrimary ? (
                    <Text
                      status="primary"
                      category="h4"
                      style={{fontFamily: RALEWAY_EXTRA_BOLD}}>
                      {`${onboardingScreens[index].headingPrimary}`}
                    </Text>
                  ) : (
                    ''
                  )}
                </Text>
              </View>
              {onboardingScreens[index].text ? (
                <View style={styles.text}>
                  <Text category="p1" style={{fontFamily: RALEWAY_REGULAR}}>
                    {onboardingScreens[index].text}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={onPressRight}
          style={[
            styles.button2,
            {backgroundColor: theme['color-primary-default']},
          ]}>
          <Icon
            name="chevron-right-outline"
            width={iconSize}
            height={iconSize}
            fill={theme['color-basic-200']}
          />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  footer: {
    height: 64,
  },
  content: {
    marginLeft: 24,
    marginRight: 24,
  },
  top: {flex: 2},
  contentHolder: {
    flex: 1,
    justifyContent: 'space-between',
  },
  point: {
    marginTop: 8,
  },
  text: {
    marginTop: 8,
    marginLeft: 0,
  },
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  uiButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    left: 24,
  },
  explain: {
    marginLeft: 2,
  },

  button2: {
    borderRadius: BACK_SIZE / 2,
    width: BACK_SIZE,
    height: BACK_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 24,
  },
  heading: {
    flexDirection: 'row',
    marginTop: 16,
  },
  iconHolder: {
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    borderRadius: BACK_SIZE / 2,
    width: BACK_SIZE,
    height: BACK_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
