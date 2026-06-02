export interface TrainingModule {
  module: string
  duration: string
  deadline: string
  mandatory: boolean
  format: string
  targetAudience: string
}

export interface ActionItem {
  id: string
  action: string
  owner: string
  deadline: string
  category: 'training' | 'process' | 'system' | 'acknowledgment' | 'communication'
}

export interface CommsPlan {
  type: string
  channel: string
  deadline: string
  owner: string
  audience: string
  description: string
}

export interface DepartmentImpact {
  name: string
  headcount: number
  impact: 'high' | 'medium' | 'low'
  description: string
}

export interface PeopleImpact {
  regulationId: string
  totalHeadcount: number
  departments: DepartmentImpact[]
  training: TrainingModule[]
  actionChecklist: ActionItem[]
  communications: CommsPlan[]
  keyChanges: string[]
}

export const peopleImpacts: PeopleImpact[] = [
  {
    regulationId: 'reg-001',
    totalHeadcount: 310,
    departments: [
      { name: 'AML & Financial Crime', headcount: 45, impact: 'high', description: 'Must re-train on new 10% threshold and update all active CDD files' },
      { name: 'Operations / Client Onboarding', headcount: 120, impact: 'high', description: 'Onboarding workflows and system parameters require immediate update' },
      { name: 'Relationship Management', headcount: 85, impact: 'medium', description: 'Must obtain updated beneficial ownership certifications from existing clients' },
      { name: 'Technology (CDD Systems)', headcount: 35, impact: 'medium', description: 'System threshold configuration and alert tuning' },
      { name: 'Legal', headcount: 25, impact: 'low', description: 'Review and update client agreement templates' },
    ],
    training: [
      {
        module: 'BSA/AML Threshold Update: FinCEN Notice 2026-04',
        duration: '2 hours',
        deadline: '2026-06-20',
        mandatory: true,
        format: 'E-learning + assessment',
        targetAudience: 'All compliance and operations staff',
      },
      {
        module: 'Beneficial Ownership Certification Refresh',
        duration: '45 minutes',
        deadline: '2026-06-25',
        mandatory: true,
        format: 'E-learning',
        targetAudience: 'Relationship managers and client service',
      },
      {
        module: 'Trust Structure Identification Under 10% Threshold',
        duration: '1 hour',
        deadline: '2026-07-01',
        mandatory: true,
        format: 'Instructor-led webinar',
        targetAudience: 'AML analysts and senior compliance officers',
      },
    ],
    actionChecklist: [
      { id: 'a1', action: 'Update CDD system threshold parameter from 25% to 10% in all jurisdictions', owner: 'Technology (James O\'Brien)', deadline: '2026-06-15', category: 'system' },
      { id: 'a2', action: 'Revise onboarding workflow documentation and staff quick-reference cards', owner: 'Operations Lead', deadline: '2026-06-18', category: 'process' },
      { id: 'a3', action: 'Complete BSA/AML threshold e-learning and pass assessment (score ≥80%)', owner: 'All compliance staff', deadline: '2026-06-20', category: 'training' },
      { id: 'a4', action: 'Identify and contact all existing legal entity clients for updated certifications', owner: 'Relationship Management', deadline: '2026-07-01', category: 'process' },
      { id: 'a5', action: 'Sign acknowledgment of updated Beneficial Ownership Verification Procedure', owner: 'All affected staff', deadline: '2026-06-25', category: 'acknowledgment' },
      { id: 'a6', action: 'Verify all monitoring rule thresholds are recalibrated for 10% threshold', owner: 'AML team (Marcus Webb)', deadline: '2026-06-28', category: 'system' },
      { id: 'a7', action: 'Attend trust structure identification webinar', owner: 'AML analysts', deadline: '2026-07-01', category: 'training' },
    ],
    communications: [
      { type: 'Policy change announcement', channel: 'All-staff email', deadline: '2026-06-05', owner: 'Sarah Chen (CCO)', audience: 'All employees', description: 'Initial announcement of FinCEN threshold change and effective date' },
      { type: 'Department briefing', channel: 'Team meeting (60 min)', deadline: '2026-06-07', owner: 'Marcus Webb', audience: 'AML & Compliance teams', description: 'Detailed walkthrough of new requirements, Q&A session' },
      { type: 'Client communication', channel: 'Client letters + email', deadline: '2026-06-15', owner: 'Relationship Management', audience: 'All legal entity clients', description: 'Requesting updated beneficial ownership certifications' },
      { type: 'Training completion reminder', channel: 'Automated LMS notification', deadline: '2026-06-17', owner: 'HR / Learning & Development', audience: 'All compliance staff', description: 'Reminder 3 days before training deadline' },
      { type: 'Manager cascade briefing', channel: 'Manager meeting', deadline: '2026-06-10', owner: 'Sarah Chen', audience: 'All team managers', description: 'Briefing for managers to cascade to their teams' },
    ],
    keyChanges: [
      'The beneficial ownership identification threshold drops from 25% to 10% — any customer who owns 10% or more of a legal entity must now be identified and verified',
      'Ownership records must be updated within 24 hours of any change — the previous 30-day notification window is gone',
      'For trust structures: trustees, beneficiaries with 10%+ interest, and grantors with revocation power must all be identified',
      'All existing legal entity customer records must be reviewed and re-certified within 180 days of July 1, 2026',
      'Enhanced due diligence now applies to beneficial owners with 25%+ (not just those who trigger primary CDD)',
    ],
  },
  {
    regulationId: 'reg-012',
    totalHeadcount: 180,
    departments: [
      { name: 'Technology / IT Operations', headcount: 65, impact: 'high', description: 'Must deploy and manage new phishing-resistant MFA infrastructure' },
      { name: 'All employees with remote access', headcount: 95, impact: 'high', description: 'Must enroll in new MFA method before June 30 deadline' },
      { name: 'Privileged access holders', headcount: 20, impact: 'high', description: 'Priority migration to FIDO2 hardware keys by June 10' },
    ],
    training: [
      {
        module: 'Phishing-Resistant MFA: What\'s Changing and Why',
        duration: '30 minutes',
        deadline: '2026-06-20',
        mandatory: true,
        format: 'E-learning',
        targetAudience: 'All employees with system access',
      },
      {
        module: 'Hardware Security Key Setup and Use',
        duration: '1 hour',
        deadline: '2026-06-10',
        mandatory: true,
        format: 'Self-guided with IT support',
        targetAudience: 'Privileged access users (20 staff)',
      },
    ],
    actionChecklist: [
      { id: 'b1', action: 'Procure FIDO2 hardware security keys for all privileged account holders', owner: 'IT Procurement', deadline: '2026-06-05', category: 'system' },
      { id: 'b2', action: 'Migrate all privileged accounts to FIDO2 hardware keys', owner: 'IT Operations (James O\'Brien)', deadline: '2026-06-10', category: 'system' },
      { id: 'b3', action: 'Disable SMS OTP for all privileged accounts', owner: 'IT Security', deadline: '2026-06-10', category: 'system' },
      { id: 'b4', action: 'Complete phishing-resistant MFA awareness training', owner: 'All staff with remote access', deadline: '2026-06-20', category: 'training' },
      { id: 'b5', action: 'Enroll personal device in passkey or authenticator MFA (non-privileged users)', owner: 'All remote-access staff', deadline: '2026-06-25', category: 'process' },
      { id: 'b6', action: 'Disable all SMS OTP across all systems', owner: 'IT Security team', deadline: '2026-06-29', category: 'system' },
      { id: 'b7', action: 'Conduct post-migration penetration test of MFA implementation', owner: 'IT Security / External Vendor', deadline: '2026-07-15', category: 'process' },
    ],
    communications: [
      { type: 'MFA migration announcement', channel: 'All-staff email', deadline: '2026-06-03', owner: 'James O\'Brien', audience: 'All employees', description: 'Announce SMS OTP discontinuation and migration timeline' },
      { type: 'Privileged user personal briefing', channel: '1:1 or small group', deadline: '2026-06-06', owner: 'IT Security Lead', audience: '20 privileged access holders', description: 'Hands-on hardware key setup assistance' },
      { type: 'IT helpdesk support window', channel: 'Drop-in IT support sessions', deadline: '2026-06-24', owner: 'IT Helpdesk', audience: 'All staff', description: 'Dedicated sessions for MFA enrollment assistance' },
    ],
    keyChanges: [
      'SMS one-time passwords are no longer accepted for any system access after June 30, 2026 — this is a hard regulatory cutoff',
      'Privileged account holders (IT admins, DBAs, payment system users) must use FIDO2 hardware keys only',
      'Standard remote access users must use passkeys or authenticator app TOTP (not SMS)',
      'Annual phishing simulation exercises are now mandatory for all privileged account holders',
      'Quarterly PAM recertification is required — any account not recertified within the period is automatically deactivated',
    ],
  },
  {
    regulationId: 'reg-002',
    totalHeadcount: 145,
    departments: [
      { name: 'AI/ML Product Teams', headcount: 40, impact: 'high', description: 'Must implement override controls and explanation APIs for all high-risk AI systems' },
      { name: 'Data Science / Analytics', headcount: 30, impact: 'high', description: 'Model documentation and bias assessment requirements' },
      { name: 'Operations (AI-assisted decisions)', headcount: 55, impact: 'medium', description: 'Staff who review AI-assisted decisions must be trained as human overseers' },
      { name: 'Legal & Compliance', headcount: 20, impact: 'medium', description: 'Update vendor contracts for AI systems; DPA amendments' },
    ],
    training: [
      {
        module: 'EU AI Act: Human Oversight Obligations for Deployers',
        duration: '2.5 hours',
        deadline: '2026-07-20',
        mandatory: true,
        format: 'E-learning + certification',
        targetAudience: 'All designated AI human overseers',
      },
      {
        module: 'Automation Bias Awareness and Mitigation',
        duration: '1 hour',
        deadline: '2026-07-25',
        mandatory: true,
        format: 'E-learning with scenarios',
        targetAudience: 'Operations staff reviewing AI outputs',
      },
      {
        module: 'AI System Override Procedures — Practical Training',
        duration: '1.5 hours',
        deadline: '2026-07-30',
        mandatory: true,
        format: 'Instructor-led simulation',
        targetAudience: 'Designated human overseers for high-risk AI',
      },
    ],
    actionChecklist: [
      { id: 'c1', action: 'Designate human overseers for each high-risk AI system and document in AI register', owner: 'Technology Risk (James O\'Brien)', deadline: '2026-07-01', category: 'process' },
      { id: 'c2', action: 'Implement override/stop-button functionality in all high-risk AI systems', owner: 'AI/ML Engineering', deadline: '2026-07-20', category: 'system' },
      { id: 'c3', action: 'Configure automated plain-language explanation delivery within 30 minutes of each AI decision', owner: 'AI/ML Engineering', deadline: '2026-07-25', category: 'system' },
      { id: 'c4', action: 'Complete human overseer certification training', owner: 'All designated overseers', deadline: '2026-07-20', category: 'training' },
      { id: 'c5', action: 'Implement 36-month audit log retention for AI override decisions', owner: 'IT Operations', deadline: '2026-08-01', category: 'system' },
      { id: 'c6', action: 'Amend AI vendor contracts to include EU AI Act Article 14 compliance obligations', owner: 'Legal / Procurement', deadline: '2026-07-15', category: 'process' },
      { id: 'c7', action: 'Sign acknowledgment of AI overseer responsibilities and authority', owner: 'All designated overseers', deadline: '2026-07-25', category: 'acknowledgment' },
    ],
    communications: [
      { type: 'EU AI Act implementation announcement', channel: 'Company-wide email', deadline: '2026-06-15', owner: 'Sarah Chen', audience: 'All staff', description: 'High-level overview of new AI governance requirements' },
      { type: 'AI product team briefing', channel: 'Engineering all-hands', deadline: '2026-06-25', owner: 'James O\'Brien', audience: 'Tech & AI teams', description: 'Technical implementation requirements walkthrough' },
      { type: 'Overseer designation communications', channel: 'Individual email + manager copy', deadline: '2026-07-02', owner: 'Department heads', audience: 'Designated overseers', description: 'Formal notification of oversight responsibilities and training requirements' },
    ],
    keyChanges: [
      'Every high-risk AI system must have a named, trained human overseer with documented authority to override automated decisions — no management approval required for an override',
      'Automated decisions affecting customers must be accompanied by a plain-language explanation delivered within 30 minutes',
      'Overseers must be trained to recognize and actively mitigate automation bias in their reviews',
      'All override decisions and their rationale must be logged and retained for 36 months',
      'AI system vendors must provide contractual commitments to EU AI Act Article 14 compliance',
    ],
  },
  {
    regulationId: 'reg-006',
    totalHeadcount: 220,
    departments: [
      { name: 'Customer Service', headcount: 110, impact: 'high', description: 'Frontline staff must identify vulnerability characteristics and escalate appropriately' },
      { name: 'Complaints Handling', headcount: 35, impact: 'high', description: 'Enhanced vulnerable customer procedures and quarterly outcome monitoring' },
      { name: 'Product & Proposition', headcount: 45, impact: 'medium', description: 'Product design must account for vulnerable customer needs across all segments' },
      { name: 'Management Information / Data', headcount: 30, impact: 'medium', description: 'Build quarterly vulnerable customer outcome monitoring dashboards' },
    ],
    training: [
      {
        module: 'FCA Consumer Duty: Vulnerable Customer Identification',
        duration: '2 hours',
        deadline: '2026-07-15',
        mandatory: true,
        format: 'E-learning + role-play scenarios',
        targetAudience: 'All customer-facing and complaints staff',
      },
      {
        module: 'Outcome Monitoring and Escalation Procedures',
        duration: '1 hour',
        deadline: '2026-07-20',
        mandatory: true,
        format: 'E-learning',
        targetAudience: 'Team managers and supervisors',
      },
    ],
    actionChecklist: [
      { id: 'd1', action: 'Build quarterly vulnerable customer outcome monitoring dashboard', owner: 'MI / Data team', deadline: '2026-07-20', category: 'system' },
      { id: 'd2', action: 'Update complaint handling procedures to add quarterly monitoring and 30-day escalation', owner: 'Rachel Novak', deadline: '2026-07-05', category: 'process' },
      { id: 'd3', action: 'Complete vulnerable customer identification training', owner: 'All customer-facing staff', deadline: '2026-07-15', category: 'training' },
      { id: 'd4', action: 'Prepare first quarterly vulnerable customer outcomes comparison report', owner: 'Compliance / Data', deadline: '2026-08-01', category: 'process' },
      { id: 'd5', action: 'Board sign-off on Consumer Duty annual outcomes report template', owner: 'Rachel Novak / CCO', deadline: '2026-07-25', category: 'process' },
    ],
    communications: [
      { type: 'Consumer Duty update briefing', channel: 'Team meeting', deadline: '2026-06-20', owner: 'Rachel Novak', audience: 'Customer service teams', description: 'Briefing on enhanced vulnerable customer requirements' },
      { type: 'Manager toolkit distribution', channel: 'Email + intranet', deadline: '2026-07-01', owner: 'HR / Consumer Affairs', audience: 'Team managers', description: 'Tools and scripts for identifying and supporting vulnerable customers' },
    ],
    keyChanges: [
      'All customer-facing staff must proactively identify and record characteristics of vulnerability — this is no longer reactive-only when a customer discloses',
      'Vulnerable customer outcomes must be compared to the general population quarterly, with material gaps escalated to senior management within 30 days',
      'The Board must receive and approve an annual Consumer Duty outcomes report with an explicit attestation of good outcomes',
      'Products and services must be assessed for their impact on vulnerable customer segments, not just the target market as a whole',
      'Digital-first channels must offer alternative access routes where they create barriers for vulnerable customers',
    ],
  },
  {
    regulationId: 'reg-004',
    totalHeadcount: 85,
    departments: [
      { name: 'ESG & Sustainability', headcount: 15, impact: 'high', description: 'Lead GHG data collection, attestation engagement, and Scope 3 assessment' },
      { name: 'Finance / Reporting', headcount: 30, impact: 'high', description: 'Integrate climate expenditure disclosures into financial statements' },
      { name: 'Legal / Company Secretariat', headcount: 20, impact: 'medium', description: 'SEC filing compliance and timing coordination' },
      { name: 'Operations (data owners)', headcount: 20, impact: 'medium', description: 'Provide Scope 1 and 2 emissions data for attestation' },
    ],
    training: [
      {
        module: 'SEC Climate Disclosure Rules: What Finance Teams Need to Know',
        duration: '1.5 hours',
        deadline: '2026-08-01',
        mandatory: true,
        format: 'E-learning',
        targetAudience: 'Finance, Legal, ESG teams',
      },
      {
        module: 'GHG Accounting for Regulatory Disclosure',
        duration: '3 hours',
        deadline: '2026-08-15',
        mandatory: true,
        format: 'Workshop (in-person + virtual)',
        targetAudience: 'ESG team and data owners',
      },
    ],
    actionChecklist: [
      { id: 'e1', action: 'Engage third-party assurance provider for limited assurance on Scope 1 & 2 emissions', owner: 'David Kim (ESG Officer)', deadline: '2026-07-01', category: 'process' },
      { id: 'e2', action: 'Conduct Scope 3 materiality assessment and document findings', owner: 'ESG team', deadline: '2026-08-01', category: 'process' },
      { id: 'e3', action: 'Update financial reporting templates to include climate expenditure disclosure', owner: 'Finance team', deadline: '2026-08-15', category: 'system' },
      { id: 'e4', action: 'Complete GHG accounting training for all data owners', owner: 'All ESG data owners', deadline: '2026-08-15', category: 'training' },
      { id: 'e5', action: 'Board Risk Committee review of updated Climate Risk Disclosure Procedure', owner: 'David Kim / Board Sec.', deadline: '2026-09-01', category: 'process' },
    ],
    communications: [
      { type: 'SEC rule change briefing for leadership', channel: 'Executive presentation', deadline: '2026-07-01', owner: 'David Kim', audience: 'CFO, General Counsel, CEO', description: 'FY2026 disclosure obligations and timeline' },
      { type: 'Finance team update', channel: 'Finance team meeting', deadline: '2026-07-15', owner: 'Finance Controller', audience: 'Finance / reporting team', description: 'Integration of climate disclosures into financial statements' },
    ],
    keyChanges: [
      'GHG emissions disclosures (Scope 1 and 2) must be independently attested at limited assurance level for FY2026 — this is a new cost and process',
      'Scope 3 emissions must be disclosed if material or if the Company has set GHG targets that include Scope 3',
      'Climate-related expenditure must be separately disclosed in financial statements where it exceeds 1% of the relevant line item',
      'The Board must review and approve the governance section of climate risk disclosures',
      'Data collection for assurance must start significantly earlier than the annual report preparation timeline',
    ],
  },
]

export function getPeopleImpactByRegulation(regulationId: string): PeopleImpact | undefined {
  return peopleImpacts.find(p => p.regulationId === regulationId)
}
