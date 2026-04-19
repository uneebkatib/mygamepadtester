import InputLagClient from './InputLagClient';
import en from '@/locales/en.json';

const tool = en.tools.inputLag;

export const metadata = {
    title: 'Controller Input Lag Test – Monitor Polling Rate & Latency Free',
    description: 'Measure your controller input lag and polling rate in real-time. Benchmark PS5, PS4, Xbox, and Switch controller latency. Online and free tool.',
    alternates: {
        canonical: "https://mygamepadtester.com/input-lag-test",
    },
    openGraph: {
        title: 'Controller Input Lag Test – Monitor Polling Rate & Latency Free',
        description: 'Measure your controller input lag and polling rate in real-time. Benchmark PS5, PS4, Xbox, and Switch controller latency. Online and free tool.',
        url: 'https://mygamepadtester.com/input-lag-test',
        type: 'website',
    }
}

export default function InputLagTestPage() {
    return (
        <InputLagClient />
    );
}
