import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useLayoutEffect, useRef } from 'react'
import { STAGES } from '../content'
import { useStage } from '../context/StageContext'
import { nearestIndex, project, rubberband, springs } from '../motion'

function Bubbles({ stageId }) {
  const clean = stageId === 'clean'
  const stitch = stageId === 'stitch'

  return (
    <>
      <span className="bubble" style={{ top: '10%', left: '8%' }}>
        {clean ? <span className="ghost-text">待って</span> : null}
        {stitch ? '待って…' : null}
        {!stitch && !clean ? 'Подожди.' : null}
      </span>
      <span className="bubble right" style={{ top: '22%', right: '7%' }}>
        {clean ? <span className="ghost-text">지금?</span> : null}
        {stitch ? '지금?' : null}
        {!stitch && !clean ? 'Сейчас?' : null}
      </span>
      <span className={`bubble sfx${clean ? ' ghost-text' : ''}`} style={{ bottom: '10%', left: '8%' }}>
        {stitch || clean ? 'BANG' : 'БАХ'}
      </span>
    </>
  )
}

function Spread({ stageId }) {
  return (
    <div className="spread">
      <div className={`page-art page-art--${stageId}`} aria-hidden="true">
        <div className="panel panel-a">
          <div className="ink" />
        </div>
        <div className="panel panel-b">
          <div className="sky" />
        </div>
        <div className="panel panel-c">
          <div className="figure" />
        </div>
        <Bubbles stageId={stageId} />
      </div>
    </div>
  )
}

export default function EditorPreview() {
  const reduce = useReducedMotion()
  const { index, setIndex, stage } = useStage()
  const x = useMotionValue(0)
  const wrapRef = useRef(null)
  const widthRef = useRef(0)
  const history = useRef([])
  const dragging = useRef(false)
  const lastIndex = useRef(index)
  const committed = useRef(false)

  const measure = () => {
    const width = wrapRef.current?.clientWidth || 0
    widthRef.current = width
    return width
  }

  const snapTo = (nextIndex, velocity = 0) => {
    const width = widthRef.current || measure()
    lastIndex.current = nextIndex
    setIndex(nextIndex)
    animate(x, -nextIndex * width, {
      ...(Math.abs(velocity) > 180 ? springs.flick : springs.ui),
      velocity: reduce ? 0 : velocity,
    })
  }

  useLayoutEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined
    const apply = () => {
      const width = node.clientWidth
      widthRef.current = width
      x.set(-lastIndex.current * width)
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(node)
    return () => observer.disconnect()
  }, [x])

  useLayoutEffect(() => {
    const width = measure()
    if (!width || dragging.current || lastIndex.current === index) return
    lastIndex.current = index
    animate(x, -index * width, springs.ui)
  }, [index, x])

  return (
    <div className="editor" role="region" aria-label="Предпросмотр редактора">
      <div className="editor-top">
        <div className="editor-top-main">
          <div className="traffic" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="editor-title">Глава 12 · {stage.label}</div>
        </div>
        <div className="segments" role="tablist" aria-label="Этапы">
          {STAGES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`segment${i === index ? ' is-active' : ''}`}
              onClick={() => snapTo(i)}
            >
              {i === index && (
                <motion.span
                  className="segment-pill"
                  layoutId="stage-pill"
                  transition={springs.snap}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="editor-body">
        <aside className="tools" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`tool${i === index ? ' is-live' : ''}`} />
          ))}
        </aside>

        <div
          ref={wrapRef}
          className="canvas-wrap"
          onPointerDown={(event) => {
            if (event.button !== 0) return
            event.currentTarget.setPointerCapture(event.pointerId)
            measure()
            dragging.current = true
            committed.current = false
            history.current = [{ x: event.clientX, t: event.timeStamp }]
            x.stop()
            event.currentTarget.dataset.start = String(event.clientX)
            event.currentTarget.dataset.origin = String(x.get())
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
            const start = Number(event.currentTarget.dataset.start)
            const origin = Number(event.currentTarget.dataset.origin)
            const dx = event.clientX - start
            if (!committed.current) {
              if (Math.abs(dx) < 10) return
              committed.current = true
            }
            const width = widthRef.current
            const min = -(STAGES.length - 1) * width
            let next = origin + dx
            if (next > 0) next = rubberband(next, width)
            if (next < min) next = min - rubberband(min - next, width)
            x.set(next)
            const hist = history.current
            hist.push({ x: event.clientX, t: event.timeStamp })
            if (hist.length > 5) hist.shift()
          }}
          onPointerUp={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
            event.currentTarget.releasePointerCapture(event.pointerId)
            dragging.current = false
            const width = widthRef.current
            if (!committed.current) {
              snapTo(index, 0)
              return
            }
            const hist = history.current
            const first = hist[0]
            const last = hist[hist.length - 1]
            const dt = last && first ? Math.max(last.t - first.t, 16) : 16
            const velocity = last && first ? ((last.x - first.x) / dt) * 1000 : 0
            const projected = x.get() + project(velocity)
            const points = STAGES.map((_, i) => -i * width)
            snapTo(nearestIndex(projected, points), velocity)
          }}
          onPointerCancel={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
            dragging.current = false
            snapTo(index, 0)
          }}
        >
          <motion.div className="canvas-track" style={{ x }}>
            {STAGES.map((item) => (
              <Spread key={item.id} stageId={item.id} />
            ))}
          </motion.div>
          <div className="hint">Листайте страницу · {stage.role}</div>
        </div>

        <aside className="props" aria-live="polite">
          {stage.properties.map((prop) => (
            <div className="prop" key={prop.label}>
              <span>{prop.label}</span>
              <strong>{prop.value}</strong>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
