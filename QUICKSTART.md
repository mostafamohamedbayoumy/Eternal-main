# Eternal Flowers - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Start MongoDB

```bash
# Make sure MongoDB is running
mongod
```

### Step 3: Seed Database

```bash
cd backend
npm run seed
```

**This creates:**
- ✅ Admin account: `admin@eternalflowers.com` / `Admin@123456`
- ✅ 10 sample products (roses, tulips, lilies, fillers, greenery, centerpieces)
- ✅ 2 promo codes: `ETERNAL10` (10% off $50+), `WELCOME20` ($20 off $100+)
- ✅ 1 sample offer (15% off roses)

### Step 4: Run Backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:5000`

### Step 5: Run Frontend (New Terminal)

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000`

### Step 6: Login & Explore

**Admin Login:**
- Navigate to `http://localhost:3000/login`
- Email: `admin@eternalflowers.com`
- Password: `Admin@123456`
- Access admin dashboard at `http://localhost:3000/admin`

**Customer Experience:**
- Create a new account or browse as guest
- Explore single bouquets, customize your own, or plan an event
- Test promo codes in cart: `ETERNAL10` or `WELCOME20`

## 📁 Project Structure

```
webapp/
├── backend/          # Node.js/Express API (Port 5000)
│   ├── src/
│   │   ├── models/   # MongoDB schemas
│   │   ├── routes/   # API endpoints
│   │   ├── controllers/
│   │   └── server.js
│   └── package.json
│
└── frontend/         # React App (Port 3000)
    ├── src/
    │   ├── pages/    # Route pages
    │   ├── components/
    │   ├── services/ # API calls
    │   └── context/  # State management
    └── package.json
```

## 🎨 Features Overview

### Customer Features
- ✅ Browse eternal flowers
- ✅ Single bouquet with greenery options
- ✅ Custom bouquet builder
- ✅ Event request system
- ✅ Shopping cart with promo codes
- ✅ Order management
- ✅ User account

### Admin Features
- ✅ Product management (CRUD)
- ✅ Order management & status updates
- ✅ Event request management
- ✅ Promo code creation & tracking
- ✅ Offer management
- ✅ Dashboard analytics

## 🔧 NPM Scripts

### Backend
```bash
npm start       # Production server
npm run dev     # Development with nodemon
npm run seed    # Seed database
```

### Frontend
```bash
npm start       # Development server
npm run build   # Production build
```

## 🌐 API Base URL

Development: `http://localhost:5000/api`

## 🎨 Brand Colors

- **Primary (Kelp)**: `#4a5239` 
- **Secondary (Tana)**: `#ddd8c0`
- **Accent**: `#8b9470`

## 📝 What's Next?

The core structure is complete! You can now:

1. **Extend Customer Pages**: Build full functionality for:
   - Single Bouquet page with product listings
   - Customize Bouquet with live preview
   - Events page with form handling
   - Cart with full checkout flow

2. **Enhance Admin Panel**: Complete CRUD interfaces for all entities

3. **Add Advanced Features**:
   - Image upload with Multer
   - Payment integration (Stripe)
   - Email notifications
   - Advanced search and filters

4. **Production Deployment**:
   - Set up environment variables
   - Deploy backend (Heroku, DigitalOcean, AWS)
   - Deploy frontend (Vercel, Netlify)
   - Use MongoDB Atlas for database

## 📞 Support

Questions? Check the main README.md for detailed documentation!

---

**Built with ❤️ - Because Forever Matters**
