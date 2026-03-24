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

    // ── Single Flowers ──────────────────────────────────────────────

    const dahlia = await Product.create({
      name: 'Eternal Dahlia',
      description: 'Stunning handmade eternal dahlia in rich purple velvet. A bold and elegant statement flower that lasts forever.',
      category: 'single-flower',
      price: 50,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const valentineRose = await Product.create({
      name: 'Eternal Valentine Rose',
      description: 'Romantic handmade eternal rose in deep burgundy velvet with rosebud detail. The perfect symbol of love.',
      category: 'single-flower',
      price: 55,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const hibiscus = await Product.create({
      name: 'Eternal Hibiscus',
      description: 'Vibrant handmade eternal hibiscus in sunny yellow. A tropical beauty that brings warmth to any space.',
      category: 'single-flower',
      price: 48,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const lotus = await Product.create({
      name: 'Eternal Lotus',
      description: 'Exquisite handmade eternal lotus in deep magenta with soft pink center and green leaves. A symbol of purity and grace.',
      category: 'single-flower',
      price: 60,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const swirlRose = await Product.create({
      name: 'Eternal Swirl Rose',
      description: 'Charming handmade eternal swirl rose in bright red-orange with delicate leaf detail. Petite and perfect.',
      category: 'single-flower',
      price: 40,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const tulip = await Product.create({
      name: 'Eternal Tulip',
      description: 'Elegant handmade eternal tulip in soft pink velvet. A timeless classic with graceful form.',
      category: 'single-flower',
      price: 42,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const calaLilies = await Product.create({
      name: 'Eternal Cala Lilies',
      description: 'Delicate handmade eternal cala lilies in white with yellow centers. A pair of graceful blooms on a single stem.',
      category: 'single-flower',
      price: 52,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const largeCalaLily = await Product.create({
      name: 'Eternal Large Cala Lily',
      description: 'Dramatic handmade eternal cala lily in deep crimson red with elegant leaf detail. A bold and stunning statement piece.',
      category: 'single-flower',
      price: 58,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const hybridRose = await Product.create({
      name: 'Eternal Hybrid Rose',
      description: 'Beautiful handmade eternal hybrid rose in soft pink with delicate stamen details. A unique and romantic bloom.',
      category: 'single-flower',
      price: 50,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const rose = await Product.create({
      name: 'Eternal Rose',
      description: 'Classic handmade eternal rose in deep burgundy velvet with lush leaves. A timeless symbol of beauty and love.',
      category: 'single-flower',
      price: 45,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const babyFlowers = await Product.create({
      name: 'Eternal Baby Flowers',
      description: 'Dainty handmade eternal baby flowers in white with tiny buds on a single stem. Perfect as an accent or filler.',
      category: 'single-flower',
      price: 35,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const peony = await Product.create({
      name: 'Eternal Peony',
      description: 'Luxurious handmade eternal peony in rich crimson red with creamy stamen center. Full, romantic, and breathtaking.',
      category: 'single-flower',
      price: 55,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const orchid = await Product.create({
      name: 'Eternal Orchid',
      description: 'Exotic handmade eternal orchid in deep red with a cream and burgundy center. Sophisticated and striking.',
      category: 'single-flower',
      price: 52,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const daffodil = await Product.create({
      name: 'Eternal Daffodil',
      description: 'Cheerful handmade eternal daffodil in white and yellow. A bright herald of spring that never fades.',
      category: 'single-flower',
      price: 44,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const trumpetLily = await Product.create({
      name: 'Eternal Trumpet Lily',
      description: 'Graceful handmade eternal trumpet lily in pure white with dark burgundy stamens and green leaves. Majestic and serene.',
      category: 'single-flower',
      price: 50,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    const hydrangeas = await Product.create({
      name: 'Eternal Hydrangeas',
      description: 'Lush handmade eternal hydrangea cluster in vibrant yellow-green with pearl-like centers. Full and gorgeous.',
      category: 'single-flower',
      price: 65,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['single-bouquet', 'customize-bouquet'],
      hasGreeneryOption: true,
      greeneryPrice: 10,
    });

    console.log('✅ Single flower products created');

    // ── Fillers ─────────────────────────────────────────────────────

    const babyBreath = await Product.create({
      name: "Baby's Breath",
      description: 'Delicate filler flowers for added elegance.',
      category: 'filler',
      price: 8,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    const lavender = await Product.create({
      name: 'Dried Lavender',
      description: 'Aromatic dried lavender stems.',
      category: 'filler',
      price: 12,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    console.log('✅ Filler products created');

    // ── Greenery Fillers ────────────────────────────────────────────

    const eucalyptus = await Product.create({
      name: 'Eucalyptus',
      description: 'Fresh eucalyptus greenery for a natural touch.',
      category: 'greenery-filler',
      price: 15,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    const fern = await Product.create({
      name: 'Fern Leaves',
      description: 'Elegant fern leaves for added texture.',
      category: 'greenery-filler',
      price: 10,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['customize-bouquet'],
    });

    console.log('✅ Greenery filler products created');

    // ── Centerpieces ────────────────────────────────────────────────

    const centerpiece1 = await Product.create({
      name: 'Classic Elegance Centerpiece',
      description: 'Timeless centerpiece with roses and greenery. Perfect for weddings and formal events.',
      category: 'centerpiece',
      price: 120,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['events'],
    });

    const centerpiece2 = await Product.create({
      name: 'Rustic Garden Centerpiece',
      description: 'Natural and rustic centerpiece with wildflowers and greenery.',
      category: 'centerpiece',
      price: 100,
      isActive: true,
      stockStatus: 'in-stock',
      applicableServices: ['events'],
    });

    console.log('✅ Centerpiece products created');

    // ── Promo Codes ─────────────────────────────────────────────────
    console.log('🎫 Creating promo codes...');

    await PromoCode.create({
      code: 'ETERNAL10',
      description: '10% off your entire order',
      discountType: 'percentage',
      discountValue: 10,
      validServices: ['all'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
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

    // ── Offers ──────────────────────────────────────────────────────
    console.log('🎁 Creating offers...');

    await Offer.create({
      name: 'Spring Special - Roses',
      description: '15% off all eternal roses',
      targetProducts: [rose._id, valentineRose._id, swirlRose._id, hybridRose._id],
      targetServices: ['single-bouquet', 'customize-bouquet'],
      discountType: 'percentage',
      discountValue: 15,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      isActive: true,
    });

    console.log('✅ Offer created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    console.log('\n🌸 Flowers Created (16):');
    console.log('   Dahlia, Valentine Rose, Hibiscus, Lotus, Swirl Rose,');
    console.log('   Tulip, Cala Lilies, Large Cala Lily, Hybrid Rose, Rose,');
    console.log('   Baby Flowers, Peony, Orchid, Daffodil, Trumpet Lily, Hydrangeas');
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
