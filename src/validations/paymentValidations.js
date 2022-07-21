import * as yup from 'yup';

export const paymentInformationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Account Name')
    .min(3, 'Atleast 3 Characters'),
  cardNumber: yup
    .number()
    .typeError('Please enter only Digits')
    .required('Please enter Card Number')
    .max(16, 'Maximum 16 Digits'),
  cvv: yup.number().required('Please enter CVV').max(4),
  expDate: yup.number().required('Please enter Expiration Date').max(4),
  saveInfo: yup.bool().oneOf([true], 'Please Save credit card Information'),
});
