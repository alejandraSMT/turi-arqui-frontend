import logo from './logo.svg';
import './App.css';
import LoginScreenDefault from './presentation/login-default/LoginScreenDef';
import LoginScreenBusiness from './presentation/login-business/LoginScreenBusiness';
import SignUpScreen from './presentation/signup/SignUpScreen';
import DetailScreen from './presentation/detail/DetailScreen';
import HomeScreen from './presentation/home/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './presentation/login-default/LoginScreenDef';
import BlogScreen from './presentation/blog/BlogScreen';
import ItineraryScreen from './presentation/itinerary/ItineraryScreen';
import DetailItinerary from './presentation/detail-itinerary/DetailItinerary';
import RecommendationsScreen from './presentation/recommendations/Recommendations';
import ReportesIngresos from './presentation/business/ReportesIngresosScreen';
import Reviews from './presentation/reviews/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={LoginScreen} />
        <Route path='/sign-up' Component={SignUpScreen} />
        <Route path='/login-business' Component={LoginScreenBusiness} />
        <Route path='/' Component={HomeScreen} />
        <Route path='/blog' Component={BlogScreen} />
        <Route path='/itinerary' Component={ItineraryScreen} />
        <Route path='/createItinerary' Component={DetailItinerary} />
        <Route path='/recommendations' Component={RecommendationsScreen} />
        <Route path='/business-home' Component={ReportesIngresos} />
        <Route path='/detail/:id' element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
