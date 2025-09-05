# Overview

This is "StealthDrop", an HTML Payload Generator security tool that allows users to encode files into various formats and generate HTML payloads for security testing purposes. The application provides multiple encoding methods including CSS encoding, XOR encryption, AES-GCM encryption, Base64, and Hex encoding. Users can upload files, configure encoding settings, and generate downloadable HTML payloads that contain the encoded file data.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with custom shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular components split by functionality (FileUpload, MethodSelection, ConfigurationPanel, GenerationPanel, PayloadPreview)

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Server**: Custom Vite integration for hot module replacement
- **Storage Layer**: Abstract storage interface with in-memory implementation for users
- **Routes**: RESTful API structure with `/api` prefix (currently minimal implementation)
- **Error Handling**: Centralized error middleware for consistent error responses

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless PostgreSQL adapter
- **Schema**: User management schema with username/password authentication
- **Migrations**: Drizzle Kit for database schema migrations
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple

## File Processing & Encoding
- **Encoding Methods**: Multiple encoding strategies (CSS, XOR, AES-GCM, Base64, Hex)
- **File Handling**: Browser-based file reading with ArrayBuffer processing
- **Payload Generation**: Dynamic HTML template generation with embedded encoded data
- **Security Features**: Encryption key management, stealth mode options, auto-download functionality

## Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: ESBuild for production bundling
- **Development Features**: Replit-specific plugins for cartographer and error modal

## Design Patterns
- **Component Composition**: Radix UI primitives wrapped with custom styling
- **Configuration Management**: Centralized config object with type safety
- **Error Boundaries**: Toast notifications for user feedback
- **Responsive Design**: Mobile-first approach with breakpoint-based adaptations

# External Dependencies

## Core Frontend Libraries
- **React Ecosystem**: React 18+ with TypeScript, React DOM, React Hook Form
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS, class-variance-authority for component variants, clsx for conditional classes
- **State Management**: TanStack React Query for server state, Zustand-like patterns for local state

## Backend Services
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM with Drizzle Kit for migrations and schema management
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple

## Development & Build Tools
- **Build Tools**: Vite with plugins for React, runtime error overlay, and Replit integration
- **TypeScript**: Full TypeScript support with strict type checking
- **Code Processing**: ESBuild for production builds, PostCSS for CSS processing

## Security & Encryption Libraries
- **Cryptography**: Web Crypto API for AES-GCM encryption (browser-native)
- **Encoding**: Native browser APIs for Base64, custom implementations for XOR and Hex
- **Validation**: Zod for runtime type validation and schema generation

## Utility Libraries
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel**: Embla Carousel for interactive UI elements
- **Command Palette**: cmdk for command interface functionality
- **Icons**: Lucide React for consistent iconography