import KeyboardClient from './KeyboardClient';

export const metadata = {
    title: 'Keyboard Test Online – Check Every Key, Ghosting & Rollover Free',
    description: 'Identify dead keys, stuck switches, and ghosting issues on any keyboard. Test your hardware health instantly with our free, no-download tool.',
    alternates: {
        canonical: "https://mygamepadtester.com/keyboard-test",
    },
    openGraph: {
        title: 'Keyboard Test Online – Check Every Key, Ghosting & Rollover Free',
        description: 'Identify dead keys, stuck switches, and ghosting issues on any keyboard. Test your hardware health instantly with our free, no-download tool.',
        url: 'https://mygamepadtester.com/keyboard-test',
        type: 'website',
    }
}

export default function KeyboardTestPage() {
    return (
        <KeyboardClient />
    );
}
