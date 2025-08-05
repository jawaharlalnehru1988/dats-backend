import { Injectable, OnModuleInit } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { sampleBhagavadGitaData, sampleSrimadBhagavatamData } from '../books/data/sample-books';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly booksService: BooksService) {}

  async onModuleInit() {
    // You can enable auto-seeding on startup if needed
    // await this.seedBooks();
  }

  async seedBooks() {
    try {
      console.log('🌱 Starting to seed books data...');

      // Check if books already exist
      const existingBooks = await this.booksService.findAll({ limit: 1 });
      if (existingBooks.data.length > 0) {
        console.log('📚 Books already exist in database. Skipping seed...');
        console.log('💡 Use seedBooksForce() to override');
        return;
      }

      // Seed Bhagavad Gita
      console.log('📖 Seeding Bhagavad-gītā As It Is...');
      const bhagavadGita = await this.booksService.create(sampleBhagavadGitaData);
      console.log(`✅ Created book: ${bhagavadGita.title} (${bhagavadGita.slug})`);

      // Seed Srimad Bhagavatam (basic structure)
      console.log('📖 Seeding Śrīmad-Bhāgavatam...');
      const srimadBhagavatam = await this.booksService.create(sampleSrimadBhagavatamData);
      console.log(`✅ Created book: ${srimadBhagavatam.title} (${srimadBhagavatam.slug})`);

      console.log('🎉 Seeding completed successfully!');
      console.log('\n📊 Summary:');
      console.log(`- Books created: 2`);
      console.log(`- Chapters created: ${bhagavadGita.chapterCount || 0}`);
      console.log(`- Verses created: ${bhagavadGita.totalVerses || 0}`);
      
    } catch (error) {
      console.error('❌ Error seeding books data:', error.message);
      throw error;
    }
  }

  async seedBooksForce() {
    try {
      console.log('🗑️  Clearing existing books data...');
      
      // Get all books and delete them
      const existingBooks = await this.booksService.findAll({ limit: 1000 });
      for (const book of existingBooks.data) {
        await this.booksService.hardDelete(book._id.toString());
      }

      console.log('✅ Existing data cleared');
      
      // Now seed fresh data
      await this.seedBooks();
      
    } catch (error) {
      console.error('❌ Error force seeding books data:', error.message);
      throw error;
    }
  }

  async seedBhagavadGitaChapters() {
    try {
      console.log('📚 Finding Bhagavad Gita book...');
      
      const book = await this.booksService.findBySlug('bg');
      if (!book) {
        console.log('❌ Bhagavad Gita not found. Please run seedBooks() first');
        return;
      }

      console.log('📖 Adding additional chapters to Bhagavad Gita...');

      // Sample additional chapters (3-18)
      const additionalChapters = [
        {
          chapterNumber: 3,
          title: "Karma-yoga",
          description: "Lord Kṛṣṇa explains the concept of action without attachment and describes various types of sacrifice.",
          verses: []
        },
        {
          chapterNumber: 4,
          title: "Transcendental Knowledge",
          description: "The path of knowledge and the divine nature of God's activities.",
          verses: []
        },
        {
          chapterNumber: 5,
          title: "Karma-yoga – Action in Kṛṣṇa Consciousness",
          description: "The path of action in devotional service.",
          verses: []
        },
        // Add more chapters as needed
      ];

      for (const chapter of additionalChapters) {
        await this.booksService.addChapter((book as any)._id.toString(), chapter);
        console.log(`✅ Added Chapter ${chapter.chapterNumber}: ${chapter.title}`);
      }

      console.log('🎉 Additional chapters added successfully!');
      
    } catch (error) {
      console.error('❌ Error adding chapters:', error.message);
      throw error;
    }
  }

  // Method to seed specific book by data
  async seedSpecificBook(bookData: any, bookName: string) {
    try {
      console.log(`📖 Seeding ${bookName}...`);
      
      // Check if book already exists
      const existingBook = await this.booksService.findBySlug(bookData.slug).catch(() => null);
      if (existingBook) {
        console.log(`📚 ${bookName} already exists. Skipping...`);
        return existingBook;
      }

      const book = await this.booksService.create(bookData);
      console.log(`✅ Created ${bookName}: ${book.title}`);
      return book;
      
    } catch (error) {
      console.error(`❌ Error seeding ${bookName}:`, error.message);
      throw error;
    }
  }

  // Get seeding statistics
  async getStats() {
    try {
      const stats = await this.booksService.getStatistics();
      
      console.log('\n📊 Database Statistics:');
      console.log('========================');
      console.log(`📚 Total Books: ${stats.overview.totalBooks || 0}`);
      console.log(`📖 Total Chapters: ${stats.overview.totalChapters || 0}`);
      console.log(`📝 Total Verses: ${stats.overview.totalVerses || 0}`);
      console.log(`👁️  Total Views: ${stats.overview.totalViews || 0}`);
      console.log(`📥 Total Downloads: ${stats.overview.totalDownloads || 0}`);
      console.log(`✅ Active Books: ${stats.overview.activeBooks || 0}`);
      console.log(`🔖 Published Books: ${stats.overview.publishedBooks || 0}`);
      
      if (stats.byCategory && stats.byCategory.length > 0) {
        console.log('\n📚 Books by Category:');
        stats.byCategory.forEach((cat: any) => {
          console.log(`  - ${cat._id}: ${cat.count}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Error getting stats:', error.message);
      throw error;
    }
  }
}
