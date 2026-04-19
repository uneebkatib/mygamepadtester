import MouseClient from './MouseClient';

export const metadata = {
    title: `Mouse Test Online: Check Buttons, Clicks & Double-Click Issues`,
    description: `Detect double-click issues, scroll wheel skipping, and side button failures instantly. Run a free mouse test in your browser with no download required.`,
    alternates: {
        canonical: "https://mygamepadtester.com/mouse-test",
    },
    openGraph: {
        title: 'Mouse Test Online – Check Clicks, Scroll & Side Buttons Free',
        description: 'Run a free mouse test online. Detect double-clicks, scroll wheel skipping, and side button issues on any mouse. No download needed.',
        url: 'https://mygamepadtester.com/mouse-test',
        type: 'website',
    }
}

export default function MouseTestPage() {
    return (
        <MouseClient />
    );
}
