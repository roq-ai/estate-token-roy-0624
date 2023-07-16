import { UserInterface } from 'interfaces/user';
import { InvestmentOpportunityInterface } from 'interfaces/investment-opportunity';
import { GetQueryInterface } from 'interfaces';

export interface InvestmentPortfolioInterface {
  id?: string;
  investor_id?: string;
  investment_opportunity_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  investment_opportunity?: InvestmentOpportunityInterface;
  _count?: {};
}

export interface InvestmentPortfolioGetQueryInterface extends GetQueryInterface {
  id?: string;
  investor_id?: string;
  investment_opportunity_id?: string;
}
