import PrivacyClient from './Client'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.privacy?.title || 'Privacy Policy'} | MyGamepadTester`,
    alternates: {
        canonical: "https://mygamepadtester.com/privacy-policy",
    },
}

export default function PrivacyPolicyPage() {
    return <PrivacyClient />
}
