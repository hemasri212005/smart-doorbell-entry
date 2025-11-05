# Backend URL Configuration

## Production Backend URL

The frontend is now configured to use the production backend:

**Backend URL:** `https://smart-doorbell-entry.onrender.com/api`

## Configuration Files Updated

### 1. API Client (`src/integrations/api/client.ts`)
- Default URL changed to: `https://smart-doorbell-entry.onrender.com/api`
- Can be overridden with `.env` file

### 2. Environment File (`.env`)
Create a `.env` file in the root directory with:
```
VITE_API_BASE_URL=https://smart-doorbell-entry.onrender.com/api
```

## API Endpoints

All endpoints are now pointing to production:
- **Auth:** `https://smart-doorbell-entry.onrender.com/api/auth`
- **Faces:** `https://smart-doorbell-entry.onrender.com/api/faces`
- **Logs:** `https://smart-doorbell-entry.onrender.com/api/logs`
- **Health:** `https://smart-doorbell-entry.onrender.com/api/health`

## Testing

The backend is accessible at: https://smart-doorbell-entry.onrender.com/

You can test it by:
1. Starting the frontend: `npm run dev`
2. Register/login will now use the production backend
3. All data will be saved to MongoDB Atlas

## Note

- The frontend will use production backend by default
- No need to run local backend server for frontend to work
- All authentication and data storage happens on Render.com backend
