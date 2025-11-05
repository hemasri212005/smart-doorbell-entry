# Render Deployment Configuration Guide

## Problem
Render is trying to build from `/opt/render/project/src/face-entry-guard/` but can't find `package.json` because the project structure is nested.

## Project Structure
```
smart-doorbell-entry/
├── backend/
│   ├── package.json      ← Backend (already deployed)
│   └── server.js
└── face-entry-guard/
    ├── package.json      ← Frontend (needs deployment)
    └── src/
```

## Solution: Configure Render Settings

### Option 1: Use Root Directory Setting (Recommended)

1. Go to **Render Dashboard** → Your Service → **Settings**

2. Scroll to **Build & Deploy** section

3. Set **Root Directory**:
   ```
   face-entry-guard
   ```

4. Set **Build Command**:
   ```
   npm install && npm run build
   ```

5. Set **Start Command** (for static sites):
   ```
   npm run preview
   ```
   
   Or if using Vite preview:
   ```
   npx vite preview --host 0.0.0.0 --port $PORT
   ```

6. **Environment Variables** (if needed):
   ```
   VITE_API_BASE_URL=https://smart-doorbell-entry.onrender.com/api
   ```

### Option 2: Use Custom Build Commands

If Root Directory option doesn't work, use custom commands:

**Build Command:**
```bash
cd face-entry-guard && npm install && npm run build
```

**Start Command:**
```bash
cd face-entry-guard && npx vite preview --host 0.0.0.0 --port $PORT
```

### Option 3: Deploy as Static Site

If deploying frontend separately:

1. **Service Type**: Choose **Static Site**

2. **Root Directory**: `face-entry-guard`

3. **Build Command**: `npm install && npm run build`

4. **Publish Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_BASE_URL=https://smart-doorbell-entry.onrender.com/api
   ```

## Recommended Render Service Configuration

### For Frontend (Static Site)

**Service Type**: Static Site  
**Root Directory**: `face-entry-guard`  
**Build Command**: `npm install && npm run build`  
**Publish Directory**: `dist`  
**Environment**: `Node`  
**Node Version**: `18` or `20`

### Environment Variables
```
VITE_API_BASE_URL=https://smart-doorbell-entry.onrender.com/api
```

## Alternative: Use render.yaml

Create a `render.yaml` file in the root of your repository:

```yaml
services:
  - type: web
    name: face-entry-guard-frontend
    env: static
    rootDir: face-entry-guard
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_BASE_URL
        value: https://smart-doorbell-entry.onrender.com/api
```

## Verification Steps

1. Push changes to GitHub
2. Render should auto-deploy
3. Check build logs for successful build
4. Visit your frontend URL

## Troubleshooting

### If build fails:
- Check Root Directory is set correctly
- Verify `package.json` exists in `face-entry-guard/`
- Check build logs for specific errors
- Ensure Node version is compatible (18+)

### If models don't load:
- Models are in `public/models/weights/`
- Make sure `public/` folder is included in build
- Check browser console for 404 errors

## Next Steps

1. Update Render service settings with Root Directory
2. Set build and start commands
3. Add environment variables
4. Redeploy service
5. Test frontend connection to backend
