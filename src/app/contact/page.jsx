import ContactClient from './Client'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.contact?.title || 'Contact Us'} | MyGamepadTester`,
    alternates: {
        canonical: "https://mygamepadtester.com/contact",
    },
}

export default function ContactPage() {
    return <ContactClient />
}
