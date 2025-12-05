/**
 * Main App Component
 * 
 * Integrates all tracking components and manages global state.
 * Implements localStorage persistence to save user data across sessions.
 */
import { useState, useEffect } from 'react'
import DailyGoal from './components/DailyGoal'
import WaterTracker from './components/WaterTracker'
import CalorieLogger from './components/CalorieLogger'
import ProgressDisplay from './components/ProgressDisplay'
import './App.css'

function App() {
  // Default goals
  const DEFAULT_WATER_GOAL = 8
  const DEFAULT_CALORIE_GOAL = 2000

  // Get today's date key for localStorage (format: YYYY-MM-DD)
  const getTodayKey = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `health-tracker-${year}-${month}-${day}`
  }

  // Check if data is older than 24 hours
  const isDataExpired = (savedTimestamp) => {
    if (!savedTimestamp) return true
    
    const savedDate = new Date(savedTimestamp)
    const now = new Date()
    const hoursDiff = (now - savedDate) / (1000 * 60 * 60) // Convert to hours
    
    return hoursDiff >= 24
  }

  // Helper function to load initial goals from localStorage
  const loadInitialGoals = () => {
    try {
      const savedGoals = localStorage.getItem('health-tracker-goals')
      if (savedGoals) {
        const goals = JSON.parse(savedGoals)
        return {
          waterGoal: goals.waterGoal || DEFAULT_WATER_GOAL,
          calorieGoal: goals.calorieGoal || DEFAULT_CALORIE_GOAL
        }
      }
    } catch (error) {
      console.error('Error loading initial goals:', error)
    }
    return {
      waterGoal: DEFAULT_WATER_GOAL,
      calorieGoal: DEFAULT_CALORIE_GOAL
    }
  }

  // Helper function to load initial intake from localStorage
  const loadInitialIntake = () => {
    try {
      const todayKey = getTodayKey()
      const savedData = localStorage.getItem(todayKey)
      if (savedData) {
        const data = JSON.parse(savedData)
        // Check if data is expired (older than 24 hours)
        if (data.timestamp && !isDataExpired(data.timestamp)) {
          console.log('Loading saved data from localStorage:', data)
          return {
            waterIntake: data.waterIntake || 0,
            calorieIntake: data.calorieIntake || 0
          }
        } else {
          // Data expired, remove it
          console.log('Data expired (older than 24 hours), starting fresh')
          localStorage.removeItem(todayKey)
        }
      }
    } catch (error) {
      console.error('Error loading initial intake:', error)
    }
    return {
      waterIntake: 0,
      calorieIntake: 0
    }
  }

  // State for goals (lazy initialization)
  const initialGoals = loadInitialGoals()
  const [waterGoal, setWaterGoal] = useState(initialGoals.waterGoal)
  const [calorieGoal, setCalorieGoal] = useState(initialGoals.calorieGoal)

  // State for daily intake (lazy initialization)
  const initialIntake = loadInitialIntake()
  const [waterIntake, setWaterIntake] = useState(initialIntake.waterIntake)
  const [calorieIntake, setCalorieIntake] = useState(initialIntake.calorieIntake)

  // Clean up old localStorage entries (older than 7 days)
  const cleanupOldData = () => {
    const keysToRemove = []
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('health-tracker-') && key !== 'health-tracker-goals') {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          if (data && data.timestamp) {
            const dataDate = new Date(data.timestamp)
            if (dataDate < sevenDaysAgo) {
              keysToRemove.push(key)
            }
          }
        } catch {
          // If parsing fails, remove the key
          keysToRemove.push(key)
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  // Clean up old data on component mount
  useEffect(() => {
    // Clean up old data (older than 7 days)
    cleanupOldData()
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    // Only save if component has mounted (skip initial render)
    const todayKey = getTodayKey()
    const timestamp = new Date().toISOString()
    const data = {
      waterIntake,
      calorieIntake,
      timestamp, // Store timestamp for expiration check
      date: timestamp
    }
    
    try {
      localStorage.setItem(todayKey, JSON.stringify(data))
      console.log('Data saved to localStorage:', todayKey, data)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please clear some browser data.')
      }
    }
  }, [waterIntake, calorieIntake])

  // Set up interval to check for 24-hour reset (check every hour)
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const todayKey = getTodayKey()
      const savedData = localStorage.getItem(todayKey)
      
      if (savedData) {
        try {
          const data = JSON.parse(savedData)
          if (isDataExpired(data.timestamp)) {
            console.log('24 hours passed, resetting data')
            setWaterIntake(0)
            setCalorieIntake(0)
            localStorage.removeItem(todayKey)
          }
        } catch (error) {
          console.error('Error checking data expiration:', error)
        }
      }
    }, 60 * 60 * 1000) // Check every hour

    return () => clearInterval(checkInterval)
  }, [])

  // Save goals to localStorage 
  useEffect(() => {
    const goals = {
      waterGoal,
      calorieGoal
    }
    localStorage.setItem('health-tracker-goals', JSON.stringify(goals))
  }, [waterGoal, calorieGoal])

  // Handler functions
  const handleWaterGoalChange = (newGoal) => {
    setWaterGoal(newGoal)
  }

  const handleCalorieGoalChange = (newGoal) => {
    setCalorieGoal(newGoal)
  }

  const handleAddWater = () => {
    setWaterIntake(prev => prev + 1)
  }

  const handleResetWater = () => {
    setWaterIntake(0)
  }

  const handleAddCalories = (calories) => {
    setCalorieIntake(prev => prev + calories)
  }

  // Calculate daily stats
  const waterPercentage = (waterIntake / waterGoal) * 100
  const caloriePercentage = (calorieIntake / calorieGoal) * 100
  const waterGoalMet = waterIntake >= waterGoal
  const calorieGoalMet = calorieIntake >= calorieGoal

  return (
    <div className="app">
      <header className="app-header">
        <h1>HydraTrack</h1>
        <p className="app-subtitle">Track your daily water intake and calories</p>
        <div className="date-display">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </header>

      <main className="app-main">
        <DailyGoal
          waterGoal={waterGoal}
          calorieGoal={calorieGoal}
          onWaterGoalChange={handleWaterGoalChange}
          onCalorieGoalChange={handleCalorieGoalChange}
        />

        <div className="trackers-container">
          <div className="tracker-section">
            <WaterTracker
              waterIntake={waterIntake}
              waterGoal={waterGoal}
              onAddWater={handleAddWater}
              onReset={handleResetWater}
            />
            <ProgressDisplay
              currentValue={waterIntake}
              targetValue={waterGoal}
              label="Water Progress"
              color="blue"
            />
          </div>

          <div className="tracker-section">
            <CalorieLogger
              calorieIntake={calorieIntake}
              onAddCalories={handleAddCalories}
            />
            <ProgressDisplay
              currentValue={calorieIntake}
              targetValue={calorieGoal}
              label="Calorie Progress"
              color="green"
            />
          </div>
        </div>

        <div className="summary-section">
          <h2>📊 Daily Summary</h2>
          <div className="summary-cards">
            <div className={`summary-card ${waterGoalMet ? 'goal-achieved' : ''}`}>
              <div className="summary-icon">💧</div>
              <div className="summary-content">
                <div className="summary-label">Water</div>
                <div className="summary-value">
                  {waterIntake} / {waterGoal} glasses
                </div>
                <div className="summary-percentage">{waterPercentage.toFixed(0)}%</div>
              </div>
            </div>
            <div className={`summary-card ${calorieGoalMet ? 'goal-achieved' : ''}`}>
              <div className="summary-icon">🍎</div>
              <div className="summary-content">
                <div className="summary-label">Calories</div>
                <div className="summary-value">
                  {calorieIntake.toLocaleString()} / {calorieGoal.toLocaleString()} kcal
                </div>
                <div className="summary-percentage">{caloriePercentage.toFixed(0)}%</div>
              </div>
            </div>
          </div>
      </div>
      </main>

      <footer className="app-footer">
        <p>Your data is saved locally in your browser</p>
      </footer>
      </div>
  )
}

export default App
