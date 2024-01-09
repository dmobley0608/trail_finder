import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage';
import Register from './pages/register/register';
import SignIn from './pages/signIn/signIn';
import Root from './components/navigation/layouts/root/root';
import AddParkForm from './components/forms/addParkForm';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route path='/' element={<Homepage />} />,
    <Route path='/signin' element={<SignIn />} />,
    <Route path='/register' element={<Register />} />,
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
