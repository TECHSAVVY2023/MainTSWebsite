/**
 * Privacy Policy page sections data.
 */
import type { LegalSection } from './useTermsSections'

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    title: '1. Introduction',
    paragraphs: [
      'TECH SAVVY Code Camp ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, community platform, courses, and related services (collectively, the "Services").',
      'By using our Services, you consent to the practices described in this policy. If you do not agree with this policy, please do not use our Services.'
    ]
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    paragraphs: [
      'We may collect information that you provide directly to us, such as when you register for an account, join our community, enroll in courses, or contact us. This may include:'
    ],
    list: [
      'Name and contact information (email address, phone number)',
      'Account credentials (username, password)',
      'Profile information (bio, profile picture)',
      'Communications you send to us',
      'Feedback and survey responses'
    ]
  },
  {
    id: 'automatically-collected',
    title: '3. Information Collected Automatically',
    paragraphs: ['When you access our Services, we may automatically collect certain information, including:'],
    list: [
      'Device information (browser type, operating system, IP address)',
      'Usage data (pages visited, features used, time spent)',
      'Cookies and similar technologies (see our Cookies section below)'
    ]
  },
  {
    id: 'how-we-use',
    title: '4. How We Use Your Information',
    paragraphs: ['We use the information we collect to:'],
    list: [
      'Provide, maintain, and improve our Services',
      'Process registrations and manage your account',
      'Send you updates, newsletters, and course-related communications',
      'Respond to your inquiries and support requests',
      'Analyze usage patterns to enhance user experience',
      'Detect and prevent fraud or abuse',
      'Comply with legal obligations'
    ]
  },
  {
    id: 'sharing',
    title: '5. Sharing Your Information',
    paragraphs: [
      'We do not sell your personal information. We may share your information only in the following circumstances:'
    ],
    list: [
      'With service providers who assist us in operating our Services (under strict confidentiality agreements)',
      'When required by law or to protect our rights and safety',
      'In connection with a merger, acquisition, or sale of assets (with notice to you)',
      'With your consent or at your direction'
    ]
  },
  {
    id: 'cookies',
    title: '6. Cookies and Tracking',
    paragraphs: [
      'We use cookies and similar technologies to enhance your experience. Cookies are small data files stored on your device. We use them for the purposes listed below. You can control cookies through your browser settings; disabling them may limit certain features of our Services.'
    ],
    list: [
      'Keep you logged in',
      'Remember your preferences',
      'Understand how you use our Services'
    ]
  },
  {
    id: 'data-security',
    title: '7. Data Security',
    paragraphs: [
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
    ]
  },
  {
    id: 'data-retention',
    title: '8. Data Retention',
    paragraphs: [
      'We retain your information for as long as your account is active or as needed to provide you with our Services. We may retain certain information to comply with legal obligations, resolve disputes, and enforce our agreements.'
    ]
  },
  {
    id: 'your-rights',
    title: '9. Your Rights',
    paragraphs: ['Depending on your location, you may have the right to:'],
    list: [
      'Access the personal information we hold about you',
      'Request correction of inaccurate data',
      'Request deletion of your data',
      'Object to or restrict certain processing',
      'Data portability',
      'Withdraw consent where applicable'
    ],
    paragraphsAfter: [
      'To exercise these rights, please contact us. We will respond within a reasonable timeframe.'
    ]
  },
  {
    id: 'children',
    title: "10. Children's Privacy",
    paragraphs: [
      'Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us and we will take steps to delete it.'
    ]
  },
  {
    id: 'changes',
    title: '11. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date. Your continued use of our Services after such changes constitutes acceptance of the revised policy.'
    ]
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    paragraphs: [
      'For questions about this Privacy Policy or our data practices, please reach out through our community channels or visit our main website for contact information.'
    ]
  }
]

export function usePrivacySections () {
  return { sections: PRIVACY_SECTIONS }
}
