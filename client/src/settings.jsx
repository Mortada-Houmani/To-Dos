import { useState } from 'react';

const Settings = ({ workDuration, breakDuration, onSave, onCancel }) => {
  const [work, setWork] = useState(workDuration);
  const [breakTime, setBreakTime] = useState(breakDuration);

  const handleWorkChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setWork('');
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 1 && num <= 60) {
        setWork(num);
      }
    }
  };

  const handleBreakChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setBreakTime('');
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 1 && num <= 30) {
        setBreakTime(num);
      }
    }
  };

  const handleSave = () => {
    const workValue = work === '' ? 25 : work;
    const breakValue = breakTime === '' ? 5 : breakTime;
    
    if (workValue > 0 && breakValue > 0) {
      onSave(workValue, breakValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Timer Settings</h2>
      
      <div className="setting-item">
        <label htmlFor="work-duration">Work Duration (minutes)</label>
        <input
          id="work-duration"
          type="number"
          value={work}
          onChange={handleWorkChange}
          onKeyPress={handleKeyPress}
          min="1"
          max="60"
          placeholder="25"
        />
      </div>

      <div className="setting-item">
        <label htmlFor="break-duration">Break Duration (minutes)</label>
        <input
          id="break-duration"
          type="number"
          value={breakTime}
          onChange={handleBreakChange}
          onKeyPress={handleKeyPress}
          min="1"
          max="30"
          placeholder="5"
        />
      </div>

      <div className="settings-buttons">
        <button onClick={handleSave}>✓ Save</button>
        <button onClick={onCancel}>✕ Cancel</button>
      </div>
    </div>
  );
};

export default Settings;
