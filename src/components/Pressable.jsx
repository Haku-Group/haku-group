import { motion, useReducedMotion } from 'motion/react'
import { springs } from '../motion'

export default function Pressable({
  as = 'button',
  className,
  children,
  ...props
}) {
  const reduce = useReducedMotion()
  const Tag = as === 'a' ? motion.a : motion.button

  return (
    <Tag
      className={className}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={springs.press}
      {...props}
    >
      {children}
    </Tag>
  )
}
