import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('The email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .required()
    .min(7, 'The password must be 7 characters long'),
});

export const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, {
      message: 'Phone number is invalid',
      excludeEmptyString: false,
    })
    .required('Phone number is required'),
  countryCode: Yup.string().required('Country code is required').min(1),
  termsAccepted: Yup.bool().oneOf([true], 'Please accept the terms'),
  code: Yup.string().min(4, 'The code should be four characters long'),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email('The email is invalid')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, {
      message: 'Phone number is invalid',
      excludeEmptyString: false,
    })
    .required('Phone number is required'),
  password: Yup.string()
    .required('A password is required')
    .min(7, 'The password must be 7 characters long'),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  termsAccepted: Yup.bool().oneOf([true], 'Please accept the terms'),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('The email is invalid')
    .required('Email is required'),
});

export const applySchema = Yup.object().shape({
  email: Yup.string()
    .email('The email is invalid')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, {
      message: 'Phone number is invalid',
      excludeEmptyString: false,
    })
    .required('Phone number is required'),
});
