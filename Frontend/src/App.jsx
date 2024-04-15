import { BrowserRouter as Router } from 'react-router-dom'
import router from './router/router'
import "./App.css";
import React from "react";
import HeaderMenu from "./component/headerMenu";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesWithHeader from './router/router';

function App() {
  return (
    <Router>
      <HeaderMenu />
      <div>
        <RoutesWithHeader />
      </div>
      <Footer />
    </Router>
  )
}

export default App
