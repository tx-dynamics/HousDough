import * as yup from 'yup';

//this is the validation for signUp Form
export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Name')
    .min(3, 'Name shoud be atleast 3 characters long')
    .max(15, 'Name cannot be more than 15 characters'),
  email: yup
    .string()
    .required('Please enter your Email')
    .email('Please enter a valid Email'),
  password: yup
    .string()
    .required('Please enter your Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup
    .string()
    .required('Please re-enter your Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

//this is the validation for signin Form
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your Email')
    .email('Please enter a valid Email'),

  password: yup.string().required('Please enter your Password'),
});
