import * as yup from 'yup';
//this is the validation for Profile update Form
export const profileUpdateSchemaWorker = yup.object().shape({
  userName: yup
    .string()
    .required('Please enter your Username')
    .min(3, 'Username length cannot be less than 3')
    .max(15, 'Username length cannot exceed 15'),
  AboutYou: yup
    .string()
    .required('Please enter your About You')
    .min(3, 'About You length cannot be less than 3')
    .max(150, 'About You length cannot exceed 150'),
  PastExperience: yup
    .string()
    .required('Please enter your Past Experience')
    .min(3, 'Past Experience length cannot be less than 3')
    .max(150, 'Past Experience length cannot exceed 150'),
  Reference: yup
    .string()
    .required('Please enter your Reference')
    .min(3, 'Reference length cannot be less than 3')
    .max(150, 'Reference length cannot exceed 150'),
});

export const profileUpdateSchemaEmployer = yup.object().shape({
  userName: yup
    .string()
    .required('Please enter your Username')
    .min(3, 'Username length cannot be less than 3')
    .max(10, 'Username length cannot exceed 3'),
  AboutYou: yup
    .string()
    .required('Please enter your About You')
    .min(10, 'About You length cannot be less than 10')
    .max(150, 'About You length cannot exceed 150'),
});
