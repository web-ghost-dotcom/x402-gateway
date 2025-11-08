# Sign In With Solana (SIWS) Implementation Guide

## Overview
This application implements Sign In With Solana (SIWS) for secure, wallet-based authentication. Users sign in using their Solana wallet (Phantom, Solflare, etc.) without needing passwords or traditional authentication.

## Features Implemented

### 1. **WalletProvider** (`src/context/WalletProvider.tsx`)
- Configures Solana wallet adapter
- Supports multiple wallets (Phantom, Solflare)
- Implements SIWS auto-sign-in flow
- Handles wallet connection and authentication

### 2. **AuthContext** (`src/context/AuthContext.tsx`)
- Manages authentication state
- Persists session in localStorage
- Provides authentication methods (login, logout)
- Exposes wallet address to components

### 3. **LoginPage** (`src/components/LoginPage.tsx`)
- Beautiful, themed login UI matching your app design
- Wallet selection and connection
- SIWS signature verification
- Error handling and success feedback
- Auto-redirect to dashboard on successful authentication

### 4. **App.tsx** (Updated)
- Authentication-aware routing
- Shows LoginPage for unauthenticated users
- Shows Dashboard for authenticated users
- Added logout button with wallet address display

## Configuration Required

### 1. **Network Configuration** (WalletProvider.tsx)
```typescript
// Line 15: Update network for production
const network = WalletAdapterNetwork.Devnet; // Change to Mainnet for production
```

### 2. **RPC Endpoint** (WalletProvider.tsx)
```typescript
// Line 19: Replace with your own RPC endpoint
const endpoint = useMemo(() => clusterApiUrl(network), [network]);

// For production, use a dedicated RPC provider:
// const endpoint = 'https://your-rpc-endpoint.com';
// Recommended providers: Helius, QuickNode, Alchemy
```

### 3. **Chain ID** (LoginPage.tsx & WalletProvider.tsx)
```typescript
// Update chainId in both files
chainId: 'devnet', // Change to 'mainnet' for production
```

### 4. **Application URLs** (LoginPage.tsx & WalletProvider.tsx)
```typescript
// Update resources array with your actual URLs
resources: [
  'https://your-app.com',  // Replace with your domain
  'https://phantom.app/'
],
```

### 5. **Backend Integration** (Optional but Recommended)
For production, implement server-side:
- `createSignInData()` - Generate nonce and sign-in input server-side
- `verifySignIn()` - Verify signatures server-side for security

Current implementation uses client-side verification for development purposes.

## How It Works

### Authentication Flow:
1. **User lands on app** → LoginPage is displayed
2. **User clicks "Select Wallet"** → Wallet modal appears
3. **User selects wallet** → Wallet extension opens
4. **User approves connection** → SIWS sign-in request triggered
5. **User signs message** → Signature verified
6. **Success** → User redirected to Dashboard

### Sign In With Solana (SIWS) Process:
1. **Input Generation**: Create sign-in data with domain, nonce, timestamp
2. **Wallet Signs**: User signs the structured message
3. **Verification**: Signature is verified against the message
4. **Session Created**: Auth state is updated and persisted

## Security Features

- ✅ **Domain Binding**: Prevents phishing attacks
- ✅ **Nonce**: Prevents replay attacks
- ✅ **Timestamp Validation**: Time-bound authentication
- ✅ **No Gas Fees**: Off-chain signature, no blockchain transaction
- ✅ **Standardized Format**: Follows EIP-4361 (SIWS spec)

## Wallet Support

Currently supported wallets:
- 🟣 **Phantom** (recommended)
- 🟠 **Solflare**

To add more wallets, update the `wallets` array in `WalletProvider.tsx`:
```typescript
import { SolongWalletAdapter } from '@solana/wallet-adapter-wallets';

const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolongWalletAdapter(), // Add more wallets
  ],
  []
);
```

## Testing

### Development Testing:
1. Install a Solana wallet (Phantom recommended)
2. Switch wallet to **Devnet**
3. Run the app: `npm run dev`
4. Click "Select Wallet" and connect
5. Sign the message when prompted

### Production Checklist:
- [ ] Update network to `Mainnet`
- [ ] Configure production RPC endpoint
- [ ] Update `chainId` to `'mainnet'`
- [ ] Replace placeholder URLs with actual domain
- [ ] Implement server-side verification
- [ ] Set up proper nonce generation (server-side)
- [ ] Add rate limiting
- [ ] Implement session management
- [ ] Add analytics/logging

## Environment Variables (Recommended)

Create a `.env` file:
```env
VITE_SOLANA_NETWORK=devnet
VITE_RPC_ENDPOINT=https://api.devnet.solana.com
VITE_APP_URL=http://localhost:5173
```

Then update the code to use these:
```typescript
const network = import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork;
const endpoint = import.meta.env.VITE_RPC_ENDPOINT;
```

## Troubleshooting

### Wallet Not Connecting:
- Ensure wallet extension is installed
- Check wallet is on correct network (Devnet/Mainnet)
- Clear browser cache and reload

### Signature Verification Fails:
- Check timestamp isn't too old (±10 minutes threshold)
- Verify domain matches current URL
- Ensure nonce is properly generated

### Session Not Persisting:
- Check browser's localStorage is enabled
- Verify AuthContext is properly wrapped in main.tsx

## Dependencies

```json
{
  "@solana/wallet-adapter-base": "^0.9.23",
  "@solana/wallet-adapter-react": "^0.15.34",
  "@solana/wallet-adapter-react-ui": "^0.9.35",
  "@solana/wallet-adapter-wallets": "^0.19.32",
  "@solana/wallet-standard-features": "^1.1.0",
  "@solana/wallet-standard-util": "^1.1.0",
  "@solana/web3.js": "^1.95.8",
  "bs58": "^6.0.0"
}
```

## Resources

- [SIWS Specification](https://github.com/phantom/sign-in-with-solana)
- [Medium Article](https://medium.com/@KishiTheMechanic/implementing-sign-in-with-solana-siws-ce35dadeda31)
- [Wallet Adapter Docs](https://github.com/solana-labs/wallet-adapter)
- [Phantom Wallet](https://phantom.app/)

## Support

For issues or questions:
1. Check console for error messages
2. Verify wallet connection and network
3. Review this documentation
4. Check official SIWS repository

---

**Note**: This implementation uses client-side verification for development. For production, implement proper server-side verification and nonce management.
