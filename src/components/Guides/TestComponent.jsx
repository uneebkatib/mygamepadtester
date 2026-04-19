import React from "react";
import { guidesData } from "./guidesData";

export function TestComponent() {
  // Test if all guide entries are valid React elements
  const testGuides = () => {
    const issues = [];
    
    Object.keys(guidesData).forEach(company => {
      const companyData = guidesData[company];
      if (companyData && companyData.devices) {
        Object.keys(companyData.devices).forEach(device => {
          const deviceData = companyData.devices[device];
          if (deviceData && deviceData.guides) {
            Object.keys(deviceData.guides).forEach(guide => {
              const guideContent = deviceData.guides[guide];
              try {
                // Test if it's a valid React element
                if (typeof guideContent === 'object' && guideContent !== null) {
                  // This is likely a React element
                  console.log(`✓ ${company}/${device}/${guide} is a valid React element`);
                } else if (typeof guideContent === 'function') {
                  // This is likely a component function
                  console.log(`✓ ${company}/${device}/${guide} is a component function`);
                } else {
                  console.log(`? ${company}/${device}/${guide} is of type:`, typeof guideContent);
                }
              } catch (error) {
                issues.push(`${company}/${device}/${guide}: ${error.message}`);
              }
            });
          }
        });
      }
    });
    
    return issues;
  };
  
  const issues = testGuides();
  
  return (
    <div>
      <h1>Guides Data Test</h1>
      <p>Check console for test results.</p>
      {issues.length > 0 && (
        <div>
          <h2>Issues Found:</h2>
          <ul>
            {issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}