// Request interface with user property
export interface RequestWithUser {
  user?: {
    name: string;
    email: string;
    sub: string;
    role: string;
  };
}

// JWT Payload interface
export interface JwtPayload {
  name: string;
  email: string;
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

// MongoDB Error interface
export interface MongoError extends Error {
  code?: number;
}
