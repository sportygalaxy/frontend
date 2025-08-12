import BackButton from "@/common/BackButton";
import { BUSINESS_ADDRESS, COUNTRY_CODE, EMAIL, PHONE_NUMBER, WEBSITE } from "@/constants/appConstants";

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
  onlinePortal?: string; // Optional online complaint portal
}

export default function CustomerProtectionAndCustomerRightPolicy() {
  // Reusable Heading Component
  const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 rounded-md p-2 bg-white">
      {children}
    </h2>
  );

  const PolicyParagraph: React.FC<PolicyParagraphProps> = ({
    children,
    className,
  }) => (
    <p className={`text-gray-700 leading-relaxed mb-4 ${className || ""}`}>
      {children}
    </p>
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

  // Reusable Contact Info Component (extended for online portal)
  const ContactInfo: React.FC<ContactInfoProps> = ({
    name,
    address,
    email,
    phone,
    website,
    onlinePortal,
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
      {onlinePortal && (
        <PolicyParagraph>
          Online Complaint Portal:{" "}
          <a
            href={onlinePortal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {onlinePortal}
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
            {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-3 rounded-md p-3 bg-purple-200">
              SPORTYGALAXY LIMITED
            </h1> */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              CONSUMER PROTECTION & CUSTOMER RIGHTS POLICY
            </h2>
            <p className="text-sm text-gray-500">
              Effective Date: [10-08-2025] | Last Reviewed: [01-08-2025] | Next
              Review Date: [Periodic Review]
            </p>
          </header>

          <section className="mb-8">
            <SectionHeading>1. INTRODUCTION</SectionHeading>
            <PolicyParagraph>
              At SPORTYGALAXY LIMITED, we are unwavering in our commitment to
              upholding the highest standards of consumer protection and fair
              trading. This Consumer Protection and Customer Rights Policy
              (hereinafter referred to as the &quot;Policy&quot;) outlines our
              obligations to our customers, your rights as a consumer, and the
              safeguards we have put in place to ensure an equitable and
              satisfactory experience when engaging with our products and
              services.
            </PolicyParagraph>
            <PolicyParagraph>
              This Policy is grounded in ethical business practices and is
              guided by applicable consumer protection laws, including the
              Federal Competition and Consumer Protection Act (FCCPA) 2018 of
              Nigeria and aligned with international best practices.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>2. SCOPE OF APPLICATION</SectionHeading>
            <PolicyParagraph>
              This Policy applies to all products, services, warranties,
              after-sales support, and consumer interactions facilitated by
              SPORTYGALAXY LIMITED, whether conducted in-store, online, through
              third-party vendors, or via our authorised representatives.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>3. CUSTOMER RIGHTS</SectionHeading>
            <PolicyParagraph>
              We affirm the following fundamental consumer rights in accordance
              with global consumer protection standards:
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.1. Right to Safety
            </h3>
            <PolicyParagraph>
              Consumers are entitled to protection against products that are
              hazardous to health, safety, or life when used as intended.
            </PolicyParagraph>
            <PolicyParagraph>
              We ensure that all products, including but not limited to sporting
              goods and parts, spa equipment, amusement park devices, and
              children&apos;s games and sports items, are compliant with
              relevant safety regulations, certified by competent authorities,
              and are thoroughly tested before distribution.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.2. Right to Accurate and Transparent Information
            </h3>
            <PolicyParagraph>
              Customers have the right to receive complete, clear, and
              comprehensible information regarding:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Product features and specifications",
                "Pricing (inclusive of taxes and ancillary charges)",
                "Warranty terms",
                "Return and refund procedures",
                "Risks or limitations of use",
              ]}
            />
            <PolicyParagraph>
              No misleading, deceptive, or false representations shall be made
              in relation to any product.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.3. Right to Fair and Equitable Treatment
            </h3>
            <PolicyParagraph>
              Every customer shall be treated fairly, courteously, and without
              discrimination. We will not engage in aggressive, coercive, or
              unfair selling practices.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.4. Right to Choose
            </h3>
            <PolicyParagraph>
              Consumers shall have access to a range of quality goods at
              competitive prices and the ability to make informed decisions
              without undue pressure or manipulation.
            </PolicyParagraph>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.5. Right to Redress and Legal Remedies
            </h3>
            <PolicyParagraph>
              Where a product is defective, unfit for purpose, or materially
              different from what was advertised, consumers are entitled to
              redress in the form of:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Returns: Products may be returned within 14 days of purchase, provided they are unused, in their original condition, and accompanied by proof of purchase.",
                "Refunds: Full or partial refunds shall be processed within 7 working days upon successful verification of returned goods.",
                "Repairs/Replacements: At our discretion, faulty goods under warranty may be repaired or replaced at no additional cost to the consumer.",
              ]}
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.6. Right to Data Privacy and Confidentiality
            </h3>
            <PolicyParagraph>
              Customer personal and transactional data shall be handled in
              strict accordance with applicable data protection laws. SPORTY
              GALAXY LIMITED will not sell, disclose, or transfer customer data
              without lawful basis or customer consent.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>4. WARRANTIES & GUARANTEES</SectionHeading>
            <PolicyParagraph>
              All goods sold are covered by either the manufacturer&apos;s
              warranty or our internal warranty policy, as applicable. The
              following terms shall apply:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Warranty coverage shall be limited to manufacturing defects and exclude damages caused by misuse, negligence, or unauthorised modifications.",
                "Warranty periods vary depending on the product category and will be explicitly stated on the purchase invoice or product documentation.",
                "All warranty claims must be submitted in writing, with accompanying evidence and proof of purchase.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>5. COMPLAINT RESOLUTION MECHANISM</SectionHeading>
            <PolicyParagraph>
              We are committed to addressing complaints promptly, fairly, and
              professionally.
            </PolicyParagraph>
            <PolicyParagraph>
              To lodge a complaint, please contact us via any of the following
              channels:
            </PolicyParagraph>
            <ContactInfo
              name="" // No specific name provided for this contact section
              address={BUSINESS_ADDRESS}
              email={EMAIL}
              phone={`${COUNTRY_CODE}${PHONE_NUMBER}`}
              onlinePortal={WEBSITE} // Placeholder for online portal
            />
            <PolicyParagraph className="font-semibold">
              Complaint Handling Timeline:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Acknowledgement of complaint: Within 24 hours",
                "Resolution: Within 5-10 working days, depending on the nature of the complaint",
              ]}
            />
            <PolicyParagraph>
              If a resolution is not achieved to your satisfaction, you may
              escalate the matter to an appropriate regulatory authority such as
              the Federal Competition and Consumer Protection Commission
              (FCCPC).
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>6. CUSTOMER RESPONSIBILITIES</SectionHeading>
            <PolicyParagraph>
              To ensure a mutually beneficial relationship, customers are
              encouraged to:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Read all product labels, manuals, and usage guidelines carefully.",
                "Use products strictly in accordance with their intended purpose.",
                "Retain receipts and other documentation for future reference.",
                "Report product issues, defects, or dissatisfaction promptly.",
                "Cooperate during complaint resolution or investigation.",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>7. LIMITATIONS OF LIABILITY</SectionHeading>
            <PolicyParagraph>
              While we take all reasonable precautions to ensure product safety
              and accuracy, SPORTYGALAXY LIMITED shall not be liable for:
            </PolicyParagraph>
            <PolicyList
              items={[
                "Damages arising from improper use or unauthorised repair of products",
                "Losses due to customer negligence or failure to follow instructions",
                "Consequential or indirect losses beyond the actual cost of the product",
              ]}
            />
          </section>

          <section className="mb-8">
            <SectionHeading>8. AMENDMENTS TO THIS POLICY</SectionHeading>
            <PolicyParagraph>
              SPORTYGALAXY LIMITED reserves the right to amend this Policy
              periodically to reflect changes in the law, business operations,
              or customer feedback. All such updates will be made public via our
              official communication channels.
            </PolicyParagraph>
            <PolicyParagraph>
              Customers are advised to consult our website or contact our office
              for the most current version of this Policy.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>9. GOVERNING LAW AND JURISDICTION</SectionHeading>
            <PolicyParagraph>
              This Policy shall be governed by and construed in accordance with
              the laws of the Federal Republic of Nigeria. Any disputes arising
              from or connected to this Policy shall be subject to the exclusive
              jurisdiction of the Nigerian courts.
            </PolicyParagraph>
          </section>

          <section className="mb-8">
            <SectionHeading>10. ACKNOWLEDGEMENT</SectionHeading>
            <PolicyParagraph>
              By purchasing from or interacting with SPORTY GALAXY LIMITED,
              customers acknowledge that they have read, understood, and agreed
              to the terms set forth in this Consumer Protection & Customer
              Rights Policy.
            </PolicyParagraph>
            <PolicyParagraph>
              For further enquiries or clarifications, please do not hesitate to
              contact us.
            </PolicyParagraph>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-10">
            <PolicyParagraph>
              Signed: CHIBUEZE CHRISTOPHER OKONKWO
            </PolicyParagraph>
            <PolicyParagraph>Management, SPORTYGALAXY LIMITED</PolicyParagraph>
            <PolicyParagraph>Date: 10-08-2025</PolicyParagraph>
          </footer>
        </div>
      </div>
    </section>
  );
}
