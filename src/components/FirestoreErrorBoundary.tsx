"use client";

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class FirestoreErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a Firestore internal error
    if (error.message?.includes('FIRESTORE') && error.message?.includes('INTERNAL ASSERTION FAILED')) {
      console.warn('Firestore internal error caught by boundary:', error.message);
      return { hasError: true, error };
    }
    
    // For other errors, re-throw them
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log Firestore errors for debugging
    if (error.message?.includes('FIRESTORE')) {
      console.error('Firestore Error Boundary caught an error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-center text-muted-foreground">
          <p>Temporary sync issue with real-time data.</p>
          <p className="text-xs mt-2">Please refresh the page if the issue persists.</p>
        </div>
      );
    }

    return this.props.children;
  }
}