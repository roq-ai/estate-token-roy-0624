interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Platform Administrator'],
  customerRoles: ['Property Investor'],
  tenantRoles: [
    'Real Estate Promoter',
    'Platform Administrator',
    'Customer Support Representative',
    'Financial Advisor',
  ],
  tenantName: 'Organization',
  applicationName: 'Estate Token Royal',
  addOns: ['notifications', 'chat', 'file'],
};
