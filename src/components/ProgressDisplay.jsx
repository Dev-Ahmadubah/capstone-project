/**
 * ProgressDisplay Component
 * 
 * A reusable component that displays a visual progress bar.
 * Takes currentValue and targetValue as props and calculates the percentage.
 * 
 * @param {number} currentValue - The current progress value
 * @param {number} targetValue - The target/goal value
 * @param {string} label - Optional label for the progress bar
 * @param {string} color - Optional color theme (default: 'blue')
 */
import './ProgressDisplay.css'

function ProgressDisplay({ currentValue, targetValue, label, color = 'blue' }) {
  // Calculate percentage, ensuring it doesn't exceed 100%
  const percentage = Math.min((currentValue / targetValue) * 100, 100)
  
  // Determine if goal is met
  const goalMet = currentValue >= targetValue
  
  return (
    <div className="progress-display">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-info">
        <span className="progress-text">
          {currentValue.toFixed(1)} / {targetValue} 
          {goalMet && <span className="goal-badge">✓ Goal Met!</span>}
        </span>
        <span className="progress-percentage">{percentage.toFixed(0)}%</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className={`progress-bar progress-bar-${color} ${goalMet ? 'goal-met' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={currentValue}
          aria-valuemin={0}
          aria-valuemax={targetValue}
          aria-label={`${label || 'Progress'}: ${percentage.toFixed(0)}%`}
        >
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressDisplay

