import logo from './logo.svg';
import './App.css';
import LoginScreenDefault from './presentation/login-default/LoginScreenDef';
import LoginScreenBusiness from './presentation/login-business/LoginScreenBusiness';
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
