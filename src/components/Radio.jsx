import React, { useEffect, useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import defaultImage from "../radio.jpg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from './97959-music-visualizer.json';
import Slides from './Slides';
const RadioBrowser = require('radio-browser');

const Radio = () => {
    const [stations, setStations] = useState();
    const [stationFilter, setStationFilter] = useState("all");
    const [currentStationIndex, setCurrentStationIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isUsingSuggestions, setIsUsingSuggestions] = useState(false);


    useEffect(() => {
        if (isUsingSuggestions) return;

        setupApi(stationFilter, searchTerm).then((data) => {
            setStations(data);
            setCurrentStationIndex(0);
        });
    }, [stationFilter, searchTerm, isUsingSuggestions]);

    useEffect(() => {
        let timer;
        if (stations && stations[currentStationIndex]) {
            timer = setTimeout(() => {
                const audioPlayer = document.querySelector('.rhap_main-controls-button.rhap_play-pause-button');
                if (audioPlayer) {
                    audioPlayer.click();
                    setTimeout(() => audioPlayer.click(), 100);
                }
            }, 5 * 60 * 1000);
        }
        return () => clearTimeout(timer);
    }, [currentStationIndex, stations]);

    const setupApi = async (stationFilter, searchTerm = "") => {
        const api = RadioBrowser;
        const params = { language: "english", limit: 40 };

        if (searchTerm !== "") {
            params.name = searchTerm;
        } else if (stationFilter !== "all") {
            params.tag = stationFilter;
        }

        return await api.searchStations(params);
    };

    // ✅ Recherche des suggestions (autocomplétion)
    const fetchSuggestions = async (value) => {
        const api = RadioBrowser;
        if (value.length < 2) return setSuggestions([]);

        const result = await api.searchStations({
            name: value,
            limit: 10
        });

        setSuggestions(result);
    };

    // ✅ Au clic sur une suggestion → on joue directement la radio
    const handleSuggestionClick = (index) => {
        setIsUsingSuggestions(true);
        setStations(suggestions);
        setCurrentStationIndex(index);
        setSearchTerm("");
        setSuggestions([]);
    };

    const filters = ["all", "classical", "country", "dance", "disco", "house", "jazz", "pop", "rap", "retro", "rock"];

    const setDefaultSrc = (event) => event.target.src = defaultImage;

    const handleStationChange = (index) => {
        if (index < 0) setCurrentStationIndex(stations.length - 1);
        else if (index >= stations.length) setCurrentStationIndex(0);
        else setCurrentStationIndex(index);
    };

    return (
        <>
            <div className="radio">

                <div className="filters">
                    <Player autoplay loop src={animation} className='animation-left' style={{ height: '100px', width: '300px' }} />

                    {filters.map((filter, index) => (
                        <span
                            key={index}
                            className={stationFilter === filter ? "selected" : ""}
                            onClick={() => {
                                setIsUsingSuggestions(false);
                                setStationFilter(filter);
                            }}
                        >
                            {filter}
                        </span>
                    ))}

                    <Player autoplay loop src={animation} className="animation-right" style={{ height: '100px', width: '300px' }} />
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Rechercher une radio..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            fetchSuggestions(e.target.value);
                        }}
                    />

                    {suggestions.length > 0 && (
                        <ul className="autocomplete-list">
                            {suggestions.map((station, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(index)}>
                                    <img
                                        src={station.favicon || defaultImage}
                                        onError={(e) => (e.target.src = defaultImage)}
                                        alt={station.name}
                                        className="suggestion-icon"
                                    />
                                    <span>{station.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Slides />

                <div className="stations">
                    {stations && stations.length > 0 && (
                        <div className="station" key={currentStationIndex}>
                            <div className="stationName">
                                <img className="logo" src={stations[currentStationIndex].favicon} alt="station logo" onError={setDefaultSrc} />
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
            </div>

            <div className="footer">
                <p> &copy; 2022, Developed by <span>Guillaume SERE </span>with React</p>
            </div>
        </>
    );
};

export default Radio;


