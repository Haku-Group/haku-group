import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <p className="kicker">404</p>
      <h1 className="section-title">Такой страницы нет.</h1>
      <p className="section-copy">Вернитесь на главную — там пайплайн, тарифы и доступ.</p>
      <div className="hero-actions" style={{ justifyContent: 'center' }}>
        <Link className="btn btn-primary" to="/">
          На главную
        </Link>
      </div>
    </div>
  )
}
