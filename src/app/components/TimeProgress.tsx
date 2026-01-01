import { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { CountdownClock } from './CountdownClock';

interface TimeProgressProps {
  label: string;
  icon: React.ReactNode;
  percentage: number;
  timeRemaining: string;
  gradient: string;
  delay?: number;
  showClock?: boolean;
}

export function TimeProgress({ label, icon, percentage, timeRemaining, gradient, delay = 0, showClock = false }: TimeProgressProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="w-full max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group"
    >
      {/* Animated background glow */}
      <motion.div 
        className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.05, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <motion.div 
          className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {icon}
        </motion.div>
        <div>
          <motion.h2 
            className="text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            {label}
          </motion.h2>
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            {timeRemaining}
          </motion.p>
        </div>
      </div>
      
      {showClock && (
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5, type: "spring" }}
        >
          <CountdownClock size={140} />
        </motion.div>
      )}
      
      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`absolute top-0 left-0 h-full ${gradient} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1.5, 
            delay: delay + 0.4,
            type: "spring",
            stiffness: 50
          }}
        >
          {/* Multiple shimmer layers */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-200%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: delay
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-200%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: delay + 0.5
            }}
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-xs font-medium text-gray-700 drop-shadow-sm"
            key={percentage}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {percentage.toFixed(2)}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export function useTimeCalculations() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate month progress
  const now = currentTime;
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
  
  const totalMillisecondsInMonth = endOfMonth.getTime() - startOfMonth.getTime();
  const elapsedMillisecondsInMonth = now.getTime() - startOfMonth.getTime();
  const remainingMillisecondsInMonth = endOfMonth.getTime() - now.getTime();
  
  const monthPercentageRemaining = (remainingMillisecondsInMonth / totalMillisecondsInMonth) * 100;
  
  const daysRemaining = Math.floor(remainingMillisecondsInMonth / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((remainingMillisecondsInMonth % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((remainingMillisecondsInMonth % (1000 * 60 * 60)) / (1000 * 60));
  
  // Calculate year progress
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
  
  const totalMillisecondsInYear = endOfYear.getTime() - startOfYear.getTime();
  const elapsedMillisecondsInYear = now.getTime() - startOfYear.getTime();
  const remainingMillisecondsInYear = endOfYear.getTime() - now.getTime();
  
  const yearPercentageRemaining = (remainingMillisecondsInYear / totalMillisecondsInYear) * 100;
  
  const yearDaysRemaining = Math.floor(remainingMillisecondsInYear / (1000 * 60 * 60 * 24));
  
  return {
    month: {
      percentage: monthPercentageRemaining,
      remaining: `${daysRemaining} days, ${hoursRemaining} hours, ${minutesRemaining} minutes remaining`,
      name: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    },
    year: {
      percentage: yearPercentageRemaining,
      remaining: `${yearDaysRemaining} days remaining`,
      name: year.toString()
    }
  };
}