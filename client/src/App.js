import {Button, Space, Flex} from 'antd';
import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/theme.css'
import './stylesheets/form_elements.css'
import './stylesheets/custom-components.css'
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom'

import React from 'react';
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute';
import {useSelector} from 'react-redux';
import Loader from './components/Loader';
import Profile from './pages/profile';
// Import the CSS in your main JavaScript/React file



function App() {

  const { isLoading }= useSelector((state)=>state.loader);
  return (
    <div >

      {isLoading && <Loader/>}
    
      <Router>

          <Routes>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element= {<ProtectedRoute><Profile/></ProtectedRoute>} />
          </Routes>

        </Router>
    
    </div>
  );
}

export default App;
