import React, { useRef, useState } from "react";
import audio from "../assets/img/fassounds-good-night-lofi-cozy-chill-music-160166.mp3";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source
          src={audio}
          type="audio/mpeg"
        />
      </audio>

      {/* Play/Pause Button */}
      <button
        className="audio-btn"
        onClick={toggleAudio}
        title="Play background music"
      >
        <i className={isPlaying ? "ri-pause-line" : "ri-music-2-line"}></i>
      </button>
    </div>
  );
};

export default AudioPlayer;