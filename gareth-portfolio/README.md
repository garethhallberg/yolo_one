# Gareth Hallberg Portfolio Website 🚀

A modern portfolio website showcasing Gareth Hallberg's 25+ years of experience in mobile development, AI, and software architecture, featuring an interactive Digital Twin chatbot powered by AI.

## 📖 About

This is a Next.js portfolio website for Gareth Hallberg, a Lead Consultant & AI Community of Practice Leader with extensive experience in:

- **Mobile Development**: iOS, Android, Swift, Kotlin, Objective-C
- **AI & Machine Learning**: Large Language Models (LLMs), OpenAI API, AI-assisted coding
- **Software Architecture**: Mobile solutions, WebRTC, real-time systems
- **Leadership**: Team mentoring, AI adoption, technical strategy

## ✨ Key Features

### 🤖 Digital Twin AI Chatbot
An interactive AI assistant that:
- Answers questions about Gareth's career, skills, and experience
- Speaks in first-person as Gareth's digital representation
- Uses Claude Sonnet 4 LLM via OpenRouter API
- Maintains conversation history for context-aware responses
- Features a responsive, animated UI with Framer Motion

### 📱 Responsive Design
- Mobile-first approach with Tailwind CSS
- Dark mode support
- Smooth animations and transitions
- Accessible UI components

### 🚀 Modern Tech Stack
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **AI Integration**: OpenRouter API with Claude Sonnet 4
- **Type Safety**: TypeScript
- **Testing**: Jest with React Testing Library

## 🎯 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts       # AI chatbot API endpoint
│   ├── layout.tsx              # Main layout
│   └── page.tsx                # Home page
├── components/
│   ├── DigitalTwinChat.tsx     # AI chatbot component
│   ├── Hero.tsx                # Hero section
│   ├── About.tsx               # About section
│   ├── Experience.tsx          # Experience timeline
│   ├── Contact.tsx             # Contact form
│   └── Navbar.tsx              # Navigation
├── data/
│   └── profile.ts              # Gareth's professional profile data
├── utils/
│   └── motion.ts               # Animation utilities
└── styles/
    └── index.ts                # Global styles
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js v18+ or v20+
- npm, yarn, or pnpm
- OpenRouter API key (for AI chatbot functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/gareth-portfolio.git
cd gareth-portfolio
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Create a `.env.local` file and add your OpenRouter API key:
```bash
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🤖 Digital Twin Chatbot Configuration

The AI chatbot uses the OpenRouter API with Claude Sonnet 4 model. To configure:

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Add it to your `.env.local` file
3. The system prompt is defined in `src/app/api/chat/route.ts`

### Customizing the AI Personality

Modify the `systemPrompt` in `src/app/api/chat/route.ts` to change:
- Response style and tone
- Knowledge boundaries
- Conversation rules
- Personality traits

## 🧪 Testing

Run tests with:
```bash
npm test
# or for watch mode
npm run test:watch
# or for coverage report
npm run test:coverage
```

## 📦 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm test`: Run Jest tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage

## 🎨 Customization

### Profile Data
Edit `src/data/profile.ts` to update:
- Personal information
- Work experience
- Skills and services
- Education history

### Styling
- Tailwind CSS classes are used throughout components
- Global styles in `src/styles/index.ts`
- Color scheme and animations in `src/utils/motion.ts`

### Components
Each section is modular:
- `Hero.tsx`: Main hero section
- `About.tsx`: About me section
- `Experience.tsx`: Work experience timeline
- `Contact.tsx`: Contact form
- `DigitalTwinChat.tsx`: AI chatbot interface

## 🚀 Deployment

### Vercel (Recommended)
This is a Next.js project, so Vercel is the easiest deployment option:

1. Push to GitHub/GitLab
2. Import project to Vercel
3. Add your `NEXT_PUBLIC_OPENROUTER_API_KEY` environment variable
4. Deploy!

### Other Platforms
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any Node.js hosting provider

## 📄 Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary. All rights reserved.

## 📬 Contact

Gareth Hallberg
- Email: gareth@ghallberg.co.uk
- LinkedIn: linkedin.com/in/garethhallberg-9285844
- Website: www.horseshoeshape.co.uk

---

🤖 **Try the Digital Twin!** Click the chat button in the bottom-right corner to ask Gareth's AI assistant about his career, skills, and experience!