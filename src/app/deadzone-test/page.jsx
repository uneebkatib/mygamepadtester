import DeadzoneClient from './DeadzoneClient';
import en from '@/locales/en.json';

const tool = en.tools.deadzone || { title: "Controller Deadzone Test", description: "Test your controller deadzone online." };

export const metadata = {
    title: `Controller Deadzone Test – Find Your Exact Joystick Threshold Free`,
    description: `Run a free controller deadzone test to measure your joystick's exact idle threshold. See radial and per-axis readings for Xbox, PlayStation, and Switch — no download needed.`,
    alternates: {
        canonical: "https://mygamepadtester.com/deadzone-test",
    },
    openGraph: {
        title: `Controller Deadzone Test – Find Your Exact Joystick Threshold Free`,
        description: `Measure your controller's precise deadzone threshold. Visualize idle jitter and optimize your in-game deadzone settings for maximum precision.`,
        url: 'https://mygamepadtester.com/deadzone-test',
        type: 'website',
    }
}

export default function DeadzoneTestPage() {
    return (
        <DeadzoneClient />
    );
}
