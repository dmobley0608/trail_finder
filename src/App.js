import './App.css';
import Navbar from './components/navbar/navbar';
import Homepage from './pages/homepage/homepage';
import Register from './pages/register/register';
import SignIn from './pages/signIn/signIn';

function App() {
  return (
    <div className="App min-h-dvh max-w-dvw relative">
      <Navbar/>
     <Register/>
    </div>
  );
}

export default App;
