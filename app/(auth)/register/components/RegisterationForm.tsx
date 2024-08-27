"use client";
import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select, { SingleValue, CSSObjectWithLabel } from "react-select";
import countryList from "react-select-country-list";
import WorldFlag from "react-world-flags";
import { Checkbox } from "@/components/ui/checkbox";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
  agreeToTerms: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
  address: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  countryCode: Yup.string().required("Required"),
});

const RegistrationForm: React.FC = () => {
  const [countryOptions] = useState<[]>(countryList().getData());
  const [selectedCountry, setSelectedCountry] = useState<[] | null>(null);

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Transfrom countryCode  getDialingCodeByValue(value.countryCode)
    console.log(values);
    setSubmitting(false);
  };

  const customStyles = {
    control: (base: CSSObjectWithLabel, props: any): CSSObjectWithLabel => ({
      ...base,
      display: "flex",
      width: "100%",
      paddingInline: "24px",
      paddingBlock: "4px",
      margin: "0px",
      border: "none",
      borderRadius: "10px",
      borderColor: "currentcolor",
    }),
    valueContainer: (
      base: CSSObjectWithLabel,
      props: any
    ): CSSObjectWithLabel => ({
      ...base,
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0px",
      margin: "0px",
    }),
  };

  // Function to get the flag of the selected country
  const getCountryFlag = (countryCode: string) => {
    const code = countryCode.toUpperCase();
    return <WorldFlag code={code} width="15" height="15" />;
  };

  // Function to extract the dialing code from the selected country
  const getDialingCode = (country: any | null) => {
    if (!country) return "";
    const dialingCode = country.label.match(/\(\+(\d+)\)/);
    return dialingCode ? dialingCode[1] : "";
  };

  // Function to map country value to dialing code
  const getDialingCodeByValue = (value: string): string => {
    const dialingCodes: { [key: string]: string } = {
      NG: "234",
      US: "1",
      GB: "44",
      // Add more country codes as needed
    };

    return dialingCodes[value] || "+";
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        country: "",
        countryCode: "",
        agreeToTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => {
        const disableBtn = !(
          Object.keys(errors).length > 0 ||
          !values.country ||
          !values.firstName ||
          !values.lastName ||
          !values.email ||
          !values.password ||
          !values.confirmPassword ||
          !values.address ||
          !values.phoneNumber ||
          !values.countryCode ||
          !values.agreeToTerms
        );

        return (
          <Form className="flex flex-col items-center justify-start w-full h-screen my-20 bg-background">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="w-full mx-auto md:max-w-screen-sm space-y-11">
                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="country"
                  >
                    * Country / Region
                  </label>
                  <Select
                    className="flex justify-start border-1 border-dark flex-[3] w-full p-0 m-0 rounded-xl"
                    options={countryOptions}
                    name="country"
                    placeholder="Search.."
                    styles={customStyles}
                    onChange={(option: SingleValue<any>) => {
                      if (option) {
                        setFieldValue("country", option.label);
                        setFieldValue("countryCode", option.value);
                        setSelectedCountry(option);
                      }
                    }}
                    formatOptionLabel={(option: any) => (
                      <div className="flex items-center">
                        {getCountryFlag(option.value)}
                        <span className="ml-3">{option.label}</span>
                      </div>
                    )}
                  />
                  {errors.country && touched.country ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.country}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="firstName"
                  >
                    * First Name
                  </label>
                  <Field
                    className="flex flex-[3] justify-start w-full border-1 border-dark rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                    name="firstName"
                    type="text"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="lastName"
                  >
                    * Last Name
                  </label>
                  <Field
                    className="flex flex-[3] justify-start w-full border-1 border-dark rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                    name="lastName"
                    type="text"
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="email"
                  >
                    * Email
                  </label>
                  <Field
                    className="flex flex-[3] justify-start border-1 border-dark w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="password"
                  >
                    * Login Password
                  </label>
                  <Field
                    className="flex flex-[3] justify-start w-full border-1 border-dark rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                    name="password"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="confirmPassword"
                  >
                    * Confirm Password
                  </label>
                  <Field
                    className="flex flex-[3] justify-start w-full border-1 border-dark rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                    name="confirmPassword"
                    type="password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="address"
                  >
                    * Pick up location
                  </label>
                  <Field
                    className="flex flex-[3] justify-start w-full border-1 border-dark rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                    name="address"
                    type="text"
                  />
                  {errors.address && touched.address ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.address}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="phoneNumber"
                  >
                    * Tel
                  </label>
                  <div className="flex flex-[3] justify-start w-full">
                    <div className="grid w-full grid-cols-4 gap-2 xs:gap-5 xs:grid-cols-8">
                      <div className="relative col-span-2 xs:col-span-2">
                        <Field
                          className="w-fit xs:w-full border-1 border-[#808080] rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                          name="countryCode"
                          type="text"
                          disabled
                          placeholder={
                            getDialingCodeByValue(values.countryCode) || "Code"
                          }
                          value={getDialingCodeByValue(values.countryCode)}
                          readOnly
                        />
                        {errors.countryCode && touched.countryCode ? (
                          <div className="absolute text-sm bottoretext-destructive text-sm0 xs:right-0 -right-9 xs:top-16">
                            {errors.countryCode}
                          </div>
                        ) : null}
                      </div>
                      <div className="relative col-span-4 xs:col-span-6">
                        <Field
                          className="w-full xs:w-full border-1 border-[#808080] rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0"
                          name="phoneNumber"
                          type="number"
                          placeholder="Phone number"
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <div className="absolute right-0 text-sm text-destructive top-14 xs:top-16">
                            {errors.phoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <div className="flex justify-start flex-1 w-full xs:justify-end">
                    <Field name="agreeToTerms">
                      {({ field, form }: any) => (
                        <Checkbox
                          id="terms-and-condition"
                          className="rounded-full border-1 border-[#DEE2E6] p-3 flex items-center justify-center"
                          checked={field.value}
                          onCheckedChange={() =>
                            form.setFieldValue("agreeToTerms", !field.value)
                          }
                        />
                      )}
                    </Field>
                  </div>
                  <div className="flex flex-[3] justify-start w-full leading-none">
                    <label
                      htmlFor="terms-and-condition"
                      className="text-sm font-normal leading-snug xs:text-lg text-[#808080] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to (a)
                      <span className="text-black">
                        Free Membership Agreement
                      </span>
                      , (b) 
                      <span className="text-black">Terms of Use</span>, and (c) 
                      <span className="text-black">Privacy Policy</span>. I
                      agree to receive more information from Alibaba.com about
                      its products and services.
                    </label>
                  </div>
                </div>

                <div className="w-full mt-8">
                  <button
                    className="w-full text-white bg-black p-3 xs:p-5 rounded-md border-1 border-[#808080] disabled:bg-secondary disabled:text-secondary-foreground"
                    type="submit"
                    disabled={disableBtn}
                  >
                    Agree and Register
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegistrationForm;
