import React from 'react'

import Home from '../components/Home/Home'
import CatalogSection from '../components/Home/CatalogSection'
import AboutSection from '../components/Home/AboutSection'
import Beneficios from '../components/Home/Beneficios'
import ContactSection from '../components/Home/ContactSection'

export default function HomePage() {
  return (
    <div>
      <Home />
      <CatalogSection />
      <Beneficios />
      <AboutSection />
      <ContactSection id="contact"/>
    </div>
  )
}
