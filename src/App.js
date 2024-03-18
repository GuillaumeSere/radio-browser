import './App.css';
import Radio from './components/Radio';
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
    <h1>SEARCH RADIO</h1>
    <DayNightToggle
      onChange={handleChangeTheme}
      checked={isDarkMode}
      className="dark"
      size="20"
    />
    </div>
    <Radio />
</div>
  );
}

export default App;
