import ContactClient from './Client'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.contact?.title || 'Contact Us'} | MyGamepadTester`,
    description: 'Get in touch with the MyGamepadTester team. Report a bug, suggest a feature, or ask a question about our free gamepad testing tools.',
    alternates: {
        canonical: "https://mygamepadtester.com/contact",
    },
}

export default function ContactPage() {
    return <ContactClient />
}
