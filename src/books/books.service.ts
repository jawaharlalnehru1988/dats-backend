import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Book, BookCategory, BookStatus } from './entities/book.schema';
import { 
  CreateBookDto, 
  UpdateBookDto, 
  QueryBooksDto, 
  QueryChaptersDto, 
  QueryVersesDto 
} from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      // Check if book with same slug already exists
      const existingBook = await this.bookModel.findOne({ slug: createBookDto.slug });
      if (existingBook) {
        throw new ConflictException(`Book with slug '${createBookDto.slug}' already exists`);
      }

      // Auto-calculate chapter and verse counts if not provided
      if (createBookDto.chapters) {
        createBookDto.chapterCount = createBookDto.chapters.length;
        createBookDto.totalVerses = createBookDto.chapters.reduce(
          (total, chapter) => total + (chapter.verses?.length || 0), 
          0
        );
      }

      const createdBook = new this.bookModel(createBookDto);
      return await createdBook.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Book with this title or slug already exists');
      }
      throw error;
    }
  }

  // Get all books with pagination and filtering
  async findAll(queryDto: QueryBooksDto) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      category, 
      status, 
      author, 
      tags, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      isActive = true,
      featured
    } = queryDto;

    const skip = (page - 1) * limit;
    const filter: FilterQuery<Book> = {};

    // Build filter conditions
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    if (featured !== undefined) {
      if (featured) {
        filter.featuredUntil = { $gte: new Date() };
      } else {
        filter.$or = [
          { featuredUntil: { $exists: false } },
          { featuredUntil: { $lt: new Date() } }
        ];
      }
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [books, total] = await Promise.all([
      this.bookModel
        .find(filter)
        .select('-chapters.verses.purport -chapters.verses.synonyms') // Exclude large fields for list view
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      this.bookModel.countDocuments(filter)
    ]);

    return {
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  // Get book by ID with full details
  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Increment view count
    await this.bookModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    return book;
  }

  // Get book by slug with full details
  async findBySlug(slug: string): Promise<Book> {
    const book = await this.bookModel.findOne({ slug, isActive: true });
    if (!book) {
      throw new NotFoundException(`Book with slug '${slug}' not found`);
    }

    // Increment view count
    await this.bookModel.findOneAndUpdate(
      { slug }, 
      { $inc: { viewCount: 1 } }
    );

    return book;
  }

  // Get specific chapter from a book
  async findChapter(bookSlug: string, chapterNumber: number) {
    const book = await this.bookModel.findOne(
      { slug: bookSlug, isActive: true },
      { 
        title: 1, 
        slug: 1, 
        author: 1,
        chapters: { $elemMatch: { chapterNumber } }
      }
    );

    if (!book || !book.chapters.length) {
      throw new NotFoundException(
        `Chapter ${chapterNumber} not found in book '${bookSlug}'`
      );
    }

    return {
      book: {
        title: book.title,
        slug: book.slug,
        author: book.author
      },
      chapter: book.chapters[0]
    };
  }

  // Get specific verse from a chapter
  async findVerse(bookSlug: string, chapterNumber: number, verseNumber: string) {
    const book = await this.bookModel.findOne(
      { slug: bookSlug, isActive: true },
      { 
        title: 1, 
        slug: 1, 
        author: 1,
        chapters: { 
          $elemMatch: { 
            chapterNumber,
            'verses.verseNumber': verseNumber
          } 
        }
      }
    );

    if (!book || !book.chapters.length) {
      throw new NotFoundException(
        `Verse ${verseNumber} not found in chapter ${chapterNumber} of book '${bookSlug}'`
      );
    }

    const chapter = book.chapters[0];
    const verse = chapter.verses.find(v => v.verseNumber === verseNumber);

    if (!verse) {
      throw new NotFoundException(
        `Verse ${verseNumber} not found in chapter ${chapterNumber}`
      );
    }

    return {
      book: {
        title: book.title,
        slug: book.slug,
        author: book.author
      },
      chapter: {
        chapterNumber: chapter.chapterNumber,
        title: chapter.title
      },
      verse
    };
  }

  // Get chapters with pagination
  async findChapters(bookSlug: string, queryDto: QueryChaptersDto) {
    const { page = 1, limit = 20, search, tags } = queryDto;
    const skip = (page - 1) * limit;

    const book = await this.bookModel.findOne({ slug: bookSlug, isActive: true });
    if (!book) {
      throw new NotFoundException(`Book with slug '${bookSlug}' not found`);
    }

    let chapters = book.chapters;

    // Apply search filter
    if (search) {
      chapters = chapters.filter(chapter => 
        chapter.title.toLowerCase().includes(search.toLowerCase()) ||
        (chapter.description && chapter.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply tags filter
    if (tags && tags.length > 0) {
      chapters = chapters.filter(chapter => 
        tags.some(tag => chapter.tags.includes(tag))
      );
    }

    const total = chapters.length;
    const paginatedChapters = chapters.slice(skip, skip + limit);

    return {
      book: {
        title: book.title,
        slug: book.slug,
        author: book.author
      },
      data: paginatedChapters.map(chapter => ({
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        subtitle: chapter.subtitle,
        description: chapter.description,
        introduction: chapter.introduction,
        tags: chapter.tags,
        verseCount: chapter.verses.length,
        createdAt: chapter.createdAt,
        updatedAt: chapter.updatedAt
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  // Get verses with pagination
  async findVerses(bookSlug: string, chapterNumber: number, queryDto: QueryVersesDto) {
    const { 
      page = 1, 
      limit = 50, 
      search, 
      hasAudio, 
      hasPurport, 
      hasSanskrit, 
      tags 
    } = queryDto;
    const skip = (page - 1) * limit;

    const book = await this.bookModel.findOne(
      { slug: bookSlug, isActive: true },
      { 
        title: 1, 
        slug: 1, 
        author: 1,
        chapters: { $elemMatch: { chapterNumber } }
      }
    );

    if (!book || !book.chapters.length) {
      throw new NotFoundException(
        `Chapter ${chapterNumber} not found in book '${bookSlug}'`
      );
    }

    const chapter = book.chapters[0];
    let verses = chapter.verses;

    // Apply filters
    if (search) {
      verses = verses.filter(verse => 
        verse.translation.toLowerCase().includes(search.toLowerCase()) ||
        (verse.purport && verse.purport.toLowerCase().includes(search.toLowerCase())) ||
        (verse.sanskritText && verse.sanskritText.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (hasAudio !== undefined) {
      verses = verses.filter(verse => hasAudio ? !!verse.audio?.audioUrl : !verse.audio?.audioUrl);
    }

    if (hasPurport !== undefined) {
      verses = verses.filter(verse => hasPurport ? !!verse.purport : !verse.purport);
    }

    if (hasSanskrit !== undefined) {
      verses = verses.filter(verse => hasSanskrit ? !!verse.sanskritText : !verse.sanskritText);
    }

    if (tags && tags.length > 0) {
      verses = verses.filter(verse => 
        tags.some(tag => verse.tags.includes(tag))
      );
    }

    const total = verses.length;
    const paginatedVerses = verses.slice(skip, skip + limit);

    return {
      book: {
        title: book.title,
        slug: book.slug,
        author: book.author
      },
      chapter: {
        chapterNumber: chapter.chapterNumber,
        title: chapter.title
      },
      data: paginatedVerses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  // Update book
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    // Check if slug is being updated and if it conflicts
    if (updateBookDto.slug) {
      const existingBook = await this.bookModel.findOne({ 
        slug: updateBookDto.slug, 
        _id: { $ne: id } 
      });
      if (existingBook) {
        throw new ConflictException(`Book with slug '${updateBookDto.slug}' already exists`);
      }
    }

    // Auto-calculate chapter and verse counts if chapters are being updated
    if (updateBookDto.chapters) {
      updateBookDto.chapterCount = updateBookDto.chapters.length;
      updateBookDto.totalVerses = updateBookDto.chapters.reduce(
        (total, chapter) => total + (chapter.verses?.length || 0), 
        0
      );
    }

    // Increment version
    const updateData = { 
      ...updateBookDto, 
      $inc: { version: 1 },
      updatedAt: new Date()
    };

    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  // Soft delete (deactivate) book
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.bookModel.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return { message: 'Book successfully deactivated' };
  }

  // Hard delete book (permanent)
  async hardDelete(id: string): Promise<{ message: string }> {
    const result = await this.bookModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return { message: 'Book permanently deleted' };
  }

  // Add chapter to book
  async addChapter(bookId: string, chapterData: any): Promise<Book> {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Check if chapter number already exists
    const existingChapter = book.chapters.find(
      chapter => chapter.chapterNumber === chapterData.chapterNumber
    );
    if (existingChapter) {
      throw new ConflictException(
        `Chapter ${chapterData.chapterNumber} already exists in this book`
      );
    }

    book.chapters.push(chapterData);
    book.chapterCount = book.chapters.length;
    book.totalVerses = book.chapters.reduce(
      (total, chapter) => total + chapter.verses.length, 
      0
    );

    return await book.save();
  }

  // Add verse to chapter
  async addVerse(bookId: string, chapterNumber: number, verseData: any): Promise<Book> {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const chapter = book.chapters.find(ch => ch.chapterNumber === chapterNumber);
    if (!chapter) {
      throw new NotFoundException(`Chapter ${chapterNumber} not found in this book`);
    }

    // Check if verse number already exists
    const existingVerse = chapter.verses.find(
      verse => verse.verseNumber === verseData.verseNumber
    );
    if (existingVerse) {
      throw new ConflictException(
        `Verse ${verseData.verseNumber} already exists in chapter ${chapterNumber}`
      );
    }

    chapter.verses.push(verseData);
    chapter.verseCount = chapter.verses.length;
    book.totalVerses = book.chapters.reduce(
      (total, chapter) => total + chapter.verses.length, 
      0
    );

    return await book.save();
  }

  // Search across all books, chapters, and verses
  async globalSearch(searchTerm: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const searchRegex = new RegExp(searchTerm, 'i');

    const books = await this.bookModel.aggregate([
      {
        $match: {
          isActive: true,
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { author: searchRegex },
            { 'chapters.title': searchRegex },
            { 'chapters.verses.translation': searchRegex },
            { 'chapters.verses.purport': searchRegex },
            { 'chapters.verses.sanskritText': searchRegex }
          ]
        }
      },
      {
        $project: {
          title: 1,
          slug: 1,
          author: 1,
          description: 1,
          coverImageUrl: 1,
          score: { $meta: 'textScore' }
        }
      },
      { $sort: { score: { $meta: 'textScore' } } },
      { $skip: skip },
      { $limit: limit }
    ]);

    return {
      data: books,
      searchTerm,
      pagination: {
        page,
        limit,
        total: books.length
      }
    };
  }

  // Get book statistics
  async getStatistics() {
    const stats = await this.bookModel.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          totalChapters: { $sum: '$chapterCount' },
          totalVerses: { $sum: '$totalVerses' },
          totalViews: { $sum: '$viewCount' },
          totalDownloads: { $sum: '$downloadCount' },
          activeBooks: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          publishedBooks: {
            $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await this.bookModel.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    return {
      overview: stats[0] || {},
      byCategory: categoryStats
    };
  }
}
