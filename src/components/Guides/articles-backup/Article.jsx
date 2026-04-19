'use client'

import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import blogStorageService from "../../../services/blogStorageService";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";
// Optimized individual icon imports to reduce bundle size
import { FiCalendar, FiUser, FiTag, FiArrowLeft } from "react-icons/fi";

const ArticleHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${Theme.border};
  padding-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${Theme.textPrimary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  color: ${Theme.textSecondary};
  font-size: 0.9rem;
  flex-wrap: wrap;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Content = styled.div`
  color: ${Theme.textPrimary};
  line-height: 1.8;
  font-size: 1.1rem;
  
  h2 {
    color: ${Theme.primary};
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  
  h3 {
    color: ${Theme.textPrimary};
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 1.5rem 0;
    box-shadow: ${Theme.shadow};
  }
  
  blockquote {
    border-left: 4px solid ${Theme.primary};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${Theme.textSecondary};
    background: ${Theme.surface};
    padding: 1rem;
    border-radius: 0 8px 8px 0;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${Theme.surface};
  color: ${Theme.textSecondary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid ${Theme.border};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${Theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${Theme.textSecondary};
  font-size: 1.2rem;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #ef4444;
  
  h2 {
    margin-bottom: 1rem;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: ${Theme.primary};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;

function Article() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Article: Mounting with slug:", slug);
    const loadBlog = async () => {
      setLoading(true);
      try {
        // Try to find blog by slug
        let foundBlog = blogStorageService.getBlogBySlug(slug);
        console.log("Article: Found in localStorage:", foundBlog);

        // If not found in local storage, try loading static blogs (in case of direct link)
        if (!foundBlog) {
          const allBlogs = await blogStorageService.loadStaticBlogs();
          foundBlog = allBlogs.find(b => b.slug === slug);
          console.log("Article: Found in static blogs:", foundBlog);
        }

        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.warn("Article: Blog not found for slug:", slug);
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error loading blog:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlog();
    } else {
      console.error("Article: No slug provided!");
    }
  }, [slug]);

  if (loading) {
    return (
      <StyledArticleWrapper>
        <LoadingState>Loading article...</LoadingState>
      </StyledArticleWrapper>
    );
  }

  if (error || !blog) {
    return (
      <StyledArticleWrapper>
        <ErrorState>
          <h2>⚠️ Article Not Found</h2>
          <p>The article you are looking for does not exist or has been removed.</p>
          <button onClick={() => router.push('/latest-articles')}>
            View Latest Articles
          </button>
        </ErrorState>
      </StyledArticleWrapper>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tags = blog.tags ? blog.tags.split(',').map(t => t.trim()) : [];

  return (
    <StyledArticleWrapper>
      <BackButton onClick={() => router.push(-1)}>
        <FiArrowLeft /> Back
      </BackButton>

      <ArticleHeader>
        <Title>{blog.title}</Title>
        <MetaInfo>
          <div>
            <FiCalendar />
            {formattedDate}
          </div>
          <div>
            <FiUser />
            {blog.author || 'Admin'}
          </div>
          {tags.length > 0 && (
            <div>
              <FiTag />
              {tags[0]}
            </div>
          )}
        </MetaInfo>
      </ArticleHeader>

      <Content dangerouslySetInnerHTML={{ __html: blog.content }} />

      {tags.length > 0 && (
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </Tags>
      )}
    </StyledArticleWrapper>
  );
}

export default Article;
