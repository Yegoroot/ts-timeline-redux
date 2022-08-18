import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, History } from "./pages";
import { Nav } from "./components";

import './App.scss';

function App() {

  return (

    <div className="app">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/history" element={<History/>}/>
          <Route path="/" element={<Home/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
