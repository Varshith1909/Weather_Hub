import './App.css';
import Login from './Login';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/homepage'
import Forecast from './pages/forecast'
import Footer from './components/footer'

function App() {
  return ( 
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/forecast" element={<Forecast />} />
          <Route path="/login" element={<Login />} />
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
