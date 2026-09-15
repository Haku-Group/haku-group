import { STAGES } from '../content'
import { useStage } from '../context/StageContext'

export default function Pipeline() {
  const { index, setIndex, stage } = useStage()

  return (
    <section className="section" id="pipeline">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Пайплайн</p>
          <h2 className="section-title">Четыре роли. Одна глава.</h2>
          <p className="section-copy">
            Этапы не живут в разных программах. Сканер передаёт страницу клинеру,
            переводчик — тайперу, тимлид видит, где выпуск застрял.
          </p>
        </div>

        <div className="pipeline-grid">
          <div className="stage-list" role="list">
            {STAGES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`stage-item${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                <small>{item.role}</small>
                <strong>{item.label}</strong>
                <p>{item.kicker}</p>
              </button>
            ))}
          </div>

          <article className="pipeline-card">
            <p className="kicker">{stage.kicker}</p>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
