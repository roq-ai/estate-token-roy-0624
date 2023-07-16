import * as yup from 'yup';

export const investmentPortfolioValidationSchema = yup.object().shape({
  investor_id: yup.string().nullable(),
  investment_opportunity_id: yup.string().nullable(),
});
