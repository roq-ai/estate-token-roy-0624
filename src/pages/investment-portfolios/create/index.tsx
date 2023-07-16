import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createInvestmentPortfolio } from 'apiSdk/investment-portfolios';
import { Error } from 'components/error';
import { investmentPortfolioValidationSchema } from 'validationSchema/investment-portfolios';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { InvestmentOpportunityInterface } from 'interfaces/investment-opportunity';
import { getUsers } from 'apiSdk/users';
import { getInvestmentOpportunities } from 'apiSdk/investment-opportunities';
import { InvestmentPortfolioInterface } from 'interfaces/investment-portfolio';

function InvestmentPortfolioCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InvestmentPortfolioInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInvestmentPortfolio(values);
      resetForm();
      router.push('/investment-portfolios');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InvestmentPortfolioInterface>({
    initialValues: {
      investor_id: (router.query.investor_id as string) ?? null,
      investment_opportunity_id: (router.query.investment_opportunity_id as string) ?? null,
    },
    validationSchema: investmentPortfolioValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Investment Portfolio
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'investor_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<InvestmentOpportunityInterface>
            formik={formik}
            name={'investment_opportunity_id'}
            label={'Select Investment Opportunity'}
            placeholder={'Select Investment Opportunity'}
            fetcher={getInvestmentOpportunities}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'investment_portfolio',
    operation: AccessOperationEnum.CREATE,
  }),
)(InvestmentPortfolioCreatePage);
