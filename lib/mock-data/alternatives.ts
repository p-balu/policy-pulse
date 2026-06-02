export type AlternativeVariant = 'phased-rollout' | 'stricter' | 'minimal-change'

export interface AlternativeRecommendation {
  variant: AlternativeVariant
  label: string
  tagline: string
  proposedEdit: {
    original: string
    revised: string
  }
  rationale: string
  tradeoffs: { pro: string; con: string }[]
}

export interface TaskAlternatives {
  taskId: string
  alternatives: AlternativeRecommendation[]
}

export const taskAlternatives: TaskAlternatives[] = [
  {
    taskId: 'task-001',
    alternatives: [
      {
        variant: 'phased-rollout',
        label: 'Phased rollout',
        tagline: 'Adopt the 10% threshold in two stages to reduce client disruption',
        proposedEdit: {
          original:
            'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 25% or more of the equity interests of a legal entity customer.',
          revised:
            'Effective July 1, 2026, the Company shall identify and verify the identity of any natural person who directly or indirectly owns 15% or more of the equity interests of a legal entity customer. Effective January 1, 2027, the threshold reduces to 10% in final alignment with FinCEN Notice 2026-04. Beneficial ownership information shall be updated within 24 hours of any ownership change.',
        },
        rationale:
          'A phased approach reduces immediate client friction by adopting an intermediate 15% threshold from July 1, 2026, transitioning to the final 10% threshold by January 2027. Note: this approach carries regulatory risk — FinCEN requires the 10% threshold from July 1. This variant should only be considered if legal counsel confirms an interim threshold would satisfy examiners during a documented transition period.',
        tradeoffs: [
          { pro: 'Reduces client re-certification volume in the short term', con: 'Technically non-compliant with FinCEN requirement from July 1 unless regulatorily approved' },
          { pro: 'Allows more time for systems and training to be updated', con: 'Requires a second wave of client outreach in early 2027' },
        ],
      },
      {
        variant: 'stricter',
        label: 'Go beyond compliance',
        tagline: 'Adopt a 5% threshold and real-time verification to exceed FinCEN requirements',
        proposedEdit: {
          original:
            'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 25% or more of the equity interests of a legal entity customer.',
          revised:
            'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 5% or more of the equity interests of a legal entity customer, exceeding the minimum threshold of 10% established by FinCEN Notice 2026-04. Beneficial ownership information shall be updated in real time upon any ownership change via system integration, with automated alerts to the assigned relationship manager within 2 hours. Enhanced due diligence shall apply to all beneficial owners above 10%.',
        },
        rationale:
          'Adopting a 5% threshold positions the Company above FinCEN minimums, reducing the risk of regulatory re-examination as thresholds may tighten further. This approach is aligned with EU and UK standards which already require 10-25% analysis. The cost is higher initial CDD volume and more extensive client outreach.',
        tradeoffs: [
          { pro: 'Significantly reduces future re-work if thresholds tighten again', con: 'Substantially higher upfront CDD cost and client friction' },
          { pro: 'Demonstrates proactive compliance posture to examiners', con: 'May raise client concerns about data collection beyond regulatory minimums' },
        ],
      },
      {
        variant: 'minimal-change',
        label: 'Minimal change',
        tagline: 'Change only the threshold number — minimum text modification',
        proposedEdit: {
          original:
            'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 25% or more of the equity interests of a legal entity customer.',
          revised:
            'The Company shall identify and verify the identity of any natural person who directly or indirectly owns 10% or more of the equity interests of a legal entity customer.',
        },
        rationale:
          'The minimal change approach makes only the threshold update required by FinCEN Notice 2026-04 §2.1 without additional policy language. This is the fastest change to implement but does not address the 24-hour update requirement in §2.3(a), which may be identified as a separate gap. Consider whether to address §2.3(a) in a simultaneous or follow-on amendment.',
        tradeoffs: [
          { pro: 'Fastest path to implementation — single sentence change', con: 'Does not address the 24-hour update deadline from §2.3(a)' },
          { pro: 'Minimal risk of introducing unintended scope changes', con: 'May require an immediate follow-up amendment for remaining gaps' },
        ],
      },
    ],
  },
  {
    taskId: 'task-002',
    alternatives: [
      {
        variant: 'phased-rollout',
        label: 'Phased migration',
        tagline: 'Prioritize privileged accounts first, standard users by June 30',
        proposedEdit: {
          original:
            'Acceptable MFA methods include: hardware security keys (FIDO2); authenticator app-based TOTP; SMS-based one-time passwords (OTP) for standard user accounts; biometric authentication on approved mobile devices.',
          revised:
            'Multi-factor authentication migration is conducted in two phases: Phase 1 (by June 10, 2026) — all privileged accounts shall use only FIDO2-compliant hardware security keys or smart card authentication. Phase 2 (by June 30, 2026) — all remote access users shall use phishing-resistant MFA. SMS-based OTP shall be disabled for all account types no later than June 30, 2026. Authenticator app TOTP remains acceptable for non-privileged standard access during Phase 2 transition only.',
        },
        rationale:
          'A phased migration reduces operational risk by addressing the highest-risk population (privileged accounts) first while giving operational teams time to support standard user enrollment. Both phases must complete before the NYDFS June 30 deadline.',
        tradeoffs: [
          { pro: 'Reduces help desk volume — users onboard in waves rather than all at once', con: 'Requires clear communication about which users are in which phase' },
          { pro: 'Privileged accounts (highest risk) are secured earliest', con: 'Slightly more complex policy language to maintain during transition period' },
        ],
      },
      {
        variant: 'stricter',
        label: 'Full FIDO2 mandate',
        tagline: 'Require FIDO2 for all access — not just privileged',
        proposedEdit: {
          original:
            'Acceptable MFA methods include: hardware security keys (FIDO2); authenticator app-based TOTP; SMS-based one-time passwords (OTP) for standard user accounts; biometric authentication on approved mobile devices.',
          revised:
            'Effective June 30, 2026, multi-factor authentication for all system access shall use exclusively phishing-resistant authenticators: FIDO2-compliant hardware security keys, FIDO2 passkeys, or smart card authentication using X.509 certificates. Authenticator app TOTP and all OTP methods delivered via SMS, voice, or email are no longer acceptable for any access category. Annual penetration testing of MFA implementation and quarterly phishing simulation exercises are mandatory for all staff with system access.',
        },
        rationale:
          'Mandating FIDO2 for all access (not just privileged) provides a stronger security posture and eliminates the complexity of maintaining different acceptable methods by access level. This exceeds NYDFS requirements but substantially reduces phishing risk across the entire organization.',
        tradeoffs: [
          { pro: 'Simplest policy to maintain — one rule for all access types', con: 'Higher hardware procurement cost (all users need FIDO2-capable devices or keys)' },
          { pro: 'Maximally reduces phishing risk across the organization', con: 'Higher help-desk and onboarding burden in the short term' },
        ],
      },
      {
        variant: 'minimal-change',
        label: 'Targeted removal',
        tagline: 'Remove SMS OTP only — minimum edit to meet the NYDFS deadline',
        proposedEdit: {
          original:
            'Acceptable MFA methods include: hardware security keys (FIDO2); authenticator app-based TOTP; SMS-based one-time passwords (OTP) for standard user accounts; biometric authentication on approved mobile devices.',
          revised:
            'Acceptable MFA methods include: hardware security keys (FIDO2); authenticator app-based TOTP; biometric authentication on approved mobile devices. SMS-based one-time passwords are no longer acceptable. For privileged accounts, only FIDO2-compliant hardware keys or smart card authentication are acceptable.',
        },
        rationale:
          'Removes SMS OTP as required by NYDFS §500.12(b) and adds the privileged account restriction, while keeping the rest of the policy unchanged. This is the minimum edit to achieve compliance with the immediate June 30 deadline.',
        tradeoffs: [
          { pro: 'Minimal disruption — only SMS is removed, TOTP and biometrics remain', con: 'Does not mandate phishing simulation exercises required by §500.12(e)' },
          { pro: 'Fastest review and approval cycle', con: 'May require another amendment to add the penetration testing requirement' },
        ],
      },
    ],
  },
  {
    taskId: 'task-003',
    alternatives: [
      {
        variant: 'phased-rollout',
        label: 'Staged implementation',
        tagline: 'Implement oversight controls for high-risk systems first, expand over 6 months',
        proposedEdit: {
          original:
            'High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers.',
          revised:
            'Phase 1 (by August 6, 2026): High-risk AI systems designated Tier 1 (credit decisioning, fraud detection, customer onboarding) shall implement human oversight controls with named, trained overseers and override authority. Phase 2 (by February 6, 2027): All remaining high-risk AI systems shall implement the same controls. Override decisions shall be logged for 36 months from Phase 1 effective date. Plain-language explanations shall be delivered within 30 minutes for all Tier 1 systems from Phase 1.',
        },
        rationale:
          'A tiered rollout lets the organization prioritize the highest-impact AI systems (Tier 1) while building the infrastructure, training, and vendor engagement needed for Phase 2. Note: the EU AI Act Article 14 effective date is August 6, 2026 — Phase 1 systems must comply from that date.',
        tradeoffs: [
          { pro: 'Manageable implementation for a large AI system portfolio', con: 'Phase 2 systems carry Article 14 non-compliance risk between Aug 2026 and Feb 2027' },
          { pro: 'Lessons from Phase 1 can inform Phase 2 rollout', con: 'Requires clear public Tier 1 / Tier 2 classification documentation' },
        ],
      },
      {
        variant: 'stricter',
        label: 'Extend to all AI use',
        tagline: 'Apply human oversight to all AI decisions, not just legally "high-risk" ones',
        proposedEdit: {
          original:
            'High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers.',
          revised:
            'All AI systems that produce outputs used in decisions affecting customers, employees, or financial reporting shall implement human oversight controls, regardless of EU AI Act risk classification. Designated overseers shall have documented training, override authority, and access to explanation outputs. Override decisions and their rationale shall be logged for 36 months. This policy applies to both directly developed and third-party procured AI systems.',
        },
        rationale:
          'Extending oversight beyond EU AI Act "high-risk" systems reduces the risk of regulatory re-classification as the EU AI Act Annex III evolves, and demonstrates a strong AI governance posture to all regulators. It also addresses OSFI Guideline B-13 model risk requirements.',
        tradeoffs: [
          { pro: 'Future-proofs the policy against AI Act scope expansions', con: 'Significantly higher implementation cost and training burden' },
          { pro: 'Addresses AI governance requirements from multiple regulators simultaneously', con: 'May be operationally impractical for low-stakes AI systems' },
        ],
      },
      {
        variant: 'minimal-change',
        label: 'Minimum viable update',
        tagline: 'Add override authority and audit log retention only',
        proposedEdit: {
          original:
            'High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers. The responsible business unit shall designate qualified AI overseers who receive training on the system\'s capabilities and limitations.',
          revised:
            'High-risk AI systems shall implement human-in-the-loop controls where automated decisions can adversely affect customers. The responsible business unit shall designate qualified AI overseers who: (a) have received documented training on the system\'s capabilities and limitations; (b) have the authority to override any automated output without management approval. Override decisions shall be logged for a minimum of 36 months.',
        },
        rationale:
          'Adds the two most critical gaps — override authority without management approval (§14.3(d)) and 36-month log retention (§14.5) — with the minimum text change needed. The 30-minute explanation requirement from §14.4 would be addressed in a system-level technical specification rather than in this policy, which is acceptable if the technical controls are implemented separately.',
        tradeoffs: [
          { pro: 'Fast to draft, review, and approve', con: 'Does not address the 30-minute explanation requirement in the policy text' },
          { pro: 'Minimal risk of unintended scope changes', con: 'Requires a separate technical specification for the explanation timeline' },
        ],
      },
    ],
  },
]

export function getAlternativesByTaskId(taskId: string): TaskAlternatives | undefined {
  return taskAlternatives.find(a => a.taskId === taskId)
}
