// Browser-compatible blog storage using localStorage
class BlogStorageService {
  constructor() {
    this.storageKey = 'gpad_tester_blogs';
    this.initializeStorage();
  }

  // Initialize storage with mock data if empty
  initializeStorage() {
    const existingBlogs = this.getAllBlogs();
    if (existingBlogs.length === 0) {
      // Add some sample blogs
      const sampleBlogs = [
        {
          id: '1',
          title: "How to Fix PS5 Controller Drift Issues",
          slug: "ps5-controller-drift-fix",
          description: "Complete guide to diagnose and fix PS5 DualSense controller drift problems with step-by-step instructions.",
          content: "<h2>Understanding Controller Drift</h2><p>Controller drift occurs when your analog sticks register movement without any input...</p>",
          author: "Admin",
          tags: "PS5,DualSense,Troubleshooting,Repair",
          featuredImage: null,
          status: "published",
          views: 1250,
          createdAt: "2024-01-15T10:00:00.000Z",
          updatedAt: "2024-01-15T10:00:00.000Z"
        },
        {
          id: '2',
          title: "Best Gaming Headsets for 2025",
          slug: "best-gaming-headsets-2025",
          description: "Our top picks for gaming headsets in 2025, featuring the best audio quality and comfort.",
          content: "<h2>Top Gaming Headsets</h2><p>We've tested dozens of gaming headsets to bring you the best options...</p>",
          author: "Admin",
          tags: "Gaming,Headsets,Reviews,2025",
          featuredImage: null,
          status: "published",
          views: 890,
          createdAt: "2024-01-10T10:00:00.000Z",
          updatedAt: "2024-01-10T10:00:00.000Z"
        },
        {
          id: '3',
          title: "Xbox Controller Battery Life Optimization",
          slug: "xbox-controller-battery-life",
          description: "Tips and tricks to maximize your Xbox controller battery life and save money on batteries.",
          content: "<h2>Battery Saving Tips</h2><p>Learn how to extend your Xbox controller's battery life...</p>",
          author: "Admin",
          tags: "Xbox,Battery,Optimization,Tips",
          featuredImage: null,
          status: "draft",
          views: 0,
          createdAt: "2024-01-08T10:00:00.000Z",
          updatedAt: "2024-01-08T10:00:00.000Z"
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(sampleBlogs));
    }
  }

  // Generate slug from title
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Get all blogs from both localStorage and static JSON
  getAllBlogs() {
    try {
      const blogs = localStorage.getItem(this.storageKey);
      return blogs ? JSON.parse(blogs) : [];
    } catch (error) {
      console.error('Error reading blogs:', error);
      return [];
    }
  }

  // Export blogs to downloadable JSON file
  exportBlogsToFile() {
    try {
      const blogs = this.getAllBlogs();
      const dataStr = JSON.stringify(blogs, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'blogs-export.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('✅ Blogs exported successfully');
      return true;
    } catch (error) {
      console.error('Error exporting blogs:', error);
      return false;
    }
  }

  // Import blogs from JSON file
  importBlogsFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const blogs = JSON.parse(e.target.result);
          localStorage.setItem(this.storageKey, JSON.stringify(blogs));
          console.log('✅ Blogs imported successfully');
          resolve(true);
        } catch (error) {
          console.error('Error parsing imported file:', error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };
      
      reader.readAsText(file);
    });
  }

  // Load blogs from static public JSON file (for production)
  async loadStaticBlogs() {
    try {
      const response = await fetch('/blogs/published-blogs.json');
      if (response.ok) {
        const staticBlogs = await response.json();
        // Merge with localStorage blogs
        const localBlogs = this.getAllBlogs();
        const mergedBlogs = [...localBlogs];
        
        // Add static blogs that don't exist in local storage
        staticBlogs.forEach(staticBlog => {
          if (!mergedBlogs.find(b => b.id === staticBlog.id)) {
            mergedBlogs.push(staticBlog);
          }
        });
        
        return mergedBlogs;
      }
    } catch (error) {
      console.log('No static blogs found, using localStorage only');
    }
    return this.getAllBlogs();
  }

  // Get blog by ID
  getBlogById(id) {
    const blogs = this.getAllBlogs();
    return blogs.find(blog => blog.id === id) || null;
  }

  // Get blog by slug
  getBlogBySlug(slug) {
    const blogs = this.getAllBlogs();
    return blogs.find(blog => blog.slug === slug) || null;
  }

  // Create a new blog post
  createBlog(blogData) {
    try {
      const blogs = this.getAllBlogs();
      const id = Date.now().toString();
      const slug = this.generateSlug(blogData.slug || blogData.title);
      const now = new Date().toISOString();

      const newBlog = {
        id,
        ...blogData,
        slug,
        status: blogData.publishImmediately ? 'published' : 'draft',
        views: 0,
        createdAt: now,
        updatedAt: now
      };

      blogs.push(newBlog);
      localStorage.setItem(this.storageKey, JSON.stringify(blogs));
      
      console.log('✅ Blog created successfully:', newBlog.title);
      return newBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      return null;
    }
  }

  // Update existing blog
  updateBlog(id, updates) {
    try {
      const blogs = this.getAllBlogs();
      const index = blogs.findIndex(blog => blog.id === id);
      
      if (index === -1) {
        console.error('Blog not found:', id);
        return null;
      }

      const updatedBlog = {
        ...blogs[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      // Handle slug change
      if (updates.slug || updates.title) {
        updatedBlog.slug = this.generateSlug(updates.slug || updates.title);
      }

      blogs[index] = updatedBlog;
      localStorage.setItem(this.storageKey, JSON.stringify(blogs));
      
      console.log('✅ Blog updated successfully:', updatedBlog.title);
      return updatedBlog;
    } catch (error) {
      console.error('Error updating blog:', error);
      return null;
    }
  }

  // Delete blog
  deleteBlog(id) {
    try {
      const blogs = this.getAllBlogs();
      const filteredBlogs = blogs.filter(blog => blog.id !== id);
      
      if (filteredBlogs.length === blogs.length) {
        console.error('Blog not found:', id);
        return false;
      }

      localStorage.setItem(this.storageKey, JSON.stringify(filteredBlogs));
      console.log('✅ Blog deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }

  // Toggle publish status
  togglePublish(id) {
    const blog = this.getBlogById(id);
    if (!blog) return null;

    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    return this.updateBlog(id, { status: newStatus });
  }

  // Get blog statistics
  getBlogStats() {
    const blogs = this.getAllBlogs();
    
    return {
      total: blogs.length,
      published: blogs.filter(blog => blog.status === 'published').length,
      drafts: blogs.filter(blog => blog.status === 'draft').length,
      totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
    };
  }

  // Search blogs
  searchBlogs(query) {
    const blogs = this.getAllBlogs();
    const lowerQuery = query.toLowerCase();
    
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.description.toLowerCase().includes(lowerQuery) ||
      (blog.tags && blog.tags.toLowerCase().includes(lowerQuery)) ||
      (blog.content && blog.content.toLowerCase().includes(lowerQuery))
    );
  }

  // Get published blogs only
  getPublishedBlogs() {
    const blogs = this.getAllBlogs();
    return blogs
      .filter(blog => blog.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

// Export singleton instance
const blogStorageService = new BlogStorageService();
export default blogStorageService;
