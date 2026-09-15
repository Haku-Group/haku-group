import { FEATURES } from '../content'

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Возможности</p>
          <h2 className="section-title">Инструменты, которые держат выпуск.</h2>
          <p className="section-copy">
            Не набор плагинов, а рабочее место: холст, очередь, глоссарий и роли
            завязаны на одну главу.
          </p>
        </div>
        <div className="bento">
          {FEATURES.map((feature) => (
            <article key={feature.id} className={`tile${feature.wide ? ' wide' : ''}`}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
