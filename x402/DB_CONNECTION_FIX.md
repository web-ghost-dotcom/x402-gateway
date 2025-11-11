# Database Connection Fix - ECONNRESET Resolution

## Problem
The application was experiencing `ECONNRESET` errors when connecting to the PostgreSQL database, especially in production environments like Render. This occurs when:
- Connection pool timeouts were too long (30000s)
- No retry logic for transient connection failures
- No health checks or automatic reconnection
- Missing graceful shutdown handling

## Changes Made

### 1. **pool.ts** - Enhanced Connection Management

#### Configuration Updates
- **SSL Configuration**: Now uses `DB_SSL` environment variable with proper fallback
- **Reduced Timeouts**: 
  - `idleTimeoutMillis`: 30000ms (30s) - down from 30000000ms
  - `connectionTimeoutMillis`: 5000ms (5s) - down from 10000000ms
  - Added `query_timeout` and `statement_timeout`: 30000ms
- **Pool Size**: Increased max to 20, added min of 2 for production stability
- **Keep Alive**: Enabled TCP keep-alive with 10s initial delay

#### New Features
- **Connection Retry Logic**: `testConnection()` now retries up to 3 times with exponential backoff
- **Query Retry Wrapper**: `executeWithRetry()` automatically retries on connection errors:
  - Retries on: `ECONNRESET`, `ECONNREFUSED`, `ETIMEDOUT`, `EPIPE`, etc.
  - 2 retry attempts with 500ms delay
- **Connection State Tracking**: Monitors connection health
- **Auto-Reconnect**: Automatically attempts to reconnect after errors
- **Graceful Shutdown**: `closePool()` properly closes all connections

### 2. **service.ts** - Wrapped Critical Operations

All read operations now use `executeWithRetry()`:
- `getAPIListing()`
- `getAllAPIListings()` ✅ (fixes your error)
- `getAPIListingsByOwner()`
- `getAPIListingByName()`
- `getEndpointsByAPIId()`
- `getEndpoint()`

### 3. **init.ts** - Better Initialization

- Tests connection with 5 retries before attempting schema creation
- Fails fast with clear error message if connection cannot be established

### 4. **index.ts** - Production Ready Server

- **Health Check Endpoint**: `/gateway/health` now checks database connectivity
- **Periodic Health Checks**: Tests connection every 5 minutes
- **Graceful Shutdown**: Handles SIGTERM, SIGINT, uncaught exceptions
- **Proper Cleanup**: Closes database pool on shutdown

## Environment Variables for Production

Ensure these are set in your Render environment:

```bash
# Database Configuration
DB_HOST=aws-1-eu-west-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.msunicfjqntwstagquda
DB_PASSWORD=your_password_here
DB_SSL=true                    # Important for production!
DB_POOL_SIZE=20               # Adjust based on Render plan
```

## Deployment on Render

### Step 1: Update Environment Variables
1. Go to your Render dashboard
2. Navigate to your service
3. Go to "Environment" tab
4. Ensure `DB_SSL=true` is set
5. Verify all DB_* variables are correct

### Step 2: Build & Deploy Settings
```yaml
# render.yaml (if using)
services:
  - type: web
    name: x402-gateway
    env: node
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /gateway/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: DB_SSL
        value: true
```

### Step 3: Health Check Configuration
- Set Health Check Path: `/gateway/health`
- This endpoint returns 503 if database is disconnected

### Step 4: Monitor Logs
After deployment, watch for:
- ✅ Database connection successful
- ✅ Database initialized successfully
- ⚠️ Connection warnings/retries
- ❌ Connection failures

## Testing the Fix

### Local Testing
```bash
# Start the server
npm run dev

# Check health
curl http://localhost:4021/gateway/health

# Should return:
{
  "status": "healthy",
  "timestamp": "...",
  "registeredApis": 0,
  "database": "connected"
}
```

### Test Connection Resilience
```bash
# In another terminal, monitor logs while making requests
curl http://localhost:4021/api/listings

# The retry logic will handle transient failures
```

## Why This Fixes ECONNRESET

1. **Proper Timeouts**: Connections don't stay idle too long
2. **Retry Logic**: Transient network issues are automatically handled
3. **Keep-Alive**: TCP connections stay healthy
4. **Health Monitoring**: Issues are detected and logged
5. **Graceful Shutdown**: No abrupt connection closures
6. **Connection Pooling**: Efficiently manages connections for Render's environment

## Monitoring

Watch for these log messages:

### Good Signs ✅
- `✅ Database connection successful`
- `Database connection attempt 1/3 succeeded`
- `New database client connected`

### Warnings ⚠️
- `⚠️ Query failed with ECONNRESET, retrying`
- `⚠️ Database health check failed!`

### Errors ❌
- `❌ All database connection attempts failed`
- `❌ Database connection error`

## Additional Recommendations

1. **Supabase Connection Pooling**: Use Supabase's connection pooler (you already are with `pooler.supabase.com`)
2. **Render Instance Type**: Ensure your Render plan has sufficient resources
3. **Database Location**: Your DB is in EU (eu-west-1), if Render is in US, there may be latency
4. **Connection Limits**: Supabase free tier has connection limits, monitor usage
5. **Upgrade Supabase**: Consider paid tier for better connection stability

## Rollback Plan

If issues persist, you can temporarily increase retries:

```typescript
// In pool.ts, line ~60
export async function testConnection(retries = 5, delay = 2000)

// In pool.ts, line ~100
export async function executeWithRetry<T>(queryFn: () => Promise<T>, retries = 5)
```

## Support

If you still see ECONNRESET errors:
1. Check Supabase dashboard for connection limits
2. Verify database credentials
3. Check Render logs for network issues
4. Consider adding Redis for caching to reduce DB calls
