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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getInvestmentPortfolioById, updateInvestmentPortfolioById } from 'apiSdk/investment-portfolios';
import { Error } from 'components/error';
import { investmentPortfolioValidationSchema } from 'validationSchema/investment-portfolios';
import { InvestmentPortfolioInterface } from 'interfaces/investment-portfolio';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { InvestmentOpportunityInterface } from 'interfaces/investment-opportunity';
import { getUsers } from 'apiSdk/users';
import { getInvestmentOpportunities } from 'apiSdk/investment-opportunities';

function InvestmentPortfolioEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<InvestmentPortfolioInterface>(
    () => (id ? `/investment-portfolios/${id}` : null),
    () => getInvestmentPortfolioById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InvestmentPortfolioInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateInvestmentPortfolioById(id, values);
      mutate(updated);
      resetForm();
      router.push('/investment-portfolios');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<InvestmentPortfolioInterface>({
    initialValues: data,
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
            Edit Investment Portfolio
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(InvestmentPortfolioEditPage);
