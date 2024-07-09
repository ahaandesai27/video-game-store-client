import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/Signup';
import Homepage from './Components/Homepage';
import Games from './Components/Games';
import Game from './Components/Game';

function Header() {
  return <div className="h1 pl-10   text-white text-3xl p-4 rounded-lg relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg">
    Game Shop
  </div>
}

function App() {  

  return <Router>
      <Routes>
        <Route path="/" element = {<Homepage />} />
        <Route path="/login" element={<><Header /><Login /> </>} />
        <Route path="/signup" element={<><Header /><Signup /> </>} />
        <Route path="/games" element={<><Games /> </>} />
        <Route path="/game/:id" element={<><Game /> </>} />
      </Routes>
    </Router>
}

export default App;
