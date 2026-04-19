import AimSensitivityClient from './Client';
import en from '@/locales/en.json';

const tool = en.tools?.sensConverter || { 
    title: "Aim Sensitivity Converter", 
    description: "Convert mouse sensitivity across games." 
};

export const metadata = {
    title: `Free Mouse Aim Sensitivity Converter for Any Game | MyGamepadTester`,
    description: `Use this free aim sensitivity converter to match your mouse sens across 100+ games. Keep your muscle memory sharp every time you switch titles. Try it now.`,
    alternates: {
        canonical: "https://mygamepadtester.com/aim-sensitivity-converter",
    },
    openGraph: {
        title: `Free Mouse Aim Sensitivity Converter for Any Game`,
        description: `Match your mouse sensitivity across 100+ FPS games instantly. Pro-grade conversion for Valorant, CS2, Apex, and more.`,
        url: 'https://mygamepadtester.com/aim-sensitivity-converter',
        type: 'website',
    }
}

export default function AimSensitivityPage() {
    return (
        <AimSensitivityClient />
    );
}
