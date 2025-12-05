/**
 * WaterTracker Component
 * 
 * Displays the current water intake and provides buttons to add water or reset.
 * Demonstrates state updates and event handling.
 * 
 * @param {number} waterIntake - Current water intake in glasses
 * @param {number} waterGoal - Target water goal
 * @param {function} onAddWater - Callback to add one glass of water
 * @param {function} onReset - Callback to reset water intake
 */
import './WaterTracker.css'

function WaterTracker({ waterIntake, waterGoal, onAddWater, onReset }) {
  const handleAddWater = () => {
    onAddWater()
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your water intake for today?')) {
      onReset()
    }
  }

  return (
    <div className="water-tracker">
      <div className="tracker-header">
        <h3>💧 Water Intake</h3>
        <button 
          className="reset-button"
          onClick={handleReset}
          aria-label="Reset water intake"
        >
          🔄 Reset
        </button>
      </div>
      
      <div className="water-display">
        <div className="water-count">
          <span className="water-number">{waterIntake}</span>
          <span className="water-label">glasses</span>
        </div>
        <div className="water-visual">
          {Array.from({ length: Math.min(waterGoal, 10) }).map((_, index) => (
            <div
              key={index}
              className={`water-glass ${index < waterIntake ? 'filled' : ''}`}
              aria-label={index < waterIntake ? 'Glass filled' : 'Glass empty'}
            >
              🥤
            </div>
          ))}
        </div>
      </div>

      <div className="water-actions">
        <button 
          className="add-water-button"
          onClick={handleAddWater}
          aria-label="Add one glass of water"
        >
          + Add 1 Glass
        </button>
        <button 
          className="add-water-button"
          onClick={() => {
            onAddWater()
            onAddWater()
          }}
          aria-label="Add two glasses of water"
        >
          + Add 2 Glasses
        </button>
      </div>
    </div>
  )
}

export default WaterTracker

