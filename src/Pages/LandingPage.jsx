import React from 'react'
import { PreNavBar } from '../Components/PreNavBar'
import { IntroLandingPage } from '../Components/IntroLandingPage'
import { FooterLandingPage } from '../Components/FooterLandingPage'
import { FeaturesLandingPage } from '../Components/FeaturesLandingPage'
import { FAQLandingPage } from '../Components/FAQLandingPage'

const LandingPage = () => {
  return (
    <div>
        <PreNavBar/>
        <IntroLandingPage/>
        
        <FAQLandingPage/>
        <FooterLandingPage/>
    </div>
  )
}

export default LandingPage