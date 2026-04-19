import TriggerClient from './TriggerClient';
import en from '@/locales/en.json';

const tool = en.tools.trigger;

export const metadata = {
    title: 'Controller Trigger Test – Check Full Pressure Range on PS5, Xbox & Switch',
    description: 'Test your controller triggers (L2/R2/LT/RT) for full 0-100% travel. Detect stuck triggers, limited range or adaptive trigger issues on PS5 DualSense, Xbox, and Switch.',
    alternates: {
        canonical: "https://mygamepadtester.com/trigger-test",
    },
    openGraph: {
        title: `Controller Trigger Test – Check PS5 Adaptive Triggers & Xbox Full Range`,
        description: `Free trigger pressure test for PS5, Xbox, and PC controllers. Check 0-100% travel, detect deadzones and limited range.`,
        url: 'https://mygamepadtester.com/trigger-test',
        type: 'website',
    }
}

export default function TriggerTestPage() {
    return (
        <TriggerClient />
    );
}
