import { guidesDataLight } from "@/components/Guides/guidesDataLight";
import { guidesRouting } from "@/components/Guides/guidesRouting";
import GuideContent from "@/components/Guides/GuideContent";

export function generateStaticParams() {
    const params = [];
    Object.keys(guidesRouting).forEach((companySlug) => {
        const company = guidesRouting[companySlug];
        Object.keys(company).forEach((deviceSlug) => {
            const guides = company[deviceSlug];
            if (Array.isArray(guides)) {
                guides.forEach((guideSlug) => {
                    params.push({
                        companySlug,
                        deviceSlug,
                        guideSlug,
                    });
                });
            }
        });
    });
    return params;
}

export async function generateMetadata({ params }) {
    const { companySlug, deviceSlug, guideSlug } = await params;
    const company = guidesDataLight[companySlug];
    const device = company?.devices?.[deviceSlug];
    const guide = device?.guides?.[guideSlug];
    const baseUrl = 'https://mygamepadtester.com';

    if (!guide) {
        return {
            title: 'Guide | MyGamepadTester',
            description: 'Comprehensive controller guide and tutorial.',
        };
    }

    const title = `${guide.title} | ${device.title} | MyGamepadTester`;
    const description = `${guide.title} - Complete guide for ${device.title}. Expert tips, step-by-step instructions, and troubleshooting help.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/guides/${companySlug}/${deviceSlug}/${guideSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/guides/${companySlug}/${deviceSlug}/${guideSlug}`,
            siteName: 'MyGamepadTester',
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    };
}

export default async function GuideDetailPage({ params }) {
    const { companySlug, deviceSlug, guideSlug } = await params;
    
    return (
        <GuideContent 
            companySlug={companySlug} 
            deviceSlug={deviceSlug} 
            guideSlug={guideSlug} 
        />
    );
}
