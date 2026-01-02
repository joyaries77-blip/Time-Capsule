import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface RetroDigitalClockProps {
  clockColor?: string;
}

// 将十六进制颜色转换为带透明度的 rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function RetroDigitalClock({ clockColor = '#553cee' }: RetroDigitalClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const date = time.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      className="inline-flex flex-col items-center gap-2 bg-gray-900 px-8 py-4 rounded-2xl shadow-2xl border-4 border-gray-800 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      {/* Retro screen glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-emerald-400/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.15) 3px)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Time display */}
      <div className="flex items-center gap-2 relative z-10">
        {/* Hours */}
        <motion.div
          key={hours}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-mono text-6xl font-bold tracking-wider"
          style={{
            textShadow: `0 0 20px ${hexToRgba(clockColor, 0.8)}, 0 0 30px ${hexToRgba(clockColor, 0.6)}, 0 0 40px ${hexToRgba(clockColor, 0.4)}`,
          }}
        >
          <span style={{ color: clockColor }}>
            {hours}
          </span>
        </motion.div>
        
        {/* Colon */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-6xl font-bold"
          style={{
            color: clockColor,
            textShadow: `0 0 20px ${hexToRgba(clockColor, 0.8)}`,
          }}
        >
          :
        </motion.div>
        
        {/* Minutes */}
        <motion.div
          key={minutes}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-mono text-6xl font-bold tracking-wider"
          style={{
            textShadow: `0 0 20px ${hexToRgba(clockColor, 0.8)}, 0 0 30px ${hexToRgba(clockColor, 0.6)}, 0 0 40px ${hexToRgba(clockColor, 0.4)}`,
          }}
        >
          <span style={{ color: clockColor }}>
            {minutes}
          </span>
        </motion.div>
        
        {/* Colon */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-6xl font-bold"
          style={{
            color: clockColor,
            textShadow: `0 0 20px ${hexToRgba(clockColor, 0.8)}`,
          }}
        >
          :
        </motion.div>
        
        {/* Seconds */}
        <motion.div
          key={seconds}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-mono text-6xl font-bold tracking-wider"
          style={{
            textShadow: `0 0 20px ${hexToRgba(clockColor, 0.8)}, 0 0 30px ${hexToRgba(clockColor, 0.6)}, 0 0 40px ${hexToRgba(clockColor, 0.4)}`,
          }}
        >
          <span style={{ color: clockColor }}>
            {seconds}
          </span>
        </motion.div>
      </div>

      {/* Date display */}
      <motion.div 
        className="text-sm font-mono tracking-wide relative z-10"
        style={{
          textShadow: `0 0 10px ${hexToRgba(clockColor, 0.5)}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span style={{ color: hexToRgba(clockColor, 0.8) }}>
          {date}
        </span>
      </motion.div>

      {/* Corner decorations for retro look */}
      <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-emerald-500/30" />
      <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-emerald-500/30" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-emerald-500/30" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-emerald-500/30" />
    </motion.div>
  );
}
