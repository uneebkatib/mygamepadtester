'use client'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import blogStorageService from '../../services/blogStorageService';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: ${Theme.textPrimary};
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background-color: ${Theme.backgroundLight};
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${Theme.borderLight};
  box-shadow: ${Theme.shadow} 0 4px 12px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${Theme.shadowMedium} 0 8px 20px;
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  color: ${Theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
`;

const StatValue = styled.div`
  color: ${Theme.textPrimary};
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const QuickActions = styled.div`
  background-color: ${Theme.backgroundLight};
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${Theme.borderLight};
  box-shadow: ${Theme.shadow} 0 4px 12px;
`;

const SectionTitle = styled.h2`
  color: ${Theme.textPrimary};
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: ${props => props.variant === 'primary' ? Theme.primary : Theme.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(218, 119, 86, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0
  });
  
  useEffect(() => {
    // Load blog statistics
    const blogStats = blogStorageService.getBlogStats();
    setStats(blogStats);
  }, []);
  
  return (
    <DashboardContainer>
      <PageTitle>Admin Dashboard</PageTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon>📊</StatIcon>
          <StatTitle>Total Blogs</StatTitle>
          <StatValue>{stats.total}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatIcon>👁️</StatIcon>
          <StatTitle>Total Views</StatTitle>
          <StatValue>{stats.totalViews.toLocaleString()}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatIcon>📅</StatIcon>
          <StatTitle>Published</StatTitle>
          <StatValue>{stats.published}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatIcon>⏳</StatIcon>
          <StatTitle>Drafts</StatTitle>
          <StatValue>{stats.drafts}</StatValue>
        </StatCard>
      </StatsGrid>
      
      <QuickActions>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsGrid>
          <ActionButton variant="primary" onClick={() => router.push('/katib/create-blog')}>
            <span>📝</span>
            Create New Blog
          </ActionButton>
          <ActionButton variant="accent" onClick={() => router.push('/katib/blogs')}>
            <span>📋</span>
            Manage Blogs
          </ActionButton>
          <ActionButton variant="primary" onClick={() => alert('Analytics coming soon!')}>
            <span>📊</span>
            View Analytics
          </ActionButton>
          <ActionButton variant="accent" onClick={() => alert('Settings coming soon!')}>
            <span>🔧</span>
            Settings
          </ActionButton>
        </ActionsGrid>
      </QuickActions>
    </DashboardContainer>
  );
};

export default AdminDashboard;

