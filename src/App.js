import './App.css';
import Radio from './components/Radio';
import guirlande1 from "./light.png";
import guirlande2 from "./light1.png";
import Snowfall from 'react-snowfall';

function App() {
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
    <img className="guirlande" src={guirlande1} alt="" />
    <img className="guirlande1 etoile" src={guirlande2} alt="" />
    <img className="guirlande2 etoile" src={guirlande2} alt="" />
    <img className="guirlande3 etoile" src={guirlande2} alt="" />
    <img className="guirlande4 etoile" src={guirlande2} alt="" />
    <img className="guirlande5 etoile" src={guirlande2} alt="" />
    <h1>Live Radio Player</h1>
    <h2>Choisissez votre station préférée</h2>
    <img className="guirlande6" src={guirlande1} alt="" />
    <img className="guirlande7 etoile" src={guirlande2} alt="" />
    <img className="guirlande8 etoile" src={guirlande2} alt="" />
    <img className="guirlande9 etoile" src={guirlande2} alt="" />
    <img className="guirlande10 etoile" src={guirlande2} alt="" />
    <img className="guirlande11 etoile" src={guirlande2} alt="" />
    </div>
    <Radio />
</div>
  );
}

export default App;
