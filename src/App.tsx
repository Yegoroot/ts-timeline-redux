import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home, History } from "./pages";

import './App.scss';

function App() {

  return (
    <Router>
      <nav className='nav'>
        <ul >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
  
      <Routes>
        <Route path="/history" element={<History/>}/>
        <Route path="/" element={<Home/>} />
      </Routes>

    </Router>
  );
}

export default App;
