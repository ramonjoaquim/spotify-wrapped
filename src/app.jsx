import './app.css'
import {
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom'
import Login from './hooks/login/login'
import Home from './hooks/home/home'
import MyWrapped from './hooks/my-wrapped/my-wrapped'

// icons
import { SlSocialLinkedin, SlSocialSpotify, SlSocialTwitter, SlSocialGithub} from 'react-icons/sl'
import { BiUpArrow } from 'react-icons/bi'
import PrivateRoute from './hooks/private-route/private-route'

export function App() {

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/ramonjoaquimlimas',
    twitter: 'https://twitter.com/shinobidanuvem',
    spotify: 'https://open.spotify.com/user/q5bldk137di87l9q4byprgeec',
    github: 'https://github.com/ramonjoaquim'
  }
  const pixelsLimit = 100;


  window.onscroll = () => {scrollFunction()};

  function scrollFunction() {
    const mybutton = document.getElementById("btnScrollTop");
    mybutton.style.display = document.body.scrollTop > pixelsLimit || document.documentElement.scrollTop > pixelsLimit ? "block" : "none";
  }

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 

  return (
    <>
      <BrowserRouter basename='/spotify-wrapped/'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<PrivateRoute Component={Home}/>} />
          <Route path="my-wrapped" element={<PrivateRoute Component={MyWrapped}/>} />
        </Routes>
      </BrowserRouter>
      <div className='footer'>
        <span>
          <div style={{
            display: 'flex',
            columnGap: '30px',
            marginBottom: '20px',
            marginTop: '5px'
          }}>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialLinkedin size={26}/>
          </a>
          <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialSpotify size={26}/> 
          </a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialTwitter size={30}/>
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialGithub size={30}/>
          </a>
          </div>
        </span>
      </div>
      <button type='button' onClick={topFunction} id="btnScrollTop" title="Go to top">
        <BiUpArrow size={20}/>
      </button> 
    </>
  )
}