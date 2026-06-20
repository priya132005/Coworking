import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import UserModel from '../Models/UserModel.js';
import SpaceModel from '../Models/SpaceModel.js';

dotenv.config();

const sampleSpaces = [
  {
    name: 'SpringHive Hyderabad Central',
    description:
      'A bright, plant-filled coworking floor with exposed-concrete interiors, fast wifi, and a calm work atmosphere in the heart of Banjara Hills.',
    category: 'Hot Desk',
    city: 'Hyderabad',
    address: 'Road No. 2, Banjara Hills, Hyderabad, Telangana',
    pricePerHour: 300,
    capacity: 25,
    amenities: ['High-speed WiFi', 'Air Conditioning', 'Coffee & Tea', 'Printer Access', 'Parking'],
    images: [
      'https://media.istockphoto.com/id/1460755337/photo/white-color-theme-modern-style-office-with-exposed-concrete-floor-and-a-lot-of-plant-3d.jpg?s=612x612&w=0&k=20&c=PX1TFWVrLL34jgkmFREmxrzy3M4rqhBk4NMrHFOTmo8=',
    ],
  },
  {
    name: 'TechNest Bangalore Heights',
    description:
      'A premium coworking hub for startups and tech teams on the buzzing 100 Feet Road, with dedicated meeting rooms and 24/7 access.',
    category: 'Private Office',
    city: 'Bengaluru',
    address: 'Indiranagar 100 Feet Road, Bengaluru, Karnataka',
    pricePerHour: 450,
    capacity: 15,
    amenities: ['High-speed WiFi', '24/7 Access', 'Meeting Rooms', 'Phone Booths', 'Coffee & Tea'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Coworking_Space_in_Berlin.jpg/640px-Coworking_Space_in_Berlin.jpg',
    ],
  },
  {
    name: 'CoreHub Pune Nexus',
    description:
      'An affordable, well-connected workspace on Baner Road with flexible hot desks and a vibrant community of freelancers.',
    category: 'Hot Desk',
    city: 'Pune',
    address: 'Baner Road, Aundh, Pune, Maharashtra',
    pricePerHour: 250,
    capacity: 30,
    amenities: ['High-speed WiFi', 'Air Conditioning', 'Parking', 'Pantry'],
    images: ['https://workloft.in/wp-content/uploads/2020/03/Coworkingspace-launchpad.jpg'],
  },
  {
    name: 'WorkLounge Delhi Connect',
    description:
      'A spacious, modern loft-style office in South Delhi designed for collaboration, with wide-open desks and natural light.',
    category: 'Dedicated Desk',
    city: 'Delhi',
    address: 'Green Park Extension, South Delhi, Delhi',
    pricePerHour: 300,
    capacity: 20,
    amenities: ['High-speed WiFi', 'Coffee & Tea', 'Printer Access', 'Lockers'],
    images: [
      'https://media.istockphoto.com/id/1247371878/photo/wide-angle-view-of-a-modern-loft-open-space-office-with-businesspeople-working-in-it.jpg?s=612x612&w=0&k=20&c=DsEE9SaBNv3dm3JxzYNuuwbdjy9KV7h5GFFvbsujAAw=',
    ],
  },
  {
    name: 'TechNest Bangalore Sphere',
    description:
      'A Koramangala favorite among tech founders — quiet pods, fast internet, and easy access to cafes and metro.',
    category: 'Meeting Room',
    city: 'Bengaluru',
    address: 'Koramangala 5th Block, Bengaluru, Karnataka',
    pricePerHour: 450,
    capacity: 10,
    amenities: ['High-speed WiFi', 'Projector', 'Whiteboard', 'Air Conditioning'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Coworking_Space_in_Berlin.jpg/640px-Coworking_Space_in_Berlin.jpg',
    ],
  },
  {
    name: 'CoreHub Pune Heights',
    description:
      'A central Shivajinagar location with comfortable shared desks, perfect for students and early-stage founders.',
    category: 'Hot Desk',
    city: 'Pune',
    address: 'JM Road, Shivajinagar, Pune, Maharashtra',
    pricePerHour: 250,
    capacity: 25,
    amenities: ['High-speed WiFi', 'Air Conditioning', 'Coffee & Tea'],
    images: ['https://workloft.in/wp-content/uploads/2020/03/Coworkingspace-launchpad.jpg'],
  },
];

const seed = async () => {
  await connectDB();

  // --- Seed admin user ---
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await UserModel.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'ADMIN',
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else if (existingAdmin.role !== 'ADMIN') {
      existingAdmin.role = 'ADMIN';
      await existingAdmin.save();
      console.log(`✅ Existing user promoted to admin: ${adminEmail}`);
    } else {
      console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
    }
  } else {
    console.log('ℹ️  ADMIN_EMAIL / ADMIN_PASSWORD not set in .env — skipping admin seed.');
  }

  // --- Seed sample spaces ---
  const spaceCount = await SpaceModel.countDocuments();
  if (spaceCount === 0) {
    await SpaceModel.insertMany(sampleSpaces);
    console.log(`✅ Seeded ${sampleSpaces.length} sample coworking spaces`);
  } else {
    console.log(`ℹ️  Spaces already exist (${spaceCount}) — skipping space seed.`);
  }

  await mongoose.connection.close();
  console.log('🌱 Seeding complete.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
