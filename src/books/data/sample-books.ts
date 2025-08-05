import { BookCategory, BookStatus } from '../entities/book.schema';

// Sample data based on Bhagavad Gita structure from vedabase.io
export const sampleBhagavadGitaData = {
  title: "Bhagavad-gītā As It Is",
  slug: "bg",
  subtitle: "The Bhagavad-gītā is the main source-book on yoga and a concise summary of India's Vedic wisdom.",
  description: "The Bhagavad-gītā is universally renowned as the jewel of India's spiritual wisdom. Spoken by Lord Kṛṣṇa, the Supreme Personality of Godhead to His intimate disciple Arjuna, the Gītā's seven hundred concise verses provide a definitive guide to the science of self realization.",
  coverImageUrl: "https://example.com/bg-cover.jpg",
  author: "A.C. Bhaktivedanta Swami Prabhupāda",
  category: BookCategory.BHAGAVAD_GITA,
  status: BookStatus.PUBLISHED,
  
  preface: "Originally I wrote Bhagavad-gītā As It Is in the form in which it is presented now. When this book was first published, the original manuscript was, unfortunately, cut short to less than 400 pages, without illustrations and without explanations...",
  
  introduction: "The Bhagavad-gītā is also known as Gītopaniṣad. It is the essence of Vedic knowledge and one of the most important Upaniṣads in Vedic literature...",
  
  settingTheScene: "Although widely published and read by itself, Bhagavad-gītā originally appears as an episode in the Mahābhārata, the epic Sanskrit history of the greater Indian subcontinent...",
  
  dedication: "To Śrīla Baladeva Vidyābhūṣaṇa, who presented so nicely the Govinda-bhāṣya commentary on Vedānta philosophy",
  
  chapters: [
    {
      chapterNumber: 1,
      title: "Observing the Armies on the Battlefield of Kurukṣetra",
      description: "As the opposing armies stand poised for battle, Arjuna, the mighty warrior, sees his own relatives, teachers and friends in both armies ready to fight and sacrifice their lives.",
      introduction: "This chapter describes how Duryodhana, on observing the Pāṇḍava army, approached his teacher Droṇācārya and spoke words born of deep anxiety...",
      verses: [
        {
          verseNumber: "1",
          orderNumber: 1,
          sanskritText: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
          transliteration: "dhṛtarāṣṭra uvāca\ndharma-kṣetre kuru-kṣetre\nsamavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva\nkim akurvata sañjaya",
          translation: "Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?",
          purport: "Bhagavad-gītā is the widely read theistic science summarized in the Gītā-māhātmya (Glorification of the Gītā). There it says that one should read Bhagavad-gītā very scrutinizingly with the help of a person who is a devotee of Śrī Kṛṣṇa...",
          synonyms: [
            {
              word: "dhṛtarāṣṭraḥ",
              meaning: "King Dhṛtarāṣṭra"
            },
            {
              word: "uvāca",
              meaning: "said"
            },
            {
              word: "dharma-kṣetre",
              meaning: "in the place of pilgrimage"
            },
            {
              word: "kuru-kṣetre",
              meaning: "in the place named Kurukṣetra"
            }
          ],
          wordForWord: "dhṛtarāṣṭraḥ uvāca — King Dhṛtarāṣṭra said; dharma-kṣetre — in the place of pilgrimage; kuru-kṣetre — in the place named Kurukṣetra; samavetāḥ — assembled; yuyutsavaḥ — desiring to fight; māmakāḥ — my party (sons); pāṇḍavāḥ — the sons of Pāṇḍu; ca — and; eva — certainly; kim — what; akurvata — did they do; sañjaya — O Sañjaya.",
          tags: ["dharma", "kurukshetra", "battlefield", "introduction"],
          audio: {
            audioUrl: "https://example.com/audio/bg-1-1.mp3",
            speaker: "H.H. Jayapataka Swami",
            duration: 45,
            quality: "128kbps"
          }
        },
        {
          verseNumber: "2",
          orderNumber: 2,
          sanskritText: "सञ्जय उवाच\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥",
          transliteration: "sañjaya uvāca\ndṛṣṭvā tu pāṇḍavānīkaṁ\nvyūḍhaṁ duryodhanas tadā\nācāryam upasaṅgamya\nrājā vacanam abravīt",
          translation: "Sañjaya said: O King, after looking over the army arranged in military formation by the sons of Pāṇḍu, King Duryodhana went to his teacher and spoke the following words.",
          purport: "Dhṛtarāṣṭra was blind from birth. Unfortunately, he was also spiritually blind. He knew very well that his sons were equally blind in the matter of religion...",
          synonyms: [
            {
              word: "sañjayaḥ",
              meaning: "Sañjaya"
            },
            {
              word: "uvāca",
              meaning: "said"
            },
            {
              word: "dṛṣṭvā",
              meaning: "after seeing"
            }
          ],
          tags: ["sanjaya", "duryodhana", "teacher", "army"],
        }
      ],
      verseCount: 46,
      tags: ["first-chapter", "battlefield", "anxiety"]
    },
    {
      chapterNumber: 2,
      title: "Contents of the Gītā Summarized",
      description: "Arjuna submits to Lord Kṛṣṇa as His disciple, and Kṛṣṇa begins His teachings to Arjuna by explaining the fundamental distinction between the temporary physical body and the eternal soul.",
      introduction: "The Bhagavad-gītā is a conversation between Lord Kṛṣṇa and His intimate friend Arjuna...",
      verses: [
        // You can add more verses here following the same pattern
      ],
      verseCount: 72,
      tags: ["soul", "body", "eternal", "knowledge"]
    }
  ],
  
  chapterCount: 18,
  totalVerses: 700,
  
  metadata: {
    publisher: "The Bhaktivedanta Book Trust",
    publishedDate: new Date("1972-01-01"),
    edition: "Complete Edition",
    pageCount: 972,
    language: "English",
    translators: ["A.C. Bhaktivedanta Swami Prabhupāda"],
    originalLanguage: "Sanskrit",
    copyright: "© The Bhaktivedanta Book Trust International, Inc."
  },
  
  tags: ["spiritual", "yoga", "philosophy", "self-realization", "krishna", "vedic"],
  allowComments: true,
  allowDownload: true,
  metaTitle: "Bhagavad-gītā As It Is - Complete Online Edition",
  metaDescription: "Read the complete Bhagavad-gītā As It Is online. The jewel of India's spiritual wisdom with Sanskrit text, translations, and purports by A.C. Bhaktivedanta Swami Prabhupāda.",
  metaKeywords: ["bhagavad-gita", "krishna", "spiritual", "yoga", "vedic", "philosophy", "prabhupada"]
};

// Sample Srimad Bhagavatam data structure
export const sampleSrimadBhagavatamData = {
  title: "Śrīmad-Bhāgavatam",
  slug: "sb",
  subtitle: "The Story of the Fortunate One",
  description: "Śrīmad-Bhāgavatam is the spotless Purāṇa. It is most dear to the Vaiṣṇavas because it describes the pure and supreme knowledge of the paramahaṁsas.",
  author: "A.C. Bhaktivedanta Swami Prabhupāda",
  category: BookCategory.SRIMAD_BHAGAVATAM,
  status: BookStatus.PUBLISHED,
  chapterCount: 335, // Across 12 cantos
  totalVerses: 18000,
  tags: ["purana", "bhagavatam", "krishna", "stories", "devotion"],
  allowComments: true,
  allowDownload: true
};

// Usage example for seeding:
/*
To seed your database with this sample data, you can create a seeder service:

1. Create a seeder command:
   npm run seed:books

2. Or use directly in your service:
   await this.booksService.create(sampleBhagavadGitaData);
*/
