import TermsClient from './Client'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.terms?.title || 'Terms of Service'} | MyGamepadTester`,
    alternates: {
        canonical: "https://mygamepadtester.com/terms-of-service",
    },
}

export default function TermsOfServicePage() {
    return <TermsClient />
}
