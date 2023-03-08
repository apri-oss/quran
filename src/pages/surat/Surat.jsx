import React, {Fragment, useEffect, useState, useRef} from 'react';
import './Surat.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import playButtonlogo from '../../assets/btn-play-icon.png';
import pauseButtonlogo from '../../assets/btn-pause-icon.png';

import { Helmet } from 'react-helmet';

const Surat = () =>{
  const [state, setState] = useState([]);
  const params = useParams();
  const [stateAyat, setStateAyat] = useState([]);
  const nomor_surat = params.nomor;

  const [isPlaying, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audio = useRef(null);


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

  const fetchData = () =>{
    axios.get(`https://quranapi.idn.sch.id/surah/${nomor_surat}`)
    .then((result) =>{
      setStateAyat(result.data.ayahs);
      setState(result.data);
    })
  }


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
        <title>{"Surat " + state.name}</title>
      </Helmet>
      <div>
        <div className="surat-desciption-surat">   
          <p className="surat-nama-surat">{state.name} </p>
          <p className="surat-arti-surat">{state.translationId} </p>
          <p className="surat-tempat-surat">{state.typeId} </p> 
        </div>        
        {
          stateAyat.map(quran =>{ 
            return ( 
              
              <div className="surat-header-surat" >
                <div className="surat-header-surat"></div>
                <div className="surat-content-surat">    
                  <div className="surat-card-audio" >
                    <p className="surat-ayat-surat">{quran.verseId}</p>    
                    <div className="surat-btn-play-audio" onClick={()=>togglePlay(quran.audio) }>
                  
                      {(isPlaying === true) && (currentSong === quran.audio) ?
                        <img className="surat-img-play-btn" id="btn-play" src={pauseButtonlogo} alt=""/> :
                        <img className="surat-img-play-btn" src={playButtonlogo} alt=""/> 
                      }
                    </div>   

                  </div>
                  <br />
                  <p className="surat-arabic-font-class">{quran.ayahText}</p>
                  <p className="surat-tafsir-font-surat">{quran.readText}</p>
                  <p className="surat-arti-font-surat">{quran.indoText}</p> 
                </div>   

              </div>   
            )
          })
        }
      </div>
      <a href="#" class="ignielToTop"></a>

    </Fragment>
  )
}

export default Surat;


