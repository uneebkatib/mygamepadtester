'use client'

import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: ${Theme.background};
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${Theme.backgroundDark};
  color: ${Theme.textInverse};
  padding: 2rem 0;
  box-shadow: ${Theme.shadowMedium} 0 0 20px;
  z-index: 1000;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 0 2rem 2rem;
  border-bottom: 1px solid ${Theme.borderDark};
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h2`
  color: ${Theme.textInverse};
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavItem = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.$active ? Theme.surface : 'transparent'};
  color: ${props => props.$active ? Theme.textPrimary : Theme.textInverse};
  border-left: 4px solid ${props => props.$active ? Theme.primary : 'transparent'};
  
  &:hover {
    background-color: ${Theme.surfaceHover};
    color: ${Theme.textInverse};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  min-height: 100vh;
`;

const AdminLayout = () => {
  const location = usePathname();
  const router = useRouter();
  
  const menuItems = [
    { path: '/katib/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/katib/blogs', label: 'Blog Posts', icon: '📝' },
    { path: '/katib/create-blog', label: 'Create Blog', icon: '➕' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <AdminContainer>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>Admin Panel</SidebarTitle>
        </SidebarHeader>
        
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            $active={isActive(item.path)}
            onClick={() => router.push(item.path)}
          >
            <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
            {item.label}
          </NavItem>
        ))}
        
        <NavItem 
          onClick={() => {
            localStorage.removeItem('adminAuth');
            router.push('/');
          }}
          style={{ 
            marginTop: 'auto', 
            borderTop: `1px solid ${Theme.borderDark}`,
            paddingTop: '2rem'
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>🚪</span>
          Logout
        </NavItem>
      </Sidebar>
      
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout;

