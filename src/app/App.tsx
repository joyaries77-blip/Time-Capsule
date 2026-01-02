import { Clock, Calendar } from 'lucide-react';
import { TimeProgress, useTimeCalculations } from './components/TimeProgress';
import { motion } from 'motion/react';
import { RetroDigitalClock } from './components/RetroDigitalClock';
import { LiquidRippleEffect } from './components/LiquidRippleEffect';
import { useDynamicTheme } from './hooks/useDynamicTheme';
import { PWAInstallMenu } from './components/PWAInstallMenu';
import { ClickableText } from './components/ClickableText';

export default function App() {
  const { month, year } = useTimeCalculations();
  const { theme, triggerThemeUpdate } = useDynamicTheme();

  return (
    <div className={`size-full min-h-screen bg-gradient-to-br ${theme.primary} ${theme.secondary} ${theme.tertiary} flex items-center justify-center p-6 relative overflow-hidden`}>
      <PWAInstallMenu />
      
      {/* Animated background orbs */}
      <motion.div
        className={`absolute top-20 left-20 w-96 h-96 ${theme.primaryBg} rounded-full blur-3xl`}
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
        className={`absolute bottom-20 right-20 w-96 h-96 ${theme.secondaryBg} rounded-full blur-3xl`}
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
        className={`absolute top-1/2 left-1/2 w-96 h-96 ${theme.tertiaryBg} rounded-full blur-3xl`}
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

      <LiquidRippleEffect 
        className="w-full max-w-4xl relative z-10"
        onTapCountChange={(count) => {
          if (count >= 5) {
            triggerThemeUpdate();
          }
        }}
      >
        <div className="w-full">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1 
              className="mb-2"
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
              <ClickableText className={`${theme.textPrimary} text-4xl font-bold`}>
                Time Capsule
              </ClickableText>
            </motion.h1>
            <motion.p 
              className=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <ClickableText className={theme.textSecondary}>
                Watch time slip away, moment by moment
              </ClickableText>
            </motion.p>
            
            <motion.div 
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <RetroDigitalClock clockColor={theme.clockColor} />
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            <TimeProgress
              label={month.name}
              icon={<Clock className="w-6 h-6" style={{ color: '#553cee' }} />}
              percentage={month.percentage}
              timeRemaining={month.remaining}
              gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
              delay={0.2}
            />

            <TimeProgress
              label={year.name}
              icon={<Calendar className="w-6 h-6" style={{ color: '#c18cf4' }} />}
              percentage={year.percentage}
              timeRemaining={year.remaining}
              gradient="bg-gradient-to-r from-purple-500 to-pink-500"
              delay={0.4}
            />
          </div>

          <motion.div 
            className="mt-12 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ClickableText className={theme.textTertiary}>
              Updates every second • Tap 5 times to change theme
            </ClickableText>
          </motion.div>
        </div>
      </LiquidRippleEffect>
    </div>
  );
}