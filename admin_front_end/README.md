# Epaper Admin Frontend

A modern React-based admin panel for managing epaper publications with a clean black and white theme.

## Features

- **Modern Admin Panel**: Clean, responsive design with top navigation and collapsible sidebar
- **Multi-language Support**: Bengali (primary) and English support
- **Black & White Theme**: Minimalist design with high contrast
- **Icon Support**: Lucide React icons throughout the interface
- **Responsive Design**: Works on desktop and mobile devices

## Pages

- **Dashboard**: Overview with statistics and recent activity
- **Create Epaper**: Form to create new epaper publications
- **Moderate**: Content moderation and approval system
- **Publish**: Manage published and scheduled content
- **Settings**: Configure language, notifications, and user preferences

## Tech Stack

- React 18
- React Router DOM
- Vite (build tool)
- React i18next (internationalization)
- Lucide React (icons)
- CSS3 (styling)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TopNavigation.jsx
│   └── Sidebar.jsx
├── layouts/            # Layout components
│   └── Layout.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── CreateEpaper.jsx
│   ├── Moderate.jsx
│   ├── Publish.jsx
│   └── Settings.jsx
├── i18n/               # Internationalization
│   └── index.js
├── assets/             # Static assets
├── App.jsx             # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Language Support

The application supports two languages:
- **Bengali (বাংলা)** - Primary language
- **English** - Secondary language

Language can be switched using the globe icon in the top navigation.

## Theme

The application uses a black and white theme with:
- High contrast for accessibility
- Clean, minimalist design
- Responsive layout
- Dark mode support (system preference)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
