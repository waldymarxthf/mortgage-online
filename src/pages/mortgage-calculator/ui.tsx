import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "./constants";
import { CityPurchaseDropdown } from "~components/city-purchase-dropdown";
import { DeadlineInput } from "~components/deadline-input";
import { InitialPaymentInput } from "~components/initial-payment-input";
import { MonthlyPaymentInput } from "~components/monthly-payment-input";
import { MortgagePeriodDropdown } from "~components/mortgage-period-dropdown";
import { OwnPropertyDropdown } from "~components/own-property-dropdown";
import { PropertyCostInput } from "~components/property-cost-input";
import { PropertyTypeDropdown } from "~components/property-type-dropdown";
import { submitMortgage } from "./model/mortgageSlice";
import { useAppDispatch } from "~store/store";

export interface MyFormValues {
  propertyCost: number;
  cityPurchase: string;
  mortgagePeriod: string;
  propertyType: string;
  ownProperty: string;
  initialPayment: number;
  deadline: number;
  monthlyPayment: number;
}

export function MortgageCalculator() {
  const dispatch = useAppDispatch();
  const handleSubmit = (values: MyFormValues) => {
    localStorage.setItem("formData", JSON.stringify(values));
    dispatch(submitMortgage(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <Form>
          <div className="min-h-screen bg-dark ">
            <div className="flex justify-center sm:justify-start tablet:justify-center">
              <div className="sm:px-55 px-5 lg:max-w-screen-default tablet:px-155">
                <h1 className="pt-28 text-3xl sm:text-5xl">Рассчитайте ипотеку быстро и просто</h1>
                <div className="lg:grid lg:grid-cols-2 tablet:flex tablet:flex-wrap tablet:justify-between">
                  <div className="mt-9 lg:col-start-1">
                    <PropertyCostInput />
                  </div>
                  <div className="mt-9 lg:col-start-2">
                    <CityPurchaseDropdown />
                  </div>
                  <div className="mt-9 lg:col-start-1">
                    <MortgagePeriodDropdown />
                  </div>
                  <div className="mt-9 lg:col-start-1">
                    <InitialPaymentInput />
                  </div>
                  <div className="mt-9 lg:col-start-2">
                    <PropertyTypeDropdown />
                  </div>
                  <div className="mt-9 lg:col-start-1">
                    <OwnPropertyDropdown />
                  </div>
                </div>
                <hr className="my-8 block h-px w-full border-none bg-outline" />
                <div className="lg:flex lg:w-724 lg:flex-wrap lg:justify-between">
                  <DeadlineInput />
                  <MonthlyPaymentInput />
                </div>
              </div>
            </div>
            <hr className="mt-2 block h-px w-full border-none bg-outline sm:my-8" />
            <div className="sm:flex sm:justify-center">
              <div className="sm:px-55 px-5 py-6 sm:w-1440 sm:py-0 tablet:px-40">
                <div className="sm:flex sm:justify-end">
                  <button
                    className={`h-14 w-full rounded-md font-medium sm:h-12 sm:w-60 ${
                      isValid
                        ? "cursor-pointer bg-yellow-300 text-zinc-950"
                        : "cursor-not-allowed bg-disabled text-gray-500"
                    }`}
                    type="submit"
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
