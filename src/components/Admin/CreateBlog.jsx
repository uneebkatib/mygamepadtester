'use client'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogStorageService from '../../services/blogStorageService';

const CreateContainer = styled.div`
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

const Form = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${Theme.textPrimary};
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${Theme.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${Theme.inputBackground};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${Theme.inputFocus};
    box-shadow: 0 0 0 3px ${Theme.glow};
  }
  
  &::placeholder {
    color: ${Theme.textMuted};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid ${Theme.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${Theme.inputBackground};
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${Theme.inputFocus};
    box-shadow: 0 0 0 3px ${Theme.glow};
  }
  
  &::placeholder {
    color: ${Theme.textMuted};
  }
`;

const EditorWrapper = styled.div`
  border: 2px solid ${Theme.inputBorder};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${Theme.inputBackground};
  
  .ql-toolbar {
    background-color: ${Theme.inputBackground};
    border-bottom: 1px solid ${Theme.inputBorder};
  }
  
  .ql-container {
    min-height: 400px;
    background-color: ${Theme.inputBackground};
  }
  
  &:focus-within {
    border-color: ${Theme.inputFocus};
    box-shadow: 0 0 0 3px ${Theme.glow};
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${Theme.inputBorder};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${props => props.$isDragging ? Theme.surfaceHover : Theme.inputBackground};
  cursor: pointer;
  
  &:hover {
    border-color: ${Theme.inputFocus};
    background-color: ${Theme.surfaceHover};
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${Theme.textMuted};
`;

const UploadText = styled.div`
  color: ${Theme.textMuted};
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.div`
  color: ${Theme.textMuted};
  font-size: 0.8rem;
`;

const PreviewImage = styled.div`
  margin-top: 1rem;
  text-align: center;
  
  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    box-shadow: ${Theme.shadow} 0 4px 12px;
  }
`;

const RemoveButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${Theme.primary};
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.$variant === 'primary' ? Theme.primary : Theme.accent}, ${props => props.$variant === 'primary' ? Theme.primaryHover : Theme.accentLight});
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    author: 'Admin',
    tags: '',
    publishImmediately: true
  });
  
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEditorChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, featuredImage: 'Please upload an image file' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, featuredImage: 'Image size must be less than 5MB' }));
        return;
      }
      
      setFeaturedImage(file);
      setErrors(prev => ({ ...prev, featuredImage: '' }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Trigger the file input
      const fileInput = document.getElementById('featuredImage');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      fileInput.files = dataTransfer.files;
      handleImageUpload({ target: fileInput });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!featuredImage && formData.publishImmediately) {
      newErrors.featuredImage = 'Featured image is required for published posts';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Convert featured image to base64 for localStorage
      let featuredImageData = null;
      if (featuredImage) {
        featuredImageData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(featuredImage);
        });
      }
      
      // Create blog data object
      const blogData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        tags: formData.tags,
        featuredImage: featuredImageData,
        publishImmediately: formData.publishImmediately
      };
      
      // Save to localStorage
      const createdBlog = blogStorageService.createBlog(blogData);
      
      if (createdBlog) {
        console.log('Blog created successfully:', createdBlog);
        alert(`Blog "${createdBlog.title}" has been ${createdBlog.status === 'published' ? 'published' : 'saved as draft'}!`);
        // Navigate back to blog management
        router.push('/katib/blogs');
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    document.getElementById('featuredImage').value = '';
  };

  return (
    <CreateContainer>
      <PageTitle>Create New Blog Post</PageTitle>
      
      <Form onSubmit={handleSubmit}>
        <LeftColumn>
          <FormGroup>
            <Label htmlFor="title">Blog Title *</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              type="text"
              name="slug"
              placeholder="auto-generated-from-title"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
            {errors.slug && <ErrorMessage>{errors.slug}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Meta Description *</Label>
            <TextArea
              id="description"
              name="description"
              placeholder="Enter a brief description for SEO..."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="content">Blog Content *</Label>
            <EditorWrapper>
              <ReactQuill
                value={formData.content}
                onChange={handleEditorChange}
                placeholder="Start writing your blog post..."
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
                formats={[
                  'header', 'font',
                  'bold', 'italic', 'underline', 'strike',
                  'list', 'bullet', 'align',
                  'link', 'image'
                ]}
              />
            </EditorWrapper>
            {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
          </FormGroup>
        </LeftColumn>
        
        <RightColumn>
          <FormGroup>
            <Label>Featured Image *</Label>
            <UploadArea
              $isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('featuredImage').click()}
            >
              <UploadIcon>📷</UploadIcon>
              <UploadText>Click or drag image to upload</UploadText>
              <UploadSubtext>Supports JPG, PNG, GIF (max 5MB)</UploadSubtext>
              <input
                id="featuredImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </UploadArea>
            
            {featuredImage && (
              <PreviewImage>
                <img 
                  src={URL.createObjectURL(featuredImage)} 
                  alt="Preview" 
                />
                <RemoveButton onClick={removeImage}>
                  Remove Image
                </RemoveButton>
              </PreviewImage>
            )}
            
            {errors.featuredImage && <ErrorMessage>{errors.featuredImage}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              name="tags"
              placeholder="gamepad, controller, ps5, xbox"
              value={formData.tags}
              onChange={handleInputChange}
            />
            <UploadSubtext>Comma-separated tags for categorization</UploadSubtext>
          </FormGroup>
          
          <FormGroup>
            <Label>Publication Settings</Label>
            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="publishImmediately"
                name="publishImmediately"
                checked={formData.publishImmediately}
                onChange={handleInputChange}
              />
              <Label htmlFor="publishImmediately" style={{ fontWeight: 'normal', fontSize: '1rem' }}>
                Publish immediately (uncheck to save as draft)
              </Label>
            </CheckboxGroup>
          </FormGroup>
        </RightColumn>
      
        <ButtonGroup>
          <Button type="submit" $variant="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Blog Post'}
            <span>📝</span>
          </Button>
          <Button 
            type="button" 
            $variant="accent"
            onClick={() => router.push('/katib/blogs')}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </CreateContainer>
  );
};

export default CreateBlog;

