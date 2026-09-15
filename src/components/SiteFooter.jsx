import logo from '../assets/logo.png'
import { LINKS } from '../config'

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div className="brand">
          <img src={logo} alt="" width="28" height="28" />
          <span className="brand-name">
            Haku <span>Editor</span>
          </span>
        </div>
        <nav className="footer-links" aria-label="Документы">
          <a href={LINKS.help}>Справка</a>
          <a href={LINKS.privacy}>Конфиденциальность</a>
          <a href={LINKS.boosty}>Boosty</a>
        </nav>
        <small>© {new Date().getFullYear()} Haku Editor</small>
      </div>
    </footer>
  )
}
