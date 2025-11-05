# MongoDB Connection Status

## ✅ Connection Configured

Your MongoDB connection is configured to use:

**Connection String:**
```
mongodb+srv://srihamsinimrunalini21_db_user:egWLS8BJ2QvflfDt@cluster0.fkpyxvf.mongodb.net/face-entry-guard?retryWrites=true&w=majority
```

**Database Name:** `face-entry-guard`

## How to Verify Connection

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

### 2. Check for Connection Messages

When the server starts, you should see:

```
✅ Connected to MongoDB Atlas
📊 Database: face-entry-guard
🚀 Server is running on http://localhost:5000
```

### 3. If Connection Fails

If you see connection errors, check:

- ✅ MongoDB Atlas cluster is running
- ✅ Your IP address is whitelisted in MongoDB Atlas Network Access
- ✅ Username and password are correct
- ✅ Database name is correct (`face-entry-guard`)

### 4. Test the Connection

You can test the connection by:

1. **Register a user** through the frontend
2. **Check MongoDB Atlas** dashboard → Browse Collections → `users` collection
3. You should see the registered user data

## Connection String Format

The connection string includes:
- ✅ Username: `srihamsinimrunalini21_db_user`
- ✅ Password: `egWLS8BJ2QvflfDt`
- ✅ Cluster: `cluster0.fkpyxvf.mongodb.net`
- ✅ Database: `face-entry-guard`
- ✅ Connection options: `retryWrites=true&w=majority`

## Status

The MongoDB connection is configured correctly in `server.js` and `.env` file. Start the server to verify the connection!
