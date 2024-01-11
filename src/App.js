import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage';
import Register from './pages/register/register';
import SignIn from './pages/signIn/signIn';
import Root from './components/navigation/layouts/root/root';
import Dashboard from './pages/dashboard/dashboard';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route path='/' element={<Homepage />} />,
    <Route path='/signin' element={<SignIn />} />,
    <Route path='/register' element={<Register />} />,
    <Route path='/user/:id/dashboard' element={<Dashboard/>}/>
    <Route path='/parks/:id' element={<p>You found the park</p>}/>
  </Route>

))
function App() {
  return (
    <div className="App">     
      <RouterProvider router={router} />      
    </div>
  );
}

export default App;
