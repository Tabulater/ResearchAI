# ResearchAI

A modern web application for AI-powered research and data analysis. Built with React, TypeScript, Vite, and Supabase.

## Features

- **Modern Stack**: Built with React 18, TypeScript, and Vite for optimal performance and developer experience
- **AI Integration**: Leverages OpenAI's API for intelligent research capabilities
- **Real-time Database**: Powered by Supabase for data persistence and authentication
- **Beautiful UI**: Styled with Tailwind CSS for a clean, responsive design
- **Type Safety**: Full TypeScript support for better code quality and developer experience

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Supabase account
- OpenAI API key

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd ResearchAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser**
   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
  ├── components/     # Reusable React components
  ├── services/      # API and service integrations
  ├── App.tsx        # Main application component
  ├── main.tsx       # Application entry point
  └── index.css      # Global styles
```

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [OpenAI API](https://openai.com/api/) - AI and machine learning platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Supabase](https://supabase.com/) for the open-source Firebase alternative
- [OpenAI](https://openai.com/) for their powerful AI models
