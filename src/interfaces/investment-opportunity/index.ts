import { InvestmentPortfolioInterface } from 'interfaces/investment-portfolio';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvestmentOpportunityInterface {
  id?: string;
  name: string;
  description?: string;
  status: string;
  promoter_id?: string;
  created_at?: any;
  updated_at?: any;
  investment_portfolio?: InvestmentPortfolioInterface[];
  user?: UserInterface;
  _count?: {
    investment_portfolio?: number;
  };
}

export interface InvestmentOpportunityGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  promoter_id?: string;
}
