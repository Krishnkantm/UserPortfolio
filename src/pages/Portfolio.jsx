import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Home from '../components/Home.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Testimonial from '../components/Testimonial.jsx'; 
import Certification from '../components/Certificates.jsx';
import Qualification from '../components/Qualification.jsx';
import Services from '../components/Services.jsx';
import CompetitiveProgramming from '../components/Competitive.jsx'
import AudioPlayer from '../components/Audio.jsx';

const Portfolio = () => (
  <>
      <Navbar/>
      <Home />
      <Skills />
      <CompetitiveProgramming/>
      <Qualification />
      <Services />
      <Certification />
      <Projects />
      <Testimonial />
      <Contact />
      <AudioPlayer/>
      <Footer/>
  </>
);

export default Portfolio;