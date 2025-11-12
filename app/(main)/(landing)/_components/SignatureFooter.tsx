import { SIGNATURE } from "@/constants/appConstants";
import Image from "next/image";
import React from "react";

interface PolicyParagraphProps {
  children: React.ReactNode;
  className?: string; // Optional className property
}

const SignatureFooter = () => {
  const PolicyParagraph: React.FC<PolicyParagraphProps> = ({
    children,
    className,
  }) => (
    <p className={`text-gray-700 leading-relaxed mb-4 ${className || ""}`}>
      {children}
    </p>
  );

  return (
    <footer className="text-center text-sm text-gray-500 mt-10">
      <PolicyParagraph>Signed: CHIBUEZE CHRISTOPHER OKONKWO</PolicyParagraph>
      <PolicyParagraph>Management, SPORTYGALAXY LIMITED</PolicyParagraph>
      <PolicyParagraph>Date: 10-08-2025</PolicyParagraph>
      <PolicyParagraph className="text-sm text-gray-500 mt-4 flex items-center justify-center">
        <Image
          width={100}
          height={100}
          src={SIGNATURE}
          alt="signature"
          className="object-cover transition-all duration-500 cursor-pointer"
          priority
        />
      </PolicyParagraph>
    </footer>
  );
};

export default SignatureFooter;
