import { guidesDataLight } from "@/components/Guides/guidesDataLight";
import { guidesRouting } from "@/components/Guides/guidesRouting";
import Guides from "@/components/Guides/Guides";

export function generateStaticParams() {
    return Object.keys(guidesRouting).map((companySlug) => ({ companySlug }));
}

export async function generateMetadata({ params }) {
    const { companySlug } = await params;
    const company = guidesDataLight[companySlug];
    const baseUrl = 'https://mygamepadtester.com';

    if (!company) {
        return {
            title: 'Guides | MyGamepadTester',
            description: 'Comprehensive controller guides and tutorials.',
        };
    }

    const title = `${company.title} Guides | MyGamepadTester`;
    const description = `Complete guides and tutorials for ${company.title}. Learn calibration, repair, and optimization tips.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/guides/${companySlug}`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/guides/${companySlug}`,
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

export default function CompanyGuidesPage() {
    return <Guides />;
}
