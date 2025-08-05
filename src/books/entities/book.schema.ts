import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Synonyms sub-schema for Sanskrit words
@Schema({ _id: false })
export class Synonym {
  @Prop({ required: true })
  word: string;

  @Prop({ required: true })
  meaning: string;

  @Prop({ required: false })
  link?: string; // Link to search page for the word
}

const SynonymSchema = SchemaFactory.createForClass(Synonym);

// Audio data for verses
@Schema({ _id: false })
export class AudioData {
  @Prop({ required: false })
  audioUrl?: string;

  @Prop({ required: false })
  speaker?: string;

  @Prop({ required: false })
  duration?: number; // in seconds

  @Prop({ required: false })
  quality?: string; // e.g., "128kbps", "320kbps"
}

const AudioDataSchema = SchemaFactory.createForClass(AudioData);

// Verse/Text entity - the smallest content unit
@Schema({ _id: false })
export class Verse {
  @Prop({ required: true })
  verseNumber: string; // e.g., "1.1", "2.15", "16-18" for combined verses

  @Prop({ required: true })
  orderNumber: number; // Sequential order within chapter

  @Prop({ required: false })
  sanskritText?: string; // Original Sanskrit text

  @Prop({ required: false })
  transliteration?: string; // Romanized Sanskrit

  @Prop({ required: true })
  translation: string; // English translation

  @Prop({ required: false })
  purport?: string; // Detailed explanation/commentary

  @Prop({ type: [SynonymSchema], default: [] })
  synonyms: Synonym[];

  @Prop({ type: AudioDataSchema, required: false })
  audio?: AudioData;

  @Prop({ required: false })
  wordForWord?: string; // Word-for-word translation

  @Prop({ default: [] })
  tags: string[]; // For categorization and search

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

const VerseSchema = SchemaFactory.createForClass(Verse);

// Chapter entity
@Schema({ _id: false })
export class Chapter {
  @Prop({ required: true })
  chapterNumber: number;

  @Prop({ required: true })
  title: string; // e.g., "Observing the Armies on the Battlefield of Kurukṣetra"

  @Prop({ required: false })
  subtitle?: string;

  @Prop({ required: false })
  description?: string; // Chapter summary

  @Prop({ required: false })
  introduction?: string; // Chapter introduction

  @Prop({ type: [VerseSchema], default: [] })
  verses: Verse[];

  @Prop({ required: false })
  verseCount?: number; // Total verses in chapter

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

const ChapterSchema = SchemaFactory.createForClass(Chapter);

// Metadata for book information
@Schema({ _id: false })
export class BookMetadata {
  @Prop({ required: false })
  isbn?: string;

  @Prop({ required: false })
  publisher?: string;

  @Prop({ required: false })
  publishedDate?: Date;

  @Prop({ required: false })
  edition?: string;

  @Prop({ required: false })
  pageCount?: number;

  @Prop({ required: false })
  language?: string;

  @Prop({ default: [] })
  translators: string[];

  @Prop({ required: false })
  originalLanguage?: string;

  @Prop({ required: false })
  copyright?: string;
}

const BookMetadataSchema = SchemaFactory.createForClass(BookMetadata);

// Book Categories (similar to vedabase library structure)
export enum BookCategory {
  BHAGAVAD_GITA = 'bhagavad-gita',
  SRIMAD_BHAGAVATAM = 'srimad-bhagavatam',
  CAITANYA_CARITAMRITA = 'caitanya-caritamrita',
  NECTAR_OF_INSTRUCTION = 'nectar-of-instruction',
  KRISHNA_BOOK = 'krishna-book',
  NECTAR_OF_DEVOTION = 'nectar-of-devotion',
  ISOPANISHAD = 'isopanishad',
  SCIENCE_OF_SELF_REALIZATION = 'science-of-self-realization',
  OTHER = 'other'
}

// Book Status
export enum BookStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  UNDER_REVIEW = 'under-review'
}

// Main Book Schema
@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true, unique: true })
  title: string; // e.g., "Bhagavad-gītā As It Is"

  @Prop({ required: true, unique: true })
  slug: string; // URL-friendly identifier, e.g., "bg", "sb", "cc"

  @Prop({ required: false })
  subtitle?: string;

  @Prop({ required: true })
  description: string; // Book description/summary

  @Prop({ required: false })
  coverImageUrl?: string;

  @Prop({ required: true })
  author: string; // e.g., "A.C. Bhaktivedanta Swami Prabhupāda"

  @Prop({ 
    type: String, 
    enum: Object.values(BookCategory),
    default: BookCategory.OTHER 
  })
  category: BookCategory;

  @Prop({ 
    type: String, 
    enum: Object.values(BookStatus),
    default: BookStatus.DRAFT 
  })
  status: BookStatus;

  @Prop({ type: [ChapterSchema], default: [] })
  chapters: Chapter[];

  @Prop({ required: false })
  chapterCount?: number; // Total chapters in book

  @Prop({ required: false })
  totalVerses?: number; // Total verses across all chapters

  @Prop({ type: BookMetadataSchema, required: false })
  metadata?: BookMetadata;

  @Prop({ required: false })
  preface?: string;

  @Prop({ required: false })
  introduction?: string;

  @Prop({ required: false })
  dedication?: string;

  @Prop({ required: false })
  settingTheScene?: string; // For books like Bhagavad Gita

  @Prop({ default: [] })
  tags: string[]; // For categorization and search

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  downloadCount: number;

  @Prop({ required: false })
  featuredUntil?: Date; // For featured books

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  allowComments: boolean;

  @Prop({ default: false })
  allowDownload: boolean;

  // SEO fields
  @Prop({ required: false })
  metaTitle?: string;

  @Prop({ required: false })
  metaDescription?: string;

  @Prop({ default: [] })
  metaKeywords: string[];

  // Versioning
  @Prop({ default: 1 })
  version: number;

  @Prop({ required: false })
  lastModifiedBy?: Types.ObjectId; // Reference to User who last modified

  // Timestamps are automatically added by { timestamps: true }
}

export const BookSchema = SchemaFactory.createForClass(Book);

// Indexes for better performance
BookSchema.index({ slug: 1 });
BookSchema.index({ category: 1 });
BookSchema.index({ status: 1 });
BookSchema.index({ 'chapters.chapterNumber': 1 });
BookSchema.index({ 'chapters.verses.verseNumber': 1 });
BookSchema.index({ tags: 1 });
BookSchema.index({ createdAt: -1 });
BookSchema.index({ viewCount: -1 });
BookSchema.index({ title: 'text', description: 'text', author: 'text' }); // Text search
