import BackButton from "@/common/BackButton";
import {
  BRAND_NAME,
  COUNTRY_CODE,
  EMAIL,
  PHONE_NUMBER,
  SIGNATURE,
} from "@/constants/appConstants";
import Image from "next/image";
import SignatureFooter from "../_components/SignatureFooter";

// Define Prop Types for Reusable Components
interface SectionHeadingProps {
  children: React.ReactNode;
}

interface PolicyParagraphProps {
  children: React.ReactNode;
  className?: string; // Optional className property
}

interface PolicyListProps {
  items: string[];
}

interface ContactInfoProps {
  name: string;
  address: string;
  email: string;
  phone: string;
  website?: string; // Optional website
}

export default function WarrantyAndReturnPolicy() {
  // Reusable Heading Component
  const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 rounded-md p-2 bg-white">
      {children}
    </h2>
  );

  // Reusable Paragraph Component
  const PolicyParagraph: React.FC<PolicyParagraphProps> = ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
  );

  // Reusable List Component
  const PolicyList: React.FC<PolicyListProps> = ({ items }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">
          {item}
        </li>
      ))}
    </ul>
  );

  // Reusable Contact Info Component
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
      {website && (
        <PolicyParagraph>
          Website:{" "}
          <a
            href={`http://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {website}
          </a>
        </PolicyParagraph>
      )}
    </div>
  );

  return (
    <section className="wrapper mt-10 bg-slate-600">
      <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center justify-center">
        <BackButton className="mr-auto mb-6" label="Back to home" />
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
          <header className="text-center mb-10">
            {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-3 rounded-md p-3 bg-green-200">
              SPORTYGALAXY LIMITED
            </h1> */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              WARRANTY AND RETURN POLICY
            </h2>
            <p className="text-sm text-gray-500">
              Effective Date: [01-08-2025]
            </p>
          </header>

          <section className="mb-8">
            <SectionHeading>INTRODUCTION</SectionHeading>
            <PolicyParagraph>
              At SPORTYGALAXY LIMITED, we are committed to ensuring that all
              products sold via our e-commerce platform and physical outlets
              meet high standards of quality, durability, and performance. This
              Warranty and Return Policy (&quot;Policy&quot;) sets out the terms
              and conditions applicable to warranty claims, product returns, and
              exchanges.
            </PolicyParagraph>
            <PolicyParagraph>
              This Policy forms an integral part of our Terms and Conditions of
              Sale and applies to all purchases made through our online platform
              or physical retail location(s).
            </PolicyParagraph>
            <PolicyParagraph>
              By purchasing any product from us, whether in-store or online, the
              customer acknowledges and agrees to the terms and conditions
              contained herein.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>1. WARRANTY TERMS</SectionHeading>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.1 Manufacturer&apos;s Warranty
            </h3>
            <PolicyParagraph>
              Where applicable, products sold by SPORTYGALAXY LIMITED may be
              accompanied by a manufacturer&apos;s warranty. In such cases:
            </PolicyParagraph>
            <PolicyList
              items={[
                "We will honour the terms and duration of the original manufacturer's warranty.",
                "Customers are advised to register their product (if required) with the manufacturer and retain original proof of purchase.",
                "SPORTYGALAXY LIMITED may act as a facilitator in the warranty process but is not liable for manufacturer warranty refusals or delays.",
              ]}
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.2 SPORTYGALAXY LIMITED Warranty
            </h3>
            <PolicyParagraph>
              For products not covered by a manufacturer&apos;s warranty, we
              offer a limited warranty that covers defects in materials and
              workmanship under normal and intended use for a period of 6 months
              from the date of delivery and Structural integrity of sporting
              equipment under normal consumer usage.
            </PolicyParagraph>
            <PolicyParagraph>
              This limited warranty does not cover:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Normal wear and tear;",
                "Damage resulting from misuse, abuse, negligence, accident, or improper installation;",
                "Products that have been modified, tampered with, or used in a commercial or non-domestic environment unless expressly specified;",
                "Consumables, including pads, grips, batteries, or accessories that naturally deteriorate over time;",
                "Cosmetic damage that does not affect functionality;",
                "Damage caused by external factors such as weather, water exposure, corrosion, fire, power surges, or storage in unsuitable environments;",
                "Products used for commercial, rental, or institutional purposes unless explicitly authorised in writing.",
              ]}
            />
            <PolicyParagraph>
              Warranty claims must be submitted in writing to our customer
              service team with appropriate supporting documentation, including
              order confirmation, photographs (where applicable), and a detailed
              description of the defect.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.3 Remedies Under SPORTYGALAXY LIMITED Warranty
            </h3>
            <PolicyParagraph>
              If a product is found to be defective and within the warranty
              period, SPORTYGALAXY LIMITED shall, at its sole discretion:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Repair the product free of charge using new or refurbished parts;",
                "Replace the product with a new or equivalent model;",
                "Offer store credit or a refund of the purchase price if repair or replacement is not feasible.",
              ]}
            />
            <PolicyParagraph>
              The foregoing remedies shall be the customer&apos;s exclusive
              remedies under this warranty.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>2. RETURN POLICY</SectionHeading>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.1 General Conditions for Returns
            </h3>
            <PolicyParagraph>
              We accept returns subject to the following conditions:
            </PolicyParagraph>
            <PolicyList
              items={[
                "The product must be returned in its original condition, unused, and with all original packaging, labels, manuals, and accessories intact;",
                "A Return Merchandise Authorisation (RMA) must be obtained before any return is accepted (see Clause 4 below);",
                "Products must be returned within [X days/months - please specify] from the date of delivery.", // Placeholder for specific duration
              ]}
            />
            <PolicyParagraph>
              SPORTYGALAXY LIMITED reserves the right to inspect returned items
              prior to issuing refunds, replacements, or credits.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.2 Categories of Returns and Remedies
            </h3>
            <PolicyParagraph className="font-semibold">
              (a) Defective or Damaged Goods
            </PolicyParagraph>
            <PolicyParagraph>
              If a product is found to be materially defective or damaged upon
              delivery:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Customers must notify us within 48 hours of receipt;",
                "Upon verification, we shall offer a full refund, replacement, or repair, at our sole discretion and at no additional cost to the customer;",
                "In such cases, return shipping costs shall be borne by SPORTYGALAXY LIMITED.",
              ]}
            />

            <PolicyParagraph className="font-semibold">
              (b) Incorrect Product Supplied
            </PolicyParagraph>
            <PolicyParagraph>
              If the item delivered materially differs from what was ordered:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Customers must notify us within 5 business days of receipt;",
                "We shall arrange for collection and re-delivery of the correct item at our expense.",
              ]}
            />

            <PolicyParagraph className="font-semibold">
              (c) Change of Mind
            </PolicyParagraph>
            <PolicyParagraph>
              Returns arising from a change of mind or incorrect purchase (not
              attributable to us):
            </PolicyParagraph>
            <PolicyList
              items={[
                "Will be accepted at our discretion, provided the product remains unused and in saleable condition;",
                "A restocking fee of 10% may apply;",
                "All return shipping charges shall be borne by the customer;",
                "Refunds (less applicable fees) shall be processed within 7-10 working days upon receipt and inspection of the item.",
              ]}
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.3 Non-Returnable Items
            </h3>
            <PolicyParagraph>
              The following categories of products are exempt from return or
              exchange unless proven defective:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Customised or personalised items;",
                "Clearance or final sale items;",
                "Products that have been used, assembled, or installed;",
                "Products missing original packaging, components, or documentation.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>3. REFUNDS AND CREDITS</SectionHeading>
            <PolicyParagraph>Where a return is approved:</PolicyParagraph>
            <PolicyList
              items={[
                "Refunds shall be processed to the original payment method;",
                "In certain cases, store credit may be issued upon mutual agreement;",
                "SPORTYGALAXY LIMITED shall not be liable for delays caused by payment processors or third-party financial institutions.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>4. RETURN PROCEDURE</SectionHeading>
            <PolicyParagraph>
              To initiate a return, customers must adhere to the following
              process:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Contact Customer Service: Submit a return request by emailing or via our online support portal, clearly stating the order number, item(s) in question, reason for return, and supporting evidence (e.g., photographs).",
                "Obtain RMA: Upon approval, you will be issued a Return Merchandise Authorisation (RMA) number. No returns will be processed without a valid RMA.",
                "Package and Ship: Return the product securely with the RMA number clearly indicated on the outer package. Return shipping instructions will be provided upon RMA issuance.",
                "Inspection and Confirmation: Upon receipt, our team will inspect the item(s) to confirm eligibility and proceed with the applicable remedy.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>5. LIMITATION OF LIABILITY</SectionHeading>
            <PolicyParagraph>
              Except as expressly provided herein, SPORTYGALAXY LIMITED shall
              not be liable for any indirect, incidental, consequential, or
              punitive damages arising from or in connection with the use of any
              product, including but not limited to loss of profit, business
              interruption, or personal injury.
            </PolicyParagraph>
            <PolicyParagraph>
              This Policy shall be interpreted in accordance with the laws of
              the Federal Republic of Nigeria, and where applicable, the laws of
              countries where SPORTYGALAXY LIMITED operates.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>6. AMENDMENTS</SectionHeading>
            <PolicyParagraph>
              SPORTYGALAXY LIMITED reserves the right to amend or update this
              Policy from time to time. Customers are advised to review the
              Policy periodically to remain informed of their rights and
              obligations.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>CONTACT INFORMATION</SectionHeading>
            <PolicyParagraph>
              For further information or clarification regarding this Policy,
              please contact:
            </PolicyParagraph>
            <ContactInfo
              name="CUSTOMER SERVICE DEPARTMENT"
              address={BRAND_NAME}
              email={EMAIL} // Placeholder for email
              phone={`${COUNTRY_CODE}${PHONE_NUMBER}`} // Placeholder for phone
            />
            <PolicyParagraph className="text-sm text-gray-500 mt-4">
              SPORTYGALAXY LIMITED - Quality You Can Trust, Service You Can Rely
              On.
            </PolicyParagraph>

            <SignatureFooter />
          </section>
        </div>
      </div>
    </section>
  );
}
