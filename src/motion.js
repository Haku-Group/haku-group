/** Apple-mapped springs: damping 1.0 / response 0.3–0.4, bounce only after momentum. */
export const springs = {
  ui: { type: 'spring', bounce: 0, duration: 0.4 },
  snap: { type: 'spring', bounce: 0, duration: 0.3 },
  press: { type: 'spring', bounce: 0, duration: 0.3 },
  material: { type: 'spring', bounce: 0, duration: 0.45 },
  flick: { type: 'spring', bounce: 0.2, duration: 0.4 },
}

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

/** Exponential-decay projection from Designing Fluid Interfaces. */
export function project(initialVelocity, decelerationRate = 0.998) {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

export function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

export function nearestIndex(value, points) {
  let best = 0
  let dist = Infinity
  points.forEach((point, index) => {
    const d = Math.abs(point - value)
    if (d < dist) {
      dist = d
      best = index
    }
  })
  return best
}
