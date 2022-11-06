import Navbar from '../navbar/navbar'
import Card from './card/card'
import './datafy-search.css'
import RadioSwitch from './radio-switch/radio-switch'
import PopUp from '../pop-up/pop-up'
import { useState, useEffect } from 'react'
import Loading from '../loading/loading'
import Toast from '../toast/toast'
import { getArtists, getArtistTopTracks, getTopSongs } from '../../client/spotify-client'

//icons
import { HiPlay } from 'react-icons/hi'

const DatafySearch = () => {
  const genreNames = ['Pop', 'Rock', 'Eletronic', 'Indie', 'Indie Rock', 'lofi']
  const bandNames = ['Beach Bunny', 'Drake', 'Slipknot', 'Foo Fighters', 'Eminem', 'Snoop Dog', 'Daughter', '50 Cent', 'Halo', 'Ice cube']
  const songNames = ['Stress', 'Nobody knows', 'Issa Vibe', 'Have me all', 'All on me', 'Show me', 'Can you', 'Lemon', 'Body flow']

  const [topArtists, setTopArtists] = useState([1, 2])
  const [topGenres, setTopGenres] = useState(genreNames)
  const [defaultGenre, setDefaultGenre] = useState(true)
  const [topSongs, setTopSongs] = useState([1,2,3,4])
  const [topTracksArtist, setTopTracksArtist] = useState([])
  const [filter, setFilter] = useState('')
  const [loadingArtist, setLoadingArtist] = useState(false)
  const [loadingSong, setloadingSong] = useState(false)
  const [loadingTopTracksArtists, setLoadingTopTracksArtists] = useState(false)
  const [popup, setPopup] = useState(false)
  const [titleArtist, setTitleArtist] = useState('')
  const [content, setContent] = useState()
  const [notify, setNotify] = useState(false)
  const [titleNotify, setTitleNotify] = useState()

  useEffect(() => {
    getTopArtist(filter)
    getTopSong(filter)
  }, [filter])


  useEffect(() => {
    let cont = <>
      <center><h3>Top tracks</h3></center>
      <center>
          {Array.apply(0, topTracksArtist).map((track) => 
            <>
            <div className='track-row'>
              <span className='top-tracks-text font-bunge'>{track.name}</span>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <HiPlay size={30} className='icon-play' title='Listen on Spotify'/>
              </a>
            </div>
            </>
          )}
      </center>
        </>;
      setContent(cont)
  }, [popup])

  function selectArtist(artist) {
    setTitleArtist(artist.name)
    getTopTracksArtist(artist.id).then(res => {
      setTopTracksArtist(res.data.tracks)
      setPopup(!popup)
    })
  }

  function getRandomBandName() {
    return bandNames[Math.floor(Math.random()*bandNames.length)];
  }

  function getRandomSongsdName() {
    return songNames[Math.floor(Math.random()*songNames.length)];
  }

  function getTopArtist(filter) {
    if (!filter) return;
    setLoadingArtist(true)
    getArtists(filter).then(res => {
      setTopArtists(res.data.items)
      getTopGenres(res.data.items)
      setLoadingArtist(false)
    })
    .catch((err) => {
      setLoadingArtist(false)
      setTitleNotify(err?.response?.data?.error?.message)  
      setNotify(true)
    })
  }

  function getTopTracksArtist(idArtist) {
    if (!idArtist) return;
    setLoadingTopTracksArtists(true)
    return getArtistTopTracks(idArtist);
  }

  function getTopSong(filter) {
    if (!filter) return;
    setloadingSong(true)
    getTopSongs(filter).then(res => {
      setTopSongs(res.data.items)
      setloadingSong(false)
      setDefaultGenre(false)
    })
    .catch(() => {
      setloadingSong(false)
    })
  }

  function getTopGenres(artists) {
    let genresMap = artists.map(a => a.genres)
    let allGenres = genresMap.reduce((prev, next) => prev.concat(next));
    let allSingleGenres = allGenres.filter((value, index, array) => array.indexOf(value) === index);
    let ten = allSingleGenres.slice(0, 10)
    setTopGenres(ten)
  }

  return (
    <>
        <Navbar />
        <RadioSwitch setFilter={setFilter}/>
        <div className='box-home'>
          <h2>Top Artist's <small className='label-order'>(Most to least)</small></h2>
          <section className='box-section'>
          {loadingArtist ? <Loading/> : Array.apply(0, topArtists).map((artist) => 
             <Card title={artist.name ?? getRandomBandName()} 
                  type='artist' 
                  imageUrl={artist.id ? artist.images[0].url : null} 
                  blocked={!artist.id}
                  onClick={() => selectArtist(artist)}/>
           )}
          </section>
          <h2>Top Song's <small className='label-order'>(Most to least)</small></h2>
          <section className='box-section'>
          {loadingSong ? <Loading/> : Array.apply(0, topSongs).map((song) => 
             <Card title={song.name ?? getRandomSongsdName()} 
                  nameBand={song.artists ? song.artists[0].name : null}
                  type='song' 
                  imageUrl={song.id ? song.album.images[0].url : null} 
                  blocked={!song.id}/>
           )}
          </section>
          <h2>Top genres's</h2>
          <section className='box-section' style={{cursor: 'none'}}>
          {loadingSong ? <Loading/> : Array.apply(0, topGenres).map((genre) => 
             <Card title={genre} type='genre' blocked={defaultGenre}/>
           )}
          </section>
        </div>

        <Toast 
          show={notify}
          setNotify={setNotify}
          type={'error'}
          title={titleNotify}
          message={'Try login again'} />

        <PopUp 
          show={popup} 
          setPopup={setPopup} 
          title={titleArtist}
          data={content} />
      </>
  )
}

export default DatafySearch