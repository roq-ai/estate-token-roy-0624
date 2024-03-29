import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { investmentOpportunityValidationSchema } from 'validationSchema/investment-opportunities';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getInvestmentOpportunities();
    case 'POST':
      return createInvestmentOpportunity();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInvestmentOpportunities() {
    const data = await prisma.investment_opportunity
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'investment_opportunity'));
    return res.status(200).json(data);
  }

  async function createInvestmentOpportunity() {
    await investmentOpportunityValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.investment_portfolio?.length > 0) {
      const create_investment_portfolio = body.investment_portfolio;
      body.investment_portfolio = {
        create: create_investment_portfolio,
      };
    } else {
      delete body.investment_portfolio;
    }
    const data = await prisma.investment_opportunity.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
