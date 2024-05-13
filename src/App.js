//TODO: Check if able to deploy react without container 

import "./App.css";
import HttpCall from "./components/HttpCall";
import RecipeParams from "./components/RecipeParams";
import ButtonGroup from "./components/ButtonGroup";
import DisplayImageCall from "./components/DisplayImageCall";
import {SocketContext, socket} from './context/socket'

// Main component for the application
function App() {
  // Rendering the component JSX
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <h1>RiVision GUI</h1>
        <div className="line">
          <DisplayImageCall />
        </div>
        <div className="line">
          <RecipeParams />
        </div>
        <div className="line">
          <HttpCall dict={'result-data'} />
        </div>
        <div className="line">
          <HttpCall dict={'state-machines'} />
        </div>
        <div className="line">
          <ButtonGroup />
        </div>
      </div>
    </SocketContext.Provider>
  );
}

// Exporting the App component as the default export
export default App;
