#!/usr/bin/env node

/**
 * Database Seeder Script
 * 
 * This script allows you to seed your database with sample book data.
 * 
 * Usage:
 *   node scripts/seed.js books           # Seed basic books
 *   node scripts/seed.js books --force   # Force seed (clears existing)
 *   node scripts/seed.js chapters        # Add more chapters to BG
 *   node scripts/seed.js stats           # Show database stats
 */

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get('SeedService');

  const command = process.argv[2];
  const force = process.argv.includes('--force');

  try {
    switch (command) {
      case 'books':
        if (force) {
          await seedService.seedBooksForce();
        } else {
          await seedService.seedBooks();
        }
        break;
        
      case 'chapters':
        await seedService.seedBhagavadGitaChapters();
        break;
        
      case 'stats':
        await seedService.getStats();
        break;
        
      default:
        console.log('Usage:');
        console.log('  node scripts/seed.js books           # Seed books');
        console.log('  node scripts/seed.js books --force   # Force seed');
        console.log('  node scripts/seed.js chapters        # Add chapters');
        console.log('  node scripts/seed.js stats           # Show stats');
        break;
    }
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
