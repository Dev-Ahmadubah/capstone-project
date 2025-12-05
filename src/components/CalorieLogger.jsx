/**
 * CalorieLogger Component
 * 
 * A form component that allows users to input calories for meals.
 * Demonstrates controlled component logic and adding data to a running total.
 * 
 * @param {number} calorieIntake 
 * @param {function} onAddCalories 
 *
 */
import { useState } from 'react'
import './CalorieLogger.css'

function CalorieLogger({ calorieIntake, onAddCalories }) {
  const [calorieInput, setCalorieInput] = useState('')
  const [mealDescription, setMealDescription] = useState('')
  const [recentMeals, setRecentMeals] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const calories = Number(calorieInput)
    
    if (calories > 0 && calories <= 5000) {
      onAddCalories(calories)
      
      // Add to recent meals list
      if (mealDescription.trim()) {
        setRecentMeals(prev => [
          { description: mealDescription, calories, timestamp: new Date() },
          ...prev.slice(0, 4) // Keep only last 5 meals
        ])
      }
      
      // Reset form
      setCalorieInput('')
      setMealDescription('')
    } else {
      alert('Please enter a valid calorie amount (1-5000)')
    }
  }

  const handleQuickAdd = (calories) => {
    onAddCalories(calories)
    setRecentMeals(prev => [
      { description: 'Quick add', calories, timestamp: new Date() },
      ...prev.slice(0, 4)
    ])
  }

  return (
    <div className="calorie-logger">
      <h3>🍎 Calorie Logger</h3>
      
      <form onSubmit={handleSubmit} className="calorie-form">
        <div className="form-group">
          <label htmlFor="meal-description">
            Meal Description (optional):
          </label>
          <input
            id="meal-description"
            type="text"
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
            placeholder="e.g., Breakfast, Lunch, Snack..."
            className="form-input"
            maxLength="50"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="calorie-input">
            Calories (kcal):
          </label>
          <input
            id="calorie-input"
            type="number"
            min="1"
            max="5000"
            value={calorieInput}
            onChange={(e) => setCalorieInput(e.target.value)}
            placeholder="Enter calories"
            className="form-input"
            required
          />
        </div>
        
        <button type="submit" className="log-meal-button">
          📝 Log Meal
        </button>
      </form>

      <div className="quick-add-section">
        <p className="quick-add-label">Quick Add:</p>
        <div className="quick-add-buttons">
          <button 
            onClick={() => handleQuickAdd(100)}
            className="quick-add-button"
            aria-label="Add 100 calories"
          >
            +100
          </button>
          <button 
            onClick={() => handleQuickAdd(250)}
            className="quick-add-button"
            aria-label="Add 250 calories"
          >
            +250
          </button>
          <button 
            onClick={() => handleQuickAdd(500)}
            className="quick-add-button"
            aria-label="Add 500 calories"
          >
            +500
          </button>
        </div>
      </div>

      {recentMeals.length > 0 && (
        <div className="recent-meals">
          <h4>Recent Meals</h4>
          <ul className="meals-list">
            {recentMeals.map((meal, index) => (
              <li key={index} className="meal-item">
                <span className="meal-description">{meal.description}</span>
                <span className="meal-calories">{meal.calories} kcal</span>
                <span className="meal-time">
                  {meal.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CalorieLogger

