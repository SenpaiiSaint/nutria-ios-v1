# NutriTrack AI

A modern React Native app for tracking nutrition and reducing food waste through AI-powered receipt scanning.

## Features

- **Smart Receipt Scanning**: Use AI to automatically extract food items from receipts
- **Pantry Management**: Track your food inventory with an intuitive interface
- **Meal Planning**: Plan your nutrition with a drag-and-drop weekly planner
- **Analytics**: Monitor your nutrition goals and food waste (coming soon)

## UI/UX Improvements

The app has been completely polished with modern design principles:

### Design System
- **Color Palette**: Consistent green theme (#22c55e) with proper contrast ratios
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system for spacing
- **Shadows**: Subtle shadows for depth and visual hierarchy
- **Animations**: Smooth spring animations for better user feedback

### Components
- **Tab Navigation**: Enhanced with icons and better styling
- **Cards**: Consistent card design with proper shadows and borders
- **Buttons**: Multiple variants (primary, secondary, outline) with proper states
- **Headers**: Consistent header design across all screens
- **Empty States**: Beautiful empty states with helpful messaging

### Screens
- **Landing Page**: Engaging hero section with feature highlights
- **Pantry**: Clean list view with swipe-to-delete functionality
- **Scanner**: Professional camera interface with permission handling
- **Planner**: Intuitive weekly calendar with drag-and-drop meals
- **Stats**: Informative analytics preview with upcoming features

### Technical Improvements
- **Tamagui Integration**: Full migration to Tamagui for better performance
- **Type Safety**: Proper TypeScript integration throughout
- **Responsive Design**: Works well across different screen sizes
- **Accessibility**: Proper contrast ratios and touch targets

## Tech Stack

- **React Native** with Expo
- **Tamagui** for UI components and theming
- **Expo Router** for navigation
- **Zustand** for state management
- **TensorFlow Lite** for OCR
- **Supabase** for backend

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS or Android:
```bash
npm run ios
# or
npm run android
```

## Project Structure

```
nutria-ios/
├── app/                 # Main app screens
│   ├── (tabs)/         # Tab navigation screens
│   ├── _layout.tsx     # Root layout
│   └── index.tsx       # Landing page
├── components/         # Reusable UI components
├── store/             # State management
├── lib/               # Utilities and services
├── types/             # TypeScript type definitions
└── assets/            # Images, fonts, and other assets
```

## Contributing

1. Follow the established design system
2. Use Tamagui components when possible
3. Maintain consistent spacing and typography
4. Add proper TypeScript types
5. Test on both iOS and Android

## Design Principles

- **Consistency**: All components follow the same design patterns
- **Accessibility**: Proper contrast ratios and touch targets
- **Performance**: Optimized animations and efficient rendering
- **User Experience**: Intuitive interactions and clear feedback
- **Modern Aesthetics**: Clean, minimal design with subtle details