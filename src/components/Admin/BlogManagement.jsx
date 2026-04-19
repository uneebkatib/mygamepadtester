'use client'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import blogStorageService from '../../services/blogStorageService';

const ManagementContainer = styled.div`
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

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.variant === 'primary' ? Theme.primary : Theme.accent}, ${props => props.variant === 'primary' ? Theme.primaryHover : Theme.accentLight});
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
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

const BlogTable = styled.div`
  background-color: ${Theme.backgroundLight};
  border-radius: 12px;
  border: 1px solid ${Theme.borderLight};
  box-shadow: ${Theme.shadow} 0 4px 12px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background-color: ${Theme.surface};
  border-bottom: 1px solid ${Theme.borderLight};
`;

const TableHeaderItem = styled.div`
  color: ${Theme.textSecondary};
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${Theme.borderLight};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${Theme.surfaceHover};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const BlogTitle = styled.div`
  color: ${Theme.textPrimary};
  font-weight: 600;
  font-size: 1rem;
`;

const BlogDate = styled.div`
  color: ${Theme.textMuted};
  font-size: 0.9rem;
`;

const BlogStatus = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => props.status === 'published' ? '#ECFDF5' : '#FEF3C7'};
  color: ${props => props.status === 'published' ? '#059669' : '#D97706'};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${Theme.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${Theme.borderLight};
    color: ${Theme.primary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${Theme.textMuted};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load blogs from localStorage
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    setLoading(true);
    const allBlogs = blogStorageService.getAllBlogs();
    setBlogs(allBlogs);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleExport = () => {
    const success = blogStorageService.exportBlogsToFile();
    if (success) {
      alert(`✅ Blogs exported successfully!

📋 DEPLOYMENT INSTRUCTIONS:
1. Save the downloaded 'blogs-export.json' file
2. Copy it to: public/blogs/published-blogs.json
3. Commit and push to your repository
4. Deploy to your server (Netlify/Vercel)

💡 The blogs will now appear on your live website!`);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      blogStorageService.importBlogsFromFile(file)
        .then(() => {
          alert('Blogs imported successfully!');
          loadBlogs();
        })
        .catch((error) => {
          alert('Failed to import blogs. Please check the file format.');
          console.error(error);
        });
    }
  };

  const handleEdit = (blogId) => {
    router.push(`/katib/edit-blog/${blogId}`);
  };

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const success = blogStorageService.deleteBlog(blogId);
      if (success) {
        loadBlogs(); // Reload blogs after deletion
      }
    }
  };

  const handlePublish = (blogId) => {
    const updatedBlog = blogStorageService.togglePublish(blogId);
    if (updatedBlog) {
      loadBlogs(); // Reload blogs after status change
    }
  };

  return (
    <ManagementContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <PageTitle>Blog Management</PageTitle>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="accent" onClick={handleExport}>
            <span>💾</span>
            Export Blogs
          </Button>
          <Button variant="accent" onClick={() => document.getElementById('import-blogs').click()}>
            <span>📂</span>
            Import Blogs
          </Button>
          <input 
            id="import-blogs" 
            type="file" 
            accept=".json" 
            onChange={handleImport} 
            style={{ display: 'none' }} 
          />
          <Button variant="primary" onClick={() => router.push('/katib/create-blog')}>
            <span>➕</span>
            Create New Blog
          </Button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.2rem', color: Theme.textMuted }}>Loading blogs...</div>
        </div>
      ) : blogs.length === 0 ? (
        <BlogTable>
          <EmptyState>
            <h3>No Blog Posts Found</h3>
            <p>Start creating your first blog post by clicking the button above.</p>
            <Button variant="primary" onClick={() => router.push('/katib/create-blog')}>
              Create Your First Blog
            </Button>
          </EmptyState>
        </BlogTable>
      ) : (
        <BlogTable>
          <TableHeader>
            <TableHeaderItem>Title</TableHeaderItem>
            <TableHeaderItem>Date</TableHeaderItem>
            <TableHeaderItem>Status</TableHeaderItem>
            <TableHeaderItem>Actions</TableHeaderItem>
            <TableHeaderItem>Controls</TableHeaderItem>
          </TableHeader>
          
          {blogs.map(blog => (
            <BlogRow key={blog.id}>
              <div>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogDate>{formatDate(blog.createdAt)}</BlogDate>
              </div>
              <div>
                <BlogDate>{formatDate(blog.updatedAt)}</BlogDate>
              </div>
              <div>
                <BlogStatus status={blog.status}>
                  {blog.status}
                </BlogStatus>
              </div>
              <div>
                <ActionButton onClick={() => handleEdit(blog.id)} title="Edit">
                  ✏️
                </ActionButton>
                <ActionButton onClick={() => handleDelete(blog.id)} title="Delete" style={{ marginLeft: '0.5rem' }}>
                  �-�️
                </ActionButton>
              </div>
              <div>
                <ActionButton onClick={() => handlePublish(blog.id)} title={blog.status === 'published' ? 'Unpublish' : 'Publish'}>
                  {blog.status === 'published' ? '👁️' : '📤'}
                </ActionButton>
              </div>
            </BlogRow>
          ))}
        </BlogTable>
      )}
    </ManagementContainer>
  );
};

export default BlogManagement;

