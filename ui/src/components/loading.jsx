import React, { useState, useEffect, useRef } from "react";
import map from "../assets/map.png";
import music from "../assets/music.png";
import logo from "../assets/logo.png";
import Fade from "../utils/Fade";
import { slides } from "./data";

function Loading() {
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [audiostate, setAudiostate] = useState(true)
  const audio = useRef();

  const [randomTrack, setRandomTrack] = useState('');
  const [randomTrackName, setRandomTrackName] = useState('');

  const tracks = [
    '../song/friday_vibrations.mp3',
    '../song/highlands.mp3',
  ];

  const tracks_name = [
    'Black Room Orchestra - Friday Vibrations',
    'Black Room Orchestra - Highlands',
  ]; 

  const getRandomTrack = () => {
    let newTrack;
    do {
      newTrack = tracks[Math.floor(Math.random() * tracks.length)];
    } while (newTrack === randomTrack); // Évite de rejouer la même musique
    setRandomTrack(newTrack);
    setRandomTrackName(tracks_name[tracks.indexOf(newTrack)]);
  };

  useEffect(() => {
    getRandomTrack();
    if (audio.current) {
      audio.current.volume = 0.5; // Volume à 50%
    }
  }, []);
  
  useEffect(() => {
    // Jouer la musique une fois que le src est défini
    if (audio.current) {
      audio.current.load(); // Recharge la source
      audio.current.play().catch((e) => console.log("Lecture bloquée", e));
    }
  }, [randomTrack]);

  const handleaudio = () => {
    if (audiostate){
      audio.current.pause();
    }else{
      audio.current.play();
    }
    setAudiostate(!audiostate)
  }
  useEffect(() => {
    setTimeout(() => {
      if (counter == slides.length - 1) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }, 8000);
  }, [counter]);

  useEffect(() => {
    setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 0.3);
      }
    }, 100);

  }, [progress]);

  return (
    <>
      <div className="loading-wrapper">
        
        <audio ref={audio} autoPlay id="music" onEnded={getRandomTrack}>
          <source src={randomTrack} />
        </audio>

        {slides.map(
          (data, index) =>
            counter == index && (
              <div
                className="background"
                style={{ backgroundImage: `url(../images/${data.id}.png)` }}
              ></div>
            )
        )}

        <div className="vignette"></div>

        <div className="loading-container">
          <img
            className="logo"
            autoPlay
            src={logo}
            alt=""
          />
          <div className="header">
            <img src={map} alt="" />
            <p>{slides[counter].label}</p>
          </div>
          <div className="footer">
            {audiostate && (
              <>
                <img className="m1 m" src={music} alt="" />
                <img className="m2 m" src={music} alt="" />
                <img className="m3 m" src={music} alt="" />
              </>
            )}
            <img
              className="audiobutton"
              onClick={handleaudio}
              autoPlay
              src={music}
              alt=""
            />

            <div>
              <h>LOADING</h>
              <h className="songname"><span>Musique:</span>{randomTrackName}</h>
              <div className="loading">
                <div className="loading-background"></div>
                <div
                  style={{ width: progress + "%" }}
                  className="loading-value"
                ></div>
              </div>
              <h className="quote">{slides[counter].quote}</h>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
