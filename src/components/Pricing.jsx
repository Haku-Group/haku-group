import { LINKS } from '../config'
import { PLANS } from '../content'
import Pressable from './Pressable'

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Тарифы</p>
          <h2 className="section-title">Доступ для команды, не для одного ПК.</h2>
          <p className="section-copy">
            Лимиты считаются по участникам, облаку и анализу соседних релизов.
            Оплата — на Boosty, подписка привязана к команде.
          </p>
        </div>

        <div className="plan-grid">
          {PLANS.map((plan) => (
            <article key={plan.id} className={`plan${plan.featured ? ' featured' : ''}`}>
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <p className="blurb">{plan.blurb}</p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Pressable as="a" className={`btn ${plan.featured ? 'btn-accent' : 'btn-ghost'} btn-block`} href={LINKS.boosty}>
                Оформить на Boosty
              </Pressable>
            </article>
          ))}
        </div>
        <p className="pay-note">
          Точные места, гигабайты и записи анализа задаёт тариф команды. Если вы уже в Haku —
          их видно тимлиду в панели команды.
        </p>
      </div>
    </section>
  )
}
