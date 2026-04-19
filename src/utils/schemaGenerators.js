/**
 * SEO Schema Generators
 * Utility functions to generate structured data (JSON-LD) for SEO
 */

/**
 * Generates FAQ schema for SEO
 * @param {Array} faqs - Array of {question, answer} objects
 * @returns {object} FAQ schema object
 */
export const generateFAQSchema = (faqs) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
};

/**
 * Generates Breadcrumb schema for SEO
 * @param {Array} breadcrumbs - Array of {name, url} objects
 * @returns {object} Breadcrumb schema object
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
        }))
    };
};

/**
 * Generates HowTo schema for SEO
 * @param {string} name - Name of the how-to guide
 * @param {string} description - Description of what the guide teaches
 * @param {Array} steps - Array of {name, text} objects
 * @returns {object} HowTo schema object
 */
export const generateHowToSchema = (name, description, steps) => {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "description": description,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
        }))
    };
};
