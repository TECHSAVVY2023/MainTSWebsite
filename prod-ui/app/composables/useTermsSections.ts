/**
 * Terms of Use page sections data.
 */
export type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  list?: string[]
  paragraphsAfter?: string[]
}

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using the TECH SAVVY Code Camp website, community platform, courses, and related services (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Services.',
      'We reserve the right to modify these terms at any time. Your continued use of the Services after any changes constitutes acceptance of the revised terms. We encourage you to review this page periodically.'
    ]
  },
  {
    id: 'use-of-service',
    title: '2. Use of Service',
    paragraphs: [
      'Our Services are provided for educational and community purposes. You may use the Services only for lawful purposes and in accordance with these Terms. You agree to use the Services in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Services.',
      'You must be at least 13 years of age to use our Services. If you are under 18, you should have parental or guardian consent before participating in our community or courses.'
    ]
  },
  {
    id: 'user-conduct',
    title: '3. User Conduct',
    paragraphs: ['When using our Services, you agree not to:'],
    list: [
      'Harass, abuse, or harm other members of the community',
      'Post false, misleading, or defamatory content',
      'Share content that infringes intellectual property rights',
      "Attempt to gain unauthorized access to our systems or other users' accounts",
      'Use the Services for any commercial purpose without our prior written consent',
      'Interfere with or disrupt the integrity or performance of the Services',
      'Collect or harvest user data without consent'
    ]
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    paragraphs: [
      'All content on our Services—including but not limited to text, graphics, logos, course materials, and software—is the property of TECH SAVVY or our licensors and is protected by copyright and other intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works from our content without express written permission. Course materials are provided for your personal, non-commercial use only.'
    ]
  },
  {
    id: 'privacy',
    title: '5. Privacy',
    paragraphs: [
      'Your use of the Services is also governed by our Privacy Policy. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy. We encourage you to read our Privacy Policy to understand how we handle your data.'
    ]
  },
  {
    id: 'disclaimers',
    title: '6. Disclaimers',
    paragraphs: [
      'The Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.',
      'Course content and community advice are for educational purposes only. We do not guarantee specific outcomes, job placements, or career results. Any reliance on information provided through our Services is at your own risk.'
    ]
  },
  {
    id: 'limitation',
    title: '7. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, TECH SAVVY and our affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.',
      'Our total liability for any claims arising from or related to these Terms or the Services shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.'
    ]
  },
  {
    id: 'termination',
    title: '8. Termination',
    paragraphs: [
      'We may suspend or terminate your access to the Services at any time, with or without cause or notice. Upon termination, your right to use the Services will immediately cease.',
      'You may stop using our Services at any time. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.'
    ]
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    paragraphs: [
      'These Terms shall be governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts of Misamis Occidental, Philippines.'
    ]
  },
  {
    id: 'contact',
    title: '10. Contact Us',
    paragraphs: [
      'For questions about these Terms of Use or our Services, please reach out through our community channels or visit our main website for contact information.'
    ]
  }
]

export function useTermsSections () {
  return { sections: TERMS_SECTIONS }
}
