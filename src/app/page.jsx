import HomeClient from './HomeClient';
import Script from 'next/script';

export const metadata = {
    title: 'Free Gamepad Tester – PS5, Xbox, Switch & PC Online',
    description: 'Test your PS5, Xbox or Switch controller free in seconds. Detect stick drift, dead buttons, input lag & vibration no download, no account, instant results.',
}

export default function HomePage() {
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MyGamepadTester",
        "url": `https://mygamepadtester.com`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows, macOS, Linux, ChromeOS",
        "browserRequirements": "Requires JavaScript. Requires Gamepad API support.",
        "inLanguage": "en",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "Stick drift detection",
            "Button testing",
            "Trigger pressure measurement",
            "Vibration testing",
            "Input latency monitoring"
        ],
        "screenshot": "https://mygamepadtester.com/screenshot.webp",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1250"
        }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I know if my controller has stick drift?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Set the controller flat on a desk and leave both sticks completely untouched. Watch the axis values for 10 seconds. If either axis reads consistently above 0.14 without any input, early drift is present. If values reach above 0.25, the drift is advanced enough to visibly affect gameplay."
          }
        },
        {
          "@type": "Question",
          "name": "Does this gamepad tester work with PS5 DualSense?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All buttons, analog sticks, triggers and touchpad clicks register correctly in Chrome and Edge. DualSense adaptive haptics require Chrome or Edge specifically as Firefox does not have full DualSense haptic API support."
          }
        },
        {
          "@type": "Question",
          "name": "Does it work with Xbox Series X and Xbox One controllers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Xbox controllers use XInput which Windows and the browser Gamepad API support natively. All buttons, both analog sticks, both triggers as analog values, bumpers, d-pad and stick click buttons register correctly."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between stick drift and a deadzone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A deadzone is an intentional neutral zone built into games where small stick movements near center are ignored. Drift is the opposite: the controller hardware itself is registering movement without any input. This tester shows raw Gamepad API values before any game deadzone is applied."
          }
        },
        {
          "@type": "Question",
          "name": "When should I actually test my controller?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Three situations make testing especially useful. First, before your manufacturer warranty expires — document axis values above 0.14 as evidence for a warranty replacement claim. Second, before buying a used controller. Third, after attempting a cleaning fix with isopropyl alcohol."
          }
        },
        {
          "@type": "Question",
          "name": "Why will my controller not connect to the tester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Press any button first as browsers require this interaction to activate gamepad detection. Close Steam or the Xbox app completely as they lock controller access. Switch to Chrome or Edge. Plug directly into a rear USB port and bypass any hub."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good axis value at rest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Below 0.10 is excellent. Between 0.10 and 0.14 is acceptable but worth retesting in four to six weeks. Consistently above 0.14 means early drift is confirmed. Above 0.25 means the drift will actively move your character or camera in games."
          }
        },
        {
          "@type": "Question",
          "name": "Does this work on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes on Android with Chrome. Controllers connected via USB-OTG or Bluetooth register correctly. iOS Safari support is limited and unreliable. For the most accurate results, a desktop or laptop with Chrome or Edge is recommended."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to install anything?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nothing at all. This tester runs entirely in your browser using the Web Gamepad API. No extensions, no downloads, no drivers, no account required."
          }
        }
      ]
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Test Your Gamepad Online",
      "description": "Test any PS5, Xbox or Switch controller for stick drift, button faults and vibration issues in your browser.",
      "totalTime": "PT1M",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Connect Your Controller",
          "text": "Connect your controller via USB-C, Micro-USB, or Bluetooth pairing, then press any button to activate the Gamepad API."
        },
        {
          "@type": "HowToStep",
          "name": "Rotate the Joystick",
          "text": "Rotate the joystick slowly. The tester traces a live path of every movement, revealing drift, deadzone issues and range problems."
        },
        {
          "@type": "HowToStep",
          "name": "Run the Vibration Test",
          "text": "Click the vibration test button and select infinite vibration to check both motor strengths immediately."
        }
      ]
    };

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Uneeb Katib",
      "jobTitle": "Lead Developer & Hardware Analyst",
      "description": "Uneeb Katib is a gaming hardware analyst and developer who built MyGamepadTester to help gamers diagnose controller drift and hardware issues using the browser-native Gamepad API.",
      "knowsAbout": ["Gamepad API", "Controller Diagnostics", "Stick Drift Detection", "Gaming Hardware", "JavaScript"]
    };

    return (
        <>
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="howto-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <Script
                id="person-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <main style={{
                width: '100%',
                maxWidth: '1150px',
                margin: '0 auto',
                padding: '1rem'
            }}>
                <HomeClient />
            </main>
        </>
    );
}
