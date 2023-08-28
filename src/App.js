import './App.css';
import Home from './pages/Home/Home';
import Restaurant from './pages/Restaurant/Restaurant';
import RestChoice from './pages/RestChoice/RestChoice';
import Nutrient from './pages/Nutrient/Nutrient';
import NutrientChoice from './pages/NutrientChoice/NutrientChoice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/restchoice" element={<RestChoice />}/>
        <Route path="/nutrient" element={<Nutrient/>}/>
        <Route path="/nutrientchoice" element={<NutrientChoice/>}/>
        <></>
      </Routes>
    </BrowserRouter>
  );
}

export default App;