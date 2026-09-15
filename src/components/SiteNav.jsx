import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { LINKS, NAV_ITEMS } from '../config'
import { springs } from '../motion'
import Pressable from './Pressable'

function scrollToId(id, instant) {
  const node = document.getElementById(id)
  if (!node) return
  node.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' })
}

export default function SiteNav() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('product')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const fromTop = window.scrollY + 120
      let current = NAV_ITEMS[0].id
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= fromTop) current = item.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    window.history.replaceState(null, '', `#${id}`)
    scrollToId(id, reduce)
  }

  return (
    <>
      <a className="skip-link" href="#product">
        К содержанию
      </a>
      <header className="nav">
        <div className={`nav-bar${scrolled ? ' is-scrolled' : ''}`}>
          <a className="brand" href="#product" onClick={(e) => { e.preventDefault(); go('product') }}>
            <img src={logo} alt="" width="28" height="28" />
            <span className="brand-name">
              Haku <span>Editor</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Разделы">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link${active === item.id ? ' is-active' : ''}`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Pressable as="a" className="btn btn-primary nav-cta" href={LINKS.app}>
            Получить доступ
          </Pressable>

          <button
            type="button"
            className="nav-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="sheet-scrim"
              aria-label="Закрыть меню"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0.15 } : springs.snap}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="sheet"
              role="dialog"
              aria-label="Меню"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
              transition={springs.material}
            >
              {NAV_ITEMS.map((item) => (
                <button key={item.id} type="button" onClick={() => go(item.id)}>
                  {item.label}
                </button>
              ))}
              <Pressable as="a" className="btn btn-primary" href={LINKS.app} style={{ marginTop: 8 }}>
                Получить доступ
              </Pressable>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
