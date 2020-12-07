import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
// import Logout from './components/logout';
import Home from './components/home';
import Profile from './components/profile';
//context APi
import { Context } from './components/contextApiForUserLoggedIn';

function App() {
  return (
    <Context>
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home}></Route>
          {/* <Route exact path='/logout' component={Logout}></Route> */}
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/profile' component={Profile}></Route>
        </div>
      </Router>
    </Context>
  );
}

export default App;
