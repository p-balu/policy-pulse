export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type RegStatus = 'new' | 'in-review' | 'resolved'
export type Industry = 'Financial' | 'Healthcare' | 'Privacy' | 'Energy' | 'General' | 'Employment'

export interface Regulation {
  id: string
  title: string
  regulator: string
  jurisdiction: string
  jurisdictionFlag: string
  industry: Industry
  effectiveDate: string
  publishedDate: string
  severity: Severity
  status: RegStatus
  tags: string[]
  summary: string
  body: string
}

export const regulations: Regulation[] = [
  {
    id: 'reg-001',
    title: 'FinCEN Notice 2026-04 — Enhanced Beneficial Ownership Reporting',
    regulator: 'FinCEN',
    jurisdiction: 'US',
    jurisdictionFlag: '🇺🇸',
    industry: 'Financial',
    effectiveDate: '2026-07-01',
    publishedDate: '2026-05-15',
    severity: 'critical',
    status: 'in-review',
    tags: ['AML', 'Beneficial Ownership', 'KYC'],
    summary:
      'Reduces beneficial ownership reporting threshold from 25% to 10% and requires real-time updating within 24 hours of any ownership change.',
    body: `Section 1. Purpose and Scope

This Notice amends the Customer Due Diligence (CDD) Final Rule to strengthen beneficial ownership reporting requirements for all covered financial institutions as defined under 31 U.S.C. § 5318.

Section 2. Revised Threshold Requirements

§2.1 Covered entities shall identify and verify the identity of any natural person who directly or indirectly owns 10 percent or more of the equity interests of a legal entity customer, reduced from the current threshold of 25 percent.

§2.2 Identification must include full legal name, date of birth, residential address, and unexpired government-issued identification document number.

§2.3(a) Beneficial ownership information shall be updated within 24 hours of any change in ownership structure, or upon notification by the customer, whichever occurs first.

§2.3(b) Covered entities that fail to update records within the prescribed timeframe shall be subject to civil monetary penalties not to exceed $10,000 per violation per day.

Section 3. Enhanced Due Diligence

§3.1 For beneficial owners holding 25 percent or more ownership, covered entities must perform enhanced due diligence including source of wealth verification and ongoing transaction monitoring calibrated to the risk profile.

§3.2 Covered entities shall maintain beneficial ownership records for a minimum of seven years following the termination of the customer relationship.

Section 4. Certification Requirements

§4.1 At account opening and upon any material change, covered entities shall obtain a written certification from a controlling individual of the legal entity customer attesting to the accuracy and completeness of beneficial ownership information provided.

§4.2(b)(iii) 'Covered entities shall establish and maintain written procedures reasonably designed to identify and verify the identity of beneficial owners of legal entity customers, and to include such ownership information in suspicious activity reports where relevant to the reported activity.'

Section 5. Implementation Timeline

Covered entities shall comply with the enhanced 10 percent threshold requirement no later than July 1, 2026. Covered entities with existing customer relationships as of the effective date shall obtain updated beneficial ownership certifications within 180 days.`,
  },
  {
    id: 'reg-002',
    title: 'EU AI Act Article 14 Amendment — Human Oversight Requirements',
    regulator: 'European Parliament',
    jurisdiction: 'EU',
    jurisdictionFlag: '🇪🇺',
    industry: 'General',
    effectiveDate: '2026-08-06',
    publishedDate: '2026-05-06',
    severity: 'high',
    status: 'new',
    tags: ['AI Governance', 'Human Oversight', 'High-Risk AI'],
    summary:
      'Mandates human oversight mechanisms for all high-risk AI systems deployed in financial services, healthcare, and HR contexts, with specific logging and intervention requirements.',
    body: `Article 14 — Human Oversight

1. High-risk AI systems shall be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be effectively overseen by natural persons during the period in which the AI system is in use.

2. Human oversight shall aim at preventing or minimising the risks to health, safety or fundamental rights that may emerge when a high-risk AI system is used in accordance with its intended purpose or under conditions of reasonably foreseeable misuse.

§14.2(a) 'Deployers of high-risk AI systems shall assign human overseers who possess the necessary competence, training, and authority to understand the AI system's capabilities and limitations, to properly interpret its output, and to override or intervene in any automated decision that may adversely affect a natural person.'

§14.3 The natural persons to whom human oversight is assigned shall be able to:

(a) fully understand the capacities and limitations of the high-risk AI system and be able to duly monitor its operation, so that signs of anomalies, dysfunctions and unexpected performance can be detected and addressed as soon as possible;

(b) remain aware of the possible tendency of automatically relying or over-relying on the output produced by a high-risk AI system ('automation bias');

(c) be able to correctly interpret the high-risk AI system's output, taking into account in particular the characteristics of the system and the interpretation tools and methods available;

(d) be able to decide, in any particular situation, not to use the high-risk AI system or otherwise disregard, override or reverse the output of the high-risk AI system;

(e) be able to intervene on the operation of the high-risk AI system or interrupt the system through a 'stop' button or a similar procedure that allows the system to come to a halt in a safe state.

§14.4 Providers of high-risk AI systems shall ensure that human overseers receive meaningful, timely, and comprehensible explanations of each automated decision affecting a natural person, in plain language, no later than 30 minutes following the automated decision.

§14.5 Audit logs shall capture the identity of the human overseer, the time and content of any override decision, and the basis for that decision. Logs shall be retained for a minimum of 36 months.`,
  },
  {
    id: 'reg-003',
    title: 'CFPB Rule 2026-03 — Open Banking Personal Financial Data Rights',
    regulator: 'CFPB',
    jurisdiction: 'US',
    jurisdictionFlag: '🇺🇸',
    industry: 'Financial',
    effectiveDate: '2026-09-12',
    publishedDate: '2026-05-12',
    severity: 'high',
    status: 'new',
    tags: ['Open Banking', 'Data Portability', 'Consumer Rights'],
    summary:
      'Requires financial institutions to provide consumers and authorized third parties with standardized, machine-readable access to personal financial data within 24 hours of request.',
    body: `Section 1002 — Personal Financial Data Rights

1002.1 Purpose. This part establishes rules to implement section 1033 of the Consumer Financial Protection Act of 2010 to require covered persons to make available certain data about consumers' financial accounts and transactions.

§1002.3(b) A covered entity shall make covered data available to a consumer or an authorized third party upon request, in a standardized machine-readable format, no later than 24 hours following authentication of the request.

§1002.3(c) 'Covered data' means, with respect to a covered account:

(1) Account information including current balance, credit limit, and available credit;
(2) Transaction information for the preceding 24 months;
(3) Upcoming bill payment information;
(4) Terms and conditions of the account, including fee schedules.

§1002.4(a) A covered entity shall not condition the provision of covered data on the consumer's agreement to any terms beyond those necessary to authenticate the request and protect against unauthorized data access.

§1002.4(b) Covered entities shall implement and maintain a developer portal allowing authorized third parties to access covered data through standardized application programming interfaces (APIs) meeting technical standards published by the CFPB.

§1002.5 Data accuracy. Covered entities shall ensure that covered data provided is accurate and complete as of the most recent business day prior to the request, and shall correct any identified inaccuracies within 3 business days of notification.

§1002.7(a) Covered entities shall maintain detailed logs of all data access requests, including the identity of the requestor, the scope of data requested, the time of access, and any errors encountered. Logs shall be retained for 5 years.`,
  },
  {
    id: 'reg-004',
    title: 'SEC Release No. 34-2026-18 — Climate Risk Disclosure Amendments',
    regulator: 'SEC',
    jurisdiction: 'US',
    jurisdictionFlag: '🇺🇸',
    industry: 'Financial',
    effectiveDate: '2026-10-01',
    publishedDate: '2026-04-22',
    severity: 'high',
    status: 'in-review',
    tags: ['Climate Risk', 'ESG', 'Disclosure', 'Scope 3'],
    summary:
      'Mandates climate-related risk disclosures in annual reports for all large accelerated filers, including Scope 1, 2, and 3 emissions data with third-party attestation.',
    body: `Item 1500 — Climate-Related Disclosures

(a) Governance. A registrant must describe its board of directors' oversight of climate-related risks and management's role in assessing and managing climate-related risks.

§1500.2(a) 'A registrant shall disclose quantitative and qualitative information about climate-related risks that have materially impacted, or are reasonably likely to have a material impact on, the registrant's business strategy, results of operations, or financial condition.'

§1500.3 Greenhouse Gas Emissions. Large accelerated filers and accelerated filers shall disclose:

(a) Scope 1 GHG emissions and Scope 2 GHG emissions, expressed in terms of CO2 equivalent;
(b) The methodologies used to calculate the disclosed GHG emissions;
(c) Organizational and operational boundaries for GHG emissions accounting;
(d) For large accelerated filers, Scope 3 GHG emissions if material or if the registrant has set a GHG emissions target that includes Scope 3 emissions.

§1500.3(b)(ii) 'GHG emissions disclosures required by this item shall be subject to attestation by an independent third party, using professional attestation standards, at the limited assurance level for fiscal years ending on or after December 15, 2026, and at the reasonable assurance level for fiscal years ending on or after December 15, 2028.'

§1500.4 Financial statement effects. A registrant shall separately disclose expenditures expensed and capitalized amounts related to climate-related activities in the financial statements where the total of such amounts exceeds 1% of the relevant line item.

§1500.5 Risk management. Registrants shall describe the processes they have implemented to identify, assess, and manage material climate-related risks, including whether and how climate risk is integrated into the overall enterprise risk management framework.`,
  },
  {
    id: 'reg-005',
    title: 'California Privacy Protection Agency Regulation §7027 — Data Minimization Update',
    regulator: 'CPPA',
    jurisdiction: 'US-CA',
    jurisdictionFlag: '🇺🇸',
    industry: 'Privacy',
    effectiveDate: '2026-07-15',
    publishedDate: '2026-05-20',
    severity: 'medium',
    status: 'new',
    tags: ['CPRA', 'Data Minimization', 'Consumer Privacy'],
    summary:
      'Clarifies data minimization obligations under CPRA, requiring documented business necessity justification for each category of personal information collected, retained, or shared.',
    body: `§7027. Data Minimization

(a) A business shall not collect, use, retain, or disclose personal information in a way that is incompatible with the disclosed purpose for which it was collected, without obtaining explicit consumer consent.

§7027.1(a) 'For each category of personal information collected, a business shall document and maintain a written record of: (1) the specific business purpose necessitating collection; (2) the minimum data elements required to fulfill that purpose; (3) the retention period tied to that purpose; and (4) any sharing arrangements with third parties, including the identity of the third party and the purpose of sharing.'

§7027.1(b) Businesses shall conduct a data minimization review no less than annually, or upon any material change to data practices, and shall delete or de-identify personal information that no longer serves a documented business purpose.

§7027.2 Sensitive personal information. For sensitive personal information as defined in Civil Code § 1798.121, a business shall apply enhanced data minimization controls, including:

(1) Separate data processing systems with access controls limited to personnel with a demonstrated need to know;
(2) Prohibition on the use of sensitive personal information for secondary purposes, including training machine learning models, without separate explicit consent;
(3) Mandatory data minimization impact assessment prior to any new collection of sensitive personal information.

§7027.3 Enforcement. A violation of this section shall constitute an unfair business act or practice subject to civil penalties under Civil Code § 1798.199.90. The Agency may assess penalties of up to $2,500 per unintentional violation and $7,500 per intentional violation or violation involving the personal information of a minor.`,
  },
  {
    id: 'reg-006',
    title: 'FCA Policy Statement PS26/1 — Consumer Duty Annual Review',
    regulator: 'FCA',
    jurisdiction: 'UK',
    jurisdictionFlag: '🇬🇧',
    industry: 'Financial',
    effectiveDate: '2026-07-31',
    publishedDate: '2026-04-30',
    severity: 'high',
    status: 'in-review',
    tags: ['Consumer Duty', 'Outcomes Monitoring', 'Vulnerable Customers'],
    summary:
      'Requires firms to complete and board-approve an annual Consumer Duty outcomes monitoring report by 31 July 2026, with enhanced requirements for identifying and supporting vulnerable customers.',
    body: `Chapter 3 — Annual Board Review and Report

3.1 By 31 July each year, firms must complete a comprehensive review assessing the outcomes being achieved for retail customers across all four consumer outcomes: products and services, price and value, consumer understanding, and consumer support.

§3.2 'The board, or equivalent management body, must approve the annual Consumer Duty outcomes report and attest that it has satisfied itself that the firm is delivering good outcomes for retail customers in line with the Consumer Duty. Where the board identifies that good outcomes are not being delivered, it must set out the actions being taken to remediate.'

§3.4 Vulnerable customer identification and support. Firms shall implement systems and processes to:

(a) Proactively identify customers who display characteristics of vulnerability, including but not limited to low financial resilience, low capability, poor health, and life events;

(b) Record vulnerability characteristics in customer records with appropriate consent and data protection safeguards;

(c) Adapt communications, service delivery, and product offerings to meet the needs of vulnerable customers, including offering alternative channels where digital-first approaches create barriers.

§3.5(b)(ii) 'Firms shall monitor, on at least a quarterly basis, the outcomes experienced by customers with vulnerability characteristics compared to the general customer population, and shall escalate material differences to senior management for review and remediation within 30 days of identification.'

§3.7 Price and value outcome assessment. Firms must assess whether the price paid by retail customers is reasonable given the benefits received, considering the target market as a whole and the distribution of outcomes across different customer segments.`,
  },
  {
    id: 'reg-007',
    title: 'HIPAA Amendment 2026-01 — AI-Assisted Clinical Decision Support',
    regulator: 'HHS',
    jurisdiction: 'US',
    jurisdictionFlag: '🇺🇸',
    industry: 'Healthcare',
    effectiveDate: '2026-09-01',
    publishedDate: '2026-05-01',
    severity: 'critical',
    status: 'new',
    tags: ['HIPAA', 'AI in Healthcare', 'PHI', 'Clinical Decision Support'],
    summary:
      'Extends HIPAA Privacy and Security Rule obligations to AI-generated health data and clinical decision support outputs, including explainability and audit trail requirements.',
    body: `45 CFR Part 164 — AI-Assisted Clinical Decision Support Amendment

§164.520(a)(1)(vii) Covered entities and business associates that utilize artificial intelligence or machine learning systems to process protected health information (PHI) for clinical decision support shall include in their Notice of Privacy Practices a plain-language description of how AI is used in patient care decisions and the mechanisms available for patients to request human review of AI-generated recommendations.

§164.528(a)(2)(v) 'The accounting of disclosures required under this section shall include any disclosure of PHI to an AI system or model, including the identity of the system vendor, the purpose of the disclosure, and a summary of the PHI disclosed.'

§164.312(a)(2)(iv) AI clinical decision support systems that process PHI shall implement automatic logoff mechanisms and maintain access logs that capture: the specific query or input PHI, the AI system's output or recommendation, the timestamp, and the identity of the healthcare provider who reviewed and acted upon the recommendation.

§164.312(e)(2)(ii) Covered entities shall conduct and document an annual AI risk assessment evaluating the accuracy, fairness, and bias of AI systems that process PHI, with particular attention to performance disparities across protected classes. Risk assessment findings shall be addressed within 90 days.

§164.530(j) Business associate agreements with AI system vendors shall explicitly address: (1) the vendor's obligation to process PHI only for contracted purposes; (2) prohibition on using PHI to retrain or improve AI models without patient authorization; (3) data deletion obligations upon contract termination, including deletion of any model weights that may contain memorized PHI.`,
  },
  {
    id: 'reg-008',
    title: 'MAS Notice 626 Amendment — AML/CFT for Digital Payment Tokens',
    regulator: 'MAS',
    jurisdiction: 'SG',
    jurisdictionFlag: '🇸🇬',
    industry: 'Financial',
    effectiveDate: '2026-08-01',
    publishedDate: '2026-05-10',
    severity: 'high',
    status: 'new',
    tags: ['AML/CFT', 'Digital Assets', 'Travel Rule', 'Crypto'],
    summary:
      'Extends AML/CFT obligations to digital payment token service providers, implementing the FATF Travel Rule for transfers above SGD 1,500 and mandating enhanced due diligence for cross-border transfers.',
    body: `Notice 626 — Prevention of Money Laundering and Countering the Financing of Terrorism — Digital Payment Token Service Providers

Section 3 — Customer Due Diligence

3.1 A DPT service provider shall establish and implement policies, procedures, and controls to assess the money laundering and terrorism financing risks associated with its business and implement commensurate risk mitigation measures.

§3.2(a) For DPT transfers of SGD 1,500 or above (or equivalent in any currency), a DPT service provider shall collect and transmit, without delay, the following originator information to the beneficiary institution:

(i) originator's full legal name;
(ii) originator's account number (including virtual asset wallet address);
(iii) originator's residential address, national identity number, date and place of birth, or customer identification number.

§3.2(b) 'A DPT service provider acting as beneficiary institution shall implement screening procedures to identify and freeze transactions where required originator information is absent, incomplete, or where the originator is listed on applicable sanctions lists. The beneficiary DPT service provider shall complete sanctions screening within 5 minutes of receiving transfer information.'

§4.1 Enhanced customer due diligence shall be applied to:

(a) all cross-border DPT transfers where the originator or beneficiary is located in a high-risk jurisdiction as designated by FATF or MAS;
(b) DPT transfers from unhosted wallets where the transfer amount exceeds SGD 5,000;
(c) DPT transfers that are identified as structurally complex or unusual without apparent economic rationale.

§4.3 DPT service providers shall submit suspicious transaction reports to the Suspicious Transaction Reporting Office within 1 business day of forming a suspicion that a transaction may be related to money laundering or terrorism financing.`,
  },
  {
    id: 'reg-009',
    title: 'GDPR Enforcement Guidance 2026/03 — Biometric Data Processing',
    regulator: 'EDPB',
    jurisdiction: 'EU',
    jurisdictionFlag: '🇪🇺',
    industry: 'Privacy',
    effectiveDate: '2026-07-01',
    publishedDate: '2026-04-01',
    severity: 'high',
    status: 'resolved',
    tags: ['GDPR', 'Biometrics', 'Special Category Data', 'Consent'],
    summary:
      'Clarifies that passive biometric identification (including facial recognition in physical premises) requires explicit consent and a Data Protection Impact Assessment even for existing deployments.',
    body: `Guidelines 04/2026 on the Processing of Biometric Data

2. Legal basis for biometric processing

2.1 Biometric data as defined under Article 4(14) GDPR, constitutes special category data under Article 9 GDPR and may only be processed where an explicit exception applies.

§2.3 'The use of biometric systems for the purpose of unique identification of natural persons in publicly accessible spaces, including employee access control systems, customer recognition systems, and anti-fraud identification, shall require explicit consent under Article 9(2)(a) GDPR. Legitimate interest under Article 6(1)(f) GDPR shall not serve as an independent lawful basis for processing biometric data.'

3. DPIA obligation

§3.1 Controllers that process biometric data for identification purposes are required to carry out a Data Protection Impact Assessment (DPIA) under Article 35 GDPR prior to commencing processing. This obligation applies to all existing deployments that have not previously completed a DPIA as of the date these Guidelines take effect.

§3.2(c) The DPIA must assess, at minimum: (i) the necessity and proportionality of biometric processing relative to the identified purpose; (ii) the risks to the rights and freedoms of data subjects, including the risk of discrimination, exclusion, or profiling; (iii) technical and organizational measures to mitigate identified risks.

4. Retention of biometric templates

§4.1 Biometric templates shall not be retained beyond the period strictly necessary for the identified purpose. Where biometric data is used solely for access control, templates shall be deleted immediately upon termination of the individual's relationship with the controller.

§4.2 Controllers shall implement technical measures to prevent the repurposing of biometric templates for secondary uses, including model training, population analytics, or law enforcement cooperation, without a separate, specific legal basis.`,
  },
  {
    id: 'reg-010',
    title: 'DORA Implementation Technical Standard 2026-07 — ICT Incident Classification',
    regulator: 'EBA / ESMA / EIOPA',
    jurisdiction: 'EU',
    jurisdictionFlag: '🇪🇺',
    industry: 'Financial',
    effectiveDate: '2026-08-17',
    publishedDate: '2026-05-17',
    severity: 'high',
    status: 'new',
    tags: ['DORA', 'Operational Resilience', 'ICT Risk', 'Incident Reporting'],
    summary:
      'Specifies classification criteria and reporting timelines for ICT-related incidents under DORA, including a 4-hour initial notification and 72-hour intermediate report requirement for major incidents.',
    body: `Regulation (EU) 2022/2554 — Digital Operational Resilience Act
Implementing Technical Standard on ICT-related Incident Reporting

Article 5 — Classification criteria for major ICT-related incidents

1. A financial entity shall classify an ICT-related incident as major where any of the following criteria are met:

§5.1(a) The incident results in unavailability of a critical service or a significant degradation in the quality of services provided to clients for a duration exceeding 4 continuous hours or 8 non-continuous hours within a 24-hour period.

§5.1(b) The incident results in the unauthorized access to, exfiltration, modification, or deletion of data of 500 or more clients, or data representing a material portion of the financial entity's transaction history.

§5.2 'Financial entities shall implement continuous automated monitoring of all ICT systems classified as critical or important function systems, with alerting thresholds calibrated to detect deviations from normal operational parameters within 15 minutes. Monitoring shall include real-time capacity metrics, error rates, response latency, and security event indicators.'

Article 6 — Initial notification requirements

§6.1 Upon classification of an ICT-related incident as major, a financial entity shall submit an initial notification to its competent authority within 4 hours of classification, containing: (a) the nature and current status of the incident; (b) the time of detection and approximate time of occurrence; (c) initial assessment of the impact; (d) containment measures applied.

§6.2 A financial entity shall submit an intermediate report within 72 hours of the initial notification, providing updated information on the scope, root cause analysis (where available), and estimated recovery timeline.

§6.3 A final report shall be submitted no later than 30 days following the closure of the major ICT-related incident.`,
  },
  {
    id: 'reg-011',
    title: 'APRA CPG 234 Amendment 2026-02 — Cloud Security Risk Management',
    regulator: 'APRA',
    jurisdiction: 'AU',
    jurisdictionFlag: '🇦🇺',
    industry: 'Financial',
    effectiveDate: '2026-09-30',
    publishedDate: '2026-05-30',
    severity: 'medium',
    status: 'new',
    tags: ['Cloud Security', 'Third-Party Risk', 'Operational Resilience'],
    summary:
      'Updates cloud computing security guidance for APRA-regulated entities, requiring data sovereignty controls, exit planning documentation, and annual concentration risk assessments.',
    body: `Prudential Practice Guide CPG 234 — Cloud Computing Security (Revised 2026)

Section 4 — Cloud Risk Assessment and Due Diligence

4.1 Regulated entities shall maintain a current inventory of all cloud services used for material business activities, classified by data sensitivity, regulatory obligation, and operational criticality.

§4.3 'Prior to migrating any system hosting sensitive data or performing a critical function to a cloud environment, a regulated entity shall conduct a comprehensive cloud risk assessment documenting: the regulatory and contractual obligations applicable to the data or function; the cloud service provider's security certifications and audit reports; concentration risk arising from the use of the same provider across multiple systems; and the regulated entity's ability to recover from a failure or unavailability of the cloud service.'

Section 5 — Data Sovereignty and Cross-Border Transfer

§5.2 Regulated entities shall document and maintain an up-to-date record of all jurisdictions in which data subject to Australian prudential requirements is stored or processed, including secondary storage locations used by cloud service providers.

§5.3 Where cloud services involve data processing outside Australia, regulated entities shall assess and document: (a) the legal framework governing data access by foreign governments or courts; (b) the cloud provider's policies on responding to foreign government data requests; (c) encryption and key management arrangements that prevent cloud provider access to decrypted data.

Section 6 — Exit and Portability Planning

§6.1(a) Regulated entities shall maintain documented and annually tested exit plans for each material cloud service, demonstrating the ability to migrate data and restore full operational capability within the entity's recovery time objectives using alternative providers or on-premises infrastructure.`,
  },
  {
    id: 'reg-012',
    title: 'New York DFS Part 500 Amendment 2026 — Cybersecurity Multi-Factor Authentication',
    regulator: 'NYDFS',
    jurisdiction: 'US-NY',
    jurisdictionFlag: '🇺🇸',
    industry: 'Financial',
    effectiveDate: '2026-06-30',
    publishedDate: '2026-03-01',
    severity: 'critical',
    status: 'in-review',
    tags: ['Cybersecurity', 'MFA', 'Access Control', 'NYDFS'],
    summary:
      'Mandates phishing-resistant multi-factor authentication for all privileged account access and all remote access to non-public information systems, eliminating SMS-based OTP as an accepted factor.',
    body: `23 NYCRR Part 500 — Cybersecurity Requirements for Financial Services Companies
Amendment to Section 500.12 — Multi-Factor Authentication

500.12 Multi-Factor Authentication

(a) Based on its risk assessment, each covered entity shall implement multi-factor authentication for:

(1) All remote access to the covered entity's information systems;
(2) All remote access to third-party applications that access nonpublic information;
(3) All access to privileged accounts, including system administrator accounts, privileged service accounts, and accounts with read access to sensitive cryptographic material.

§500.12(b) 'Effective June 30, 2026, covered entities shall implement only phishing-resistant forms of multi-factor authentication for all access covered under subsection (a). Phishing-resistant authenticators include FIDO2-compliant passkeys, hardware security keys meeting FIDO U2F or FIDO2 standards, and smart card authentication using X.509 certificates. One-time passwords delivered via SMS, voice call, or email shall not be deemed acceptable for the purposes of this section.'

§500.12(c) Covered entities shall maintain an inventory of all privileged accounts, reviewed and recertified no less than quarterly, with immediate deactivation of any account for which recertification is not completed within the prescribed period.

§500.12(d) Where a covered entity uses shared privileged accounts or service accounts, it shall implement privileged access management (PAM) controls that vault credentials, enable session recording, and provide time-limited access with automatic expiry.

§500.12(e) Covered entities shall conduct annual penetration testing of MFA implementations and phishing simulation exercises targeting all personnel with access to privileged accounts, with remediation of identified weaknesses within 60 days.`,
  },
  {
    id: 'reg-013',
    title: 'PDPA Amendment Act 2026 — Cross-Border Data Transfer Controls',
    regulator: 'PDPC',
    jurisdiction: 'SG',
    jurisdictionFlag: '🇸🇬',
    industry: 'Privacy',
    effectiveDate: '2026-10-01',
    publishedDate: '2026-05-01',
    severity: 'medium',
    status: 'new',
    tags: ['PDPA', 'Cross-Border Transfer', 'Data Protection', 'Adequacy'],
    summary:
      'Introduces a new adequacy assessment framework for cross-border data transfers, requiring contractual safeguards or PDPC approval for transfers to jurisdictions without adequate data protection laws.',
    body: `Personal Data Protection Act 2012 — Amendment Act 2026

Section 26A — Cross-Border Transfer of Personal Data

26A(1) An organisation shall not transfer personal data to a country or territory outside Singapore except in accordance with this section.

§26A(2) An organisation may transfer personal data to a country or territory outside Singapore if: (a) the PDPC has made a determination that the country or territory ensures an adequate level of protection for personal data; or (b) the organisation has implemented appropriate contractual or organizational safeguards.

§26A(3) 'Contractual safeguards under subsection (2)(b) shall include, at minimum, data processing agreements obligating the recipient to: process personal data only for the specified purpose; implement security measures equivalent to those required under the PDPA; provide individuals with rights equivalent to those under Division 3 of the PDPA; and notify the transferring organisation of any data breach within 72 hours of discovery.'

§26A(4) For transfers to recipients in jurisdictions determined by the PDPC to present elevated data protection risks, organisations shall additionally conduct and document a Transfer Impact Assessment evaluating: (a) the legal and regulatory framework of the destination jurisdiction; (b) the risk of government access to transferred data; (c) the practical protections afforded by contractual safeguards given the destination jurisdiction's legal environment.

§26A(5) Organisations shall maintain records of all cross-border personal data transfers, including the identity of recipients, the categories and volume of data transferred, and the safeguards relied upon, for a minimum of 5 years.`,
  },
  {
    id: 'reg-014',
    title: 'FERC Order 887 Amendment 2026 — Grid Cybersecurity Standards',
    regulator: 'FERC / NERC',
    jurisdiction: 'US',
    jurisdictionFlag: '🇺🇸',
    industry: 'Energy',
    effectiveDate: '2026-09-01',
    publishedDate: '2026-04-15',
    severity: 'high',
    status: 'new',
    tags: ['NERC CIP', 'Critical Infrastructure', 'OT Security', 'Energy'],
    summary:
      'Extends NERC CIP cybersecurity requirements to low-impact bulk electric system assets and mandates supply chain security risk assessments for all operational technology vendors.',
    body: `FERC Order No. 887-A — Critical Infrastructure Protection Standards Amendment

1. Supply Chain Risk Management

§CIP-013-3(R1.1) 'Responsible entities shall establish and implement one or more documented supply chain cyber security risk management plan(s) for industrial control system (ICS) hardware, software, and services associated with bulk electric system (BES) Cyber Systems, including those associated with low-impact BES Cyber Systems.'

§CIP-013-3(R1.2) Supply chain risk management plans shall include, at minimum:

(a) Processes to identify and assess cybersecurity risks in the supply chain for BES Cyber System hardware, software, and services;
(b) Methods to verify the software integrity and authenticity of all software and firmware updates to BES Cyber Systems prior to installation;
(c) Notification coordination processes for disclosure of known vulnerabilities by vendors;
(d) Processes to address BES Cyber System vendor access to BES Cyber Systems, including remote access.

2. Low-Impact Assets

§CIP-003-9(R2) Each Responsible Entity with one or more low-impact BES Cyber Systems shall implement the following cybersecurity controls:

(a) Physical security controls to restrict unauthorized physical access;
(b) Electronic access controls preventing unauthorized electronic access through external routable connectivity;
(c) Cyber security incident response plan with mandatory reporting to the E-ISAC within 1 hour of identifying a reportable incident;
(d) Transient cyber asset controls preventing introduction of malicious code.`,
  },
  {
    id: 'reg-015',
    title: 'OSFI Guideline B-13 Amendment 2026 — Technology and Cyber Risk',
    regulator: 'OSFI',
    jurisdiction: 'CA',
    jurisdictionFlag: '🇨🇦',
    industry: 'Financial',
    effectiveDate: '2026-11-01',
    publishedDate: '2026-05-08',
    severity: 'medium',
    status: 'new',
    tags: ['Technology Risk', 'Cloud', 'Cybersecurity', 'Canada'],
    summary:
      'Updates OSFI technology and cyber risk guideline to address AI model risk, quantum computing threat preparedness, and enhanced vendor concentration risk monitoring.',
    body: `Guideline B-13 — Technology and Cyber Risk Management (2026 Update)

Section 5 — AI Model Risk

5.1 Federally regulated financial institutions (FRFIs) that rely on AI models for material decisions affecting customers, risk management, or financial reporting shall implement a model risk management framework addressing:

§5.2(a) 'Model validation: FRFIs shall conduct independent validation of AI models prior to deployment and at least annually thereafter. Validation shall assess model conceptual soundness, data quality and relevance, model limitations and boundary conditions, and performance across demographically diverse segments of the affected population.'

§5.3 FRFIs shall maintain model inventories that capture, for each AI model in production: the model's purpose and scope; the data inputs and training methodology; the model developer and deployment date; validation history; performance metrics; and the business owner responsible for ongoing oversight.

Section 7 — Quantum Computing Threat Preparedness

§7.1 FRFIs shall assess the cryptographic inventory of all systems and networks, identifying all systems relying on public-key cryptographic algorithms that are vulnerable to quantum computing attacks (RSA, ECC, ECDH, ECDSA).

§7.2 By November 1, 2027, FRFIs shall have completed a quantum-readiness roadmap identifying priority systems for cryptographic migration and establishing target dates for migration to quantum-resistant algorithms consistent with NIST PQC standards.

Section 8 — Vendor Concentration Risk

§8.3 'FRFIs shall establish quantitative concentration risk thresholds for critical technology service providers. Where actual concentration exceeds thresholds, FRFIs shall implement risk mitigation measures including diversification plans, contractual protections, and enhanced monitoring.'`,
  },
  {
    id: 'reg-016',
    title: 'PRA Consultation Paper CP5/26 — Operational Resilience Extensions',
    regulator: 'PRA',
    jurisdiction: 'UK',
    jurisdictionFlag: '🇬🇧',
    industry: 'Financial',
    effectiveDate: '2026-11-31',
    publishedDate: '2026-05-25',
    severity: 'medium',
    status: 'new',
    tags: ['Operational Resilience', 'Impact Tolerances', 'Scenario Testing'],
    summary:
      'Extends operational resilience requirements to subsidiary entities and branches of non-UK firms, requiring impact tolerance setting for all important business services within 12 months.',
    body: `Consultation Paper CP5/26 — Operational Resilience: Extensions to Scope and Enhanced Scenario Testing

Chapter 2 — Scope Extension

2.1 With effect from the implementation date, the operational resilience requirements in SS1/21 shall apply to:

(a) UK subsidiaries of non-UK parent firms with total assets exceeding £5 billion;
(b) UK branches of non-UK firms operating under a temporary permissions regime;
(c) Third-country branches of EEA firms re-authorized under the UK financial services framework.

§2.4 'Firms within the extended scope shall, within 12 months of the implementation date, complete a mapping of all important business services, set impact tolerances for each important business service, and undertake a self-assessment of their ability to remain within those tolerances during disruption scenarios.'

Chapter 4 — Enhanced Scenario Testing

§4.2 Firms shall conduct scenario testing exercises simulating:

(a) Extended outage of a critical third-party provider (minimum 10 business days);
(b) Simultaneous failure of two critical systems or processes;
(c) Coordinated cyber attack affecting core transaction processing and customer data systems;
(d) Pandemic or other event causing loss of more than 50% of key personnel.

§4.3(a) Scenario testing shall be conducted at least annually, with the board of directors or equivalent governing body directly reviewing results and approving remediation actions. Evidence of board review shall be retained and made available to the PRA on request.

§4.4 'Firms shall document lessons learned from each testing exercise and update their operational resilience frameworks to address identified weaknesses within 90 days of completing the exercise.'`,
  },
  {
    id: 'reg-017',
    title: 'SEBI Circular — ESG Reporting and Assurance Framework',
    regulator: 'SEBI',
    jurisdiction: 'IN',
    jurisdictionFlag: '🇮🇳',
    industry: 'Financial',
    effectiveDate: '2026-09-30',
    publishedDate: '2026-05-28',
    severity: 'medium',
    status: 'new',
    tags: ['ESG', 'BRSR', 'Sustainability', 'Disclosure'],
    summary:
      'Mandates reasonable assurance on all ESG KPIs disclosed in the Business Responsibility and Sustainability Report for top 500 listed entities, and expands scope to include value chain disclosures.',
    body: `Circular No. SEBI/HO/CFD/CMD-2/P/CIR/2026/15
Subject: Business Responsibility and Sustainability Reporting — Enhanced Assurance and Value Chain Requirements

3. Assurance Requirements

3.1 With effect from the financial year 2026-27, the top 500 listed entities (by market capitalization) shall obtain reasonable assurance on all key performance indicators (KPIs) disclosed in the BRSR, including environmental metrics, social metrics, and governance metrics.

§3.2 'Assurance shall be conducted by a competent independent assurance provider with demonstrated competence in sustainability assurance, using a recognized assurance standard (ISAE 3000 or AA1000AS). The assurance report, including the assurance provider's opinion and basis of opinion, shall be disclosed in the annual report and filed with the stock exchange.'

3.3 Listed entities shall ensure that disclosed GHG emissions data is consistent with internationally recognized GHG accounting protocols (GHG Protocol Corporate Standard or ISO 14064).

4. Value Chain Disclosures

§4.1 Top 1000 listed entities (by market capitalization) shall, on a best-effort basis for financial year 2026-27 and on a mandatory basis from financial year 2027-28, disclose BRSR Core KPIs for:

(a) Their top 10 upstream value chain partners by procurement spend;
(b) Their top 10 downstream value chain partners by revenue contribution.

§4.2 For each value chain partner disclosure, listed entities shall describe the engagement methodology used to collect data, the verification procedures applied, and the coverage of disclosed data as a percentage of total value chain spend or revenue.`,
  },
  {
    id: 'reg-018',
    title: 'ICO Guidance 2026/03 — Privacy Enhancing Technologies in Analytics',
    regulator: 'ICO',
    jurisdiction: 'UK',
    jurisdictionFlag: '🇬🇧',
    industry: 'Privacy',
    effectiveDate: '2026-08-01',
    publishedDate: '2026-04-20',
    severity: 'low',
    status: 'new',
    tags: ['PETs', 'Data Analytics', 'Privacy by Design', 'UK GDPR'],
    summary:
      'Provides regulatory clarity on the use of differential privacy, federated learning, and secure multi-party computation as privacy-enhancing techniques, confirming their acceptability under UK GDPR.',
    body: `ICO Guidance on Privacy Enhancing Technologies (PETs) for Data Analytics

Section 3 — Regulatory Position on Specific PETs

3.1 Differential privacy. The ICO considers the use of differential privacy mechanisms as a strong technical safeguard under Article 25 UK GDPR (data protection by design and by default), where:

§3.1(a) 'The privacy budget (epsilon) is set at a level that provides meaningful protection given the sensitivity of the underlying data and the likely adversarial capability. The ICO recommends epsilon values at or below 1.0 for most analytical use cases involving personal data. Organisations shall document the rationale for their chosen epsilon value and reassess it as the threat landscape evolves.'

3.2 Federated learning. The ICO considers federated learning to be a privacy-enhancing technique where it prevents raw personal data from leaving the data subject's device or the controller's secure environment.

§3.2(b) 'Organisations deploying federated learning shall assess and mitigate the risk of gradient inversion attacks, which may allow reconstruction of individual training data from model gradients. Mitigation measures may include secure aggregation protocols, gradient clipping, and the combination of federated learning with differential privacy noise addition.'

3.3 Synthetic data. The ICO's position is that synthetic data is not personal data where: (a) the synthetic data was generated using a privacy-preserving generation method that provides membership inference resistance; and (b) re-identification risk has been assessed and found to be negligible.

§3.3(c) 'Organisations that publish synthetic datasets derived from personal data shall conduct and document a disclosure risk assessment, addressing at minimum: memorization risk, attribute inference risk, and the risk of linkage attacks using available auxiliary information.'`,
  },
  {
    id: 'reg-019',
    title: 'RBI Circular 2026/45 — Fintech Partnership Risk Management',
    regulator: 'RBI',
    jurisdiction: 'IN',
    jurisdictionFlag: '🇮🇳',
    industry: 'Financial',
    effectiveDate: '2026-10-15',
    publishedDate: '2026-05-15',
    severity: 'medium',
    status: 'new',
    tags: ['Fintech', 'Third-Party Risk', 'Outsourcing', 'Digital Lending'],
    summary:
      'Mandates regulatory approval for fintech partnerships involving credit underwriting, payment processing, or customer onboarding functions, and establishes a standard due diligence framework.',
    body: `Reserve Bank of India — Master Direction on Outsourcing of Financial Services (Revision 2026)

Section 4 — Fintech Partnership Framework

4.1 Regulated entities (REs) entering into partnerships with fintech entities for the provision of any of the following functions shall obtain prior approval from RBI:

(a) Credit underwriting, scoring, or sanctioning;
(b) Customer onboarding, KYC verification, or account opening;
(c) Payment initiation or processing in excess of INR 10 lakh per transaction;
(d) Portfolio management or investment advisory services.

§4.3 'Prior to entering into or renewing a fintech partnership, REs shall conduct and document due diligence covering: (i) financial health and business continuity capability of the fintech; (ii) data security practices, including penetration test results from the preceding 12 months; (iii) compliance history, including regulatory actions in any jurisdiction; (iv) related-party relationships and potential conflicts of interest; (v) sub-outsourcing arrangements.'

4.4 Fintech partnership agreements shall include, at minimum:

(a) Clear delineation of responsibilities and liability for customer data breaches;
(b) RBI's right to conduct examinations and audits of the fintech entity;
(c) Prohibition on sub-outsourcing of regulated functions without RE's prior written approval;
(d) Data localization obligations consistent with applicable RBI guidelines;
(e) Termination provisions requiring a minimum transition period of 180 days.`,
  },
  {
    id: 'reg-020',
    title: 'ASIC Regulatory Guide RG 2026/16 — Digital Asset Disclosure Obligations',
    regulator: 'ASIC',
    jurisdiction: 'AU',
    jurisdictionFlag: '🇦🇺',
    industry: 'Financial',
    effectiveDate: '2026-07-01',
    publishedDate: '2026-04-08',
    severity: 'high',
    status: 'new',
    tags: ['Digital Assets', 'Crypto', 'Product Disclosure', 'AFSLicense'],
    summary:
      'Confirms that digital asset investment products require an Australian Financial Services Licence and prescribes mandatory risk warnings and fee disclosures for digital asset product issuers and intermediaries.',
    body: `ASIC Regulatory Guide RG 2026/16 — Digital Asset Products: Licensing and Disclosure

Section B — Licensing Requirements

B1 ASIC considers that digital asset investment products, including exchange-traded products, managed investment schemes, and structured products whose returns reference one or more digital assets, constitute financial products within the meaning of section 763A of the Corporations Act 2001.

§B3 'Entities that issue, distribute, or provide advice in relation to digital asset investment products must hold an Australian Financial Services (AFS) licence with the appropriate authorisations. ASIC will not grant exemptions from licensing requirements based on the decentralized or cross-border nature of the underlying digital assets.'

Section D — Product Disclosure

§D5 Product disclosure statements (PDS) and target market determinations (TMDs) for digital asset products shall include prominent risk disclosures addressing:

(a) Volatility: the historical price volatility of the underlying digital asset, including maximum drawdown over 30-day, 90-day, and 12-month periods;
(b) Regulatory risk: the risk of adverse regulatory changes in relevant jurisdictions that may affect the value, tradability, or legality of the digital asset;
(c) Technology risk: the risk of loss due to protocol vulnerabilities, smart contract bugs, or key management failures;
(d) Liquidity risk: circumstances under which redemption of the product may be suspended or delayed.

§D7 'Fee disclosures for digital asset products shall separately itemise: (i) management fees expressed as an annual percentage; (ii) transaction costs including bid-ask spreads and network fees; (iii) custody fees; (iv) any performance fees, including the calculation methodology. Total ongoing costs shall be expressed as a single all-in percentage figure.'`,
  },
  {
    id: 'reg-021',
    title: 'OSHA Rule 2026-03 — AI-Assisted Workplace Safety Monitoring',
    regulator: 'OSHA',
    jurisdiction: 'US',
    jurisdictionFlag: '🇺🇸',
    industry: 'Employment',
    effectiveDate: '2026-11-01',
    publishedDate: '2026-05-20',
    severity: 'low',
    status: 'new',
    tags: ['Workplace Safety', 'AI Monitoring', 'Employee Rights'],
    summary:
      'Establishes rights for workers subject to AI-powered workplace safety monitoring systems, including notification requirements, access to monitoring data, and human review of automated safety scores.',
    body: `29 CFR Part 1910 — Occupational Safety and Health Standards Amendment
AI-Assisted Workplace Monitoring: Worker Rights and Protections

§1910.502(a) Employers that utilize AI or algorithmic systems to monitor worker safety, ergonomics, productivity, or location in a workplace covered by the Act shall:

(1) Notify all affected workers in writing of the types of monitoring deployed, the data collected, how it is used, and who has access to it, prior to commencing monitoring;
(2) Provide workers with access to their own monitoring data upon request, in a readable format, within 5 business days;
(3) Provide workers with an opportunity to contest an automated safety rating or score that adversely affects their employment conditions.

§1910.502(b) 'Where an employer uses an AI system to identify safety violations, ergonomic risk scores, or fatigue indicators, any adverse employment action based solely on AI output shall be subject to mandatory human review. The reviewing supervisor shall have the authority to override the AI determination and shall document the basis for their decision.'

§1910.502(c) Employers shall ensure that AI workplace monitoring systems are periodically audited for discriminatory bias, including disparate impact on workers based on protected characteristics. Audit results shall be disclosed to employee representatives and, upon request, to OSHA.

§1910.502(d) Monitoring data collected solely for safety purposes shall not be used for disciplinary action, performance evaluation, or compensation determination, without separate written consent from the worker.`,
  },
  {
    id: 'reg-022',
    title: 'EBA Guidelines on Loan Origination and Monitoring — ESG Risk Integration',
    regulator: 'EBA',
    jurisdiction: 'EU',
    jurisdictionFlag: '🇪🇺',
    industry: 'Financial',
    effectiveDate: '2026-10-01',
    publishedDate: '2026-04-28',
    severity: 'medium',
    status: 'new',
    tags: ['ESG Risk', 'Loan Origination', 'Climate Risk', 'Credit Risk'],
    summary:
      'Requires EU credit institutions to integrate ESG risk factors into loan origination processes, credit risk appetite, and borrower due diligence, including physical and transition climate risk assessment.',
    body: `EBA/GL/2026/04 — Guidelines on Loan Origination and Monitoring (ESG Risk Integration)

Section 5 — ESG Risk in Credit Risk Appetite and Policy

5.1 Institutions shall integrate material ESG risk factors, including climate-related physical and transition risks, into their credit risk appetite frameworks and underwriting policies.

§5.4 'Institutions shall identify, for each material portfolio segment, the principal ESG risk factors that may affect borrower creditworthiness over the loan horizon. For commercial real estate and corporate lending, this shall include assessment of: the property or asset's energy efficiency and climate transition risk exposure; the borrower's progress against published decarbonization or sustainability commitments; and the potential for stranded asset risk under various climate transition scenarios.'

Section 6 — ESG Due Diligence in Loan Origination

§6.2 For commercial real estate loans above €5 million, institutions shall collect and assess:

(a) Energy Performance Certificate (EPC) rating or equivalent energy efficiency data;
(b) Physical climate risk assessment, including flood risk, heat stress, and extreme weather exposure;
(c) Where available, the borrower's TCFD-aligned climate disclosure.

§6.4(a) 'Institutions shall not originate loans to borrowers with documented and material violations of applicable environmental or social standards, including violations of ILO core labour standards, until the institution has assessed and documented the remediation steps being taken by the borrower and determined that the residual risk is acceptable within the institution's ESG risk appetite.'

§6.6 Institutions shall review and update ESG risk integration policies at least annually, or following any material change to the regulatory or physical climate environment.`,
  },
  {
    id: 'reg-023',
    title: 'MiFID III Delegated Regulation — Algorithmic Trading Transparency',
    regulator: 'ESMA',
    jurisdiction: 'EU',
    jurisdictionFlag: '🇪🇺',
    industry: 'Financial',
    effectiveDate: '2026-12-01',
    publishedDate: '2026-05-31',
    severity: 'medium',
    status: 'new',
    tags: ['MiFID', 'Algorithmic Trading', 'Market Transparency', 'HFT'],
    summary:
      'Updates algorithmic trading transparency requirements under MiFID III, requiring real-time strategy disclosure to national competent authorities and enhanced pre-trade risk controls for high-frequency trading.',
    body: `Commission Delegated Regulation (EU) 2026/2847 supplementing MiFID III
Article 17 — Algorithmic Trading Requirements

Article 4 — Pre-Trade Controls

§4.1 Investment firms engaged in algorithmic trading shall implement pre-trade controls that automatically prevent the entry of orders that would:

(a) breach any position limit applicable to the firm or its clients;
(b) exceed the firm's real-time credit or capital exposure thresholds;
(c) create or contribute to a disorderly market condition as defined by ESMA Guidelines.

§4.3 'Investment firms employing high-frequency algorithmic trading strategies shall implement kill switch functionality enabling immediate cessation of all order entry from any individual algorithm, trading desk, or the firm as a whole, operable by a senior responsible individual within 30 seconds of activation instruction. Kill switch tests shall be conducted at least quarterly and results documented.'

Article 7 — Transparency Obligations

§7.1 Investment firms shall provide to their national competent authority, on a monthly basis, a description of each algorithmic trading strategy, including: the strategy's general logic and objectives; the markets and instruments traded; the average daily order-to-trade ratio for the preceding month.

§7.2 For strategies with an order-to-trade ratio exceeding 10:1, firms shall provide enhanced disclosure including backtesting results, stress scenario analysis, and the specific circuit breaker conditions that would cause automatic strategy suspension.

§7.4 'Investment firms shall maintain documentation sufficient to explain any individual order or sequence of orders generated by an algorithm. Documentation shall be retained for 7 years and provided to the NCA within 24 hours of request.'`,
  },
  {
    id: 'reg-024',
    title: 'PIPEDA Reform Act 2026 — Consumer Consent and Transparency',
    regulator: 'OPC',
    jurisdiction: 'CA',
    jurisdictionFlag: '🇨🇦',
    industry: 'Privacy',
    effectiveDate: '2026-09-01',
    publishedDate: '2026-05-12',
    severity: 'medium',
    status: 'new',
    tags: ['PIPEDA', 'Consent', 'Privacy Rights', 'Canada'],
    summary:
      'Strengthens consent requirements under PIPEDA, introducing a right to explanation for automated decisions, mandatory data portability, and enhanced breach notification within 72 hours.',
    body: `Personal Information Protection and Electronic Documents Act — Reform Act 2026

Section 7.1 — Automated Decision-Making Transparency

7.1(1) An organization that makes an automated decision or recommendation about an individual that has legal or similarly significant effects shall, upon request, explain the automated decision to the individual, including: the logic and factors used; the weight given to each factor; and any human review that occurred.

§7.1(2) 'Where an individual contests an automated decision that adversely affects them, the organization shall provide human review of the decision by a qualified individual who has the authority to override the automated result. The individual shall be notified of the outcome of human review within 30 days of the request.'

Section 7.4 — Data Portability

§7.4(1) Individuals have the right to receive personal information that they have provided to an organization, or that has been generated as a result of their activity, in a structured, commonly used, and machine-readable format, and to have that information transmitted to another organization, where technically feasible.

§7.4(3) Organizations shall fulfill data portability requests within 30 days. The portable data shall include all personal information held about the individual except where disclosure would prejudice the privacy of third parties.

Section 10B — Breach Notification

§10B(1) 'An organization that experiences a breach of security safeguards involving personal information shall notify the Privacy Commissioner of Canada and all affected individuals within 72 hours of determining that the breach has occurred, or as soon as feasible. The notification shall describe the nature of the breach, the types of personal information involved, the number of individuals affected, and the steps taken to mitigate harm.'`,
  },
  {
    id: 'reg-025',
    title: 'WHO International Health Regulations Amendment — Digital Health Data Sharing',
    regulator: 'WHO',
    jurisdiction: 'INTL',
    jurisdictionFlag: '🌐',
    industry: 'Healthcare',
    effectiveDate: '2026-08-15',
    publishedDate: '2026-05-18',
    severity: 'low',
    status: 'new',
    tags: ['WHO', 'Digital Health', 'Pandemic Preparedness', 'Data Sharing'],
    summary:
      'Amends IHR to require member states and health entities to share digital health surveillance data with WHO within 24 hours of detecting a public health event of international concern.',
    body: `International Health Regulations (2005) — Amendment Article 44A
Digital Health Data Sharing for Public Health Emergency Preparedness

Article 44A — Obligations Regarding Digital Health Surveillance Data

1. States Parties shall develop and maintain the capacity to collect, analyze, and transmit digital health surveillance data, including genomic sequencing data, in standardized machine-readable formats compatible with the Global Health Security Data Platform.

§44A.2 'Health entities operating within the territory of States Parties, including private healthcare providers, clinical laboratories, and health information exchanges, shall upon designation by the competent authority, transmit to the competent authority, within 24 hours, digital health data indicating: (a) the detection of a pathogen with pandemic potential; (b) cluster events of unusual presentation or severity; (c) data indicating a pattern consistent with a public health event of international concern.'

§44A.3 Data transmitted under this Article shall comply with applicable national data protection laws. States Parties and health entities shall implement technical and legal safeguards including pseudonymization of individual patient data, data minimization, and purpose limitation to pandemic preparedness activities.

§44A.4 Health entities that are part of international networks or that provide services in multiple jurisdictions shall establish data sharing governance frameworks that address conflicting legal obligations, data localization requirements, and patient consent requirements across all relevant jurisdictions.

§44A.5 Member States shall designate a national focal point for digital health data sharing and shall provide WHO with emergency access to relevant datasets during declared public health emergencies of international concern.`,
  },
]

export function getRegulationById(id: string): Regulation | undefined {
  return regulations.find(r => r.id === id)
}
