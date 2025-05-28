import React from 'react'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import ServiceItems from '../../components/ServiceItems/ServiceItem'
import AboutSection from '../../components/AboutSection/AboutSection'
import TeamSection from '../../components/TeamSection/TeamSection'
import TestimonialCarousel from '../../components/TestimonialSection/TestimonialSection'
import Menu from '../../components/Menu/Menu'


const Home = () => {
  return (
    <>
      <HeroBanner />
      <ServiceItems />
      <Menu />
      <AboutSection />
      <TeamSection />
      <TestimonialCarousel />
    </>
  )
}

export default Home