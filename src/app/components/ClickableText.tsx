import { motion } from 'motion/react';
import { useState } from 'react';

interface ClickableTextProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function ClickableText({ children, className = '', onClick }: ClickableTextProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  // 颜色变化序列
  const colorVariations = [
    'text-indigo-600',
    'text-purple-600',
    'text-pink-600',
    'text-blue-600',
    'text-cyan-600',
    'text-emerald-600',
    'text-yellow-600',
    'text-orange-600',
    'text-red-600',
  ];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 阻止页面刷新和默认行为
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();
    }

    setIsClicked(true);
    setColorIndex((prev) => (prev + 1) % colorVariations.length);

    if (onClick) {
      onClick(e);
    }

    // 重置点击状态
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <motion.span
      className={`${className} ${colorVariations[colorIndex]} cursor-pointer select-none inline-block`}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      whileTap={{ scale: 0.95 }}
      animate={{
        color: isClicked ? undefined : undefined,
      }}
      transition={{ duration: 0.3 }}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {children}
    </motion.span>
  );
}

