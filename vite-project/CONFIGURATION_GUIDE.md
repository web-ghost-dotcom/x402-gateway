# 🔧 Configuration Placeholders - Quick Reference

This file lists ALL placeholder values that should be updated for production deployment.

## 📍 Location Guide

### 1. Network Configuration
**File**: `src/context/WalletProvider.tsx`
**Line**: ~15
```typescript
const network = WalletAdapterNetwork.Devnet;
```
**Update to**:
```typescript
const network = WalletAdapterNetwork.Mainnet; // For production
```

---

### 2. RPC Endpoint
**File**: `src/context/WalletProvider.tsx`
**Line**: ~19
```typescript
const endpoint = useMemo(() => clusterApiUrl(network), [network]);
```
**Update to** (choose one provider):
```typescript
// Option 1: Helius
const endpoint = 'https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY';

// Option 2: QuickNode
const endpoint = 'https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_API_KEY/';

// Option 3: Alchemy
const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY';
```

---

### 3. Chain ID (2 locations)

#### Location A:
**File**: `src/context/WalletProvider.tsx`
**Line**: ~98
```typescript
chainId: 'devnet',
```
**Update to**:
```typescript
chainId: 'mainnet',
```

#### Location B:
**File**: `src/components/LoginPage.tsx`
**Line**: ~217
```typescript
chainId: 'devnet',
```
**Update to**:
```typescript
chainId: 'mainnet',
```

---

### 4. Application Resources/URLs (2 locations)

#### Location A:
**File**: `src/context/WalletProvider.tsx`
**Line**: ~100-103
```typescript
resources: [
  'https://your-app.com',
  'https://phantom.app/'
],
```
**Update to**:
```typescript
resources: [
  'https://api-marketplace.yourdomain.com', // Your actual domain
  'https://phantom.app/'
],
```

#### Location B:
**File**: `src/components/LoginPage.tsx`
**Line**: ~219-222
```typescript
resources: [
  'https://your-app.com',
  'https://phantom.app/'
],
```
**Update to**:
```typescript
resources: [
  'https://api-marketplace.yourdomain.com', // Your actual domain
  'https://phantom.app/'
],
```

---

## 🎯 Search & Replace Guide

You can use these commands to find all placeholders:

```bash
# Find all TODO comments
grep -r "TODO:" src/

# Find devnet references
grep -r "devnet" src/

# Find placeholder URLs
grep -r "your-app.com" src/
```

---

## 📋 Production Deployment Checklist

Before going live, ensure you've updated:

- [ ] Network: Devnet → Mainnet (1 location)
- [ ] RPC Endpoint: Default → Your provider (1 location)
- [ ] Chain ID: 'devnet' → 'mainnet' (2 locations)
- [ ] Resources URLs: Placeholder → Your domain (2 locations)

**Total Updates Required**: 6 changes across 2 files

---

## 🔐 Backend Integration (Recommended)

For production, implement these server endpoints:

### Endpoint 1: Create Sign-In Data
**Path**: `/api/auth/create-signin-data`
**Method**: POST
**Purpose**: Generate nonce and sign-in input server-side

```typescript
// Example implementation
export async function POST(req: Request) {
  const nonce = generateSecureNonce(); // Crypto-secure random
  const signInData = {
    domain: req.headers.get('origin'),
    statement: 'Sign in to API Marketplace...',
    version: '1',
    nonce,
    chainId: 'mainnet',
    issuedAt: new Date().toISOString(),
    resources: ['https://your-domain.com']
  };
  
  // Store nonce in database/cache with expiry
  await storeNonce(nonce, { expiresIn: '10m' });
  
  return Response.json(signInData);
}
```

### Endpoint 2: Verify Sign-In
**Path**: `/api/auth/verify-signin`
**Method**: POST
**Purpose**: Verify signature and create session

```typescript
// Example implementation
export async function POST(req: Request) {
  const { input, output } = await req.json();
  
  // Verify nonce hasn't been used
  const nonceValid = await verifyNonce(input.nonce);
  if (!nonceValid) return Response.json({ error: 'Invalid nonce' }, { status: 400 });
  
  // Verify signature
  const verified = verifySignIn(input, output);
  if (!verified) return Response.json({ error: 'Invalid signature' }, { status: 401 });
  
  // Create session
  const session = await createSession({
    walletAddress: output.account.address,
    expiresIn: '7d'
  });
  
  // Mark nonce as used
  await invalidateNonce(input.nonce);
  
  return Response.json({ 
    success: true, 
    sessionToken: session.token 
  });
}
```

---

## 🌍 Environment Variables (Recommended)

Create a `.env` file in the root:

```env
# Solana Configuration
VITE_SOLANA_NETWORK=mainnet
VITE_SOLANA_RPC_ENDPOINT=https://your-rpc-endpoint.com/YOUR_API_KEY

# Application
VITE_APP_NAME=API Marketplace
VITE_APP_URL=https://api-marketplace.yourdomain.com
VITE_APP_DOMAIN=api-marketplace.yourdomain.com

# Backend (if applicable)
VITE_API_BASE_URL=https://api.yourdomain.com
```

Then update your code to use them:

```typescript
// src/context/WalletProvider.tsx
const network = import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork;
const endpoint = import.meta.env.VITE_SOLANA_RPC_ENDPOINT;

// src/components/LoginPage.tsx
const signInData: SolanaSignInInput = {
  domain: import.meta.env.VITE_APP_DOMAIN,
  // ... rest of config
  resources: [
    import.meta.env.VITE_APP_URL,
    'https://phantom.app/'
  ],
};
```

---

## 🚨 Important Security Notes

1. **Never expose private keys** in your code or environment variables
2. **Always use HTTPS** in production
3. **Validate all inputs** server-side
4. **Implement rate limiting** on authentication endpoints
5. **Use secure session management** with proper expiry
6. **Log all authentication attempts** for security monitoring
7. **Implement CSRF protection** for sensitive operations

---

## 📞 Support & Resources

If you need help configuring any of these:

- **RPC Providers**:
  - Helius: https://helius.dev
  - QuickNode: https://quicknode.com
  - Alchemy: https://alchemy.com

- **Solana Documentation**:
  - Network Details: https://docs.solana.com/clusters
  - RPC API: https://docs.solana.com/api

- **Wallet Adapter**:
  - GitHub: https://github.com/solana-labs/wallet-adapter
  - Examples: https://github.com/solana-labs/wallet-adapter/tree/master/packages/starter

---

**Last Updated**: Implementation Date
**Status**: Development (Ready for Production Configuration)
