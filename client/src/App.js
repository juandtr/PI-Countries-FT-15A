import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/landing/LandingPage";
import Detail from "./components/detail/Detail";
import newActivity from "./components/newActivity/NewActivity";
import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <NavBar />
      </Switch>
      <Route exact path="/countries" component={Home} />
      <Route path="/countries/:id" component={Detail} />
      <Route path="/newactivity" component={newActivity} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </React.Fragment>
  );
}

export default App;
