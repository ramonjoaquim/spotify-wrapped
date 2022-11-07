import './card-my-top.css'
import { useState } from 'react'
//icons
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import { GiSoundWaves } from 'react-icons/gi'
import { BsPersonLinesFill } from 'react-icons/bs'

//background
import black from '../../../assets/my-tops/black-background.jpg'
import black02 from '../../../assets/my-tops/black-02-background.jpg'
import blue from '../../../assets/my-tops/blue-background.jpg'
import blue02 from '../../../assets/my-tops/blue-02-background.jpg'
import glitch from '../../../assets/my-tops/glitch-background.jpg'
import gray from '../../../assets/my-tops/gray-background.jpg'
import xmas from '../../../assets/my-tops/xmas-background.jpg'
import Loading from '../../loading/loading'
import { getUserContext } from '../../../context/user-context'
import Toast from '../../toast/toast'

const CardMyTop = (props) => {
  const icon = {
    artist: <BsPersonLinesFill size={100} className='icon-type-my-top'/>,
    song: <GiSoundWaves size={100} className='icon-type-my-top'/>
  }

  const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate']
  const backgrounds = [black, black02, blue, blue02, glitch, gray, xmas]

  const [background, setBackground] = useState(backgrounds[0])
  const [currentIndexBackground, setCurrentIndexBackground] = useState(0)
  const [backgroundNext, setbackgroundNext] = useState(true)
  const [backgroundPrev, setbackgroundPrev] = useState(true)
  const [notify, setNotify] = useState(false)

  function getRandomFont() {
    return fonts[Math.floor(Math.random()*fonts.length)];
  }

  function changeBackground(position) {
      let index = currentIndexBackground
      if (position === 'right') {
        if (index < 6) {
          index++;
          setbackgroundNext(true)
          setbackgroundPrev(true)
        } else {
          setbackgroundNext(false)
        }
      } else if (index > 0) {
        index--;
        setbackgroundPrev(true)
        setbackgroundNext(true)
      } else {
        setbackgroundPrev(false)
      }
      setCurrentIndexBackground(index)
      setBackground(backgrounds[index])
  }


  setTimeout(() => {
    const cardBox = Array.from(document.getElementsByClassName('card-box-my-top'))
    cardBox.forEach(card => {
      card.style.animation = 'breath 30s linear infinite'
    })
  }, 4000);

  function drawImageOnCanvas(src, width, height, radius = 10) {
    const canvas = document.getElementById('idCanvas');
    const ctx = canvas.getContext('2d');
    const imageObj = new Image();

    function roundedImage(x,y,width,height,radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    imageObj.onload = () => {
      ctx.save();
      roundedImage(width, height, imageObj.width/2, imageObj.height/2, radius);
      ctx.clip();
      ctx.drawImage(imageObj, width, height, imageObj.width/2, imageObj.height/2);
      ctx.restore();
    }

    imageObj.setAttribute('crossOrigin', 'anonymous');
    imageObj.src = src;

    return imageObj
  }

  function drawImageOnCanvasProfile(src, width, height, radius = 50) {
    const canvas = document.getElementById('idCanvas');
    const ctx = canvas.getContext('2d');
    const imageObj = new Image();

    function roundedImageProfile(x,y,width,height,radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    imageObj.onload = () => {
      let _width = 70
      let _height = 70
      ctx.save();
      roundedImageProfile(width, height, _width, _height, radius);
      ctx.clip();
      ctx.drawImage(imageObj, width, height, _width, _height);
      ctx.restore();
    }

    imageObj.setAttribute('crossOrigin', 'anonymous');
    imageObj.src = src;

    return imageObj
  }

  function formatFilterSelected() {
    if (props.filter === 'short_term') {
      return `Last month's`
    } else if (props.filter === 'medium_term') {
      return `Last 6 month's`
    } else {
      return 'All the time'
    }
  }

  function draw(type) {
    const canvas = document.getElementById('idCanvas');
    const context = canvas.getContext('2d');
    const imageObj = new Image();

    const centerVertically = 250;

    imageObj.onload = () => {
      context.drawImage(imageObj, 0, 0);
      context.textAlign = "center";
      context.textBaseline = "middle"; 

      //title Datafy
      context.font = "70px Dazzle";
      context.fillStyle = "whitesmoke";
      context.fillText("DataFy", centerVertically, 40);

      //userData
      context.font = "20px Dazzle";
      context.fillStyle = "whitesmoke";
      context.fillText('of', centerVertically, 90);

      context.font = "20px Dazzle";
      context.fillStyle = "whitesmoke";
      context.fillText(getUserContext().userDisplayName, centerVertically, 210);

      let userPhotoProfile = drawImageOnCanvasProfile(getUserContext().userProfileImage, 215, 110, 30)
      context.drawImage(userPhotoProfile, 500, 200)
      console.log(userPhotoProfile)
      console.log(canvas.toDataURL())

      //title Card type
      context.font = "45px Dazzle";
      context.fillText(type === 'artist' ? 'My Top Artist' : 'My Top Song', centerVertically, 270);

      // title range filter 
      context.font = "20px Dazzle";
      context.fillText(`(${formatFilterSelected()})`, centerVertically, props.type === 'artist' ? 700 : 770);
    
      //title artist/song name
      context.font = "40px Dazzle";
      context.fillText(type === 'artist' ? props.artistName : props.songName, centerVertically, 650);

      //text by band
      if (props.type === 'song') {
        context.font = "20px Dazzle";
        context.fillText('By', centerVertically, 685);

        context.font = "20px Dazzle";
        context.fillText(props.songArtist, centerVertically, 720);
      }

      //insert cover
      let img = props.type === 'artist' ? drawImageOnCanvas(props.artistImage, 100, 300) : drawImageOnCanvas(props.songImage, 100, 300)
      context.drawImage(img, 500, 500)

      // text made by
      context.font = "20px Dazzle";
      context.fillText(`visit ${import.meta.env.VITE_AD_LINK}`, centerVertically, 850);


      //download
      // const canvas = document.getElementById('idCanvas');
      const dataURL = canvas.toDataURL();

      // console.log(dataURL)

      // function download(dataurl, filename) {
      //   const link = document.createElement("a");
      //   link.href = dataurl;
      //   link.download = filename;
      //   link.click();
      // }
      
      // download(dataURL, "datafy.png");
    }

    imageObj.setAttribute('crossOrigin', 'anonymous');
    imageObj.src = background;
}

  function generate() {
    if (!props.filter) {
      setNotify(true)
      return
    }
    draw(props.type)
  }

  return (
    <div className='card-box-my-top' style={{
      backgroundImage: `url(${background})`,
      animation: 'slideUp 1s',
      animationTimingFunction: 'ease-out',
    }}>
      <center>
        <div className={`card-title font-${getRandomFont()}`}>{props.title}</div>
      </center>
      {
      
        props.loading 
        ? <center><Loading/></center> 
        : <center>
            <div className={(props.songImage || props.artistImage) ? props.type === 'artist' ? 'text-container-top-artist' : 'text-container-top-song' : ''}>
              <span>
                <h1 className='font-bunge'>{props.artistName || props.songName}</h1>
              </span>
              <span>
                <h3 className='font-bunge artist-text'>{props.songArtist}</h3>
              </span>
            </div>
            <div className='arrows-change-background'>
              <button 
                disabled={!backgroundPrev} 
                type='button' 
                className='btn-card-my-top btn-left' 
                onClick={() => changeBackground('left')}>
                <TfiArrowCircleLeft size={40} className='icon-arrow-left'/>
              </button>
              { (props.songImage || props.artistImage) 
                ? <img className='imageArtistSong' src={props.songImage ?? props.artistImage} /> 
                : icon[props.type]}          
              <button 
                disabled={!backgroundNext} 
                type='button' 
                className='btn-card-my-top btn-right' 
                onClick={() => changeBackground('right')}>
                <TfiArrowCircleRight size={40} className='icon-arrow-right'/>
              </button>
            </div>
          </center>
      }
      <center>
        <button type='button' className='btn btn-generate' onClick={() => generate()}>Generate</button>
      </center>
      <canvas id="idCanvas" width="500" height="899" style={{
        display: 'none',
        width: '500px',
        height: '899px'}}>
      </canvas> 
      <Toast 
          show={notify}
          setNotify={setNotify}
          type={'warn'}
          title={'Ops'}
          message={'Select a period'} /> 
    </div>
  )
}

export default CardMyTop