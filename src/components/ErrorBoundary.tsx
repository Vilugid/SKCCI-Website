import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleClearCacheAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-red-50 text-[#C82323] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
              Something went wrong
            </h1>
            
            <p className="text-sm text-gray-600 mb-6">
              An unexpected error occurred while loading this page. You can reload or reset your local session.
            </p>

            {this.state.error?.message && (
              <div className="mb-6 p-3 bg-gray-50 rounded-xl text-left text-xs font-mono text-gray-700 border border-gray-200 overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#C82323] hover:bg-[#a11b1b] text-white font-medium rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <RefreshCw size={18} />
                Reload Page
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors cursor-pointer"
              >
                <Home size={18} />
                Return to Home
              </button>

              <button
                onClick={this.handleClearCacheAndReload}
                className="w-full text-xs text-gray-500 hover:text-red-600 py-2 transition-colors cursor-pointer"
              >
                Clear Local Data & Re-sync
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
