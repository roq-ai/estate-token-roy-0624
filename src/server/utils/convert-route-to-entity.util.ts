const mapping: Record<string, string> = {
  'investment-opportunities': 'investment_opportunity',
  'investment-portfolios': 'investment_portfolio',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
