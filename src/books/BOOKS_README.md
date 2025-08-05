# Books Module - Digital Library System

This module provides a comprehensive digital library system similar to [vedabase.io](https://vedabase.io), designed for managing spiritual books with hierarchical content structure.

## 📚 Features

### Core Functionality
- **Complete CRUD operations** for books, chapters, and verses
- **Hierarchical content structure**: Books → Chapters → Verses
- **Advanced pagination** and filtering
- **Global search** across all content levels
- **Rich content support**: Sanskrit text, transliteration, translations, purports
- **Audio integration** for verses
- **Synonym management** for Sanskrit words
- **SEO optimization** with meta fields

### Content Organization
- **Book Categories**: Bhagavad-gītā, Śrīmad-Bhāgavatam, Caitanya-caritāmṛta, etc.
- **Status Management**: Draft, Published, Archived, Under Review
- **Version Control**: Track changes and modifications
- **Tagging System**: For categorization and search
- **View & Download Tracking**: Analytics support

## 🏗️ Schema Structure

### Book Schema
```typescript
Book {
  title: string                    // "Bhagavad-gītā As It Is"
  slug: string                     // "bg" (URL-friendly)
  description: string              // Book summary
  author: string                   // Author name
  category: BookCategory          // Predefined categories
  status: BookStatus              // Publication status
  chapters: Chapter[]             // Array of chapters
  metadata: BookMetadata          // ISBN, publisher, etc.
  preface?: string                // Book preface
  introduction?: string           // Book introduction
  tags: string[]                  // Categorization tags
  viewCount: number              // Analytics
  allowComments: boolean         // User interaction
  allowDownload: boolean         // Download permission
  // SEO fields, versioning, timestamps...
}
```

### Chapter Schema
```typescript
Chapter {
  chapterNumber: number           // Sequential chapter number
  title: string                   // Chapter title
  description?: string            // Chapter summary
  introduction?: string           // Chapter introduction
  verses: Verse[]                // Array of verses
  verseCount?: number            // Total verses count
  tags: string[]                 // Chapter tags
}
```

### Verse Schema
```typescript
Verse {
  verseNumber: string            // "1.1", "2.15", "16-18"
  orderNumber: number            // Sequential order
  sanskritText?: string          // Original Sanskrit
  transliteration?: string       // Romanized Sanskrit
  translation: string            // English translation
  purport?: string              // Detailed commentary
  synonyms: Synonym[]           // Word meanings
  audio?: AudioData             // Audio file info
  wordForWord?: string          // Word-by-word translation
  tags: string[]                // Verse tags
}
```

## 🚀 API Endpoints

### Books Management
```
GET    /books                          # List books with pagination
GET    /books/search?q=term           # Global search
GET    /books/statistics              # Book statistics
GET    /books/:slug                   # Get book by slug
POST   /books                         # Create new book
PATCH  /books/:id                     # Update book
DELETE /books/:id                     # Soft delete (deactivate)
DELETE /books/:id/permanent           # Hard delete
```

### Chapters Management
```
GET    /books/:slug/chapters                    # List chapters
GET    /books/:slug/chapters/:chapterNumber     # Get specific chapter
POST   /books/:id/chapters                     # Add chapter to book
```

### Verses Management
```
GET    /books/:slug/chapters/:chapterNumber/verses              # List verses
GET    /books/:slug/chapters/:chapterNumber/verses/:verseNumber # Get specific verse
POST   /books/:id/chapters/:chapterNumber/verses               # Add verse to chapter
```

## 📖 Usage Examples

### 1. Create a New Book
```typescript
const bookData = {
  title: "Bhagavad-gītā As It Is",
  slug: "bg",
  description: "The jewel of India's spiritual wisdom",
  author: "A.C. Bhaktivedanta Swami Prabhupāda",
  category: "bhagavad-gita",
  status: "published",
  chapters: [
    {
      chapterNumber: 1,
      title: "Observing the Armies on the Battlefield of Kurukṣetra",
      verses: [
        {
          verseNumber: "1",
          orderNumber: 1,
          sanskritText: "धृतराष्ट्र उवाच...",
          transliteration: "dhṛtarāṣṭra uvāca...",
          translation: "Dhṛtarāṣṭra said: O Sañjaya...",
          purport: "Bhagavad-gītā is the widely read..."
        }
      ]
    }
  ]
};

const book = await booksService.create(bookData);
```

### 2. Get Books with Filtering
```typescript
const books = await booksService.findAll({
  page: 1,
  limit: 10,
  category: 'bhagavad-gita',
  status: 'published',
  search: 'Krishna',
  sortBy: 'viewCount',
  sortOrder: 'desc'
});
```

### 3. Get Specific Verse
```typescript
const verse = await booksService.findVerse('bg', 1, '1');
// Returns: { book: {...}, chapter: {...}, verse: {...} }
```

### 4. Search Across All Content
```typescript
const results = await booksService.globalSearch('dharma', 1, 20);
// Searches in titles, descriptions, translations, purports, etc.
```

## 🎯 Vedabase.io Structure Mapping

This schema perfectly maps to vedabase.io structure:

| vedabase.io URL | Our API Endpoint |
|-----------------|------------------|
| `/en/library/` | `GET /books` |
| `/en/library/bg/` | `GET /books/bg` |
| `/en/library/bg/1/` | `GET /books/bg/chapters/1` |
| `/en/library/bg/1/1/` | `GET /books/bg/chapters/1/verses/1` |

## 📋 Query Parameters

### Books List (`GET /books`)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search term for title, description, author
- `category`: Filter by book category
- `status`: Filter by publication status
- `author`: Filter by author name
- `tags`: Filter by tags (comma-separated)
- `sortBy`: Sort field (title, createdAt, viewCount, etc.)
- `sortOrder`: Sort direction (asc, desc)
- `featured`: Show only featured books

### Chapters List (`GET /books/:slug/chapters`)
- `page`: Page number
- `limit`: Items per page
- `search`: Search in chapter titles/descriptions
- `tags`: Filter by chapter tags

### Verses List (`GET /books/:slug/chapters/:num/verses`)
- `page`: Page number
- `limit`: Items per page
- `search`: Search in verse content
- `hasAudio`: Filter verses with audio
- `hasPurport`: Filter verses with commentary
- `hasSanskrit`: Filter verses with Sanskrit text
- `tags`: Filter by verse tags

## 🔍 Database Indexes

The schema includes optimized indexes for:
- `slug` - Fast book lookup
- `category` - Category filtering
- `status` - Status filtering
- `chapters.chapterNumber` - Chapter navigation
- `chapters.verses.verseNumber` - Verse lookup
- `tags` - Tag-based filtering
- `createdAt` - Chronological sorting
- `viewCount` - Popularity sorting
- Text search across title, description, author

## 🛡️ Validation & Security

- **Input Validation**: Comprehensive DTOs with class-validator
- **Unique Constraints**: Enforced at database level
- **Soft Deletes**: Preserve data integrity
- **Version Control**: Track modifications
- **Role-based Access**: Ready for authentication integration

## 🚀 Performance Features

- **Pagination**: Efficient data loading
- **Selective Fields**: Exclude large fields in list views
- **Aggregation**: Optimized search and statistics
- **Caching Ready**: Structured for Redis integration
- **Analytics**: Built-in view and download tracking

## 📊 Sample Data

Sample Bhagavad-gītā data is provided in `/src/books/data/sample-books.ts` to help you understand the structure and populate your database.

## 🔮 Future Enhancements

- **Comments System**: User comments on verses
- **Bookmarks**: Save favorite verses
- **Reading Progress**: Track user progress
- **Offline Support**: PWA capabilities
- **Multi-language**: Support for multiple translations
- **Audio Streaming**: Enhanced audio features
- **PDF Generation**: Export capabilities

This Books module provides a solid foundation for building a comprehensive digital spiritual library, following the proven structure and user experience of vedabase.io.
