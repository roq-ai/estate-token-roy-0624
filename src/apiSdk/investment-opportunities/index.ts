import axios from 'axios';
import queryString from 'query-string';
import {
  InvestmentOpportunityInterface,
  InvestmentOpportunityGetQueryInterface,
} from 'interfaces/investment-opportunity';
import { GetQueryInterface } from '../../interfaces';

export const getInvestmentOpportunities = async (query?: InvestmentOpportunityGetQueryInterface) => {
  const response = await axios.get(`/api/investment-opportunities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInvestmentOpportunity = async (investmentOpportunity: InvestmentOpportunityInterface) => {
  const response = await axios.post('/api/investment-opportunities', investmentOpportunity);
  return response.data;
};

export const updateInvestmentOpportunityById = async (
  id: string,
  investmentOpportunity: InvestmentOpportunityInterface,
) => {
  const response = await axios.put(`/api/investment-opportunities/${id}`, investmentOpportunity);
  return response.data;
};

export const getInvestmentOpportunityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/investment-opportunities/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteInvestmentOpportunityById = async (id: string) => {
  const response = await axios.delete(`/api/investment-opportunities/${id}`);
  return response.data;
};
