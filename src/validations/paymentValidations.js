import * as yup from 'yup';

export const paymentInformationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Account Name')
    .min(3, 'Atleast 3 Characters'),
  cardNumber: yup
    .string()
    .label('Card number')
    .max(16, 'Maximum 16 Digits')
    .required(),
  cvv: yup.string().label('CVV').min(3).max(4).required(),
  expDate: yup
    .string()
    .required('Please enter your Expiration Date')
    .matches(
      /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{2})$/,
      'Please enter Correct Format ',
    ),
  saveInfo: yup.bool().oneOf([true], 'Please Save credit card Information'),
});
