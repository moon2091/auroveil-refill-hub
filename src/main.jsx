import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Auroveil Refill Hub Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h2 style={{ color: '#e11d48', marginTop: 0 }}>Application Render Error</h2>
          <pre style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px' }}>
            {this.state.error?.stack || this.state.error?.message || String(this.state.error)}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', background: '#047857', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find root element #root');
}
