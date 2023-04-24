import "./App.css";
import DogsList from "./components/Cards/Cards";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/Landing/Landing";
import CardDetail from "./components/CardDetail/CardDetail";
import FormPage from "./components/Form/Form";
import Navbar from "./components/Nav/Nav";
import About from "./components/About/About";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<WelcomePage />} />
      <Route
        exact
        path="/about"
        element={
          <div>
            <Navbar />
            <About />
          </div>
        }
      />
      <Route
        exact
        path="/home"
        element={
          <div>
            <Navbar />
            <DogsList />
          </div>
        }
      />
      <Route
        path="/home/name"
        element={
          <div>
            <Navbar />
            <CardDetail />
          </div>
        }
      />
      <Route
        exact
        path="/home/form"
        element={
          <div>
            <Navbar />
            <FormPage />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
