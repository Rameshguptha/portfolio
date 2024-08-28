import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import { Bio, education, experiences, projects, skills } from "./data/constants.js";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`
function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [data, setData] = useState({bio : {},skills:[],experiences :[],education:[],projects:[],timelineData:[]});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Failed To Load Data');

  console.log(openModal)
  const pathSegment = location.pathname.split('/')[1];
  useEffect(() => {
    // API call here
    if (!pathSegment) {
      setError(true);
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/user/protfolio/data/uid/${pathSegment}`)
      .then(response => response.json())
      .then(data => {
        setData(data?.data || {});
        if (data && data?.data?.bio?.name) {
          document.title = `${data?.data?.bio?.name}'s Portfolio`;
        }else{
        setError(true);
        setErrorMsg("Invalid Code Please Contact Protfolio Builder Team.")
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(true);
        
        setLoading(false);
        return
      });
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{errorMsg}</h3>;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {/* <Router > */}
        <Navbar Bio={data?.bio} />
        <Body>
          <HeroSection Bio={data?.bio}/>
          <Wrapper>
            <Skills skills={data?.skills}/>
            <Experience experiences={data?.experiences}/>
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} projects={data?.projects}/>
          <Wrapper>
            <Education education={data?.education} experiences={data?.experiences}/>
            <Contact />
          </Wrapper>
          <Footer Bio={data?.bio}/>
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
        </Body>
      {/* </Router> */}
    </ThemeProvider>
  );
}

export default App;
