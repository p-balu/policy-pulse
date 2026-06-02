export interface User {
  id: string
  name: string
  role: string
  initials: string
  email: string
  department: string
}

export const users: User[] = [
  {
    id: 'user-001',
    name: 'Sarah Chen',
    role: 'Chief Compliance Officer',
    initials: 'SC',
    email: 'sarah.chen@acmecorp.com',
    department: 'Compliance',
  },
  {
    id: 'user-002',
    name: 'Marcus Webb',
    role: 'AML & Financial Crime Lead',
    initials: 'MW',
    email: 'marcus.webb@acmecorp.com',
    department: 'Financial Crime',
  },
  {
    id: 'user-003',
    name: 'Priya Sharma',
    role: 'Data Privacy Counsel',
    initials: 'PS',
    email: 'priya.sharma@acmecorp.com',
    department: 'Legal',
  },
  {
    id: 'user-004',
    name: 'James O\'Brien',
    role: 'Cybersecurity Policy Manager',
    initials: 'JO',
    email: 'james.obrien@acmecorp.com',
    department: 'Technology Risk',
  },
  {
    id: 'user-005',
    name: 'Rachel Novak',
    role: 'Consumer Protection Lead',
    initials: 'RN',
    email: 'rachel.novak@acmecorp.com',
    department: 'Consumer Affairs',
  },
  {
    id: 'user-006',
    name: 'David Kim',
    role: 'ESG & Sustainability Officer',
    initials: 'DK',
    email: 'david.kim@acmecorp.com',
    department: 'Sustainability',
  },
]

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id)
}
