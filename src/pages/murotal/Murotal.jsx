// https://equran.id/api/surat

import React, {Fragment, useEffect, useState, useRef} from 'react';
import './Murotal.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import playButtonlogo from '../../assets/btn-play-icon.png';
import pauseButtonlogo from '../../assets/btn-pause-icon.png';

import { Helmet } from 'react-helmet';

const Murotal = () =>{

  const [stateSurat, setStateSurat] = useState([]);

  const [isPlaying, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audio = useRef(null);


  const fetchData = () =>{
    axios.get('https://equran.id/api/surat')
    .then((result) =>{
      console.log(result.data)
      setStateSurat(result.data);
    })
  }

  // handle audio to multiple played
  const togglePlay = (audio_song) => {
    const song = audio_song;
    if (currentSong === song) {
      isPlaying ? audio.current.pause() : audio.current.play();
      setPlaying(!isPlaying);
    } else {
      if (audio.current) {
        audio.current.pause();
      }
      setCurrentSong(song);
      setPlaying(true);
      audio.current = new Audio(song);
      audio.current.play();
    }

    audio.current.onended = function() {
      setPlaying(false);
    };
    
  };


  useEffect(() => {
    fetchData();
    return () => {
      if (audio.current !== null){
        audio.current.pause();
      }
    };
  },[]);


  return(
    


    <Fragment> 
      
      <Helmet>
        <title>Murotal</title>
      </Helmet>
      <div>   
            
        {
          stateSurat.map(quran =>{ 
            return ( 
              <div className="murotal-card-audio" > 
                <div className="murotal-btn-play-audio" onClick={()=>togglePlay(quran.audio) }>

                  {(isPlaying === true) && (currentSong == quran.audio) ?
                    <img className="murotal-img-play-btn" src={pauseButtonlogo} alt=""/> :
                    <img className="murotal-img-play-btn" src={playButtonlogo} alt=""/> 
                  }
                </div> 
                <p className="murotal-title-surat">{quran.nomor}. Surat {quran.nama_latin} <br />{quran.arti}</p> 
              </div> 
            )
          })
        }
      </div>
      <a href="#" class="ignielToTop"></a>

    </Fragment>


  )
}

export default Murotal;