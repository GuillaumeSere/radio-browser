import './App.css';
import Radio from './components/Radio';
import guirlande1 from "./light.png"
import guirlande2 from "./light1.png"

function App() {
  return (
    <div className="App">
    <div className="banner">
    <img className="guirlande" src={guirlande1} alt="" />
    <img className="guirlande1" src={guirlande2} alt="" />
    <img className="guirlande2" src={guirlande2} alt="" />
    <img className="guirlande3" src={guirlande2} alt="" />
    <img className="guirlande4" src={guirlande2} alt="" />
    <img className="guirlande5" src={guirlande2} alt="" />
    <h1>Live Radio Player</h1>
    <h2>Choisissez votre station préférée</h2>
    <img className="guirlande6" src={guirlande1} alt="" />
    <img className="guirlande7" src={guirlande2} alt="" />
    <img className="guirlande8" src={guirlande2} alt="" />
    <img className="guirlande9" src={guirlande2} alt="" />
    <img className="guirlande10" src={guirlande2} alt="" />
    <img className="guirlande11" src={guirlande2} alt="" />
    </div>
    <Radio />
</div>
  );
}

export default App;
