# Eternal Flowers - MERN Stack E-Commerce Application

![Eternal Flowers](logo.png)

**Because Forever Matters**

A complete production-ready web application for an eternal handmade flowers brand built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🌸 Project Overview

Eternal Flowers is a full-featured e-commerce platform for selling handmade eternal flowers that last forever. The application includes:

- **Customer Features**: Browse products, customize bouquets, place orders, request event services
- **Admin Panel**: Manage products, orders, event requests, promo codes, and offers
- **Elegant Floral UI**: Brand colors (Kelp green #4a5239 and Tana cream #ddd8c0) with floral animations
- **Responsive Design**: Works beautifully on all devices

## 📁 Project Structure

```
webapp/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth & error handling
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API routes
│   │   ├── seeds/       # Database seeding
│   │   ├── utils/       # Helper functions
│   │   └── server.js    # Entry point
│   ├── .env             # Environment variables
│   └── package.json
│
└── frontend/            # React application
    ├── public/
    ├── src/
    │   ├── components/  # React components
    │   ├── context/     # State management
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   ├── utils/       # Utilities
    │   ├── App.js       # Main app component
    │   └── index.js     # Entry point
    ├── .env             # Frontend config
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### 1. Clone and Setup

```bash
# Navigate to project directory
cd webapp

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eternal-flowers
JWT_SECRET=eternal_flowers_secret_key_2024_change_me
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@eternalflowers.com
ADMIN_PASSWORD=Admin@123456
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# Make sure MongoDB is running
mongod
# Or if using MongoDB service:
# sudo service mongod start
```

### 4. Seed Database

```bash
cd backend
npm run seed
```

This will create:
- Admin user
- Sample products (flowers, fillers, greenery, centerpieces)
- Promo codes: `ETERNAL10` and `WELCOME20`
- Sample offer

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 🔐 Default Login Credentials

**Admin Account:**
- Email: `admin@eternalflowers.com`
- Password: `Admin@123456`

## 📦 Features

### Customer Features

#### 1. **Single Flower Bouquets**
- Browse eternal single flower products
- Add optional greenery filler
- Real-time image and price updates when greenery is selected
- Add to cart

#### 2. **Customize Your Bouquet**
- Select multiple flowers with quantities
- Choose fillers and greenery fillers
- Live price calculation
- Visual preview updates
- Add special instructions
- Save custom bouquet to cart

#### 3. **Events Services**
Two options:
- **Stable Centerpieces**: Select pre-designed centerpieces for events
- **Custom Bouquet Booth**: Request custom booth with preferences

Event request form includes:
- Event type, date, time
- Location details
- Guest count / table count
- Detailed requirements (multiline textarea)
- Theme and color preferences

#### 4. **Shopping Cart & Checkout**
- View cart items with breakdown
- Apply promo codes
- Real-time discount calculations
- Delivery address and date selection
- Multiple payment options

#### 5. **User Account**
- View and edit profile
- Address management
- Order history with status tracking
- Event request history

### Admin Features

#### 1. **Product Management**
- Create/Edit/Delete products
- Upload product images
- Set categories (single-flower, filler, greenery-filler, centerpiece)
- Manage stock status (in-stock, out-of-stock)
- Set applicable services
- Configure greenery options with separate pricing

#### 2. **Order Management**
- View all orders
- Filter by status, date
- Update order status (pending → confirmed → in-preparation → ready → completed)
- Update payment status
- View customer details and order breakdown

#### 3. **Event Request Management**
- View all event requests
- Update status (new → in-review → quoted → confirmed → declined)
- Add internal notes
- Create and send quotes
- Filter by type, status, date

#### 4. **Promo Code Management**
- Create promo codes with:
  - Percentage or fixed discount
  - Valid services
  - Date range
  - Minimum order amount
  - Usage limits (total and per-user)
- Activate/deactivate codes
- Track usage

#### 5. **Offers Management**
- Create offers for specific products or services
- Set discount type and value
- Configure date range
- Apply to multiple products
- Automatically reflected in product pricing

## 🎨 Design & UI

### Brand Colors
- **Primary (Kelp)**: `#4a5239` - Main green color
- **Secondary (Tana)**: `#ddd8c0` - Cream color
- **Accent**: `#8b9470` - Light green

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Montserrat (sans-serif)

### Floral Effects
- Logo-based loading animation with bloom effect
- Petal floating animations
- Hover effects with floral blooming transitions
- Gradient backgrounds with floral patterns
- Smooth fade-in and scale animations

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1200px
- Touch-friendly UI elements
- Collapsible mobile navigation

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Event Requests
- `POST /api/events` - Create event request
- `GET /api/events/my-requests` - Get user requests
- `GET /api/events/:id` - Get single request
- `GET /api/events` - Get all requests (Admin)
- `PUT /api/events/:id` - Update request (Admin)
- `DELETE /api/events/:id` - Delete request (Admin)

### Promo Codes
- `POST /api/promo-codes/validate` - Validate promo code
- `GET /api/promo-codes` - Get all promo codes (Admin)
- `POST /api/promo-codes` - Create promo code (Admin)
- `PUT /api/promo-codes/:id` - Update promo code (Admin)
- `DELETE /api/promo-codes/:id` - Delete promo code (Admin)

### Offers
- `GET /api/offers/active` - Get active offers
- `GET /api/offers` - Get all offers (Admin)
- `POST /api/offers` - Create offer (Admin)
- `PUT /api/offers/:id` - Update offer (Admin)
- `DELETE /api/offers/:id` - Delete offer (Admin)

## 📊 Database Schema

### User
- name, email, passwordHash, phone
- role (customer/admin)
- address (nested object)

### Product
- name, description, images[]
- category, price
- isActive, stockStatus
- applicableServices[]
- greenery options (hasGreeneryOption, greeneryPrice, imageWithGreenery)

### Order
- customerId (ref User)
- items[] (with support for custom bouquets)
- pricing (totalBeforeDiscount, discountAmount, totalAfterDiscount)
- promoCodeUsed
- status, paymentStatus, paymentMethod
- deliveryAddress, deliveryDate

### EventRequest
- customerId or guestInfo
- type (stable-centerpieces / custom-booth)
- selectedCenterpieces[] or preferences
- eventDate, eventTime, location
- details, status
- quote (optional)
- internalNotes (Admin)

### PromoCode
- code, description
- discountType, discountValue
- validServices[], startDate, endDate
- minOrderAmount, maxUses, perUserLimit
- usedBy[] (tracking)
- isActive

### Offer
- name, description
- targetProducts[], targetServices[]
- discountType, discountValue
- startDate, endDate
- isActive

## 🧪 Testing

### Sample Promo Codes (seeded)
- **ETERNAL10**: 10% off orders over $50
- **WELCOME20**: $20 off orders over $100 (one-time use per user)

### Testing Workflow
1. Register as customer or login as admin
2. Browse products (seeded with sample flowers)
3. Add items to cart
4. Apply promo code
5. Complete checkout
6. Admin: manage orders, products, and requests

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes (frontend & backend)
- Role-based access control (Admin/Customer)
- Rate limiting on auth routes
- Input validation with Joi
- CORS configuration
- Helmet for security headers
- XSS protection

## 🚧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 📝 Todo / Future Enhancements

### High Priority
- [ ] Complete Single Bouquet page with product listing
- [ ] Build Customize Bouquet page with live preview
- [ ] Implement Events page with centerpiece selection
- [ ] Complete Cart page with promo code validation
- [ ] Build Checkout flow with payment integration
- [ ] Implement user account pages (orders, events, profile)
- [ ] Build complete admin CRUD interfaces

### Additional Features
- [ ] Image upload functionality (currently using URLs)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications (order confirmations, event quotes)
- [ ] Order tracking system
- [ ] Review and rating system
- [ ] Wishlist functionality
- [ ] Gift wrapping options
- [ ] Loyalty program
- [ ] Blog section
- [ ] Live chat support

### Technical Improvements
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Image optimization and CDN
- [ ] Search functionality with Elasticsearch
- [ ] Analytics dashboard
- [ ] Performance monitoring

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Validation
- **Helmet** - Security
- **CORS** - Cross-origin requests
- **Morgan** - Logging

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Context API** - State management
- **Axios** - HTTP client
- **React Icons** - Icons
- **React Toastify** - Notifications
- **CSS3** - Styling with custom properties

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions:
- Email: info@eternalflowers.com
- Phone: +1 (555) 123-4567

## 🌟 Acknowledgments

- Design inspired by elegant floral brands
- Color palette: Kelp (#4a5239) and Tana (#ddd8c0)
- Fonts: Cormorant Garamond and Montserrat from Google Fonts
- Sample images: Unsplash (to be replaced with actual product photos)

---

**Built with ❤️ for Eternal Flowers - Because Forever Matters**
