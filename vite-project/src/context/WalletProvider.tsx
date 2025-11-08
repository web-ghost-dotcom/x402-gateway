import React, { useMemo, useCallback } from 'react';
import type { FC } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import type { Adapter } from '@solana/wallet-adapter-base';
import type { SolanaSignInInput } from '@solana/wallet-standard-features';
import { verifySignIn } from '@solana/wallet-standard-util';

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  // Configure network (mainnet-beta, testnet, devnet)
  // TODO: Update this to match your desired network
  const network = WalletAdapterNetwork.Devnet;

  // RPC endpoint
  // TODO: Replace with your own RPC endpoint for production
  // You can use services like Helius, QuickNode, or Alchemy
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // Add more wallet adapters as needed
    ],
    []
  );

  // Auto-sign-in callback for SIWS (Sign In With Solana)
  const autoSignIn = useCallback(async (adapter: Adapter) => {
    // Check if the wallet supports the signIn feature
    if (!('signIn' in adapter)) {
      console.log('Wallet does not support Sign In With Solana');
      return true; // Auto-connect instead
    }

    try {
      // Create sign-in input
      const signInInput: SolanaSignInInput = await createSignInData();

      // Trigger sign-in request
      const output = await adapter.signIn(signInInput);

      // Verify the sign-in output
      // In production, this should be done server-side
      const verified = verifySignIn(signInInput, output);

      if (!verified) {
        throw new Error('Sign In verification failed!');
      }

      console.log('Sign In With Solana successful!');
      return false; // Don't auto-connect, we've already signed in
    } catch (error) {
      console.error('Sign In With Solana error:', error);
      throw error;
    }
  }, []);

  const onError = useCallback((error: Error) => {
    console.error('Wallet error:', error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider 
        wallets={wallets} 
        onError={onError}
        autoConnect={autoSignIn}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

// Create sign-in data (should be generated server-side in production)
async function createSignInData(): Promise<SolanaSignInInput> {
  const now = new Date();
  const uri = window.location.href;
  const currentUrl = new URL(uri);
  const domain = currentUrl.host;
  const currentDateTime = now.toISOString();

  // Generate a random nonce (in production, this should come from the server)
  const nonce = generateNonce();

  const signInData: SolanaSignInInput = {
    domain,
    statement: 'Sign in to API Marketplace. This request will not trigger any blockchain transaction or cost any gas fees.',
    version: '1',
    nonce,
    chainId: 'devnet', // TODO: Change to 'mainnet' for production
    issuedAt: currentDateTime,
    // TODO: Add your application URLs
    resources: [
      'https://your-app.com',
      'https://phantom.app/'
    ],
  };

  return signInData;
}

// Generate a random nonce (minimum 8 alphanumeric characters)
function generateNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 12; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}
