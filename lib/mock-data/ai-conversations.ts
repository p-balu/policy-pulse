export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIConversation {
  taskId: string
  messages: AIMessage[]
}

export const aiConversations: AIConversation[] = [
  {
    taskId: 'task-001',
    messages: [
      {
        role: 'user',
        content: 'Can you clarify what counts as "indirect ownership" under the new 10% threshold? We have several clients with complex holding structures.',
        timestamp: '2026-05-23T14:00:00Z',
      },
      {
        role: 'assistant',
        content: "Under FinCEN Notice 2026-04, indirect ownership is calculated by multiplying ownership percentages through each layer of a holding structure. If a natural person owns 50% of Entity A, which owns 30% of Entity B (your customer), their effective beneficial interest in Entity B is 15% (50% × 30%), which triggers reporting. The analysis must aggregate all forms of ownership — direct equity, voting rights, and economic interests — and look through all intermediary entities regardless of their jurisdiction. For clients where a natural person's aggregated interest across multiple holding chains reaches or exceeds 10%, they must be identified and verified.",
        timestamp: '2026-05-23T14:03:00Z',
      },
      {
        role: 'user',
        content: 'What about trust structures? How do we handle cases where the beneficial owner is a trustee of a discretionary trust?',
        timestamp: '2026-05-23T14:08:00Z',
      },
      {
        role: 'assistant',
        content: "For trust structures, FinCEN requires identification of: (1) the trustee(s) — always required regardless of ownership percentage; (2) named beneficiaries holding a 10%+ beneficial interest in the customer entity; and (3) any settlor or grantor with the power to revoke the trust or otherwise direct trust assets. For a discretionary trust where no named beneficiary has a fixed 10%+ interest, you identify the trustee and any individual with control authority. Importantly, the certification requirement in §4.1 must be obtained from the trustee in their capacity as controller of the trust assets. I'd recommend updating Section 3 of the Beneficial Ownership Verification Procedure to add a specific sub-section on trust identification methodology.",
        timestamp: '2026-05-23T14:12:00Z',
      },
    ],
  },
  {
    taskId: 'task-002',
    messages: [
      {
        role: 'user',
        content: 'The policy update is clear on what\'s prohibited, but we need a realistic implementation timeline. Our hardware procurement lead time is 6–8 weeks for security keys. The NYDFS deadline is June 30.',
        timestamp: '2026-05-17T14:22:00Z',
      },
      {
        role: 'assistant',
        content: "Given the June 30 deadline and 6–8 week procurement window, you're right that there's a timing constraint. Here's a pragmatic phased approach that minimizes regulatory exposure: (1) Immediately (Week 1): Order FIDO2 hardware keys for all privileged accounts (your highest-risk population). This group is typically small — IT admins, DBA accounts, payment system access. Use existing TOTP authenticator apps as an interim control for this group. (2) Weeks 2–4: Migrate all privileged accounts to FIDO2 keys as devices arrive. Disable SMS OTP for this population by June 10, ahead of the deadline. (3) Weeks 4–6: Migrate remote access users to passkeys or authenticator apps (TOTP is still acceptable for non-privileged remote access under §500.12(a) — only SMS/voice/email OTP is prohibited). (4) June 30: Hard cutover — disable all remaining SMS OTP. The critical point for NYDFS compliance is that SMS OTP must be disabled before June 30 for all access within §500.12(a) scope. Document your phased plan and submit it proactively to your NYDFS examiner.",
        timestamp: '2026-05-17T14:28:00Z',
      },
      {
        role: 'user',
        content: 'Are TOTP authenticator apps (like Google Authenticator) also prohibited, or only SMS? The amendment text only mentions SMS, voice, and email.',
        timestamp: '2026-05-17T14:35:00Z',
      },
      {
        role: 'assistant',
        content: "Correct — §500.12(b) specifically names 'one-time passwords delivered via SMS, voice call, or email' as unacceptable. TOTP authenticator apps (Google Authenticator, Microsoft Authenticator, Authy, etc.) are not listed and remain acceptable under the amendment for non-privileged accounts. However, there's an important nuance: for privileged accounts, the amendment requires phishing-resistant MFA. TOTP apps are not phishing-resistant because a user can be socially engineered into providing the code to a fake site in real time. NYDFS examiners are likely to scrutinize TOTP usage for privileged accounts even though it's not explicitly prohibited. Best practice — and what I'd recommend reflecting in your policy — is to require FIDO2 or smart card for all privileged access, and permit TOTP only for standard non-privileged internal access. This gives you defensible compliance while the examiner guidance evolves.",
        timestamp: '2026-05-17T14:40:00Z',
      },
    ],
  },
  {
    taskId: 'task-003',
    messages: [
      {
        role: 'user',
        content: 'The EU AI Act applies to "deployers" — does that include us as an end-user of a third-party AI vendor\'s system, or only the vendor who built it?',
        timestamp: '2026-05-19T15:00:00Z',
      },
      {
        role: 'assistant',
        content: "Yes, Article 14 obligations apply to you as a deployer even if you didn't build the AI system. Under the EU AI Act, a 'deployer' is any natural or legal person that uses a high-risk AI system under its own authority. This means: if you are using a third-party AI vendor's credit scoring, fraud detection, or customer onboarding system that qualifies as high-risk under Annex III, you bear deployer obligations including the human oversight requirements in Article 14. The vendor (as provider) has separate obligations around documentation and conformity assessment. Your policy update should explicitly address this — you need to designate human overseers for each high-risk AI system you deploy, whether built internally or procured externally. I'd suggest adding a register of deployed high-risk AI systems to your AI Framework with a column for designated overseer.",
        timestamp: '2026-05-19T15:05:00Z',
      },
      {
        role: 'user',
        content: 'For the 30-minute explanation deadline — does that mean we need to generate an explanation in 30 minutes, or just that the overseer must receive it in 30 minutes?',
        timestamp: '2026-05-19T15:10:00Z',
      },
      {
        role: 'assistant',
        content: "§14.4 requires that the explanation be provided to the overseer no later than 30 minutes following the automated decision. This is a delivery deadline, not a generation deadline, but in practice they're the same — the explanation must be generated and transmitted to the overseer within 30 minutes. For most AI systems this implies you need automated explanation generation (e.g., SHAP values, rule-based explanations, or provider-supplied explanation APIs), because waiting for a human to manually draft an explanation won't meet the 30-minute window at scale. When you review vendor contracts for high-risk AI systems, you should require the vendor to provide explanation outputs via API within a defined SLA (I'd suggest 2–3 minutes of the decision) so your internal systems can route the explanation to the overseer well within the 30-minute window. Add this to your vendor due diligence checklist in the Third-Party Risk Management Policy as well.",
        timestamp: '2026-05-19T15:16:00Z',
      },
    ],
  },
  {
    taskId: 'task-007',
    messages: [
      {
        role: 'user',
        content: 'Our CFO is asking whether the SEC Scope 3 attestation requirement applies to us as a foreign private issuer. We\'re incorporated in the UK but listed on NYSE.',
        timestamp: '2026-05-22T10:00:00Z',
      },
      {
        role: 'assistant',
        content: "This is an important distinction. Foreign Private Issuers (FPIs) were originally subject to different timelines under the SEC\'s climate disclosure rules, but SEC Release No. 34-2026-18 aligns FPI obligations with domestic issuer requirements for FPIs that are large accelerated filers based on public float. If your NYSE-listed entity qualifies as a large accelerated filer (public float above $700M), you are subject to Scope 3 reporting obligations where material and the attestation requirement for Scope 1 and Scope 2 beginning with fiscal years ending after December 15, 2026. The key question is whether your UK incorporation affects your large accelerated filer status — it doesn't, as the classification is based on public float regardless of incorporation jurisdiction. I'd recommend confirming your large accelerated filer status with your SEC counsel and updating the Climate Risk Disclosure Procedure to reflect that FPI status does not exempt the Company from the attestation requirement.",
        timestamp: '2026-05-22T10:08:00Z',
      },
      {
        role: 'user',
        content: 'What level of assurance is required for the GHG emissions data disclosed in our 20-F filing for the current fiscal year?',
        timestamp: '2026-05-22T10:15:00Z',
      },
      {
        role: 'assistant',
        content: "For fiscal years ending on or after December 15, 2026, §1500.3(b)(ii) requires limited assurance for large accelerated filers. Limited assurance (sometimes called 'negative assurance' or 'review engagement') is a lower bar than the reasonable assurance required in subsequent years — it means the assurance provider performs procedures sufficient to conclude that nothing has come to their attention indicating the disclosures are materially misstated. For your 20-F, if your fiscal year ends December 31, 2026, you will need limited assurance on Scope 1 and Scope 2 emissions. Scope 3 attestation is required only if you disclose Scope 3 data or have a GHG target that includes Scope 3. I'd recommend engaging your auditor or a specialist sustainability assurance provider now — lead times for assurance engagements are running 3–4 months given demand for this service. The assurance engagement should be factored into your ESG reporting timeline in the ESG Reporting Policy.",
        timestamp: '2026-05-22T10:22:00Z',
      },
    ],
  },
]

export function getConversationByTaskId(taskId: string): AIConversation | undefined {
  return aiConversations.find(c => c.taskId === taskId)
}

export const followUpResponses = [
  "Based on the regulatory text and enforcement guidance, the obligation applies from the effective date with no grace period for existing arrangements. Regulators in this jurisdiction have historically taken a strict approach to transition periods for threshold-based requirements — I'd prioritize achieving compliance before the effective date rather than relying on any informal transition period.",
  "There is a related guidance document published by the regulator in March 2026 that clarifies this point further. The regulator confirmed that the requirement applies to both new and existing contracts, and that covered entities must undertake a gap assessment of existing arrangements within 90 days of the effective date. I'd suggest referencing that guidance explicitly in the policy update.",
  "The interaction with your existing contractual obligations is worth flagging to legal counsel. Where existing contracts with third parties contain provisions that conflict with the new requirements, the regulation provides that the statutory obligation prevails. You may need to issue contract amendment notices to affected counterparties — your Third-Party Risk Management Policy should be updated to include a process for regulatory-driven contract amendments.",
]
