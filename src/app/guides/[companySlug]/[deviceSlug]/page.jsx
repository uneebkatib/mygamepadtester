import Guides from "@/components/Guides/Guides";
import { guidesDataLight } from "@/components/Guides/guidesDataLight";
import { guidesRouting } from "@/components/Guides/guidesRouting";

export function generateStaticParams() {
    const params = [];
    Object.keys(guidesRouting).forEach((companySlug) => {
        const company = guidesRouting[companySlug];
        Object.keys(company).forEach((deviceSlug) => {
            params.push({
                companySlug,
                deviceSlug,
            });
        });
    });
    return params;
}

export async function generateMetadata({ params }) {
    const { companySlug, deviceSlug } = await params;
    const company = guidesDataLight[companySlug];
    const device = company?.devices?.[deviceSlug];
    const baseUrl = 'https://mygamepadtester.com';

    if (!device) {
        return {
            title: 'Device Guides | MyGamepadTester',
            description: 'Comprehensive controller guides and tutorials.',
        };
    }

    const title = `${device.title} Guides | MyGamepadTester`;
    const description = `Complete ${device.title} tutorials and guides. Learn calibration, troubleshooting, and optimization tips.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/guides/${companySlug}/${deviceSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/guides/${companySlug}/${deviceSlug}`,
            siteName: 'MyGamepadTester',
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    };
}

export default function DeviceGuidesPage() {
    return <Guides />;
}
