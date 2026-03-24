require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const PromoCode = require('../models/PromoCode');
const Offer = require('../models/Offer');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await PromoCode.deleteMany({});
    await Offer.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      passwordHash,
      phone: '+1234567890',
      role: 'admin',
    });
    console.log(`✅ Admin created: ${admin.email}`);

    // Create sample products
    console.log('🌸 Creating sample products...');
    
    // Single flowers
    const rose = await Product.create({
      name: 'Eternal Rose',
      description: 'Beautiful handmade eternal rose that lasts forever. Perfect for any occasion.',
      images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'],
      category: 'single-flower',
      price: 45,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
      imageWithGreenery: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    });

    const tulip = await Product.create({
      name: 'Eternal Tulip',
      description: 'Elegant handcrafted eternal tulip. A timeless beauty.',
      images: ['https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=400'],
      category: 'single-flower',
      price: 40,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
      imageWithGreenery: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400',
    });

    const lily = await Product.create({
      name: 'Eternal Lily',
      description: 'Graceful eternal lily, handmade with love and care.',
      images: ['https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400'],
      category: 'single-flower',
      price: 50,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const peony = await Product.create({
      name: 'Eternal Peony',
      description: 'Luxurious eternal peony, full and romantic.',
      images: ['https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=400'],
      category: 'single-flower',
      price: 55,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    // Fillers
    const babyBreath = await Product.create({
      name: "Baby's Breath",
      description: 'Delicate filler flowers for added elegance.',
      images: ['https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400'],
      category: 'filler',
      price: 8,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    const lavender = await Product.create({
      name: 'Dried Lavender',
      description: 'Aromatic dried lavender stems.',
      images: ['https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400'],
      category: 'filler',
      price: 12,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    // Greenery fillers
    const eucalyptus = await Product.create({
      name: 'Eucalyptus',
      description: 'Fresh eucalyptus greenery for natural touch.',
      images: ['https://images.unsplash.com/photo-1542262868-cec49cce6571?w=400'],
      category: 'greenery-filler',
      price: 15,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    const fern = await Product.create({
      name: 'Fern Leaves',
      description: 'Elegant fern leaves for added texture.',
      images: ['https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=400'],
      category: 'greenery-filler',
      price: 10,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    // Centerpieces
    const centerpiece1 = await Product.create({
      name: 'Classic Elegance Centerpiece',
      description: 'Timeless centerpiece with roses and greenery. Perfect for weddings and formal events.',
      images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'],
      category: 'centerpiece',
      price: 120,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['events'],
    });

    const centerpiece2 = await Product.create({
      name: 'Rustic Garden Centerpiece',
      description: 'Natural and rustic centerpiece with wildflowers and greenery.',
      images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400'],
      category: 'centerpiece',
      price: 100,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['events'],
    });

    console.log('✅ Products created');

    // Create sample promo code
    console.log('🎫 Creating promo code...');
    await PromoCode.create({
      code: 'ETERNAL10',
      description: '10% off your entire order',
      discountType: 'percentage',
      discountValue: 10,
      validServices: ['all'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      minOrderAmount: 50,
      isActive: true,
    });

    await PromoCode.create({
      code: 'WELCOME20',
      description: '$20 off your first order',
      discountType: 'fixed',
      discountValue: 20,
      validServices: ['all'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      minOrderAmount: 100,
      perUserLimit: 1,
      isActive: true,
    });

    console.log('✅ Promo codes created');

    // Create sample offer
    console.log('🎁 Creating offer...');
    await Offer.create({
      name: 'Spring Special - Roses',
      description: '15% off all eternal roses',
      targetProducts: [rose._id],
      targetServices: ['single-bouquet', 'customize-bouquet'],
      discountType: 'percentage',
      discountValue: 15,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      isActive: true,
    });

    console.log('✅ Offer created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    console.log('\n🎫 Sample Promo Codes:');
    console.log('   ETERNAL10 - 10% off orders over $50');
    console.log('   WELCOME20 - $20 off orders over $100 (one-time use)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
