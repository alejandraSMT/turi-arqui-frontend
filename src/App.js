import logo from './logo.svg';
import './App.css';
import LoginScreen from './presentation/login/LoginScreen';
import SignUpScreen from './presentation/signup/SignUpScreen';
import DetailScreen from './presentation/detail/DetailScreen';
import HomeScreen from './presentation/home/HomeScreen';
import RecommendationsScreen from './presentation/recommendations/Recommendations';

function App() {
  return (
    <div>
          <RecommendationsScreen />
    </div>
  );
}

export default App;
