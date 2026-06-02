export type PolicyStatus = 'current' | 'update-pending' | 'out-of-date'

export interface PolicySection {
  id: string
  title: string
  content: string
}

export interface PolicyVersion {
  version: string
  date: string
  author: string
  summary: string
}

export interface Policy {
  id: string
  title: string
  domain: string
  ownerId: string
  lastUpdated: string
  linkedRegulations: string[]
  status: PolicyStatus
  sections: PolicySection[]
  versions: PolicyVersion[]
}

export const policies: Policy[] = [
  {
    id: 'pol-001',
    title: 'Customer Data Retention Policy',
    domain: 'Data Privacy',
    ownerId: 'user-003',
    lastUpdated: '2025-11-15',
    linkedRegulations: ['reg-005', 'reg-009', 'reg-013'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Purpose and Scope',
        content:
          'This policy establishes the principles, requirements, and procedures governing the retention, storage, and disposal of customer data across all Acme Corporation business units. It applies to all personal data collected from customers in the course of providing financial products and services.',
      },
      {
        id: 's2',
        title: '2. Retention Schedule',
        content:
          'Customer account records shall be retained for a minimum of seven (7) years following account closure. Transaction records shall be retained for five (5) years. Customer communications records shall be retained for three (3) years. Biometric authentication records shall be retained for the duration of the customer relationship and deleted within 30 days of relationship termination.',
      },
      {
        id: 's3',
        title: '3. Data Minimization',
        content:
          'The Company shall collect only the personal data strictly necessary for the identified business purpose. Data collection practices shall be reviewed annually against the documented data inventory. Any personal data identified as no longer necessary for any legitimate business purpose shall be scheduled for deletion within 90 days of identification.',
      },
      {
        id: 's4',
        title: '4. Cross-Border Data Transfers',
        content:
          'Customer personal data shall not be transferred outside the country of collection without the prior approval of the Chief Privacy Officer. Approved transfers shall be supported by a Data Transfer Agreement incorporating standard contractual clauses approved by the relevant supervisory authority.',
      },
      {
        id: 's5',
        title: '5. Disposal Procedures',
        content:
          'Physical records containing customer personal data shall be disposed of using cross-cut shredding or equivalent destruction methods. Electronic records shall be destroyed using certified data sanitization methods. Certificates of destruction shall be retained for 3 years.',
      },
    ],
    versions: [
      { version: '3.1', date: '2025-11-15', author: 'Priya Sharma', summary: 'Updated retention schedule for biometric data per GDPR guidance.' },
      { version: '3.0', date: '2025-03-10', author: 'Priya Sharma', summary: 'Annual review — no material changes.' },
      { version: '2.9', date: '2024-06-22', author: 'Sarah Chen', summary: 'Added cross-border data transfer section.' },
    ],
  },
  {
    id: 'pol-002',
    title: 'AML Transaction Monitoring Standard Operating Procedure',
    domain: 'AML / Financial Crime',
    ownerId: 'user-002',
    lastUpdated: '2025-12-01',
    linkedRegulations: ['reg-001', 'reg-008'],
    status: 'out-of-date',
    sections: [
      {
        id: 's1',
        title: '1. Purpose',
        content:
          'This SOP establishes the operating procedures for transaction monitoring to detect and report suspicious activity in compliance with the Bank Secrecy Act, FinCEN guidance, and applicable state money transmission laws.',
      },
      {
        id: 's2',
        title: '2. Transaction Monitoring System',
        content:
          'All transaction monitoring shall be conducted using the Company-approved TMS platform. Monitoring rules shall be reviewed and tuned at least semi-annually. The AML team shall maintain a complete audit trail of all rule changes, including the rationale, effective date, and approving officer.',
      },
      {
        id: 's3',
        title: '3. Alert Investigation',
        content:
          'Transaction monitoring alerts shall be reviewed within five (5) business days of generation. Investigators shall document their analysis, the evidence considered, and their disposition decision in the case management system. Decisions to close an alert without escalation shall require a second review for all alerts exceeding $50,000 in transaction value.',
      },
      {
        id: 's4',
        title: '4. SAR Filing',
        content:
          'Suspicious Activity Reports shall be filed with FinCEN within 30 calendar days of the date the Company determines that a transaction warrants reporting. SAR filings shall be approved by the Chief Compliance Officer or designated deputy.',
      },
    ],
    versions: [
      { version: '5.0', date: '2025-12-01', author: 'Marcus Webb', summary: 'Updated SAR filing procedure.' },
      { version: '4.8', date: '2025-04-15', author: 'Marcus Webb', summary: 'Updated TMS vendor reference.' },
    ],
  },
  {
    id: 'pol-003',
    title: 'Beneficial Ownership Verification Procedure',
    domain: 'AML / Financial Crime',
    ownerId: 'user-002',
    lastUpdated: '2025-09-30',
    linkedRegulations: ['reg-001'],
    status: 'out-of-date',
    sections: [
      {
        id: 's1',
        title: '1. Scope',
        content:
          'This procedure applies to all legal entity customers, including corporations, partnerships, limited liability companies, trusts, and other organized entities. It does not apply to natural persons, publicly listed companies, or governmental entities.',
      },
      {
        id: 's2',
        title: '2. Identification Threshold',
        content:
          'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 25% or more of the equity interests of a legal entity customer. The threshold applies to both direct and indirect ownership, including ownership through chains of entities.',
      },
      {
        id: 's3',
        title: '3. Verification Requirements',
        content:
          'Verification of beneficial owner identity shall include: full legal name; date of birth; residential or business address; Social Security Number or government-issued identification number. For non-US persons, a passport number and country of issuance shall be obtained.',
      },
      {
        id: 's4',
        title: '4. Ongoing Monitoring',
        content:
          'Beneficial ownership information shall be reviewed and refreshed at account relationship review, which occurs annually for high-risk customers and every three years for standard-risk customers. Customers are required to notify the Company of any material change in beneficial ownership within 30 days.',
      },
    ],
    versions: [
      { version: '2.3', date: '2025-09-30', author: 'Marcus Webb', summary: 'Periodic review — no material changes.' },
      { version: '2.2', date: '2024-09-01', author: 'Marcus Webb', summary: 'Added trust structure guidance.' },
    ],
  },
  {
    id: 'pol-004',
    title: 'Cybersecurity Incident Response Plan',
    domain: 'Technology Risk',
    ownerId: 'user-004',
    lastUpdated: '2026-01-20',
    linkedRegulations: ['reg-012', 'reg-010', 'reg-015'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Purpose',
        content:
          'This Plan establishes the procedures for detecting, containing, eradicating, and recovering from cybersecurity incidents affecting the Company\'s information systems and the data they process.',
      },
      {
        id: 's2',
        title: '2. Incident Classification',
        content:
          'Cybersecurity incidents are classified as Critical (immediate threat to core systems or customer data affecting over 1,000 individuals), High (significant threat with potential for material harm), Medium (limited scope with manageable risk), or Low (minor anomaly with no expected material impact). Classification drives escalation and response timelines.',
      },
      {
        id: 's3',
        title: '3. Access Control and MFA',
        content:
          'All administrative access to production systems shall require multi-factor authentication. Accepted forms of MFA include authenticator app-based time-based one-time passwords (TOTP), SMS-based OTP for non-privileged accounts, hardware security keys for accounts with standing access to payment systems or sensitive customer data.',
      },
      {
        id: 's4',
        title: '4. Reporting Timelines',
        content:
          'Critical incidents shall be reported to the Chief Information Security Officer within 30 minutes of detection. Regulatory reporting timelines vary by jurisdiction and shall be documented in the Regulatory Reporting Schedule maintained by the Compliance team.',
      },
    ],
    versions: [
      { version: '4.1', date: '2026-01-20', author: 'James O\'Brien', summary: 'Updated incident classification thresholds.' },
      { version: '4.0', date: '2025-07-01', author: 'James O\'Brien', summary: 'Major revision post-tabletop exercise.' },
    ],
  },
  {
    id: 'pol-005',
    title: 'Employee Code of Conduct and Ethics Policy',
    domain: 'Employee Conduct',
    ownerId: 'user-001',
    lastUpdated: '2026-02-14',
    linkedRegulations: ['reg-021'],
    status: 'current',
    sections: [
      {
        id: 's1',
        title: '1. Introduction',
        content:
          'Acme Corporation is committed to conducting its business with integrity and in compliance with all applicable laws and regulations. This Policy sets out the standards of conduct expected of all employees, contractors, and agents acting on behalf of the Company.',
      },
      {
        id: 's2',
        title: '2. Conflicts of Interest',
        content:
          'Employees must avoid situations in which personal interests could conflict, or appear to conflict, with their duties to the Company or its customers. All actual or potential conflicts of interest must be disclosed to the employee\'s manager and the Compliance team using the designated disclosure form.',
      },
      {
        id: 's3',
        title: '3. Data Privacy and Security',
        content:
          'Employees who have access to customer or employee personal data must handle it in accordance with the Company\'s Data Retention and Privacy Policy. Unauthorized disclosure of personal data is a disciplinary matter that may result in termination of employment.',
      },
    ],
    versions: [
      { version: '6.0', date: '2026-02-14', author: 'Sarah Chen', summary: 'Annual refresh — no material changes.' },
    ],
  },
  {
    id: 'pol-006',
    title: 'Open Banking API Governance Policy',
    domain: 'Technology Risk',
    ownerId: 'user-004',
    lastUpdated: '2025-08-05',
    linkedRegulations: ['reg-003'],
    status: 'out-of-date',
    sections: [
      {
        id: 's1',
        title: '1. Purpose',
        content:
          'This Policy governs the design, operation, security, and monitoring of APIs used to provide third-party access to customer financial data under the Company\'s Open Banking program.',
      },
      {
        id: 's2',
        title: '2. Data Access Request Processing',
        content:
          'Third-party provider requests for customer financial data shall be fulfilled within 48 hours of a valid, authenticated request. Requests shall be logged with the identity of the requesting TPP, the scope of data requested, and the timestamp.',
      },
      {
        id: 's3',
        title: '3. Security Standards',
        content:
          'Open Banking APIs shall implement OAuth 2.0 with PKCE for authorization. All API communications shall be encrypted using TLS 1.2 or higher. API keys shall be rotated at least annually and upon any personnel change affecting key custody.',
      },
    ],
    versions: [
      { version: '1.5', date: '2025-08-05', author: 'James O\'Brien', summary: 'Updated OAuth version requirements.' },
    ],
  },
  {
    id: 'pol-007',
    title: 'AI System Risk Assessment Framework',
    domain: 'Technology Risk',
    ownerId: 'user-004',
    lastUpdated: '2026-03-01',
    linkedRegulations: ['reg-002', 'reg-007', 'reg-015'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Scope',
        content:
          'This Framework applies to all AI and machine learning systems used by Acme Corporation for customer-facing decisions, risk management, regulatory compliance, or any other function with material impact on the Company\'s operations or customers.',
      },
      {
        id: 's2',
        title: '2. Risk Classification',
        content:
          'AI systems shall be classified as High, Medium, or Low risk based on the potential for adverse outcomes to customers, employees, or the Company. High-risk AI systems include those used in credit decisioning, customer onboarding, fraud detection with customer impact, and automated regulatory reporting.',
      },
      {
        id: 's3',
        title: '3. Human Oversight Requirements',
        content:
          'High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers. The responsible business unit shall designate qualified AI overseers who receive training on the system\'s capabilities and limitations.',
      },
      {
        id: 's4',
        title: '4. Model Documentation',
        content:
          'All AI systems in production shall be registered in the Model Inventory maintained by the Technology Risk team. The inventory shall include the model owner, the data sources, the validation history, and the performance metrics reviewed at the most recent governance review.',
      },
    ],
    versions: [
      { version: '2.0', date: '2026-03-01', author: 'James O\'Brien', summary: 'Expanded human oversight section.' },
      { version: '1.5', date: '2025-09-01', author: 'James O\'Brien', summary: 'Initial release.' },
    ],
  },
  {
    id: 'pol-008',
    title: 'GDPR Data Processing Agreement Template',
    domain: 'Data Privacy',
    ownerId: 'user-003',
    lastUpdated: '2026-01-10',
    linkedRegulations: ['reg-009', 'reg-013'],
    status: 'current',
    sections: [
      {
        id: 's1',
        title: '1. Scope',
        content:
          'This Data Processing Agreement (DPA) governs the processing of personal data by data processors acting on behalf of Acme Corporation as data controller, and by Acme Corporation when acting as a data processor for third-party data controllers.',
      },
      {
        id: 's2',
        title: '2. Processing Instructions',
        content:
          'The Processor shall process personal data only on the documented instructions of the Controller, unless required to do so by applicable law. The Processor shall inform the Controller without undue delay if it believes an instruction violates applicable data protection law.',
      },
      {
        id: 's3',
        title: '3. Security Measures',
        content:
          'The Processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption of personal data at rest and in transit, pseudonymization where applicable, and regular testing of security measures.',
      },
    ],
    versions: [
      { version: '4.0', date: '2026-01-10', author: 'Priya Sharma', summary: 'Updated for EDPB Guidelines 2026/03.' },
    ],
  },
  {
    id: 'pol-009',
    title: 'Climate Risk Disclosure Procedure',
    domain: 'ESG & Sustainability',
    ownerId: 'user-006',
    lastUpdated: '2025-12-15',
    linkedRegulations: ['reg-004', 'reg-017'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Purpose',
        content:
          'This Procedure establishes the process for identifying, quantifying, and disclosing climate-related financial risks and opportunities in the Company\'s annual report and other regulatory filings.',
      },
      {
        id: 's2',
        title: '2. GHG Emissions Accounting',
        content:
          'The Company shall calculate and report Scope 1 and Scope 2 greenhouse gas emissions annually, using the GHG Protocol Corporate Standard methodology. Emissions data shall be verified by an independent third party before inclusion in regulatory filings.',
      },
      {
        id: 's3',
        title: '3. Scope 3 Emissions',
        content:
          'Scope 3 emissions shall be reported on a best-efforts basis where material to the Company\'s overall emissions profile. A Scope 3 materiality assessment shall be conducted annually and the results shall be disclosed alongside Scope 3 data.',
      },
      {
        id: 's4',
        title: '4. Board Oversight',
        content:
          'The Board Risk Committee shall review and approve the annual climate risk disclosure. The Chief Sustainability Officer shall present to the Board Risk Committee at least annually on climate risk management and emerging regulatory requirements.',
      },
    ],
    versions: [
      { version: '2.1', date: '2025-12-15', author: 'David Kim', summary: 'Updated Scope 3 methodology.' },
      { version: '2.0', date: '2025-03-01', author: 'David Kim', summary: 'Aligned with TCFD framework.' },
    ],
  },
  {
    id: 'pol-010',
    title: 'Consumer Complaint Handling Policy',
    domain: 'Consumer Affairs',
    ownerId: 'user-005',
    lastUpdated: '2026-02-28',
    linkedRegulations: ['reg-006'],
    status: 'current',
    sections: [
      {
        id: 's1',
        title: '1. Scope',
        content:
          'This Policy applies to all complaints received from retail customers regarding the Company\'s financial products, services, pricing, and customer service interactions across all channels including online, telephone, and in-branch.',
      },
      {
        id: 's2',
        title: '2. Complaint Receipt and Acknowledgment',
        content:
          'All complaints shall be acknowledged within 1 business day of receipt. An acknowledgment letter or email shall be sent to the complainant confirming the complaint reference number and the expected timeline for resolution.',
      },
      {
        id: 's3',
        title: '3. Resolution Timelines',
        content:
          'The Company shall resolve complaints within 8 weeks of receipt or, for FCA-regulated activities, within the applicable FCA-prescribed timeframe. Complex complaints requiring investigation beyond 4 weeks shall be updated in writing at the 4-week mark.',
      },
      {
        id: 's4',
        title: '4. Vulnerable Customer Handling',
        content:
          'Where a complaint is received from a customer who has disclosed or exhibited characteristics of vulnerability, the complaint shall be prioritized and assigned to a senior complaints handler with specialist training in vulnerable customer support.',
      },
    ],
    versions: [
      { version: '3.5', date: '2026-02-28', author: 'Rachel Novak', summary: 'Updated vulnerable customer handling.' },
    ],
  },
  {
    id: 'pol-011',
    title: 'Third-Party Risk Management Policy',
    domain: 'Operational Risk',
    ownerId: 'user-001',
    lastUpdated: '2025-10-01',
    linkedRegulations: ['reg-011', 'reg-019'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Purpose and Scope',
        content:
          'This Policy establishes the framework for identifying, assessing, monitoring, and managing risks arising from the Company\'s relationships with third-party service providers, including technology vendors, cloud service providers, and outsourcing partners.',
      },
      {
        id: 's2',
        title: '2. Due Diligence Requirements',
        content:
          'Prior to entering into any contract with a third party that will access, process, or store sensitive Company or customer data, or that will perform a material business function, a risk-based due diligence assessment shall be conducted. Due diligence scope shall be determined based on the criticality and risk classification of the engagement.',
      },
      {
        id: 's3',
        title: '3. Ongoing Monitoring',
        content:
          'Critical third-party providers shall be subject to annual reassessment. Providers handling sensitive data shall provide evidence of SOC 2 Type II or equivalent certification annually. Material changes to a provider\'s control environment shall be assessed within 30 days of notification.',
      },
    ],
    versions: [
      { version: '4.2', date: '2025-10-01', author: 'Sarah Chen', summary: 'Updated cloud provider assessment criteria.' },
    ],
  },
  {
    id: 'pol-012',
    title: 'Privacy Notice and Consent Management Policy',
    domain: 'Data Privacy',
    ownerId: 'user-003',
    lastUpdated: '2025-07-15',
    linkedRegulations: ['reg-005', 'reg-024'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Privacy Notice Requirements',
        content:
          'The Company shall provide customers with a clear, concise, and accessible privacy notice at the point of data collection. The notice shall describe the types of data collected, the purposes for processing, the lawful bases relied upon, the recipients of data, and the individuals\' rights under applicable law.',
      },
      {
        id: 's2',
        title: '2. Consent Collection',
        content:
          'Where consent is the lawful basis for processing, consent shall be obtained through a clear, affirmative act. Pre-ticked boxes and bundled consent shall not be used. Consent records shall include the exact text of the consent request, the date and time of collection, and the version of the privacy notice in force at the time.',
      },
      {
        id: 's3',
        title: '3. Automated Decision Rights',
        content:
          'Where the Company makes decisions about individuals based solely on automated processing, the privacy notice shall disclose the existence of such processing and the individual\'s right to request human review. Requests for human review shall be fulfilled within 45 days.',
      },
    ],
    versions: [
      { version: '2.8', date: '2025-07-15', author: 'Priya Sharma', summary: 'Updated CPRA consent language.' },
    ],
  },
  {
    id: 'pol-013',
    title: 'Operational Resilience Framework',
    domain: 'Operational Risk',
    ownerId: 'user-001',
    lastUpdated: '2026-01-05',
    linkedRegulations: ['reg-016', 'reg-010'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Important Business Services',
        content:
          'The Company has identified the following Important Business Services (IBS): Retail account opening and onboarding; Retail payment processing; Commercial lending decisioning; Investment execution; Regulatory reporting. Each IBS has an assigned owner and a documented impact tolerance.',
      },
      {
        id: 's2',
        title: '2. Impact Tolerances',
        content:
          'Impact tolerances define the maximum tolerable disruption for each Important Business Service. Tolerances are expressed in terms of time (maximum outage duration), volume (maximum transactions affected), and financial harm (maximum customer loss). Tolerance breaches shall be escalated immediately to the Chief Operating Officer.',
      },
      {
        id: 's3',
        title: '3. Scenario Testing',
        content:
          'Scenario testing exercises shall be conducted annually covering: major technology failure; third-party provider outage; data centre loss; and cybersecurity event. Lessons learned from testing exercises shall be incorporated into the Framework within 60 days.',
      },
    ],
    versions: [
      { version: '1.4', date: '2026-01-05', author: 'Sarah Chen', summary: 'Expanded scenario testing section.' },
    ],
  },
  {
    id: 'pol-014',
    title: 'ESG Reporting Policy',
    domain: 'ESG & Sustainability',
    ownerId: 'user-006',
    lastUpdated: '2025-11-30',
    linkedRegulations: ['reg-004', 'reg-017', 'reg-022'],
    status: 'update-pending',
    sections: [
      {
        id: 's1',
        title: '1. Reporting Framework',
        content:
          'The Company prepares its ESG disclosures in accordance with the TCFD framework, the GRI Standards, and applicable regulatory requirements. The Chief Sustainability Officer is responsible for the accuracy and completeness of ESG disclosures.',
      },
      {
        id: 's2',
        title: '2. Data Collection and Governance',
        content:
          'ESG data shall be collected from operational systems, external providers, and value chain partners using standardized data collection processes. Data quality controls shall be applied at the point of collection and before disclosure.',
      },
      {
        id: 's3',
        title: '3. Assurance',
        content:
          'Key ESG KPIs, including Scope 1 and 2 GHG emissions, energy consumption, and water usage, shall be subject to limited assurance by an independent third party. Assurance shall be conducted in accordance with ISAE 3000.',
      },
    ],
    versions: [
      { version: '1.8', date: '2025-11-30', author: 'David Kim', summary: 'Added value chain disclosure section.' },
    ],
  },
  {
    id: 'pol-015',
    title: 'Multi-Factor Authentication and Privileged Access Policy',
    domain: 'Technology Risk',
    ownerId: 'user-004',
    lastUpdated: '2025-08-20',
    linkedRegulations: ['reg-012'],
    status: 'out-of-date',
    sections: [
      {
        id: 's1',
        title: '1. Purpose',
        content:
          'This Policy establishes the requirements for multi-factor authentication (MFA) and privileged access management across all of the Company\'s information systems and applications.',
      },
      {
        id: 's2',
        title: '2. MFA Requirements',
        content:
          'Multi-factor authentication is required for: all remote access to internal systems; all access to systems containing sensitive customer data; all access to privileged administrator accounts. Acceptable MFA methods include: hardware security keys (FIDO2); authenticator app-based TOTP; SMS-based one-time passwords (OTP) for standard user accounts; biometric authentication on approved mobile devices.',
      },
      {
        id: 's3',
        title: '3. Privileged Account Management',
        content:
          'Privileged accounts shall be managed through the Company\'s Privileged Access Management (PAM) system. Standing privileged access to production systems shall be granted only to personnel with a documented business need. Access shall be recertified quarterly by the relevant system owner.',
      },
    ],
    versions: [
      { version: '2.0', date: '2025-08-20', author: 'James O\'Brien', summary: 'Added FIDO2 requirements.' },
      { version: '1.7', date: '2024-12-01', author: 'James O\'Brien', summary: 'Updated PAM requirements.' },
    ],
  },
]

export function getPolicyById(id: string): Policy | undefined {
  return policies.find(p => p.id === id)
}
