import React from 'react'

import Home from '../components/Home/Home'
import CatalogSection from '../components/Home/CatalogSection'
import BestSellers from '../components/Home/BestSellers'
import Beneficios from '../components/Home/Beneficios'
import AboutSection from '../components/Home/AboutSection'
import ContactSection from '../components/Home/ContactSection'

export default function HomePage() {
  return (
    <div>
      <Home />
      <CatalogSection />
      <BestSellers />
      <Beneficios />
      <AboutSection />
      <ContactSection id="contact"/>
    </div>
  )
}
