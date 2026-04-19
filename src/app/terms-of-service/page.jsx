import TermsClient from './Client'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.terms?.title || 'Terms of Service'} | MyGamepadTester`,
    description: 'Read the MyGamepadTester terms of service. Understand the rules and conditions for using our free browser-based gamepad testing tools.',
    alternates: {
        canonical: "https://mygamepadtester.com/terms-of-service",
    },
}

export default function TermsOfServicePage() {
    return <TermsClient />
}
