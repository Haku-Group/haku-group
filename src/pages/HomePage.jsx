import { useEffect } from 'react'
import Faq from '../components/Faq'
import Features from '../components/Features'
import FinalCta from '../components/FinalCta'
import Hero from '../components/Hero'
import Pipeline from '../components/Pipeline'
import Pricing from '../components/Pricing'
import Roles from '../components/Roles'
import SiteFooter from '../components/SiteFooter'
import SiteNav from '../components/SiteNav'
import { StageProvider } from '../context/StageContext'

export default function HomePage() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [])

  return (
    <StageProvider>
      <div className="page">
        <div className="ambient" aria-hidden="true">
          <div className="ambient-orb" />
        </div>
        <SiteNav />
        <main>
          <Hero />
          <Pipeline />
          <Features />
          <Roles />
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </StageProvider>
  )
}
