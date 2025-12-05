# 💚 Health Tracker - Daily Water & Calorie Intake App

A modern, responsive web application built with React that helps users track their daily water intake and caloric consumption against personalized goals. The app features beautiful UI, data persistence, and real-time progress tracking.

![Health Tracker](https://img.shields.io/badge/React-19.2.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

### Core Functionality
- **Water Intake Tracking**: Log daily water consumption with quick-add buttons
- **Calorie Logging**: Record meals with descriptions and calorie counts
- **Goal Management**: Set and customize daily water and calorie goals
- **Progress Visualization**: Beautiful animated progress bars showing completion status
- **Data Persistence**: All data is automatically saved to localStorage and persists across sessions
- **Daily Summary**: Overview of your progress with visual indicators

### Additional Features
- **Recent Meals History**: View your last 5 logged meals with timestamps
- **Quick Add Buttons**: Fast calorie entry with preset values (100, 250, 500 kcal)
- **Goal Achievement Animations**: Celebratory animations when goals are met
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatically adapts to system preferences
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Technical Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: CSS3 with CSS Custom Properties (CSS Variables)
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: localStorage API
- **Code Quality**: ESLint

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capstone-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
capstone-project/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── DailyGoal.jsx          # Goal setting and display component
│   │   ├── DailyGoal.css
│   │   ├── WaterTracker.jsx       # Water intake tracking component
│   │   ├── WaterTracker.css
│   │   ├── CalorieLogger.jsx      # Meal logging form component
│   │   ├── CalorieLogger.css
│   │   ├── ProgressDisplay.jsx    # Reusable progress bar component
│   │   └── ProgressDisplay.css
│   ├── App.jsx                     # Main app component with state management
│   ├── App.css                     # App-specific styles
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and CSS variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Component Architecture

### 1. **DailyGoal Component**
- **Purpose**: Displays and allows editing of daily water and calorie goals
- **Features**:
  - Edit mode with form inputs
  - Save/Cancel functionality
  - Visual goal display with icons
- **Props**:
  - `waterGoal`: Target water intake (glasses)
  - `calorieGoal`: Target calorie intake (kcal)
  - `onWaterGoalChange`: Callback for water goal updates
  - `onCalorieGoalChange`: Callback for calorie goal updates

### 2. **WaterTracker Component**
- **Purpose**: Tracks daily water intake with interactive controls
- **Features**:
  - Add 1 or 2 glasses buttons
  - Reset functionality with confirmation
  - Visual glass indicators
  - Current intake display
- **Props**:
  - `waterIntake`: Current water intake (glasses)
  - `waterGoal`: Target water goal
  - `onAddWater`: Callback to increment water intake
  - `onReset`: Callback to reset water intake

### 3. **CalorieLogger Component**
- **Purpose**: Form component for logging meals and calories
- **Features**:
  - Meal description input (optional)
  - Calorie input with validation
  - Quick add buttons (100, 250, 500 kcal)
  - Recent meals history
- **Props**:
  - `calorieIntake`: Current total calorie intake
  - `onAddCalories`: Callback to add calories

### 4. **ProgressDisplay Component**
- **Purpose**: Reusable progress bar visualization
- **Features**:
  - Dynamic width based on percentage
  - Color themes (blue, green, orange)
  - Goal achievement indicator
  - Accessibility attributes
- **Props**:
  - `currentValue`: Current progress value
  - `targetValue`: Target/goal value
  - `label`: Optional label text
  - `color`: Color theme (default: 'blue')

## 🔄 Data Flow

1. **User Input** → Component event handler updates local state
2. **State Update** → Triggers re-render of dependent components
3. **useEffect Hook** → Saves updated state to localStorage
4. **Component Mount** → Loads saved data from localStorage on app start

### State Management

The main `App.jsx` component manages all global state:
- `waterGoal` & `calorieGoal`: User-defined targets
- `waterIntake` & `calorieIntake`: Daily tracking values

### Persistence Strategy

- **Daily Data**: Stored with date-based keys (`health-tracker-YYYY-M-D`)
- **Goals**: Stored separately (`health-tracker-goals`)
- **Auto-save**: Data persists automatically on every change
- **Date-based**: Each day gets its own storage entry

## 🎯 Key React Concepts Demonstrated

### 1. **Controlled Components**
- Form inputs in `CalorieLogger` and `DailyGoal` use controlled component pattern
- Input values are bound to state via `value` prop
- Updates handled through `onChange` event handlers

### 2. **React Hooks**
- **useState**: Manages component and app-level state
- **useEffect**: Handles side effects (localStorage operations, data loading)

### 3. **Component Reusability**
- `ProgressDisplay` component used for both water and calorie progress
- Demonstrates DRY (Don't Repeat Yourself) principles

### 4. **Conditional Rendering**
- Goal achievement badges and animations
- Edit mode toggle in `DailyGoal`
- Recent meals list display

### 5. **Event Handling**
- Button clicks, form submissions
- Input changes with validation
- Confirmation dialogs

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design with smooth animations
- **Color System**: CSS custom properties for easy theming
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Visual Feedback**: Animations, hover effects, and transitions
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Weekly/Monthly statistics and charts
- [ ] Export data to CSV/JSON
- [ ] Multiple user profiles
- [ ] Cloud sync with backend API
- [ ] Push notifications for reminders
- [ ] Integration with fitness trackers
- [ ] Meal suggestions based on goals
- [ ] Water intake reminders

## 🐛 Troubleshooting

### Data Not Persisting
- Check browser localStorage is enabled
- Clear browser cache and try again
- Ensure you're not in incognito/private mode

### Styles Not Loading
- Clear browser cache
- Restart the development server
- Check console for CSS import errors

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility

## 📝 Code Quality

- **Clean Code**: Well-organized, readable, and maintainable
- **Comments**: Comprehensive JSDoc comments for all components
- **Naming**: Meaningful variable and function names
- **Formatting**: Consistent code style throughout
- **ESLint**: Configured for code quality checks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built as a capstone project demonstrating React skills and best practices.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the fast build tooling
- All open-source contributors

---

**Made with ❤️ using React**
