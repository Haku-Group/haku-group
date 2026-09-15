import { LINKS } from '../config'
import EditorPreview from './EditorPreview'
import Pressable from './Pressable'

export default function Hero() {
  return (
    <section className="section hero" id="product">
      <div className="wrap">
        <div className="hero-copy">
          <p className="kicker">Haku Editor</p>
          <h1 className="display">
            Сканлейт от скана до тайпа.
          </h1>
          <p className="lede">
            Один редактор для манги, манхвы и маньхуа. Склейка, клин, перевод и набор —
            с ролями, канбаном и облаком, как в релизной студии.
          </p>
          <div className="hero-actions">
            <Pressable as="a" className="btn btn-primary" href={LINKS.app}>
              Получить доступ
            </Pressable>
            <Pressable
              as="a"
              className="btn btn-ghost"
              href="#pipeline"
              onClick={(event) => {
                event.preventDefault()
                document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Смотреть пайплайн
            </Pressable>
          </div>
          <p className="hero-note">Для Windows и браузера. Оплата команды — Boosty.</p>
        </div>

        <div className="hero-stage">
          <EditorPreview />
        </div>
      </div>
    </section>
  )
}
