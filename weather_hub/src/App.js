import './App.css';
import Login from './Login';
import Navbar from './components/navbar';
import Home from './pages/homepage'
import Footer from './components/footer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
