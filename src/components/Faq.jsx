import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { FAQS } from '../content'
import { springs } from '../motion'

export default function Faq() {
  const reduce = useReducedMotion()
  const [openId, setOpenId] = useState(FAQS[0].id)

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Вопросы</p>
          <h2 className="section-title">Коротко о продукте.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((item) => {
            const open = openId === item.id
            return (
              <button
                key={item.id}
                type="button"
                className="faq-item"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <div className="faq-q">
                  {item.q}
                  <i aria-hidden="true">{open ? '–' : '+'}</i>
                </div>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="faq-a"
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={springs.ui}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
