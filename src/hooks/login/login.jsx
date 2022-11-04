import './login.css'
import logoImg from '../../assets/logo.png'
import logoImgHover from '../../assets/logo-hover.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopUp from '../pop-up/pop-up'
import SpotifyLogin from '../spotify/spotify-login'

const Login = () => {
  const navigate = useNavigate();
  const [changeLogo, setChangeLogo] = useState(0);
  const [popup, setPopup] = useState(false);
  const logo = [
    {
      title: 'Logo',
      source: logoImg
    },
    {
      title: 'Logo Hover',
      source: logoImgHover
    }
  ]

  function callLogin() {
    navigate('/home')
  }

  function changeLogoOut() {
    setChangeLogo(0)
  }

  function changeLogoIn() {
    setChangeLogo(1)
  }

  let data = <>
    <div>
      <label>Email </label>
      <input type="email"  />
      <br />
      <label htmlFor="">Password</label>
      <input type="password" name="" id="" />
      <button>Log in</button>
    </div>
    <footer>footer</footer>
  </>

  return (
    <div className='login-component'>
      <img className='logoImg' src={logo[changeLogo].source} alt={logo[changeLogo].title} />
      <form>
        <SpotifyLogin changeLogoIn={changeLogoIn} changeLogoOut={changeLogoOut}/>
        {/* <button 
          className='button-login' 
          type='button' 
          onClick={() => setPopup(true)}
          onMouseOver={changeLogoIn} 
          onMouseLeave={changeLogoOut}>
            Login
        </button>
        <button 
          className='button-login' 
          type='button' 
          onClick={() => showNotification()}>
            test notification
        </button> */}
      </form>
      <PopUp show={popup} 
             setPopup={setPopup} 
             data={data}
             title='Login'>
      </PopUp>
    </div>
  )  
}

export default Login