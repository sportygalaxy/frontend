"use client";

import SpinnerIcon from "@/assets/icons/pack/Spinner";
import axios from "axios";
import React, { FunctionComponent } from "react";

type LocaleDispatch = {
  updateLocale?: (locale: string) => void;
};

type LocaleProps = {
  locale: string;
} & LocaleDispatch;

const CountryFlag: FunctionComponent<LocaleProps> = ({ locale, updateLocale }) => {
  const [flag, setFlag] = React.useState<string | null>(null);
  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const countryCode = locale.toLowerCase(); // "en-US" => "us"
        const response = await axios.get(
          `https://flagcdn.com/${countryCode}.svg`,
          {
            responseType: "text",
          }
        );
        setFlag(response.data);
      } catch (error) {
        console.error("Error fetching flag:", error);
      }
    };
    // const loadSvg = async () => {
    //   const countryCode = locale.slice(3).toLowerCase(); // "en-US" => "us"
    //   const { default: response } = await import(
    //     `svg-country-flags/svg/${countryCode}.svg`
    //   );

    //   setFlag(response);
    // };
    loadSvg();
  }, [locale]);

  return (
    <div>
      {flag ? (
        <img
          src={`data:image/svg+xml;base64,${btoa(flag)}`}
          width={30}
          height={20}
          alt={`${locale} flag`}
        />
      ) : (
        <span>
          <SpinnerIcon width="10" height="10" color="grey" />
        </span>
      )}
    </div>
  );
  // return (
  //   <img
  //     src={flag || ""}
  //     width={40}
  //     height={20}
  //     onClick={() => updateLocale(locale === "vi-VN" ? "en-US" : "vi-VN")}
  //   />
  // );
};
export default CountryFlag;
