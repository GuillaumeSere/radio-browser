import React, { useEffect, useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import defaultImage from "../radio.jpg";
import hoodies1 from "../images/hoodies1.png";
import hoodies2 from "../images/hoodies2.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from './97959-music-visualizer.json';
import Slides from './Slides';
const RadioBrowser = require('radio-browser');

const Radio = () => {
    const [stations, setStations] = useState([]);
    const [stationFilter, setStationFilter] = useState("all");
    const [currentStationIndex, setCurrentStationIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isUsingSuggestions, setIsUsingSuggestions] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [favoritesLoaded, setFavoritesLoaded] = useState(false);

    // Charger les favoris depuis localStorage
    useEffect(() => {
        const savedFavs = JSON.parse(localStorage.getItem("favoris")) || [];
        setFavorites(savedFavs);
        setFavoritesLoaded(true)

        if (stationFilter === "favoris") {
            setStations(savedFavs);
            setCurrentStationIndex(0);
        }
    }, [stationFilter]);

    // Sauvegarder les favoris dans localStorage
    useEffect(() => {
        if (!favoritesLoaded) return;
        localStorage.setItem("favoris", JSON.stringify(favorites));
    }, [favorites, favoritesLoaded]);

    // Charger les stations selon le filtre
    useEffect(() => {
        if (!favoritesLoaded) return;
        if (isUsingSuggestions) return;

        if (stationFilter === "favoris ⭐") {
            // Afficher uniquement les favoris
            setStations(favorites);
            setCurrentStationIndex(0);
            return;
        }

        // Pour tous les autres filtres
        setupApi(stationFilter, searchTerm).then((data) => {
            setStations(data);
            setCurrentStationIndex(0);
        });
    }, [stationFilter, searchTerm, isUsingSuggestions, favorites, favoritesLoaded]);

    const setupApi = async (stationFilter, searchTerm = "") => {
        const api = RadioBrowser;
        const params = { language: "english", limit: 40 };

        if (searchTerm !== "") params.name = searchTerm;
        else if (stationFilter !== "all" && stationFilter !== "favoris") params.tag = stationFilter;

        return await api.searchStations(params);
    };

    const fetchSuggestions = async (value) => {
        const api = RadioBrowser;
        if (value.length < 2) return setSuggestions([]);
        const result = await api.searchStations({ name: value, limit: 10 });
        setSuggestions(result);
    };

    const handleSuggestionClick = (index) => {
        setIsUsingSuggestions(true);
        setStations(suggestions);
        setCurrentStationIndex(index);
        setSearchTerm("");
        setSuggestions([]);
    };

    const filters = ["favoris ⭐", "classical", "country", "dance", "disco", "house", "jazz", "pop", "rap", "retro", "rock"];

    const setDefaultSrc = (event) => event.target.src = defaultImage;

    const handleStationChange = (index) => {
        if (index < 0) setCurrentStationIndex(stations.length - 1);
        else if (index >= stations.length) setCurrentStationIndex(0);
        else setCurrentStationIndex(index);
    };

    const toggleFavorite = (station) => {
        const exists = favorites.find(fav => fav.stationuuid === station.stationuuid);
        if (exists) {
            setFavorites(favorites.filter(fav => fav.stationuuid !== station.stationuuid));
        } else {
            setFavorites([...favorites, station]);
        }
    };

    const isFavorite = stations && stations[currentStationIndex] && favorites.some(f => f.stationuuid === stations[currentStationIndex].stationuuid);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFavorites, setShowFavorites] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="radio">
                <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} role="button" tabIndex={0}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`filters ${isMenuOpen ? 'active' : ''}`}>
                    <Player autoplay loop src={animation} className='animation-left' style={{ height: '100px', width: '300px' }} />

                    {filters.map((filter, index) => (
                        <span
                            key={index}
                            className={stationFilter === filter ? "selected" : ""}
                            onClick={() => {
                                setIsUsingSuggestions(false);
                                setStationFilter(filter);
                                setIsMenuOpen(false);
                            }}
                        >
                            {filter}
                        </span>
                    ))}

                    <Player autoplay loop src={animation} className="animation-right" style={{ height: '100px', width: '300px' }} />
                </div>
                <span className='description'>
                    <p>Parcourez les radios par genre 🎵
                        Recherchez et trouvez votre station rapidement 🔍
                        Ajoutez vos radios favorites ⭐ et retrouvez-les facilement</p>
                </span>

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
                                    <img src={station.favicon || defaultImage} onError={(e) => (e.target.src = defaultImage)} alt={station.name} className="suggestion-icon" />
                                    <span>{station.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="container">
                    <div className="shoping-1">
                        <a href="https://www.zazzle.fr/store/arts__abstrait" target="_blank" rel="noopener noreferrer">
                            <img src={hoodies1} alt="Boutique en ligne" />
                        </a>
                    </div>

                    <div className="player-favorites-container">
                        <div className="stations">
                            {stations && stations.length > 0 && (
                                <div className="station" key={currentStationIndex}>
                                    <div className="stationName">
                                        <img className="logo" src={stations[currentStationIndex].favicon} alt="station logo" onError={setDefaultSrc} />
                                        <div className="name">{stations[currentStationIndex].name}</div>

                                        <div className="favorite-btn" onClick={() => toggleFavorite(stations[currentStationIndex])}>
                                            {isFavorite ? <AiFillStar color="gold" /> : <AiOutlineStar />}
                                        </div>
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

                        <div className="shoping-2">
                            <a href="https://www.zazzle.fr/store/arts__abstrait" target="_blank" rel="noopener noreferrer">
                                <img src={hoodies2} alt="Boutique en ligne" />
                            </a>
                        </div>

                    </div>

                    <div className={`favorites-sidebar ${showFavorites ? 'visible' : ''}`}>
                        <div className="favorites-header">
                            <h3>Mes Favoris ⭐</h3>
                            <button className="close-favorites" onClick={() => setShowFavorites(false)} aria-label="Fermer les favoris">
                                ×
                            </button>
                        </div>
                        <div className="favorites-list">
                            {favorites.map((station, index) => (
                                <div
                                    key={station.stationuuid}
                                    className="favorite-item"
                                    onClick={() => {
                                        setStations([...favorites]);
                                        setCurrentStationIndex(index);
                                        setStationFilter("favoris ⭐");
                                        setShowFavorites(false);
                                    }}
                                >
                                    <img
                                        src={station.favicon || defaultImage}
                                        alt={station.name}
                                        onError={setDefaultSrc}
                                        className="favorite-logo"
                                    />
                                    <span className="favorite-name">{station.name}</span>
                                </div>
                            ))}
                            {favorites.length === 0 && (
                                <div className="no-favorites">
                                    Aucune radio favorite
                                </div>
                            )}
                        </div>
                    </div>

                    {!showFavorites && (
                        <button className="show-favorites-button" onClick={() => setShowFavorites(true)} aria-label="Afficher les favoris">
                            ⭐
                        </button>
                    )}

                    <Slides />
                </div>
            </div>


            <div className="footer">
                <p> &copy; 2022, Developed by <span>Guillaume SERE </span>with React</p>
            </div>
        </>
    );
};

export default Radio;

