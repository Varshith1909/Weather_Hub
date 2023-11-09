import './App.css';
import Login from './Login';
import Navbar from './components/navbar';
import Home from './pages/homepage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
