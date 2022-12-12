import './App.css';
import Radio from './components/Radio';
import guirlande1 from "./light.png";
import guirlande2 from "./light1.png";
import Snowfall from 'react-snowfall';
import DayNightToggle from 'react-day-and-night-toggle'
import { useState } from 'react';

function App() {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('data-theme') === 'dark' ? true : false)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newColorScheme = e.matches ? 'dark' : 'light'
  
      setIsDarkMode(newColorScheme === 'dark' ? true : false)
      localStorage.setItem('data-theme', newColorScheme)
      document.body.setAttribute('data-theme', localStorage.getItem('data-theme'))
    })
  
    const handleChangeTheme = () => {
      setIsDarkMode(!isDarkMode)
      if(!isDarkMode) {
        localStorage.setItem('data-theme', 'dark')
        document.body.setAttribute('data-theme', 'dark')
      } else {
        localStorage.setItem('data-theme', 'light')
        document.body.setAttribute('data-theme', 'light')
      }
    }

  return (
    <div className="App">
    <div className="banner">
    <Snowfall
     style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
    />
    <img className="guirlande cercle" src={guirlande1} alt="" />
    <img className="guirlande1 etoile" src={guirlande2} alt="" />
    <img className="guirlande2 etoile" src={guirlande2} alt="" />
    <img className="guirlande3 etoile" src={guirlande2} alt="" />
    <img className="guirlande4 etoile" src={guirlande2} alt="" />
    <img className="guirlande5 etoile" src={guirlande2} alt="" />
    <h1>Live Radio Player</h1>
    <h2>Choisissez votre station préférée</h2>
    <img className="guirlande6 cercle" src={guirlande1} alt="" />
    <img className="guirlande7 etoile" src={guirlande2} alt="" />
    <img className="guirlande8 etoile" src={guirlande2} alt="" />
    <img className="guirlande9 etoile" src={guirlande2} alt="" />
    <img className="guirlande10 etoile" src={guirlande2} alt="" />
    <img className="guirlande11 etoile" src={guirlande2} alt="" />
    <DayNightToggle
      onChange={handleChangeTheme}
      checked={isDarkMode}
      className="dark"
    />
    </div>
    <Radio />
</div>
  );
}

export default App;
