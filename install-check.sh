#!/bin/bash

echo "🌸 Eternal Flowers - Installation Test Script"
echo "=============================================="
echo ""

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js v14 or higher."
    exit 1
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm not found. Please install npm."
    exit 1
fi

# Check MongoDB
echo "Checking MongoDB..."
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo "✅ MongoDB installed: $MONGO_VERSION"
else
    echo "⚠️  MongoDB not found. Please install MongoDB or ensure it's running."
fi

echo ""
echo "Checking project structure..."

# Check backend
if [ -d "backend" ]; then
    echo "✅ Backend directory exists"
    if [ -f "backend/package.json" ]; then
        echo "✅ Backend package.json found"
    fi
    if [ -f "backend/.env" ]; then
        echo "✅ Backend .env file found"
    else
        echo "⚠️  Backend .env not found (will be created from .env.example)"
    fi
else
    echo "❌ Backend directory not found"
    exit 1
fi

# Check frontend
if [ -d "frontend" ]; then
    echo "✅ Frontend directory exists"
    if [ -f "frontend/package.json" ]; then
        echo "✅ Frontend package.json found"
    fi
    if [ -f "frontend/.env" ]; then
        echo "✅ Frontend .env file found"
    else
        echo "⚠️  Frontend .env not found (create with REACT_APP_API_URL)"
    fi
else
    echo "❌ Frontend directory not found"
    exit 1
fi

echo ""
echo "✅ All checks passed! You're ready to:"
echo ""
echo "1. Install backend dependencies:"
echo "   cd backend && npm install"
echo ""
echo "2. Install frontend dependencies:"
echo "   cd frontend && npm install"
echo ""
echo "3. Start MongoDB (if not running):"
echo "   mongod"
echo ""
echo "4. Seed the database:"
echo "   cd backend && npm run seed"
echo ""
echo "5. Start the backend:"
echo "   cd backend && npm run dev"
echo ""
echo "6. Start the frontend (in new terminal):"
echo "   cd frontend && npm start"
echo ""
echo "🌸 Enjoy Eternal Flowers!"
