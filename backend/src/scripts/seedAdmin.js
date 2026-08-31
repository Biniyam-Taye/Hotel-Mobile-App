const User = require('../models/user.model');

const seedAdminIfEmpty = async () => {
  try {
    const adminEmail = 'admin@hotel.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      await User.create({
        firstName: 'Hotel',
        lastName: 'Owner',
        email: adminEmail,
        password: 'password123',
        role: 'admin',
        approvalStatus: 'approved'
      });
      console.log('Default Admin (Owner) user seeded successfully (admin@hotel.com / password123)');
    } else {
      // In case they exist but password was changed or roles got updated, let's make sure role is admin
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        await adminExists.save();
        console.log('Ensured admin@hotel.com user has admin role');
      }
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

module.exports = { seedAdminIfEmpty };
