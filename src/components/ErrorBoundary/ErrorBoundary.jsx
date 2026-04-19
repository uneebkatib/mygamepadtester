import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          color: '#DA7756',
          background: '#f8f8f8',
          borderRadius: '8px',
          margin: '1rem'
        }}>
          <h2>Something went wrong loading this component.</h2>
          <p>We're sorry for the inconvenience. The rest of the application continues to work normally.</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              <summary>Error Details</summary>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack ? 
                this.state.errorInfo.componentStack : 
                'No component stack available'}
            </details>
          )}
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#DA7756',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;