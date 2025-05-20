const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const seedSpots = require('../seedSpotsData.js');

const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../chi-app-1ac2e-firebase-adminsdk-fbsvc-9f69217d70.json'), 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    for (const spot of seedSpots) {
      await db.collection('spots').add(spot);
      console.log(`Created spot: ${spot.name}`);
    }
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 