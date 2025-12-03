import sequelize from '../config/database.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const fixAdminPassword = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Find admin user
    const admin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      return;
    }

    // Hash password manually
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Update admin password directly
    await User.update(
      { password: hashedPassword },
      { where: { email: 'admin@elisshbeauty.ae' } }
    );
    
    console.log('✅ Admin password updated');
    
    // Verify the fix
    const updatedAdmin = await User.findOne({ where: { email: 'admin@elisshbeauty.ae' } });
    const isValid = await bcrypt.compare('admin123', updatedAdmin.password);
    console.log('Password verification:', isValid ? '✅ Valid' : '❌ Invalid');
    
    if (isValid) {
      console.log('🎉 Login should work now!');
      console.log('📧 Email: admin@elisshbeauty.ae');
      console.log('🔑 Password: admin123');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
};

fixAdminPassword();