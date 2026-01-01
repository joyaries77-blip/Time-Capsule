import { Clock, Calendar } from 'lucide-react';
import { TimeProgress, useTimeCalculations } from './components/TimeProgress';
import { motion } from 'motion/react';
import { RetroDigitalClock } from './components/RetroDigitalClock';
import { LockscreenManager } from './components/LockscreenManager';

export default function App() {
  const { month, year } = useTimeCalculations();

  return (
    <>
      <LockscreenManager />
      <div className="size-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="w-full max-w-4xl relative z-10 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.h1 
            className="text-gray-900 mb-2"
            animate={{
              textShadow: [
                "0 0 20px rgba(99, 102, 241, 0)",
                "0 0 20px rgba(99, 102, 241, 0.3)",
                "0 0 20px rgba(99, 102, 241, 0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Time Capsule
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Watch time slip away, moment by moment
          </motion.p>
          
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <RetroDigitalClock />
          </motion.div>
        </motion.div>

        <div className="space-y-6 flex flex-col items-center">
          <TimeProgress
            label={month.name}
            icon={<Clock className="w-6 h-6 text-indigo-600" />}
            percentage={month.percentage}
            timeRemaining={month.remaining}
            gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
            delay={0.2}
          />

          <TimeProgress
            label={year.name}
            icon={<Calendar className="w-6 h-6 text-purple-600" />}
            percentage={year.percentage}
            timeRemaining={year.remaining}
            gradient="bg-gradient-to-r from-purple-500 to-pink-500"
            delay={0.4}
          />
        </div>

        <motion.div 
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>Updates every second</p>
        </motion.div>
      </div>
    </div>
    </>
  );
}