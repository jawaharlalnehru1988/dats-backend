# 🌱 Database Seeding Guide

This guide shows you how to populate your MongoDB database with sample book data.

## 🚀 Quick Start

### Method 1: Using npm scripts (Recommended)

```bash
# Seed sample books (Bhagavad Gita + Srimad Bhagavatam)
npm run seed:books

# Force seed (clears existing data first)
npm run seed:books:force

# Add additional chapters to Bhagavad Gita
npm run seed:chapters

# Show database statistics
npm run seed:stats
```

### Method 2: Using API endpoints

Start your server first:
```bash
npm run start:dev
```

Then use these endpoints:

```bash
# Seed books
POST http://localhost:3000/seed/books

# Force seed books (clears existing)
POST http://localhost:3000/seed/books/force

# Add chapters to Bhagavad Gita
POST http://localhost:3000/seed/books/bg/chapters

# Get statistics
GET http://localhost:3000/seed/stats
```

### Method 3: Direct service call

```typescript
// In your controller or service
import { SeedService } from './seed/seed.service';

constructor(private seedService: SeedService) {}

async seedData() {
  await this.seedService.seedBooks();
}
```

## 📚 What Gets Seeded

### Bhagavad-gītā As It Is
- **Book metadata**: Title, author, description, etc.
- **Chapter 1**: "Observing the Armies on the Battlefield of Kurukṣetra"
  - 2 sample verses with full details
  - Sanskrit text, transliteration, translation, purport
  - Word synonyms and audio metadata
- **Chapter 2**: "Contents of the Gītā Summarized" (structure only)
- **Complete book structure** ready for 18 chapters, 700 verses

### Śrīmad-Bhāgavatam
- **Basic book structure** with metadata
- **Ready for 12 cantos**, 335 chapters, 18,000 verses

## 🔍 Verify Your Data

### Check via API
```bash
# Get all books
GET http://localhost:3000/books

# Get Bhagavad Gita
GET http://localhost:3000/books/bg

# Get Chapter 1
GET http://localhost:3000/books/bg/chapters/1

# Get Verse 1.1
GET http://localhost:3000/books/bg/chapters/1/verses/1
```

### Check via MongoDB
```javascript
// Connect to your MongoDB and run:
use DATS

// Count books
db.books.count()

// See book titles
db.books.find({}, {title: 1, slug: 1})

// Check Bhagavad Gita structure
db.books.findOne({slug: "bg"})
```

### Check via Statistics
```bash
npm run seed:stats
```

Expected output:
```
📊 Database Statistics:
========================
📚 Total Books: 2
📖 Total Chapters: 2
📝 Total Verses: 2
👁️  Total Views: 0
📥 Total Downloads: 0
✅ Active Books: 2
🔖 Published Books: 2

📚 Books by Category:
  - bhagavad-gita: 1
  - srimad-bhagavatam: 1
```

## 🛠️ Advanced Seeding

### Add More Sample Data

Edit `/src/books/data/sample-books.ts` to add:

1. **More verses to existing chapters**:
```typescript
// Add to Chapter 1 verses array
{
  verseNumber: "3",
  orderNumber: 3,
  sanskritText: "...",
  transliteration: "...",
  translation: "...",
  // ... full verse structure
}
```

2. **More chapters to Bhagavad Gita**:
```typescript
{
  chapterNumber: 3,
  title: "Karma-yoga",
  description: "...",
  verses: [/* ... */]
}
```

3. **New books**:
```typescript
export const sampleCaitanyaCaritamritaData = {
  title: "Śrī Caitanya-caritāmṛta",
  slug: "cc",
  // ... complete structure
};
```

### Custom Seeding Script

Create your own seeder:

```typescript
// custom-seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SeedService } from './src/seed/seed.service';

async function customSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  // Your custom seeding logic
  const customBookData = {
    title: "My Custom Book",
    slug: "custom",
    // ... your data
  };

  await seedService.seedSpecificBook(customBookData, "Custom Book");
  await app.close();
}

customSeed();
```

## 🚨 Troubleshooting

### Common Issues

1. **"Books already exist" message**:
   ```bash
   # Use force seed to override
   npm run seed:books:force
   ```

2. **MongoDB connection error**:
   - Check your MongoDB connection string in `app.module.ts`
   - Ensure MongoDB is running
   - Verify network connectivity

3. **Build errors**:
   ```bash
   # Clean build
   rm -rf dist/
   npm run build
   npm run seed:books
   ```

4. **Permission errors** (on scripts):
   ```bash
   # Make script executable (Linux/Mac)
   chmod +x scripts/seed.js
   
   # Or run directly with node
   node scripts/seed.js books
   ```

### Debug Mode

To see detailed logs, modify the seeder:

```typescript
// In seed.service.ts, add more console.log statements
console.log('Creating book with data:', JSON.stringify(bookData, null, 2));
```

## 🎯 Production Considerations

### For Production Deployment

1. **Don't auto-seed in production**:
   ```typescript
   // In seed.service.ts
   async onModuleInit() {
     if (process.env.NODE_ENV !== 'production') {
       // await this.seedBooks();
     }
   }
   ```

2. **Use environment-specific data**:
   ```typescript
   const bookData = process.env.NODE_ENV === 'production' 
     ? productionBooksData 
     : sampleBhagavadGitaData;
   ```

3. **Backup before seeding**:
   ```bash
   # Backup your database first
   mongodump --uri="your-mongodb-uri" --out=backup/
   
   # Then seed
   npm run seed:books:force
   ```

## 📈 Next Steps

After seeding:

1. **Test the APIs**: Use the provided API endpoints
2. **Import real data**: Replace sample data with actual book content
3. **Add more books**: Expand your library
4. **Implement search**: Test the global search functionality
5. **Add audio files**: Upload actual audio content
6. **Build frontend**: Use the APIs to build your vedabase.io-like interface

Your digital spiritual library is now ready! 🙏
