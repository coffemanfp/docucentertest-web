import './App.scss';
import img_astronaut from '../_images/astronaut.svg';
import img_scribble from '../_images/scribble.svg';
import img_scribble_2 from '../_images/scribble_2.svg';
import img_scribble_3 from '../_images/scribble_3.svg';
import { Outlet } from "react-router-dom"
import { React } from 'react';


function App() {
  return (
    <div className="app">
      <div className="app__background">
        <img src={img_astronaut} alt="Astronaut" id="app__astronaut" />
        <img src={img_scribble} alt="Scribble" id="app__scribble" />
        <img src={img_scribble_2} alt="Scribble" id="app__scribble_2" />
        <img src={img_scribble_3} alt="Scribble" id="app__scribble_3" />
      </div>
      <main className="app__content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
