import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import spotifyLogo from '../../assets/spotify-logo.png'
import './home.css'
import '../../fonts/Bungee_Inline/BungeeInline-Regular.ttf'
import '../../fonts/Leckerli_One/LeckerliOne-Regular.ttf'
import '../../fonts/Megrim/Megrim-Regular.ttf'
import '../../fonts/Nabla/Nabla-Regular.ttf'
import '../../fonts/Reenie_Beanie/ReenieBeanie-Regular.ttf'
import '../../fonts/Rubik_Dirt/RubikDirt-Regular.ttf'
import '../../fonts/Syncopate/Syncopate-Regular.ttf'

const Home = () => {

  const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate']

  function getRandomFont() {
    return fonts[Math.floor(Math.random()*fonts.length)];
  }

  return (
    <>
      <Navbar />
      <div className='card-container'>
        <div className='card-box'>
          <center>
            <div className={`card-title font-${getRandomFont()}`}>My coachela</div>
          </center>
          <center>
            <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
          </center>
          <center>
            <button type='button' className='btn'>Generate</button>
          </center>
        </div>

        <div className='card-box blocked-box'>
          <center>
            <div className={`card-title font-${getRandomFont()}`}># whats next</div>
          </center>
          <center>
            <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
          </center>
          <center>
            <button type='button' className='btn'>Generate</button>
          </center>
        </div>

        {/* <Loading></Loading> */}
      </div>
    </>
  )
}

export default Home