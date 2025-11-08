import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  walletAddress: string | null;
  setAuthenticated: (authenticated: boolean, address?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('siws_authenticated');
    const storedAddress = localStorage.getItem('siws_wallet_address');
    
    if (storedAuth === 'true' && storedAddress) {
      setIsAuthenticated(true);
      setWalletAddress(storedAddress);
    }
  }, []);

  const setAuthenticated = (authenticated: boolean, address?: string) => {
    setIsAuthenticated(authenticated);
    
    if (authenticated && address) {
      setWalletAddress(address);
      localStorage.setItem('siws_authenticated', 'true');
      localStorage.setItem('siws_wallet_address', address);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setWalletAddress(null);
    localStorage.removeItem('siws_authenticated');
    localStorage.removeItem('siws_wallet_address');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        walletAddress, 
        setAuthenticated, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
