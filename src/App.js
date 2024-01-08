import './App.css';
import Navbar from './components/navbar/navbar';
import Homepage from './pages/homepage/homepage';

function App() {
  return (
    <div className="App min-h-dvh max-w-dvw relative">
      <Navbar/>
      <Homepage/>
    </div>
  );
}

export default App;
