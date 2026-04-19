import TesterWrapper from '@/components/Main/TesterWrapper'

export const metadata = {
    title: 'Gamepad Tester Widget | MyGamepadTester',
    alternates: {
        canonical: "https://mygamepadtester.com/widget",
    },
}

export default function WidgetPage() {
    return (
        <div style={{ width: '100%', padding: '10px' }}>
            <TesterWrapper />
        </div>
    )
}
