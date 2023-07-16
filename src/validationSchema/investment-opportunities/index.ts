import * as yup from 'yup';

export const investmentOpportunityValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  promoter_id: yup.string().nullable(),
});
