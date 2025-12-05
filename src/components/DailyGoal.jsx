/**
 * DailyGoal Component
 * 
 * Displays and allows editing of the user's daily goals for water and calories.
 * Uses useState to manage goal values.
 * 
 * @param {number} waterGoal - Target water intake in glasses
 * @param {number} calorieGoal - Target calorie intake
 * @param {function} onWaterGoalChange - Callback when water goal changes
 * @param {function} onCalorieGoalChange - Callback when calorie goal changes
 */
import { useState } from 'react'
import './DailyGoal.css'

function DailyGoal({ waterGoal, calorieGoal, onWaterGoalChange, onCalorieGoalChange }) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempWaterGoal, setTempWaterGoal] = useState(waterGoal)
  const [tempCalorieGoal, setTempCalorieGoal] = useState(calorieGoal)

  const handleSave = () => {
    onWaterGoalChange(tempWaterGoal)
    onCalorieGoalChange(tempCalorieGoal)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempWaterGoal(waterGoal)
    setTempCalorieGoal(calorieGoal)
    setIsEditing(false)
  }

  return (
    <div className="daily-goal">
      <div className="goal-header">
        <h2>Daily Goals</h2>
        {!isEditing ? (
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit goals"
          >
            ✏️ Edit
          </button>
        ) : (
          <div className="edit-actions">
            <button 
              className="save-button"
              onClick={handleSave}
              aria-label="Save goals"
            >
              ✓ Save
            </button>
            <button 
              className="cancel-button"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              ✕ Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="goal-edit-form">
          <div className="goal-input-group">
            <label htmlFor="water-goal">
              Water Goal (glasses):
            </label>
            <input
              id="water-goal"
              type="number"
              min="1"
              max="20"
              value={tempWaterGoal}
              onChange={(e) => setTempWaterGoal(Number(e.target.value))}
              className="goal-input"
            />
          </div>
          <div className="goal-input-group">
            <label htmlFor="calorie-goal">
              Calorie Goal (kcal):
            </label>
            <input
              id="calorie-goal"
              type="number"
              min="1000"
              max="5000"
              step="100"
              value={tempCalorieGoal}
              onChange={(e) => setTempCalorieGoal(Number(e.target.value))}
              className="goal-input"
            />
          </div>
        </div>
      ) : (
        <div className="goal-display">
          <div className="goal-item">
            <span className="goal-icon">💧</span>
            <div className="goal-details">
              <span className="goal-value">{waterGoal}</span>
              <span className="goal-unit">glasses of water</span>
            </div>
          </div>
          <div className="goal-item">
            <span className="goal-icon">🍎</span>
            <div className="goal-details">
              <span className="goal-value">{calorieGoal.toLocaleString()}</span>
              <span className="goal-unit">calories</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyGoal

