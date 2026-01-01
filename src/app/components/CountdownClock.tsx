import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CountdownClockProps {
  size?: number;
}

export function CountdownClock({ size = 120 }: CountdownClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate time remaining in the day
  const now = time;
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  const remainingMs = endOfDay.getTime() - now.getTime();
  const totalMsInDay = 24 * 60 * 60 * 1000;
  
  // Calculate remaining hours, minutes, seconds
  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  
  // Calculate angles (reverse direction - counterclockwise)
  // For reverse clock: 360 degrees at start of day, 0 degrees at end of day
  const secondAngle = (remainingSeconds / 60) * 360;
  const minuteAngle = (remainingMinutes / 60) * 360 + (remainingSeconds / 60) * 6;
  const hourAngle = (remainingHours / 12) * 360 + (remainingMinutes / 60) * 30;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 4;

  // Clock markers
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x1 = centerX + (radius - 8) * Math.cos(angle);
    const y1 = centerY + (radius - 8) * Math.sin(angle);
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Clock face background */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="white"
          stroke="url(#gradient)"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="handGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Clock markers */}
        {markers.map((marker) => (
          <motion.line
            key={marker.key}
            x1={marker.x1}
            y1={marker.y1}
            x2={marker.x2}
            y2={marker.y2}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: marker.key * 0.05 }}
          />
        ))}

        {/* Hour hand */}
        <motion.line
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY - radius * 0.5}
          stroke="url(#handGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ rotate: -hourAngle }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ 
            transformOrigin: 'center',
            transformBox: 'fill-box'
          }}
        />

        {/* Minute hand */}
        <motion.line
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY - radius * 0.7}
          stroke="url(#handGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: -minuteAngle }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ 
            transformOrigin: 'center',
            transformBox: 'fill-box'
          }}
        />

        {/* Second hand */}
        <motion.line
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY - radius * 0.85}
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ rotate: -secondAngle }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ 
            transformOrigin: 'center',
            transformBox: 'fill-box'
          }}
        />

        {/* Center dot */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="6"
          fill="#6366f1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        
        {/* Outer rotating circle for visual effect */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius - 1}
          fill="none"
          stroke="#6366f1"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ 
            transformOrigin: 'center',
            transformBox: 'fill-box'
          }}
        />
      </svg>

      {/* Digital countdown display */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-full">
        <motion.div
          key={remainingHours}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white font-mono"
        >
          {String(remainingHours).padStart(2, '0')}
        </motion.div>
        <span className="text-white">:</span>
        <motion.div
          key={remainingMinutes}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white font-mono"
        >
          {String(remainingMinutes).padStart(2, '0')}
        </motion.div>
        <span className="text-white">:</span>
        <motion.div
          key={remainingSeconds}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white font-mono"
        >
          {String(remainingSeconds).padStart(2, '0')}
        </motion.div>
      </div>
      
      <p className="text-xs text-gray-500">Time left today</p>
    </div>
  );
}