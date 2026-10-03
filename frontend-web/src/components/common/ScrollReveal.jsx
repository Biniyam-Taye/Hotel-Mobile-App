// src/components/common/ScrollReveal.jsx
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollReveal Component
 * Animates children as they enter the viewport during scrolling.
 */
export const ScrollReveal = ({
  children,
  variant = 'fade-up', // 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'rotate-up'
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = false,
  amount = 0.2,
  className = '',
  style = {},
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };
      case 'fade-down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 },
        };
      case 'zoom-in':
        return {
          hidden: { opacity: 0, scale: 0.88, y: distance * 0.5 },
          visible: { opacity: 1, scale: 1, y: 0 },
        };
      case 'rotate-up':
        return {
          hidden: { opacity: 0, y: distance, rotateX: 25 },
          visible: { opacity: 1, y: 0, rotateX: 0 },
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer & StaggerItem
 * Sequentially animates list / grid children when scrolled into view.
 */
export const StaggerContainer = ({
  children,
  staggerChildren = 0.12,
  delayChildren = 0.1,
  once = false,
  amount = 0.15,
  className = '',
  style = {},
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  variant = 'fade-up',
  distance = 35,
  className = '',
  style = {},
}) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: variant === 'fade-up' ? distance : variant === 'fade-down' ? -distance : 0,
      x: variant === 'slide-left' ? distance : variant === 'slide-right' ? -distance : 0,
      scale: variant === 'zoom-in' ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
};

/**
 * AnimatedHeading Component
 * Splits heading words for smooth sequential reveal.
 */
export const AnimatedHeading = ({
  text,
  as = 'h2',
  className = '',
  once = false,
  highlightWord = '',
  highlightClass = '',
}) => {
  const Tag = motion[as] || motion.h2;
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 24, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={container}
      className={className}
    >
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block', marginRight: '0.28em' }}
            className={isHighlight ? highlightClass : ''}
          >
            {word}
          </motion.span>
        );
      })}
    </Tag>
  );
};

/**
 * ScrollProgressBar
 * Slim gold progress bar sticking to top of viewport showing scroll progress.
 */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #d4af37, #f5d879, #c5a028)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
      }}
    />
  );
};

export default ScrollReveal;
