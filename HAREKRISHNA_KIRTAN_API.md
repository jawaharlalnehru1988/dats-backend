# Harekrishna Kirtan API Documentation

## Overview
This module manages Harekrishna Kirtan (devotional songs) with CRUD operations, authentication, and authorization.

## Schema Structure
```typescript
{
  audioUrl: string,           // URL to the audio file
  singerName: string,         // Name of the singer
  quoteAboutHarinam: [        // Array of quotes about Harinam
    {
      quoteContent: string,   // The actual quote text
      quoteFrom: string       // Source/author of the quote
    }
  ],
  ratings: number             // Rating from 0 to 5
}
```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Get All Kirtans
```
GET /harekrishna-kirtan
```
Returns all Harekrishna Kirtans.

#### Get Kirtan by ID
```
GET /harekrishna-kirtan/:id
```
Returns a specific kirtan by its ID.

#### Search by Rating
```
GET /harekrishna-kirtan/search/rating?minRating=4
```
Returns kirtans with rating >= specified minimum rating.

#### Search by Singer
```
GET /harekrishna-kirtan/search/singer?name=singer_name
```
Returns kirtans by a specific singer (case-insensitive search).

### Protected Endpoints (Admin Only)

#### Create New Kirtan
```
POST /harekrishna-kirtan
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "audioUrl": "https://example.com/audio.mp3",
  "singerName": "Srila Prabhupada",
  "quoteAboutHarinam": [
    {
      "quoteContent": "Chanting Hare Krishna brings immediate peace",
      "quoteFrom": "Bhagavad Gita"
    }
  ],
  "ratings": 5
}
```

#### Update Kirtan
```
PATCH /harekrishna-kirtan/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "ratings": 4.5,
  "quoteAboutHarinam": [
    {
      "quoteContent": "Updated quote content",
      "quoteFrom": "Updated source"
    }
  ]
}
```

#### Delete Kirtan
```
DELETE /harekrishna-kirtan/:id
Authorization: Bearer <jwt_token>
```

## Validation Rules

- `audioUrl`: Required, must be a valid string
- `singerName`: Required, must be a non-empty string
- `quoteAboutHarinam`: Required array, each quote must have:
  - `quoteContent`: Required, non-empty string
  - `quoteFrom`: Required, non-empty string
- `ratings`: Required number between 0 and 5

## Authentication & Authorization

- **Public endpoints**: No authentication required
- **Admin endpoints**: Require JWT token with admin role
- **JWT Token**: Must be provided in Authorization header as `Bearer <token>`

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["validation errors"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Harekrishna Kirtan with ID {id} not found"
}
```

## Example Usage

### Creating a Kirtan (Admin)
```bash
curl -X POST http://localhost:3000/harekrishna-kirtan \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "audioUrl": "https://example.com/kirtan1.mp3",
    "singerName": "Madhava Prabhu",
    "quoteAboutHarinam": [
      {
        "quoteContent": "The holy name is the cure for all material diseases",
        "quoteFrom": "Caitanya Caritamrta"
      }
    ],
    "ratings": 5
  }'
```

### Getting All Kirtans (Public)
```bash
curl http://localhost:3000/harekrishna-kirtan
```

### Searching by Rating (Public)
```bash
curl "http://localhost:3000/harekrishna-kirtan/search/rating?minRating=4"
```

## Features

✅ **CRUD Operations**: Create, Read, Update, Delete kirtans
✅ **Authentication**: JWT-based authentication
✅ **Authorization**: Role-based access control (Admin only for CUD operations)
✅ **Validation**: Input validation using class-validator
✅ **Search**: Search by rating and singer name
✅ **Error Handling**: Proper error responses
✅ **API Documentation**: Swagger/OpenAPI documentation
✅ **Database**: MongoDB with Mongoose ODM
