export type TaskStatus = 'new' | 'in-review' | 'awaiting-human' | 'resolved'
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low'

export interface Citation {
  id: string
  ref: string
  text: string
  paragraphId: string
  confidence: number
}

export interface AIRecommendation {
  proposedEdit: {
    original: string
    revised: string
  }
  rationale: string
  matchReason: string
  triggeringClause: string
  riskIfIgnored: string
  uncertaintyFlags: string[]
  citations: Citation[]
  suggestedOwnerId: string
  deadline: string
}

export interface Task {
  id: string
  title: string
  regulationId: string
  policyId: string
  status: TaskStatus
  assignedToId: string
  deadline: string
  priority: TaskPriority
  createdAt: string
  aiRecommendation: AIRecommendation
}

export const tasks: Task[] = [
  {
    id: 'task-001',
    title: 'Lower BOV threshold from 25% to 10%',
    regulationId: 'reg-001',
    policyId: 'pol-003',
    status: 'in-review',
    assignedToId: 'user-002',
    deadline: '2026-06-20',
    priority: 'critical',
    createdAt: '2026-05-16T09:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "beneficial ownership" + "25 percent threshold" in §2.4. Vector similarity 0.97. This is the only policy in the library that explicitly governs beneficial ownership identification thresholds.',
      triggeringClause: '§2.1 — "Covered entities shall identify and verify the identity of any natural person who directly or indirectly owns 10 percent or more of the equity interests of a legal entity customer, reduced from the current threshold of 25 percent."',
      riskIfIgnored: 'Direct statutory non-compliance from July 1, 2026. Civil monetary penalties up to $10,000 per violation per day. FinCEN enforcement actions in the past 12 months have cited this exact threshold gap in 3 consent orders at peer institutions.',
      uncertaintyFlags: [
        'Retroactive application: unclear whether existing customer files require immediate re-screening or only new onboarding from the effective date',
        'Chain ownership: indirect ownership via >3-entity chains is not explicitly addressed in the guidance',
      ],
      proposedEdit: {
        original:
          'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 25% or more of the equity interests of a legal entity customer. The threshold applies to both direct and indirect ownership, including ownership through chains of entities.',
        revised:
          'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 10% or more of the equity interests of a legal entity customer, consistent with FinCEN Notice 2026-04. The threshold applies to both direct and indirect ownership, including ownership through chains of entities. Beneficial ownership information shall be updated within 24 hours of any change in ownership structure.',
      },
      rationale:
        'FinCEN Notice 2026-04 reduces the beneficial ownership identification threshold from 25% to 10% effective July 1, 2026. The current policy states a 25% threshold which will be non-compliant after the effective date. Civil monetary penalties for non-compliance can reach $10,000 per violation per day. The policy must also be updated to reflect the new 24-hour update requirement for ownership changes.',
      citations: [
        {
          id: 'cit-001-1',
          ref: '§2.1',
          text: "Covered entities shall identify and verify the identity of any natural person who directly or indirectly owns 10 percent or more of the equity interests of a legal entity customer, reduced from the current threshold of 25 percent.",
          paragraphId: 'reg-001-s2-p1',
          confidence: 0.97,
        },
        {
          id: 'cit-001-2',
          ref: '§2.3(a)',
          text: "Beneficial ownership information shall be updated within 24 hours of any change in ownership structure, or upon notification by the customer, whichever occurs first.",
          paragraphId: 'reg-001-s2-p3',
          confidence: 0.91,
        },
        {
          id: 'cit-001-3',
          ref: '§4.2(b)(iii)',
          text: "Covered entities shall establish and maintain written procedures reasonably designed to identify and verify the identity of beneficial owners of legal entity customers, and to include such ownership information in suspicious activity reports where relevant to the reported activity.",
          paragraphId: 'reg-001-s4-p2',
          confidence: 0.84,
        },
      ],
      suggestedOwnerId: 'user-002',
      deadline: '2026-06-20',
    },
  },
  {
    id: 'task-002',
    title: 'Replace SMS OTP with phishing-resistant MFA',
    regulationId: 'reg-012',
    policyId: 'pol-015',
    status: 'awaiting-human',
    assignedToId: 'user-004',
    deadline: '2026-06-25',
    priority: 'critical',
    createdAt: '2026-05-17T10:30:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "SMS-based one-time passwords", "MFA", and "privileged accounts" in §4.1. Vector similarity 0.94. Policy explicitly lists SMS OTP as an accepted MFA method — direct conflict with the amendment.',
      triggeringClause: '§500.12(b) — "Effective June 30, 2026, covered entities shall implement only phishing-resistant forms of multi-factor authentication... One-time passwords delivered via SMS, voice call, or email shall not be deemed acceptable for the purposes of this section."',
      riskIfIgnored: 'Regulatory violation from June 30, 2026 effective date. NYDFS Part 500 enforcement has resulted in consent orders and fines up to $30M at peer institutions. All remote access and privileged accounts remain explicitly non-compliant while the policy lists SMS OTP as acceptable.',
      uncertaintyFlags: [
        'TOTP authenticator app classification: NYDFS guidance does not explicitly state whether TOTP is "phishing-resistant" for non-privileged accounts — legal review recommended before relying on it',
      ],
      proposedEdit: {
        original:
          'Acceptable MFA methods include: hardware security keys (FIDO2); authenticator app-based TOTP; SMS-based one-time passwords (OTP) for standard user accounts; biometric authentication on approved mobile devices.',
        revised:
          'Acceptable MFA methods for privileged accounts and all remote access include only phishing-resistant authenticators: FIDO2-compliant hardware security keys; smart card authentication using X.509 certificates; FIDO2 passkeys. Authenticator app-based TOTP may be used for non-privileged internal application access. SMS-based one-time passwords are no longer an acceptable form of MFA for any access covered under NYDFS Part 500.',
      },
      rationale:
        'NYDFS Part 500 Amendment effective June 30, 2026 prohibits SMS-based OTP as an acceptable MFA factor for all access covered under §500.12(a), which includes all remote access and all privileged accounts. The current policy explicitly lists SMS OTP as acceptable for standard user accounts. The policy must be updated prior to the effective date to avoid regulatory violation.',
      citations: [
        {
          id: 'cit-002-1',
          ref: '§500.12(b)',
          text: "Effective June 30, 2026, covered entities shall implement only phishing-resistant forms of multi-factor authentication for all access covered under subsection (a). One-time passwords delivered via SMS, voice call, or email shall not be deemed acceptable for the purposes of this section.",
          paragraphId: 'reg-012-s2-p1',
          confidence: 0.96,
        },
        {
          id: 'cit-002-2',
          ref: '§500.12(a)',
          text: "Each covered entity shall implement multi-factor authentication for all remote access to the covered entity's information systems and all access to privileged accounts.",
          paragraphId: 'reg-012-s1-p1',
          confidence: 0.93,
        },
        {
          id: 'cit-002-3',
          ref: '§500.12(e)',
          text: "Covered entities shall conduct annual penetration testing of MFA implementations and phishing simulation exercises targeting all personnel with access to privileged accounts, with remediation of identified weaknesses within 60 days.",
          paragraphId: 'reg-012-s5-p1',
          confidence: 0.78,
        },
      ],
      suggestedOwnerId: 'user-004',
      deadline: '2026-06-25',
    },
  },
  {
    id: 'task-003',
    title: 'Add EU AI Act human oversight documentation',
    regulationId: 'reg-002',
    policyId: 'pol-007',
    status: 'in-review',
    assignedToId: 'user-004',
    deadline: '2026-07-15',
    priority: 'high',
    createdAt: '2026-05-18T08:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "human-in-the-loop", "AI overseer", and "high-risk AI systems" in §3.2. Vector similarity 0.91. Policy covers human oversight obligations but lacks the specific competency, authority, and audit logging requirements introduced by Article 14.',
      triggeringClause: '§14.2(a) — "Deployers of high-risk AI systems shall assign human overseers who possess the necessary competence, training, and authority to understand the AI system\'s capabilities and limitations... and to override or intervene in any automated decision that may adversely affect a natural person."',
      riskIfIgnored: 'Non-compliance with EU AI Act Article 14. Fines up to €30M or 6% of global annual turnover, whichever is higher. The specific gap — override authority without management approval — is an area regulators will scrutinize in audits. Absence of 36-month audit logs creates separate evidentiary exposure.',
      uncertaintyFlags: [
        '"High-risk AI system" classification: internal credit scoring model may or may not meet the Article 6 Annex III definition — legal opinion pending from external counsel',
        '30-minute explanation deadline: feasibility for real-time automated decisions at scale requires operational review before committing to this SLA in policy',
      ],
      proposedEdit: {
        original:
          'High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers. The responsible business unit shall designate qualified AI overseers who receive training on the system\'s capabilities and limitations.',
        revised:
          "High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers. The responsible business unit shall designate qualified AI overseers who: (a) have received documented training on the system's capabilities, limitations, and failure modes; (b) are empowered to override, disregard, or reverse any automated output without management approval; (c) are trained to recognize and mitigate automation bias. Overseers shall receive meaningful, plain-language explanations of each automated decision within 30 minutes of generation. Audit logs shall capture the overseer identity, any override decision, the rationale, and shall be retained for 36 months.",
      },
      rationale:
        'EU AI Act Article 14 Amendment establishes specific obligations for human overseers of high-risk AI systems, including competency requirements, override authority, and audit logging. The current policy refers broadly to "qualified AI overseers" but does not address the specific rights and obligations established by Article 14, particularly the requirement for override authority without management approval and the 30-minute explanation deadline.',
      citations: [
        {
          id: 'cit-003-1',
          ref: '§14.2(a)',
          text: "Deployers of high-risk AI systems shall assign human overseers who possess the necessary competence, training, and authority to understand the AI system's capabilities and limitations, to properly interpret its output, and to override or intervene in any automated decision that may adversely affect a natural person.",
          paragraphId: 'reg-002-s2-p1',
          confidence: 0.93,
        },
        {
          id: 'cit-003-2',
          ref: '§14.3(d)',
          text: "Human overseers shall be able to decide, in any particular situation, not to use the high-risk AI system or otherwise disregard, override or reverse the output of the high-risk AI system.",
          paragraphId: 'reg-002-s3-p4',
          confidence: 0.89,
        },
        {
          id: 'cit-003-3',
          ref: '§14.5',
          text: "Audit logs shall capture the identity of the human overseer, the time and content of any override decision, and the basis for that decision. Logs shall be retained for a minimum of 36 months.",
          paragraphId: 'reg-002-s5-p1',
          confidence: 0.82,
        },
      ],
      suggestedOwnerId: 'user-004',
      deadline: '2026-07-15',
    },
  },
  {
    id: 'task-004',
    title: 'Reduce data access response SLA from 48h to 24h',
    regulationId: 'reg-003',
    policyId: 'pol-006',
    status: 'in-review',
    assignedToId: 'user-004',
    deadline: '2026-08-15',
    priority: 'high',
    createdAt: '2026-05-18T11:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "48 hours", "third-party provider", and "data access" in §3.1. Vector similarity 0.88. Policy is the only document governing TPP data fulfillment SLAs. The 48-hour figure is a direct, quantifiable conflict.',
      triggeringClause: '§1002.3(b) — "A covered entity shall make covered data available to a consumer or an authorized third party upon request, in a standardized machine-readable format, no later than 24 hours following authentication of the request."',
      riskIfIgnored: 'Direct SLA violation from the rule\'s effective date. CFPB has signaled active enforcement of open banking data access obligations, with supervisory exams expected Q3 2026. Every fulfillment that takes 25–48 hours constitutes a separate violation.',
      uncertaintyFlags: [
        '"Standardized machine-readable format": CFPB has not yet published the technical specification; compliance may require a format revision post-publication',
        '5-year log retention conflicts with the existing 3-year data retention policy — the two policies require reconciliation before this change can be finalized',
      ],
      proposedEdit: {
        original:
          'Third-party provider requests for customer financial data shall be fulfilled within 48 hours of a valid, authenticated request. Requests shall be logged with the identity of the requesting TPP, the scope of data requested, and the timestamp.',
        revised:
          'Third-party provider requests for customer financial data shall be fulfilled within 24 hours of a valid, authenticated request, in a standardized machine-readable format, consistent with CFPB Rule 2026-03. Requests shall be logged with the identity of the requesting TPP, the scope of data requested, the timestamp, and any errors encountered. Logs shall be retained for 5 years. Data accuracy shall be verified as of the most recent business day; any identified inaccuracies shall be corrected within 3 business days of notification.',
      },
      rationale:
        'CFPB Rule 2026-03 §1002.3(b) requires covered data to be made available within 24 hours of authentication. The current policy allows 48 hours, creating a direct compliance gap. The rule also mandates data to be provided in a standardized machine-readable format and requires 5-year log retention, neither of which are addressed in the current policy.',
      citations: [
        {
          id: 'cit-004-1',
          ref: '§1002.3(b)',
          text: "A covered entity shall make covered data available to a consumer or an authorized third party upon request, in a standardized machine-readable format, no later than 24 hours following authentication of the request.",
          paragraphId: 'reg-003-s1-p2',
          confidence: 0.95,
        },
        {
          id: 'cit-004-2',
          ref: '§1002.5',
          text: "Covered entities shall ensure that covered data provided is accurate and complete as of the most recent business day prior to the request, and shall correct any identified inaccuracies within 3 business days of notification.",
          paragraphId: 'reg-003-s5-p1',
          confidence: 0.80,
        },
        {
          id: 'cit-004-3',
          ref: '§1002.7(a)',
          text: "Covered entities shall maintain detailed logs of all data access requests, including the identity of the requestor, the scope of data requested, the time of access, and any errors encountered. Logs shall be retained for 5 years.",
          paragraphId: 'reg-003-s6-p1',
          confidence: 0.76,
        },
      ],
      suggestedOwnerId: 'user-004',
      deadline: '2026-08-15',
    },
  },
  {
    id: 'task-005',
    title: 'Add DORA major incident initial notification procedure',
    regulationId: 'reg-010',
    policyId: 'pol-004',
    status: 'in-review',
    assignedToId: 'user-004',
    deadline: '2026-07-30',
    priority: 'high',
    createdAt: '2026-05-19T09:15:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "regulatory reporting", "critical incident", and "CISO notification" in §2.3. Vector similarity 0.86. Policy references a Regulatory Reporting Schedule but contains no DORA-specific timelines, making the gap structural rather than numerical.',
      triggeringClause: '§6.1 — "Upon classification of an ICT-related incident as major, a financial entity shall submit an initial notification to its competent authority within 4 hours of classification."',
      riskIfIgnored: 'DORA non-compliance for EU operations from its effective date. ECB and national competent authorities have identified incident reporting as a top supervisory priority for 2026. A late or missing initial notification can trigger a supervisory investigation independent of the severity of the underlying incident.',
      uncertaintyFlags: [
        '"Major incident" classification: the 4-hour service unavailability threshold may be ambiguous for degraded-but-not-fully-down scenarios — a classification decision tree is needed',
        'Competent authority routing: which NCA receives the notification for incidents affecting cross-border operations is not specified in the ITS',
      ],
      proposedEdit: {
        original:
          'Critical incidents shall be reported to the Chief Information Security Officer within 30 minutes of detection. Regulatory reporting timelines vary by jurisdiction and shall be documented in the Regulatory Reporting Schedule maintained by the Compliance team.',
        revised:
          'Critical cybersecurity incidents shall be reported to the Chief Information Security Officer within 15 minutes of detection. For incidents classified as major under DORA Article 5 criteria (service unavailability exceeding 4 hours or unauthorized access to data of 500+ clients), an initial notification shall be submitted to the relevant competent authority within 4 hours of classification. An intermediate report shall be submitted within 72 hours of the initial notification. A final report shall follow within 30 days of incident closure. Automated monitoring of all critical ICT systems shall be maintained with alerting thresholds calibrated to detect deviations within 15 minutes.',
      },
      rationale:
        'DORA ITS 2026-07 establishes mandatory classification criteria and reporting timelines for major ICT-related incidents. The current policy references a separate "Regulatory Reporting Schedule" without specifying the 4-hour initial notification and 72-hour intermediate report deadlines mandated by DORA. In the EU, non-compliance with incident reporting deadlines carries significant supervisory risk.',
      citations: [
        {
          id: 'cit-005-1',
          ref: '§5.1(a)',
          text: "The incident results in unavailability of a critical service or a significant degradation in the quality of services provided to clients for a duration exceeding 4 continuous hours.",
          paragraphId: 'reg-010-s1-p1',
          confidence: 0.91,
        },
        {
          id: 'cit-005-2',
          ref: '§6.1',
          text: "Upon classification of an ICT-related incident as major, a financial entity shall submit an initial notification to its competent authority within 4 hours of classification.",
          paragraphId: 'reg-010-s2-p1',
          confidence: 0.94,
        },
        {
          id: 'cit-005-3',
          ref: '§5.2',
          text: "Financial entities shall implement continuous automated monitoring of all ICT systems classified as critical or important function systems, with alerting thresholds calibrated to detect deviations from normal operational parameters within 15 minutes.",
          paragraphId: 'reg-010-s1-p4',
          confidence: 0.79,
        },
      ],
      suggestedOwnerId: 'user-004',
      deadline: '2026-07-30',
    },
  },
  {
    id: 'task-006',
    title: 'Add biometric data DPIA requirement to retention policy',
    regulationId: 'reg-009',
    policyId: 'pol-001',
    status: 'in-review',
    assignedToId: 'user-003',
    deadline: '2026-06-25',
    priority: 'high',
    createdAt: '2026-05-20T14:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "biometric authentication", "retention", and "customer relationship termination" in §5.1. Vector similarity 0.89. Policy governs biometric data retention but is entirely silent on DPIA obligations and the prohibition on legitimate interest as a lawful basis.',
      triggeringClause: '§3.1 — "Controllers that process biometric data for identification purposes are required to carry out a DPIA under Article 35 GDPR prior to commencing processing. This obligation applies to all existing deployments that have not previously completed a DPIA."',
      riskIfIgnored: 'GDPR Article 83(4) penalties: up to €10M or 2% of global annual turnover for DPIA failures. The retroactive DPIA requirement means existing biometric deployments are currently non-compliant if no prior DPIA was conducted. DPA audit of biometric processing is an active enforcement priority in 3 EU member states.',
      uncertaintyFlags: [
        'Existing DPIA status: DPO review required to determine whether prior privacy assessments qualify as Article 35 DPIAs or require full re-assessment',
        'Legitimate interest removal: transition timeline and customer communication obligations for withdrawing an existing legal basis are not specified in the guidelines',
      ],
      proposedEdit: {
        original:
          'Biometric authentication records shall be retained for the duration of the customer relationship and deleted within 30 days of relationship termination.',
        revised:
          'Biometric authentication records shall be retained for the duration of the customer relationship and deleted within 30 days of relationship termination. Prior to any new deployment of biometric identification systems, a Data Protection Impact Assessment (DPIA) must be completed under Article 35 GDPR. The DPIA must assess necessity, proportionality, and mitigation measures. Explicit consent must be obtained separately for biometric processing; legitimate interest shall not be relied upon as a legal basis. Biometric templates shall not be repurposed for model training, analytics, or law enforcement cooperation without a separate legal basis.',
      },
      rationale:
        'EDPB Guidelines 2026/03 establish that (a) biometric data cannot rely on legitimate interest as a lawful basis and requires explicit consent; (b) a DPIA is mandatory prior to biometric processing deployments and for existing deployments without a prior DPIA; (c) biometric templates must be protected from repurposing. The current policy addresses retention but does not address legal basis, DPIA obligations, or template repurposing prohibition.',
      citations: [
        {
          id: 'cit-006-1',
          ref: '§2.3',
          text: "The use of biometric systems for the purpose of unique identification of natural persons shall require explicit consent under Article 9(2)(a) GDPR. Legitimate interest under Article 6(1)(f) GDPR shall not serve as an independent lawful basis for processing biometric data.",
          paragraphId: 'reg-009-s2-p2',
          confidence: 0.88,
        },
        {
          id: 'cit-006-2',
          ref: '§3.1',
          text: "Controllers that process biometric data for identification purposes are required to carry out a Data Protection Impact Assessment (DPIA) under Article 35 GDPR prior to commencing processing. This obligation applies to all existing deployments that have not previously completed a DPIA.",
          paragraphId: 'reg-009-s3-p1',
          confidence: 0.93,
        },
        {
          id: 'cit-006-3',
          ref: '§4.2',
          text: "Controllers shall implement technical measures to prevent the repurposing of biometric templates for secondary uses, including model training, population analytics, or law enforcement cooperation, without a separate, specific legal basis.",
          paragraphId: 'reg-009-s4-p2',
          confidence: 0.81,
        },
      ],
      suggestedOwnerId: 'user-003',
      deadline: '2026-06-25',
    },
  },
  {
    id: 'task-007',
    title: 'Expand climate disclosure to include Scope 3 attestation',
    regulationId: 'reg-004',
    policyId: 'pol-009',
    status: 'awaiting-human',
    assignedToId: 'user-006',
    deadline: '2026-08-01',
    priority: 'medium',
    createdAt: '2026-05-15T13:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "Scope 3 emissions", "best-efforts basis", and "materiality assessment" in §4.2. Vector similarity 0.85. Policy is the governing document for GHG emissions disclosures and directly uses "best-efforts" language that conflicts with the new attestation mandate.',
      triggeringClause: '§1500.3(b)(ii) — "GHG emissions disclosures required by this item shall be subject to attestation by an independent third party, at the limited assurance level for fiscal years ending on or after December 15, 2026."',
      riskIfIgnored: 'SEC enforcement action for materially misleading disclosures if Scope 3 data is published without required attestation in the next annual filing. Large accelerated filer status means this applies immediately to the December 2026 fiscal year-end. External auditors may issue a qualified opinion.',
      uncertaintyFlags: [
        'Materiality threshold: SEC has not issued bright-line numerical guidance on what percentage of total emissions triggers Scope 3 materiality',
        'Attestation provider independence: whether existing auditors can perform limited assurance or a separate specialist firm is required is subject to pending SEC staff guidance',
      ],
      proposedEdit: {
        original:
          'Scope 3 emissions shall be reported on a best-efforts basis where material to the Company\'s overall emissions profile. A Scope 3 materiality assessment shall be conducted annually and the results shall be disclosed alongside Scope 3 data.',
        revised:
          "Scope 3 GHG emissions shall be reported where material or where the Company has set a GHG emissions target that includes Scope 3 emissions, consistent with SEC Release No. 34-2026-18. A Scope 3 materiality assessment shall be conducted annually. Where Scope 3 emissions are disclosed, the disclosure shall be subject to independent third-party attestation at the limited assurance level for fiscal years ending on or after December 15, 2026. GHG emissions disclosures shall be separately disclosed in the financial statements where climate-related expenditures exceed 1% of the relevant line item.",
      },
      rationale:
        'SEC Release No. 34-2026-18 mandates third-party attestation for GHG emissions disclosures and requires Scope 3 reporting where material or where GHG targets include Scope 3. The current policy treats Scope 3 as best-efforts and does not address the attestation requirement. Large accelerated filers must obtain limited assurance for fiscal years ending after December 15, 2026.',
      citations: [
        {
          id: 'cit-007-1',
          ref: '§1500.3(b)(ii)',
          text: "GHG emissions disclosures required by this item shall be subject to attestation by an independent third party, at the limited assurance level for fiscal years ending on or after December 15, 2026.",
          paragraphId: 'reg-004-s3-p2',
          confidence: 0.90,
        },
        {
          id: 'cit-007-2',
          ref: '§1500.3(d)',
          text: "For large accelerated filers, Scope 3 GHG emissions shall be disclosed if material or if the registrant has set a GHG emissions target that includes Scope 3 emissions.",
          paragraphId: 'reg-004-s3-p1',
          confidence: 0.87,
        },
        {
          id: 'cit-007-3',
          ref: '§1500.4',
          text: "A registrant shall separately disclose expenditures expensed and capitalized amounts related to climate-related activities in the financial statements where the total of such amounts exceeds 1% of the relevant line item.",
          paragraphId: 'reg-004-s4-p1',
          confidence: 0.79,
        },
      ],
      suggestedOwnerId: 'user-006',
      deadline: '2026-08-01',
    },
  },
  {
    id: 'task-008',
    title: 'Update consent management for automated decision disclosure',
    regulationId: 'reg-024',
    policyId: 'pol-012',
    status: 'in-review',
    assignedToId: 'user-003',
    deadline: '2026-08-01',
    priority: 'medium',
    createdAt: '2026-05-20T10:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "automated processing", "45 days", and "human review" in §2.1. Vector similarity 0.87. Policy directly governs automated decision disclosures and the 45-day human review timeline is a quantifiable conflict with the new 30-day statutory requirement.',
      triggeringClause: '§7.1(2) — "Where an individual contests an automated decision, the organization shall provide human review by a qualified individual with the authority to override the automated result. The individual shall be notified within 30 days."',
      riskIfIgnored: 'OPC enforcement action and civil penalty under PIPEDA Reform Act. The 45-day vs. 30-day gap is an explicit, measurable statutory violation. Customer-facing rights violations carry compounding reputational and regulatory risk, particularly for credit and insurance decisions.',
      uncertaintyFlags: [
        '"Significantly on automated processing" scope: how much human involvement in a decision removes the disclosure obligation is not defined in the legislation — legal opinion required',
        'Factor weighting disclosure: technical feasibility for complex ML models is unresolved; approximate or simplified disclosure may be permissible but needs legal confirmation',
      ],
      proposedEdit: {
        original:
          'Where the Company makes decisions about individuals based solely on automated processing, the privacy notice shall disclose the existence of such processing and the individual\'s right to request human review. Requests for human review shall be fulfilled within 45 days.',
        revised:
          "Where the Company makes decisions about individuals based solely or significantly on automated processing, the privacy notice shall disclose the existence of such processing, the logic involved, the weight given to each factor, and the individual's right to request a meaningful explanation and human review of adverse automated decisions. Requests for human review shall be fulfilled within 30 days by a qualified individual with authority to override the automated result. The individual shall be notified of the outcome within 30 days of the human review request.",
      },
      rationale:
        "PIPEDA Reform Act 2026 §7.1 requires disclosure of the logic and weighting factors used in automated decisions and mandates a 30-day response timeline for human review requests. The current policy's 45-day timeline exceeds the new statutory requirement and the policy does not address explanation of logic or factor weighting.",
      citations: [
        {
          id: 'cit-008-1',
          ref: '§7.1(1)',
          text: "An organization that makes an automated decision or recommendation about an individual shall, upon request, explain the automated decision to the individual, including the logic and factors used and the weight given to each factor.",
          paragraphId: 'reg-024-s1-p1',
          confidence: 0.91,
        },
        {
          id: 'cit-008-2',
          ref: '§7.1(2)',
          text: "Where an individual contests an automated decision, the organization shall provide human review by a qualified individual with the authority to override the automated result. The individual shall be notified within 30 days.",
          paragraphId: 'reg-024-s1-p2',
          confidence: 0.88,
        },
      ],
      suggestedOwnerId: 'user-003',
      deadline: '2026-08-01',
    },
  },
  {
    id: 'task-009',
    title: 'Introduce data portability fulfillment procedure',
    regulationId: 'reg-024',
    policyId: 'pol-012',
    status: 'resolved',
    assignedToId: 'user-003',
    deadline: '2026-07-01',
    priority: 'medium',
    createdAt: '2026-05-10T09:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "data portability", "machine-readable format", and "personal information provided" in §6.3. Vector similarity 0.92. Policy describes the right but lacks the third-party transmission right and any fulfillment timeline.',
      triggeringClause: '§7.4(1) — "Individuals have the right to receive personal information in a structured, commonly used, and machine-readable format, and to have that information transmitted to another organization, where technically feasible."',
      riskIfIgnored: 'OPC enforcement action. Data portability rights are a key consumer protection area under PIPEDA Reform. Failure to fulfill portability requests within 30 days creates measurable liability and is easily evidenced by complainants.',
      uncertaintyFlags: [
        '"Technically feasible" carve-out: criteria for invoking this exemption are not defined in the legislation — legal guidance needed before relying on it to deny requests',
      ],
      proposedEdit: {
        original:
          'Individuals have the right to receive personal information that they have provided to an organization, or that has been generated as a result of their activity, in a structured, commonly used, and machine-readable format.',
        revised:
          'Individuals have the right to receive personal information that they have provided to an organization, or that has been generated as a result of their activity, in a structured, commonly used, and machine-readable format, and to have that information transmitted to another organization where technically feasible. Data portability requests shall be fulfilled within 30 days. The portable data shall include all personal information held about the individual except where disclosure would prejudice the privacy of third parties.',
      },
      rationale:
        'PIPEDA Reform Act 2026 §7.4 introduces a right to data portability including third-party transmission and a 30-day fulfillment deadline. The current policy does not address the third-party transmission right or specify any fulfillment timeline.',
      citations: [
        {
          id: 'cit-009-1',
          ref: '§7.4(1)',
          text: "Individuals have the right to receive personal information in a structured, commonly used, and machine-readable format, and to have that information transmitted to another organization, where technically feasible.",
          paragraphId: 'reg-024-s2-p1',
          confidence: 0.92,
        },
        {
          id: 'cit-009-2',
          ref: '§7.4(3)',
          text: "Organizations shall fulfill data portability requests within 30 days.",
          paragraphId: 'reg-024-s2-p3',
          confidence: 0.85,
        },
      ],
      suggestedOwnerId: 'user-003',
      deadline: '2026-07-01',
    },
  },
  {
    id: 'task-010',
    title: 'Add FCA vulnerable customer quarterly monitoring',
    regulationId: 'reg-006',
    policyId: 'pol-010',
    status: 'in-review',
    assignedToId: 'user-005',
    deadline: '2026-07-10',
    priority: 'high',
    createdAt: '2026-05-17T15:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "vulnerable customer", "specialist training", and "complaint handler" in §3.4. Vector similarity 0.90. Policy covers individual complaint handling for vulnerable customers but entirely lacks systematic outcome monitoring, which is the core new obligation.',
      triggeringClause: '§3.5(b)(ii) — "Firms shall monitor, on at least a quarterly basis, the outcomes experienced by customers with vulnerability characteristics compared to the general customer population, and shall escalate material differences to senior management within 30 days of identification."',
      riskIfIgnored: 'FCA Consumer Duty enforcement, including potential requirement to remediate customers who received worse outcomes. FCA has explicitly stated that vulnerable customer outcome monitoring is a supervisory priority for all 2026 attestation cycles. Board attestation that good outcomes are being delivered cannot be made without this monitoring.',
      uncertaintyFlags: [
        '"Material difference" definition: FCA has not published numerical thresholds for what constitutes a material outcome gap — firms must define their own thresholds and document the rationale',
        'Vulnerability identification: the current policy relies on customer self-disclosure; FCA guidance implies a proactive identification obligation using data signals',
      ],
      proposedEdit: {
        original:
          'Where a complaint is received from a customer who has disclosed or exhibited characteristics of vulnerability, the complaint shall be prioritized and assigned to a senior complaints handler with specialist training in vulnerable customer support.',
        revised:
          "Where a complaint is received from a customer who has disclosed or exhibited characteristics of vulnerability, the complaint shall be prioritized and assigned to a senior complaints handler with specialist training in vulnerable customer support. The Company shall monitor, on at least a quarterly basis, the outcomes experienced by customers with vulnerability characteristics compared to the general customer population. Material differences in outcomes shall be escalated to senior management for review and remediation within 30 days of identification. The Board shall receive an annual Consumer Duty outcomes report attesting that good outcomes are being delivered to all retail customers, including those with vulnerability characteristics.",
      },
      rationale:
        'FCA PS26/1 §3.5(b)(ii) mandates quarterly monitoring of outcomes for customers with vulnerability characteristics against the general population, with a 30-day escalation window for material differences. §3.2 requires board-level attestation in an annual outcomes report. The current policy addresses individual complaint handling for vulnerable customers but does not establish systematic outcome monitoring or board-level reporting.',
      citations: [
        {
          id: 'cit-010-1',
          ref: '§3.5(b)(ii)',
          text: "Firms shall monitor, on at least a quarterly basis, the outcomes experienced by customers with vulnerability characteristics compared to the general customer population, and shall escalate material differences to senior management within 30 days of identification.",
          paragraphId: 'reg-006-s3-p2',
          confidence: 0.92,
        },
        {
          id: 'cit-010-2',
          ref: '§3.2',
          text: "The board must approve the annual Consumer Duty outcomes report and attest that it has satisfied itself that the firm is delivering good outcomes for retail customers in line with the Consumer Duty.",
          paragraphId: 'reg-006-s1-p2',
          confidence: 0.86,
        },
      ],
      suggestedOwnerId: 'user-005',
      deadline: '2026-07-10',
    },
  },
  {
    id: 'task-011',
    title: 'Add travel rule compliance for DPT transfers above SGD 1,500',
    regulationId: 'reg-008',
    policyId: 'pol-002',
    status: 'resolved',
    assignedToId: 'user-002',
    deadline: '2026-07-20',
    priority: 'high',
    createdAt: '2026-05-12T09:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "transaction monitoring", "AML", and "five business days" in §2.2. Vector similarity 0.83. Policy governs AML monitoring SLAs but is entirely silent on DPT-specific Travel Rule obligations, representing a structural gap rather than a parameter change.',
      triggeringClause: '§3.2(a) — "For DPT transfers of SGD 1,500 or above, a DPT service provider shall collect and transmit, without delay, originator information including full legal name, account/wallet address, and identification information to the beneficiary institution."',
      riskIfIgnored: 'MAS regulatory breach for digital asset AML obligations. MAS has issued formal warnings to multiple DPT service providers for Travel Rule non-compliance in 2025. Continued non-compliance risks license conditions or suspension.',
      uncertaintyFlags: [
        'Unhosted wallet enhanced due diligence: the SGD 5,000 threshold for unhosted wallets may require blockchain analytics tooling not currently deployed',
      ],
      proposedEdit: {
        original:
          'Transaction monitoring alerts shall be reviewed within five (5) business days of generation.',
        revised:
          'Transaction monitoring alerts shall be reviewed within five (5) business days of generation. For Digital Payment Token (DPT) transfers of SGD 1,500 or above, the Company shall collect and transmit without delay the originator\'s full legal name, account/wallet address, and identification information to the beneficiary institution. Sanctions screening for inbound DPT transfers shall be completed within 5 minutes of receiving transfer information. Transfers from unhosted wallets exceeding SGD 5,000 shall be subject to enhanced due diligence. STRs related to DPT activity shall be submitted within 1 business day of forming a suspicion.',
      },
      rationale:
        'MAS Notice 626 Amendment extends AML/CFT Travel Rule obligations to DPT transfers at the SGD 1,500 threshold. The current AML monitoring SOP does not address digital asset transactions. Non-compliance with the Travel Rule is a significant AML regulatory risk in Singapore.',
      citations: [
        {
          id: 'cit-011-1',
          ref: '§3.2(a)',
          text: "For DPT transfers of SGD 1,500 or above, a DPT service provider shall collect and transmit, without delay, originator information to the beneficiary institution.",
          paragraphId: 'reg-008-s2-p1',
          confidence: 0.89,
        },
        {
          id: 'cit-011-2',
          ref: '§3.2(b)',
          text: "The beneficiary DPT service provider shall complete sanctions screening within 5 minutes of receiving transfer information.",
          paragraphId: 'reg-008-s2-p2',
          confidence: 0.85,
        },
      ],
      suggestedOwnerId: 'user-002',
      deadline: '2026-07-20',
    },
  },
  {
    id: 'task-012',
    title: 'Add operational resilience scenario testing for DORA',
    regulationId: 'reg-016',
    policyId: 'pol-013',
    status: 'in-review',
    assignedToId: 'user-001',
    deadline: '2026-10-15',
    priority: 'medium',
    createdAt: '2026-05-26T09:00:00Z',
    aiRecommendation: {
      matchReason: 'Matched on "scenario testing", "third-party provider outage", and "lessons learned" in §4.1. Vector similarity 0.88. Policy lists scenario types but lacks the minimum duration, simultaneous failure scenarios, and board review requirements introduced by PRA CP5/26.',
      triggeringClause: '§4.2 — "Firms shall conduct scenario testing exercises simulating: extended outage of a critical third-party provider (minimum 10 business days); simultaneous failure of two critical systems or processes; coordinated cyber attack; and loss of more than 50% of key personnel."',
      riskIfIgnored: 'PRA supervisory finding in the next SREP cycle. Operational resilience was cited in 40% of PRA assessments in 2025. The missing 10-business-day third-party outage simulation is a specific, verifiable gap that examiners will test for.',
      uncertaintyFlags: [
        'Board review evidence: what constitutes adequate "evidence of board review" for PRA regulatory purposes is not specified in CP5/26 — a board minute template may be needed',
        '10 business days simulation: implementing a third-party outage simulation of this duration without disrupting production operations requires separate operational and legal review',
      ],
      proposedEdit: {
        original:
          'Scenario testing exercises shall be conducted annually covering: major technology failure; third-party provider outage; data centre loss; and cybersecurity event. Lessons learned from testing exercises shall be incorporated into the Framework within 60 days.',
        revised:
          'Scenario testing exercises shall be conducted at least annually covering: (a) extended outage of a critical third-party provider (minimum 10 business days simulation); (b) simultaneous failure of two critical systems or processes; (c) coordinated cyber attack affecting core transaction processing and customer data systems simultaneously; (d) loss of more than 50% of key personnel. The board of directors shall directly review scenario testing results and approve remediation actions. Evidence of board review shall be retained and provided to regulators upon request. Lessons learned shall be incorporated within 90 days of exercise completion.',
      },
      rationale:
        'PRA CP5/26 and DORA both specify minimum scenario types for operational resilience testing that are more prescriptive than the current framework. The current policy does not specify the minimum duration for third-party outage scenarios (10 business days) and does not address the simultaneous failure scenario or the 50% personnel loss scenario. Both frameworks also require direct board involvement in reviewing results.',
      citations: [
        {
          id: 'cit-012-1',
          ref: '§4.2',
          text: "Firms shall conduct scenario testing exercises simulating: extended outage of a critical third-party provider (minimum 10 business days); simultaneous failure of two critical systems; coordinated cyber attack; and loss of more than 50% of key personnel.",
          paragraphId: 'reg-016-s4-p1',
          confidence: 0.87,
        },
        {
          id: 'cit-012-2',
          ref: '§4.3(a)',
          text: "Scenario testing shall be conducted at least annually, with the board of directors directly reviewing results and approving remediation actions. Evidence of board review shall be retained and made available to the PRA on request.",
          paragraphId: 'reg-016-s4-p2',
          confidence: 0.91,
        },
        {
          id: 'cit-012-3',
          ref: '§4.4',
          text: "Firms shall document lessons learned from each testing exercise and update their operational resilience frameworks to address identified weaknesses within 90 days of completing the exercise.",
          paragraphId: 'reg-016-s4-p3',
          confidence: 0.83,
        },
      ],
      suggestedOwnerId: 'user-001',
      deadline: '2026-10-15',
    },
  },
]

export function getTaskById(id: string): Task | undefined {
  return tasks.find(t => t.id === id)
}
