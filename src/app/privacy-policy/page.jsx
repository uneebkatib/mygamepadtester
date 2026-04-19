import PrivacyClient from './Client'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.privacy?.title || 'Privacy Policy'} | MyGamepadTester`,
    description: 'Read the MyGamepadTester privacy policy. Learn how we handle your data when you use our free gamepad testing tools.',
    alternates: {
        canonical: "https://mygamepadtester.com/privacy-policy",
    },
}

export default function PrivacyPolicyPage() {
    return <PrivacyClient />
}
