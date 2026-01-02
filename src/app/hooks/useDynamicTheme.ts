import { useEffect, useState } from 'react';

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'night';
  temperature?: number;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  primaryBg: string;
  secondaryBg: string;
  tertiaryBg: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  clockColor: string;
  isDark: boolean;
}

// 根据时间获取时间段
function getTimeOfDay(hour: number): 'dawn' | 'morning' | 'noon' | 'afternoon' | 'evening' | 'night' {
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'noon';
  if (hour >= 14 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
}

// 根据背景颜色自动计算文字颜色
function getTextColorForBackground(primary: string, secondary: string, tertiary: string, isDark: boolean): { textPrimary: string; textSecondary: string; textTertiary: string; clockColor: string } {
  // 检测是否为粉红/紫色系背景
  const isPinkPurpleTheme = 
    primary.includes('pink') || primary.includes('purple') || primary.includes('indigo') ||
    secondary.includes('pink') || secondary.includes('purple') || secondary.includes('indigo') ||
    tertiary.includes('pink') || tertiary.includes('purple') || tertiary.includes('indigo');
  
  if (isPinkPurpleTheme) {
    // 粉红/紫色背景：使用蓝色文字和亮紫色时钟
    return {
      textPrimary: 'text-blue-500',
      textSecondary: 'text-blue-400',
      textTertiary: 'text-blue-400',
      clockColor: '#553cee', // 亮紫色/靛蓝色
    };
  }
  
  // 其他背景：根据明暗度选择文字颜色
  if (isDark) {
    return {
      textPrimary: 'text-gray-100',
      textSecondary: 'text-gray-300',
      textTertiary: 'text-gray-400',
      clockColor: '#553cee',
    };
  } else {
    return {
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textTertiary: 'text-gray-500',
      clockColor: '#553cee',
    };
  }
}

// 辅助函数：为缺少文字颜色的主题添加默认值
function ensureThemeComplete(theme: Partial<ThemeColors>, isDark: boolean): ThemeColors {
  const autoColors = getTextColorForBackground(
    theme.primary || '',
    theme.secondary || '',
    theme.tertiary || '',
    isDark
  );
  
  return {
    ...theme,
    textPrimary: theme.textPrimary || autoColors.textPrimary,
    textSecondary: theme.textSecondary || autoColors.textSecondary,
    textTertiary: theme.textTertiary || autoColors.textTertiary,
    clockColor: theme.clockColor || autoColors.clockColor,
    isDark: theme.isDark !== undefined ? theme.isDark : isDark,
  } as ThemeColors;
}

// 根据时间和天气生成配色方案
function generateTheme(timeOfDay: string, weather: WeatherData): ThemeColors {
  const { condition } = weather;
  const isNight = timeOfDay === 'night';
  
  // 基础配色方案 - 夜晚偏暗护眼，清晨淡雅，中午灿烂
  const themes: Record<string, Record<string, Partial<ThemeColors>>> = {
    dawn: {
      // 清晨淡雅 - 晴天：柔和的暖色调
      sunny: {
        primary: 'from-orange-200',
        secondary: 'via-pink-200',
        tertiary: 'to-yellow-100',
        primaryBg: 'bg-orange-200/20',
        secondaryBg: 'bg-pink-200/20',
        tertiaryBg: 'bg-yellow-100/15',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        textTertiary: 'text-gray-500',
        isDark: false,
      },
      // 清晨淡雅 - 阴天：更柔和的灰调
      cloudy: {
        primary: 'from-gray-200',
        secondary: 'via-orange-100',
        tertiary: 'to-pink-100',
        primaryBg: 'bg-gray-200/15',
        secondaryBg: 'bg-orange-100/15',
        tertiaryBg: 'bg-pink-100/10',
        textPrimary: 'text-gray-800',
        textSecondary: 'text-gray-600',
        textTertiary: 'text-gray-500',
        isDark: false,
      },
      rainy: {
        primary: 'from-gray-500',
        secondary: 'via-blue-400',
        tertiary: 'to-indigo-400',
        primaryBg: 'bg-gray-400/30',
        secondaryBg: 'bg-blue-300/30',
        tertiaryBg: 'bg-indigo-300/20',
      },
      snowy: {
        primary: 'from-blue-200',
        secondary: 'via-cyan-300',
        tertiary: 'to-white',
        primaryBg: 'bg-blue-200/30',
        secondaryBg: 'bg-cyan-200/30',
        tertiaryBg: 'bg-white/20',
      },
      night: {
        primary: 'from-indigo-600',
        secondary: 'via-purple-600',
        tertiary: 'to-blue-600',
        primaryBg: 'bg-indigo-600/30',
        secondaryBg: 'bg-purple-600/30',
        tertiaryBg: 'bg-blue-600/20',
      },
    },
    morning: {
      // 早晨淡雅 - 晴天：清新明亮
      sunny: {
        primary: 'from-yellow-200',
        secondary: 'via-orange-200',
        tertiary: 'to-pink-200',
        primaryBg: 'bg-yellow-200/25',
        secondaryBg: 'bg-orange-200/25',
        tertiaryBg: 'bg-pink-200/18',
      },
      // 早晨淡雅 - 阴天：柔和灰调
      cloudy: {
        primary: 'from-gray-200',
        secondary: 'via-yellow-100',
        tertiary: 'to-orange-100',
        primaryBg: 'bg-gray-200/20',
        secondaryBg: 'bg-yellow-100/20',
        tertiaryBg: 'bg-orange-100/15',
      },
      rainy: {
        primary: 'from-gray-400',
        secondary: 'via-blue-300',
        tertiary: 'to-cyan-300',
        primaryBg: 'bg-gray-400/30',
        secondaryBg: 'bg-blue-300/30',
        tertiaryBg: 'bg-cyan-300/20',
      },
      snowy: {
        primary: 'from-blue-100',
        secondary: 'via-cyan-200',
        tertiary: 'to-white',
        primaryBg: 'bg-blue-100/30',
        secondaryBg: 'bg-cyan-200/30',
        tertiaryBg: 'bg-white/20',
      },
      night: {
        primary: 'from-indigo-600',
        secondary: 'via-purple-600',
        tertiary: 'to-blue-600',
        primaryBg: 'bg-indigo-600/30',
        secondaryBg: 'bg-purple-600/30',
        tertiaryBg: 'bg-blue-600/20',
      },
    },
    noon: {
      // 中午灿烂 - 晴天：明亮鲜艳
      sunny: {
        primary: 'from-yellow-400',
        secondary: 'via-orange-400',
        tertiary: 'to-red-400',
        primaryBg: 'bg-yellow-400/35',
        secondaryBg: 'bg-orange-400/35',
        tertiaryBg: 'bg-red-400/25',
      },
      // 中午 - 阴天：相对较暗但仍明亮
      cloudy: {
        primary: 'from-gray-300',
        secondary: 'via-yellow-300',
        tertiary: 'to-orange-300',
        primaryBg: 'bg-gray-300/25',
        secondaryBg: 'bg-yellow-300/25',
        tertiaryBg: 'bg-orange-300/18',
      },
      rainy: {
        primary: 'from-gray-500',
        secondary: 'via-blue-400',
        tertiary: 'to-indigo-400',
        primaryBg: 'bg-gray-500/30',
        secondaryBg: 'bg-blue-400/30',
        tertiaryBg: 'bg-indigo-400/20',
      },
      snowy: {
        primary: 'from-blue-200',
        secondary: 'via-cyan-300',
        tertiary: 'to-white',
        primaryBg: 'bg-blue-200/30',
        secondaryBg: 'bg-cyan-300/30',
        tertiaryBg: 'bg-white/20',
      },
      night: {
        primary: 'from-indigo-600',
        secondary: 'via-purple-600',
        tertiary: 'to-blue-600',
        primaryBg: 'bg-indigo-600/30',
        secondaryBg: 'bg-purple-600/30',
        tertiaryBg: 'bg-blue-600/20',
      },
    },
    afternoon: {
      sunny: {
        primary: 'from-orange-400',
        secondary: 'via-pink-400',
        tertiary: 'to-purple-400',
        primaryBg: 'bg-orange-400/30',
        secondaryBg: 'bg-pink-400/30',
        tertiaryBg: 'bg-purple-400/20',
      },
      cloudy: {
        primary: 'from-gray-400',
        secondary: 'via-orange-300',
        tertiary: 'to-pink-300',
        primaryBg: 'bg-gray-400/30',
        secondaryBg: 'bg-orange-300/30',
        tertiaryBg: 'bg-pink-300/20',
      },
      rainy: {
        primary: 'from-gray-500',
        secondary: 'via-blue-400',
        tertiary: 'to-indigo-400',
        primaryBg: 'bg-gray-500/30',
        secondaryBg: 'bg-blue-400/30',
        tertiaryBg: 'bg-indigo-400/20',
      },
      snowy: {
        primary: 'from-blue-200',
        secondary: 'via-cyan-300',
        tertiary: 'to-white',
        primaryBg: 'bg-blue-200/30',
        secondaryBg: 'bg-cyan-300/30',
        tertiaryBg: 'bg-white/20',
      },
      night: {
        primary: 'from-indigo-600',
        secondary: 'via-purple-600',
        tertiary: 'to-blue-600',
        primaryBg: 'bg-indigo-600/30',
        secondaryBg: 'bg-purple-600/30',
        tertiaryBg: 'bg-blue-600/20',
      },
    },
    evening: {
      sunny: {
        primary: 'from-orange-500',
        secondary: 'via-pink-500',
        tertiary: 'to-purple-500',
        primaryBg: 'bg-orange-500/30',
        secondaryBg: 'bg-pink-500/30',
        tertiaryBg: 'bg-purple-500/20',
      },
      cloudy: {
        primary: 'from-gray-500',
        secondary: 'via-orange-400',
        tertiary: 'to-pink-400',
        primaryBg: 'bg-gray-500/30',
        secondaryBg: 'bg-orange-400/30',
        tertiaryBg: 'bg-pink-400/20',
      },
      rainy: {
        primary: 'from-gray-600',
        secondary: 'via-blue-500',
        tertiary: 'to-indigo-500',
        primaryBg: 'bg-gray-600/30',
        secondaryBg: 'bg-blue-500/30',
        tertiaryBg: 'bg-indigo-500/20',
      },
      snowy: {
        primary: 'from-blue-300',
        secondary: 'via-cyan-400',
        tertiary: 'to-white',
        primaryBg: 'bg-blue-300/30',
        secondaryBg: 'bg-cyan-400/30',
        tertiaryBg: 'bg-white/20',
      },
      night: {
        primary: 'from-indigo-600',
        secondary: 'via-purple-600',
        tertiary: 'to-blue-600',
        primaryBg: 'bg-indigo-600/30',
        secondaryBg: 'bg-purple-600/30',
        tertiaryBg: 'bg-blue-600/20',
      },
    },
    night: {
      // 夜晚偏暗护眼 - 晴天：深色暖调
      sunny: {
        primary: 'from-indigo-900',
        secondary: 'via-purple-900',
        tertiary: 'to-blue-900',
        primaryBg: 'bg-indigo-900/40',
        secondaryBg: 'bg-purple-900/40',
        tertiaryBg: 'bg-blue-900/30',
        textPrimary: 'text-gray-100',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        isDark: true,
      },
      // 夜晚偏暗护眼 - 阴天：更暗的灰调
      cloudy: {
        primary: 'from-gray-900',
        secondary: 'via-indigo-800',
        tertiary: 'to-purple-800',
        primaryBg: 'bg-gray-900/50',
        secondaryBg: 'bg-indigo-800/40',
        tertiaryBg: 'bg-purple-800/30',
        textPrimary: 'text-gray-100',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        isDark: true,
      },
      rainy: {
        primary: 'from-gray-950',
        secondary: 'via-blue-900',
        tertiary: 'to-indigo-900',
        primaryBg: 'bg-gray-950/50',
        secondaryBg: 'bg-blue-900/40',
        tertiaryBg: 'bg-indigo-900/30',
        textPrimary: 'text-gray-100',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        isDark: true,
      },
      snowy: {
        primary: 'from-blue-800',
        secondary: 'via-cyan-800',
        tertiary: 'to-slate-800',
        primaryBg: 'bg-blue-800/40',
        secondaryBg: 'bg-cyan-800/40',
        tertiaryBg: 'bg-slate-800/30',
        textPrimary: 'text-gray-100',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        isDark: true,
      },
      night: {
        primary: 'from-indigo-950',
        secondary: 'via-purple-950',
        tertiary: 'to-blue-950',
        primaryBg: 'bg-indigo-950/50',
        secondaryBg: 'bg-purple-950/50',
        tertiaryBg: 'bg-blue-950/40',
        textPrimary: 'text-gray-100',
        textSecondary: 'text-gray-300',
        textTertiary: 'text-gray-400',
        isDark: true,
      },
    },
  };

  const theme = themes[timeOfDay]?.[condition] || themes.morning.sunny;
  return ensureThemeComplete(theme, isNight);
}

// 获取天气信息（简化版，根据时间模拟天气，实际可以接入天气API）
function getWeatherData(): Promise<WeatherData> {
  return new Promise((resolve) => {
    const hour = new Date().getHours();
    
    // 根据时间模拟天气（夜间通常是夜晚，白天根据月份可能有不同天气）
    let condition: WeatherData['condition'] = 'sunny';
    
    if (hour >= 20 || hour < 6) {
      // 夜间
      condition = 'night';
    } else {
      // 白天，可以根据月份或随机选择天气
      const month = new Date().getMonth();
      const random = Math.random();
      
      // 模拟不同季节的天气概率
      if (month >= 2 && month <= 4) {
        // 春季：多云和晴天较多
        condition = random < 0.3 ? 'cloudy' : 'sunny';
      } else if (month >= 5 && month <= 7) {
        // 夏季：晴天较多，偶尔有雨
        condition = random < 0.1 ? 'rainy' : 'sunny';
      } else if (month >= 8 && month <= 10) {
        // 秋季：多云和晴天
        condition = random < 0.4 ? 'cloudy' : 'sunny';
      } else {
        // 冬季：多云，偶尔有雪
        condition = random < 0.2 ? 'snowy' : random < 0.5 ? 'cloudy' : 'sunny';
      }
    }
    
    resolve({ condition });
  });
}

export function useDynamicTheme() {
  const [theme, setTheme] = useState<ThemeColors>({
    primary: 'from-indigo-50',
    secondary: 'via-purple-50',
    tertiary: 'to-pink-50',
    primaryBg: 'bg-indigo-300/30',
    secondaryBg: 'bg-purple-300/30',
    tertiaryBg: 'bg-pink-300/20',
    textPrimary: 'text-blue-500',
    textSecondary: 'text-blue-400',
    textTertiary: 'text-blue-400',
    clockColor: '#553cee',
    isDark: false,
  });
  const [weather, setWeather] = useState<WeatherData>({ condition: 'sunny' });

  useEffect(() => {
    // 初始化天气数据
    getWeatherData().then(setWeather);

    // 每小时更新一次天气
    const weatherInterval = setInterval(() => {
      getWeatherData().then(setWeather);
    }, 3600000); // 1小时

    return () => {
      clearInterval(weatherInterval);
    };
  }, []);

  useEffect(() => {
    // 每小时更新一次主题（根据时间和天气）
    const updateTheme = () => {
      const now = new Date();
      const hour = now.getHours();
      const timeOfDay = getTimeOfDay(hour);
      const newTheme = generateTheme(timeOfDay, weather);
      setTheme(newTheme);
    };

    updateTheme();
    const themeInterval = setInterval(updateTheme, 3600000); // 1小时

    return () => {
      clearInterval(themeInterval);
    };
  }, [weather]);

  // 暴露手动触发主题更新的函数
  const triggerThemeUpdate = () => {
    const now = new Date();
    const hour = now.getHours();
    const timeOfDay = getTimeOfDay(hour);
    const newTheme = generateTheme(timeOfDay, weather);
    setTheme(newTheme);
  };

  return { theme, triggerThemeUpdate };
}

