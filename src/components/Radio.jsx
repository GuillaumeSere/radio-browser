import React, { useEffect, useState } from 'react';
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import defaultImage from "../radio.jpg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from './97959-music-visualizer.json'
const RadioBrowser = require('radio-browser');


const Radio = () => {
    const [stations, setStations] = useState();
    const [stationFilter, setStationFilter] = useState("all");
    const [currentStationIndex, setCurrentStationIndex] = useState(0);


    useEffect(() => {
        setupApi(stationFilter).then((data) => {
            setStations(data);
        });
    }, [stationFilter]);

    useEffect(() => {
        let timer;
        if (stations && stations[currentStationIndex]) {
            timer = setTimeout(() => {
                // Redémarrer le flux après 5 minutes
                const audioPlayer = document.querySelector('.rhap_main-controls-button.rhap_play-pause-button');
                if (audioPlayer) {
                    audioPlayer.click();
                    setTimeout(() => audioPlayer.click(), 100);
                }
            }, 5 * 60 * 1000); // 5 minutes
        }
        return () => clearTimeout(timer);
    }, [currentStationIndex, stations]);

    const setupApi = async (stationFilter) => {
        const api = RadioBrowser

        const stations = await api
            .searchStations({
                language: "english",
                tag: stationFilter,
                limit: 40,
            })
            .then((data) => {
                return data;
            });

        return stations;
    };

    const filters = [
        "all",
        "classical",
        "country",
        "dance",
        "disco",
        "house",
        "jazz",
        "pop",
        "rap",
        "retro",
        "rock",
    ];

    const setDefaultSrc = (event) => {
        event.target.src = defaultImage;
    };

    const handleStationChange = (index) => {
        if (index < 0) {
            setCurrentStationIndex(stations.length - 1);
        } else if (index >= stations.length) {
            setCurrentStationIndex(0);
        } else {
            setCurrentStationIndex(index);
        }
    };

    return (
        <div className="radio">
            <div className="filters">
                <Player
                    autoplay
                    loop
                    src={animation}
                    className='animation-left'
                    style={{ height: '100px', width: '300px' }}
                >
                </Player>
                {filters.map((filter, index) => (
                    <span
                        key={index}
                        className={stationFilter === filter ? "selected" : ""}
                        onClick={() => setStationFilter(filter)}
                    >
                        {filter}
                    </span>
                ))}
                <Player
                    autoplay
                    loop
                    src={animation}
                    className="animation-right"
                    style={{ height: '100px', width: '300px' }}
                >
                </Player>
            </div>
            <div className="stations">
                {stations && (
                    <div className="station" key={currentStationIndex}>
                        <div className="stationName">
                            <img
                                className="logo"
                                src={stations[currentStationIndex].favicon}
                                alt="station logo"
                                onError={setDefaultSrc}
                            />
                            <div className="name">{stations[currentStationIndex].name}</div>
                        </div>
                        <AudioPlayer
                            className="player"
                            src={stations[currentStationIndex].url_resolved}
                            showJumpControls={false}
                            layout="stacked"
                            customProgressBarSection={[]}
                            customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                            autoPlayAfterSrcChange={false}
                        />
                        <div className="station-controls">
                            <CiCircleChevLeft className='btn' onClick={() => handleStationChange(currentStationIndex - 1)} />
                            <CiCircleChevRight className='btn' onClick={() => handleStationChange(currentStationIndex + 1)} />
                        </div>
                    </div>
                )}
            </div>
            <div className="footer">
                <p> Copyrights 2022, Developed by <span>Guillaume SERE </span>with React</p>
            </div>
        </div>
    )
}

export default Radio;
