import { ROLES } from '../content'

export default function Roles() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Команда</p>
          <h2 className="section-title">Каждый видит свой стол. Глава общая.</h2>
          <p className="section-copy">
            Права завязаны на роль, комментарии — на панель, канбан — на релиз.
            Так сканлейт перестаёт быть чатом с вложениями.
          </p>
        </div>
        <div className="role-row">
          {ROLES.map((role) => (
            <article className="role" key={role.id}>
              <h3>{role.title}</h3>
              <p>{role.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
