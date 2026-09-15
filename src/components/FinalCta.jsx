import { LINKS } from '../config'
import Pressable from './Pressable'

export default function FinalCta() {
  return (
    <section className="section final">
      <div className="wrap">
        <h2 className="section-title">Соберите следующую главу в одном окне.</h2>
        <p className="section-copy">
          Haku Editor для команд, которым нужен выпуск, а не зоопарк редакторов.
        </p>
        <div className="hero-actions">
          <Pressable as="a" className="btn btn-primary" href={LINKS.app}>
            Получить доступ
          </Pressable>
          <Pressable as="a" className="btn btn-ghost" href={LINKS.help}>
            Справка
          </Pressable>
        </div>
      </div>
    </section>
  )
}
