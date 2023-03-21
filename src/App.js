import './App.css';
import "./css/home.css";
import "./css/blogsection.css";
import "./css/footer.css";
import "./css/login.css";
import "./css/admin.css";
import { BrowserRouter, Route, Routes, Switch} from "react-router-dom";
import Navigation from './components/navigation';
import Home from "./components/home";
import Login from "./components/login";
import Admin from "./components/admin";

import Footer from "./components/footer";
import { ProtectedRoute } from "./components/protectedRoute";


function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
