# Jack Branston Portfolio

A modern, dark-themed portfolio website with a Star Wars-inspired aesthetic, featuring smooth animations, API-driven content, and object-oriented design patterns.

## 🌟 Features

- **Dark Side Star Wars Theme**: Black background with neon red (#EF4444) accents
- **Dramatic Scroll-Reveal Animation**: Red curtains part as you scroll to reveal content
- **API-Driven Architecture**: All data fetched from Next.js API routes
- **Object-Oriented Design**: Uses TypeScript classes with polymorphism for cards
- **Smooth Animations**: framer-motion animations optimized for desktop, simplified for mobile
- **Responsive Design**: Fully responsive with mobile-specific optimizations
- **Interactive Components**:
  - Dynamic project showcase with modal details
  - AI chatbot simulation trained on resume data
  - Experience timeline
  - Skills showcase
  - Coffee chat booking integration
  - Contact forms

## 🏗️ Architecture

### Next.js App Router

The application uses Next.js 13+ App Router architecture:

```
/app
├── layout.tsx          # Root layout with Orbitron font
├── page.tsx           # Main page with scroll reveal
└── api/               # API routes providing dummy data
    ├── personal-info/
    ├── projects/
    ├── experiences/
    ├── skills/
    └── time-slots/
```

### Component Structure

All components are client-side ("use client") and fetch data from APIs:

```
/components
├── Hero.tsx           # Hero section with personal info
├── Projects.tsx       # Project grid with modals
├── ProjectModal.tsx   # Detailed project view
├── Experience.tsx     # Timeline of work experience
├── Skills.tsx         # Skills organized by category
├── Chatbot.tsx        # AI assistant section
├── Contact.tsx        # Contact forms and social links
└── ScrollReveal.tsx   # Animated curtain entrance
```

### Object-Oriented Design

The application uses TypeScript classes for data representation:

```typescript
// Base class with polymorphism
abstract class BaseCard {
  abstract getTitle(): string;
  abstract getDescription(): string;
  abstract getType(): 'project' | 'experience' | 'skill';
}

// Concrete implementations
class ProjectCard extends BaseCard { ... }
class ExperienceCard extends BaseCard { ... }
class SkillCard extends BaseCard { ... }
```

Benefits:
- Type safety
- Encapsulation of business logic
- Consistent interface across card types
- Easy to extend with new card types

### API Routes

All API routes simulate external service delays and return dummy data:

#### `/api/personal-info`
Returns personal information (name, bio, education, social links)

#### `/api/projects`
Simulates GitHub API - returns projects with:
- Name, description, tech stack
- Stars, forks, URL
- Features and metrics

#### `/api/experiences`
Simulates LinkedIn API - returns work experience with:
- Title, company, location, duration
- Description and achievements

#### `/api/skills`
Returns skills organized by categories:
- Languages, Frontend, Backend, Databases, DevOps, Tools

#### `/api/time-slots`
Simulates Google Calendar API - returns available booking slots

## 🎨 Animation System

### Desktop Animations
- Smooth fade-in/fade-up with custom cubic-bezier easing
- Hover effects with scale and translation
- Staggered children animations
- Floating particles
- Glowing text effects
- Timeline reveal animations

### Mobile Optimizations
- Animations disabled or simplified (< 768px)
- No hover effects (replaced with tap feedback)
- Removed particles for performance
- Faster transition durations (0.2-0.3s vs 0.6-0.8s)
- Responsive text sizes

Animation configuration in `/lib/animations.ts`:
```typescript
const anim = getAnimationConfig(isMobile);
// Returns different configs based on device
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
No environment variables required - all data is simulated locally.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── *.tsx            # Feature components
├── lib/                  # Utilities and types
│   ├── animations.ts    # Animation configurations
│   ├── cardTypes.ts     # OOP card classes
│   └── dummyData.ts     # Legacy data (not used)
└── styles/
    └── globals.css      # Global styles with Tailwind
```

## 🎯 Key Technologies

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (formerly Framer Motion)
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Font**: Orbitron (Google Fonts)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Background**: Pure black (#000000)
- **Primary**: Neon red (#EF4444)
- **Text**: White, gray shades
- **Borders**: Gray-800

### Typography
- **Font**: Orbitron (sci-fi aesthetic)
- **Headings**: 
  - Hero: text-9xl (desktop), text-7xl (tablet), text-5xl (mobile)
  - Sections: text-7xl (desktop), text-5xl (tablet), text-4xl (mobile)

### Components
Uses Shadcn/ui for consistent component library:
- Cards, Buttons, Badges
- Dialog modals
- Form inputs
- Toast notifications

## 🤖 Simulated APIs

All API integrations use mock data to demonstrate functionality:

1. **GitHub API**: Project statistics, stars, forks
2. **LinkedIn Sync**: Work experience and achievements
3. **Google Calendar**: Available time slots for booking
4. **OpenAI Chatbot**: Resume-based Q&A responses

No real API keys required for development or deployment.

## 🔒 Security Considerations

This is a portfolio/demo application:
- No sensitive data collection
- No real API keys exposed
- All forms use toast notifications (no backend submission)
- Not designed for PII or secure data handling

## 📄 License

This is a personal portfolio project. Feel free to use as inspiration for your own portfolio.

## 🙋 Author

**Jack Branston**
- Software Developer
- University of Toronto, Class of 2024
- Email: jack@jackbranston.com
- GitHub: [jackbranston](https://github.com/jackbranston)

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS
