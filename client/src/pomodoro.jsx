import { useState, useEffect, useRef } from 'react';
import Settings from './settings';

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(intervalRef.current);
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isBreak, workDuration, breakDuration]);

  const handleTimerComplete = () => {
    setIsActive(false);
    const nextIsBreak = !isBreak;
    setIsBreak(nextIsBreak);
    setTimeLeft(nextIsBreak ? breakDuration * 60 : workDuration * 60);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsActive(false);
    setTimeLeft(isBreak ? breakDuration * 60 : workDuration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSaveSettings = (newWork, newBreak) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setWorkDuration(newWork);
    setBreakDuration(newBreak);
    setIsBreak(false);
    setTimeLeft(newWork * 60);
    setIsActive(false);
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <Settings
        workDuration={workDuration}
        breakDuration={breakDuration}
        onSave={handleSaveSettings}
        onCancel={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className="pomodoro-timer">
      <h2>{isBreak ? '☕ Break Time' : '⏰ Focus Time'}</h2>
      <div className="timer-display">
        <span>{formatTime(timeLeft)}</span>
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {isActive ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={resetTimer}>↺ Reset</button>
        <button onClick={() => setShowSettings(true)}>⚙ Settings</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
