import sequelize from '../config/database.js';
import User from '../models/User.js';
import Category from '../models/CategoryBasic.js';
import Product from '../models/ProductBasic.js';
import SEO from '../models/SEOBasic.js';
import bcrypt from 'bcryptjs';

const setupProduction = async () => {
  try {
    console.log('🚀 Setting up production database...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Force sync to recreate all tables
    await sequelize.sync({ force: true });
    
    // Set up associations
    Product.belongsTo(Category, { foreignKey: 'categoryId' });
    Category.hasMany(Product, { foreignKey: 'categoryId' });
    console.log('✅ Database tables created');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@elisshbeauty.ae',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    console.log('✅ Admin user created');
    
    // Create categories
    const categories = [
      { name: 'Skincare', description: 'Skincare products', slug: 'skincare' },
      { name: 'Makeup', description: 'Makeup products', slug: 'makeup' },
      { name: 'Haircare', description: 'Hair care products', slug: 'haircare' },
      { name: 'Fragrance', description: 'Perfumes and fragrances', slug: 'fragrance' }
    ];
    
    for (const cat of categories) {
      await Category.create(cat);
    }
    console.log('✅ Categories created');
    
    // Create SEO data
    const seoPages = [
      { page: 'home', title: 'Elissh Beauty - Premium Cosmetics UAE', description: 'Shop authentic beauty products in UAE', keywords: 'cosmetics, beauty, UAE' },
      { page: 'about', title: 'About Elissh Beauty', description: 'Learn about our premium beauty products', keywords: 'about, elissh, beauty' },
      { page: 'contact', title: 'Contact Elissh Beauty', description: 'Get in touch with us', keywords: 'contact, support' }
    ];
    
    for (const seo of seoPages) {
      await SEO.create(seo);
    }
    console.log('✅ SEO data created');
    
    console.log('🎉 Production setup completed!');
    console.log('📧 Admin login: admin@elisshbeauty.ae');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    await sequelize.close();
  }
};

setupProduction();