import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Homepage from "./Components/Homepage";
import Games from "./Components/Games";
import Game from "./Components/Games/GamePage";
import Payments from "./Components/Payments";
import Library from "./Components/Library";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound/NotFound";
import UserProfile from "./Components/UserProfile";

function Header() {
  return (
    <div className="h1 pl-10   text-white text-3xl p-4 rounded-lg relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg">
      Game Shop
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <Signup />
            </>
          }
        />
        <Route path="/games" element={<Games />} />
        <Route
          path="/games/:url/*"
          element={
            <>
              <Game />
            </>
          }
        />
        <Route
          path="/games/:gameURL/buy"
          element={
            <>
              <Payments />
            </>
          }
        />
        <Route
          path="/library"
          element={
            <>
              <Library />
            </>
          }
        />
        <Route 
          path="/cart"
          element={
            <> 
              <Cart />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <UserProfile />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

