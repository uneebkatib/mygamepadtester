'use client';
import { useParams } from "next/navigation";
import Link from "next/link";
import { guidesDataLight } from "./guidesDataLight";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledDevelopmentNote = styled.h3`
  text-align: center;
  text-decoration: underline;
  color: ${Theme.textPrimary};
`;

const StyledGuidesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 95%;
  text-align: center;
  margin: 0 auto;
  padding: 2rem 0;

  h2 {
    font-size: 2.2rem;
    color: #1a202c;
    margin-bottom: 2rem;
  }

  ul {
    font-size: 2rem;
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  span {
    padding: 0.5rem;
  }
`;

const StyledLinkWrapper = styled.div`
  background-color: ${Theme.secondary};
  padding: 0.8rem;
  margin: 0.5rem 0 2rem 0;
  border-radius: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: ${Theme.white};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StyledLinkMenu = styled(Link)`
  font-size: 1.1rem;
  color: #2d3748;
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  .icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .title {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .desc {
    font-size: 0.85rem;
    color: #718096;
    text-align: center;
    line-height: 1.4;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: #DA7756;
    box-shadow: 0 10px 15px -3px rgba(218, 119, 86, 0.2);
    background: white;
  }
`;

export default function Guides() {
  const params = useParams();
  const companySlug = params?.companySlug;
  const deviceSlug = params?.deviceSlug;

  const companyData = companySlug ? guidesDataLight[companySlug] : null;
  const deviceData = companyData && deviceSlug ? companyData.devices[deviceSlug] : null;

  // Breadcrumbs
  const breadcrumbs = (
    <nav className="breadcrumbs">
      <StyledLinkWrapper>
        <StyledLink href="/guides">All Guides</StyledLink>
        {companySlug && companyData && (
          <>
            <span style={{ color: 'white', opacity: 0.5 }}>&#10140;</span>
            <StyledLink href={`/guides/${companySlug}`}>
              {companyData.title}
            </StyledLink>
          </>
        )}
        {deviceSlug && deviceData && (
          <>
            <span style={{ color: 'white', opacity: 0.5 }}>&#10140;</span>
            <span style={{ color: Theme.white }}>{deviceData.title}</span>
          </>
        )}
      </StyledLinkWrapper>
    </nav>
  );

  // 1️⃣ No company — show company list
  if (!companySlug) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <h2>Hardware Repair & Testing Guides</h2>
        <ul>
          {Object.entries(guidesDataLight).map(([slug, company]) => (
            <li key={slug}>
              <StyledLinkMenu href={`/guides/${slug}`}>
                <div className="icon">{company.icon || '🛠️'}</div>
                <div className="title">{company.title}</div>
                <div className="desc">{company.description}</div>
              </StyledLinkMenu>
            </li>
          ))}
        </ul>
      </StyledGuidesWrapper>
    );
  }

  if (!companyData) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <div style={{ padding: '4rem', background: '#fff5f5', borderRadius: '16px', color: '#c53030' }}>
           <h2>Category Not Found</h2>
           <p>The selection "{companySlug}" doesn't exist in our guide library.</p>
           <Link href="/guides" style={{ marginTop: '1rem', display: 'inline-block', color: '#c53030', textDecoration: 'underline' }}>Return to all guides</Link>
        </div>
      </StyledGuidesWrapper>
    );
  }

  // 2️⃣ No device — show device list
  if (!deviceSlug) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <h2>{companyData.title} Hardware Guides</h2>
        <ul>
          {Object.entries(companyData.devices).map(([slug, device]) => (
            <li key={slug}>
              <StyledLinkMenu href={`/guides/${companySlug}/${slug}`}>
                <div className="icon">🎮</div>
                <div className="title">{device.title}</div>
                <div className="desc">{Object.keys(device.guides || {}).length} Technical Guides</div>
              </StyledLinkMenu>
            </li>
          ))}
        </ul>
      </StyledGuidesWrapper>
    );
  }

  if (!deviceData) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <div style={{ padding: '4rem', background: '#fff5f5', borderRadius: '16px', color: '#c53030' }}>
           <h2>Device Not Found</h2>
           <p>We don't have guides listed for "{deviceSlug}" under {companyData.title}.</p>
           <Link href={`/guides/${companySlug}`} style={{ marginTop: '1rem', display: 'inline-block', color: '#c53030', textDecoration: 'underline' }}>View other {companyData.title} guides</Link>
        </div>
      </StyledGuidesWrapper>
    );
  }

  // 3️⃣ Show guide list for device
  return (
    <StyledGuidesWrapper>
      {breadcrumbs}
      <h2>{deviceData.title} Repair Library</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {Object.entries(deviceData.guides).map(([slug, guide]) => (
          <Link 
            key={slug}
            href={`/guides/${companySlug}/${deviceSlug}/${slug}`}
            style={{
               display: 'flex',
               flexDirection: 'column',
               padding: '1.5rem',
               background: 'white',
               border: '1px solid #e2e8f0',
               borderRadius: '12px',
               textDecoration: 'none',
               textAlign: 'left',
               transition: 'all 0.2s ease'
            }}
            className="guide-card"
          >
            <span style={{ fontWeight: 800, color: '#2d3748', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{guide.title}</span>
            <span style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>{guide.readTime || '10 min read'} &bull; Technical Tutorial</span>
          </Link>
        ))}
      </div>
      
      <style jsx>{`
        .guide-card:hover {
          border-color: #DA7756;
          box-shadow: 0 4px 12px rgba(218, 119, 86, 0.1);
          transform: translateX(4px);
        }
      `}</style>
    </StyledGuidesWrapper>
  );
}
