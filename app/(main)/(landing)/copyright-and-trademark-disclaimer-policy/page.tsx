import BackButton from "@/common/BackButton";
import {
  BRAND_NAME,
  BUSINESS_ADDRESS,
  COUNTRY_CODE,
  EMAIL,
  PHONE_NUMBER,
  PHONE_NUMBER_3,
  WEBSITE,
} from "@/constants/appConstants";

export default function CopyrightAndTrademarkDisclaimerPolicy() {
  // Reusable Heading Component
  const SectionHeading: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 rounded-md p-2 bg-white">
      {children}
    </h2>
  );

  // Reusable Paragraph Component
  const PolicyParagraph: React.FC<{
    children: React.ReactNode;
    className?: string;
  }> = ({ children, className }) => (
    <p className={`text-gray-700 leading-relaxed mb-4 ${className || ""}`}>
      {children}
    </p>
  );

  // Reusable List Component
  const PolicyList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">
          {item}
        </li>
      ))}
    </ul>
  );

  // Reusable Contact Info Component
  interface ContactInfoProps {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
  }

  const ContactInfo: React.FC<ContactInfoProps> = ({
    name,
    address,
    email,
    phone,
    website,
  }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{name}</h3>
      <PolicyParagraph>{address}</PolicyParagraph>
      <PolicyParagraph>
        Email:{" "}
        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
          {email}
        </a>
      </PolicyParagraph>
      <PolicyParagraph>Phone: {phone}</PolicyParagraph>
      <PolicyParagraph>
        Website:{" "}
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {website}
        </a>
      </PolicyParagraph>
    </div>
  );

  return (
    <section className="wrapper mt-10 bg-transparent">
      <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center justify-center">
        <BackButton className="mr-auto mb-6" label="Back to home" />
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
          <header className="text-center mb-10">
            {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-3 rounded-md p-3 bg-blue-200">
              SPORTYGALAXY LIMITED
            </h1> */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              COPYRIGHT AND TRADEMARK DISCLAIMER POLICY
            </h2>
            <p className="text-sm text-gray-500">
              Effective Date: [25-06-2025] | Last Updated: [05-08-2025]
            </p>
          </header>

          <section className="mb-8">
            <SectionHeading>1. INTRODUCTION</SectionHeading>
            <PolicyParagraph>
              This Copyright and Trademark Disclaimer Policy
              (&quot;Policy&quot;) sets out the terms under which Sporty Galaxy
              Limited (&quot;Sporty Galaxy&quot;, &quot;we&quot;,
              &quot;our&quot;, or &quot;us&quot;) protects and enforces its
              intellectual property rights, including but not limited to
              copyrights, trademarks, trade names, logos, brand identifiers, and
              proprietary content.
            </PolicyParagraph>
            <PolicyParagraph>
              This Policy applies to all users, visitors, and third parties who
              access or interact with Sporty Galaxy&apos;s websites, e-commerce
              platforms, digital assets, and associated services, collectively
              referred to as the &quot;Platform&quot;.
            </PolicyParagraph>
            <PolicyParagraph>
              By accessing or using our Platform or materials, you acknowledge
              that you have read, understood, and agree to be legally bound by
              the terms of this Policy.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>2. COPYRIGHT NOTICE</SectionHeading>
            <PolicyParagraph>
              All content made available on or through the Sporty Galaxy
              Platform, including but not limited to text, logos, images,
              product descriptions, videos, audio materials, design layouts,
              digital downloads, catalogues, promotional materials,
              documentation, and coding elements, is the exclusive property of
              Sporty Galaxy Limited, and is protected under the Copyright Act
              (Cap. C28, Laws of the Federation of Nigeria 2004), the Berne
              Convention, and other applicable international copyright treaties
              and conventions.
            </PolicyParagraph>
            <PolicyParagraph>
              Unless expressly stated otherwise, all rights are reserved.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.1 Prohibited Use
            </h3>
            <PolicyParagraph>
              Except as permitted under Section 4 of this Policy, no part of the
              content may be:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Reproduced, copied, modified, adapted, translated, transmitted, stored in a retrieval system, or disseminated in any form or by any means (electronic, mechanical, photocopying, recording or otherwise);",
                "Used to create derivative works;",
                "Used for any commercial purpose or public display.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>3. TRADEMARK NOTICE</SectionHeading>
            <PolicyParagraph>
              The Sporty Galaxy name, logo, tagline, slogans, and all associated
              brand elements are registered and/or unregistered trademarks,
              trade names, or service marks owned by Sporty Galaxy Limited and
              protected under the Trademarks Act (Cap. T13, Laws of the
              Federation of Nigeria 2004) and applicable global intellectual
              property laws.
            </PolicyParagraph>
            <PolicyParagraph>
              All other marks that may appear on the Platform are the property
              of their respective owners and are used for identification
              purposes only.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.1 Prohibited Use of Trademarks
            </h3>
            <PolicyParagraph>
              You may not use, reproduce, display, or distribute any trademark
              belonging to Sporty Galaxy Limited in any manner that:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Suggests affiliation, endorsement, or sponsorship by SportyGalaxy without express prior written consent;",
                "Is likely to cause confusion among consumers;",
                "Dilutes, tarnishes, or misrepresents the brand or its reputation;",
                "Infringes upon Sporty Galaxy's rights or violates any applicable laws.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>4. LIMITED PERMITTED USE</SectionHeading>
            <PolicyParagraph>
              Sporty Galaxy grants users a limited, non-exclusive, revocable
              licence to access and use its Platform for personal,
              informational, and non- commercial purposes only, subject to the
              following conditions:
            </PolicyParagraph>
            <PolicyList
              items={[
                "You retain all copyright, trademark, and proprietary notices in any downloaded or printed material.",
                "You do not alter, obscure, or delete any proprietary or legal notices contained on the material.",
                "You do not use any content in a misleading, derogatory, defamatory, or deceptive manner.",
                "You do not use Sporty Galaxy's brand elements or content for resale, republication, redistribution, or commercial exploitation.",
              ]}
            />
            <PolicyParagraph>
              This licence does not extend to the resale or commercial use of
              the Platform or its contents, data mining, the use of bots, or any
              similar data- gathering and extraction tools.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>
              5. INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS
            </SectionHeading>
            <PolicyParagraph>
              Sporty Galaxy takes the protection of intellectual property
              seriously. If you believe that your work has been used or
              published on our Platform in a manner that constitutes copyright
              or trademark infringement, please submit a written complaint
              containing the following:
            </PolicyParagraph>
            <PolicyList
              items={[
                "A detailed description of the copyrighted work or trademark allegedly infringed;",
                "The exact URL or location where the infringing material appears;",
                "Your full legal name, postal address, email address, and phone number;",
                "A signed statement affirming that the information provided is accurate and that you are the rightful owner or are authorised to act on behalf of the owner.",
              ]}
            />
            <PolicyParagraph>
              All complaints should be directed to:
            </PolicyParagraph>
            <ContactInfo
              name="Legal Compliance Team"
              address={BUSINESS_ADDRESS}
              email={EMAIL}
              phone={`${COUNTRY_CODE}${PHONE_NUMBER}, ${COUNTRY_CODE}${PHONE_NUMBER_3}`}
              website={WEBSITE}
            />
            <PolicyParagraph>
              Upon receipt of a valid infringement notice, we will investigate
              and take appropriate action, which may include removing or
              disabling access to the infringing material and/or terminating the
              account of repeat offenders.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>6. ENFORCEMENT AND LEGAL REMEDIES</SectionHeading>
            <PolicyParagraph>
              Sporty Galaxy reserves all legal rights to take action against any
              unauthorised use or infringement of its intellectual property.
              Such actions may include injunctive relief, monetary damages,
              recovery of legal fees, and other remedies available under
              applicable laws.
            </PolicyParagraph>
            <PolicyParagraph>
              We reserve the right to update, modify, or revoke this Policy at
              any time without prior notice. Continued use of the Platform after
              any such modifications shall constitute acceptance of the revised
              terms.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>7. GOVERNING LAW AND JURISDICTION</SectionHeading>
            <PolicyParagraph>
              This Policy shall be governed by and construed in accordance with
              the laws of the Federal Republic of Nigeria. Any disputes arising
              in connection with this Policy shall be subject to the exclusive
              jurisdiction of the courts of Lagos State, Nigeria, without
              prejudice to Sporty Galaxy&apos;s right to seek remedies in other
              jurisdictions where its IP rights may be threatened or infringed.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>8. CONTACT INFORMATION</SectionHeading>
            <PolicyParagraph>
              If you have any questions, concerns, or inquiries regarding this
              Policy or our intellectual property rights, please contact:
            </PolicyParagraph>
            <ContactInfo
              name={BRAND_NAME}
              address={BUSINESS_ADDRESS}
              email={EMAIL}
              phone={`${COUNTRY_CODE}${PHONE_NUMBER}, ${COUNTRY_CODE}${PHONE_NUMBER_3}`}
              website={WEBSITE}
            />
            <PolicyParagraph className="text-sm text-gray-500 mt-4">
              2025 SportyGalaxy Limited. All Rights Reserved. Unauthorised use
              of any material or brand asset belonging to Sporty Galaxy Limited
              may constitute a violation of intellectual property laws.
            </PolicyParagraph>
          </section>
        </div>
      </div>
    </section>
  );
}
