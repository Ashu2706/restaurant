import React from 'react'
import AboutSection from '../../components/AboutSection/AboutSection'
import TeamSection from '../../components/TeamSection/TeamSection'
import PageHeader from '../../components/PageHeader/PageHeader'

const About = () => {
    return (
        <>
            <PageHeader title={"About Us"} page={"About"}/>
            <AboutSection />
            <TeamSection />
        </>
    )
}

export default About