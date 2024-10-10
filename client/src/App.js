import {Button, Space, Flex} from 'antd';
import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/theme.css'
import './stylesheets/form_elements.css'
import './stylesheets/custom-components.css'
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  return (
    <div >
    
      <Router>

          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>

        </Router>
    
    </div>
  );
}

export default App;
