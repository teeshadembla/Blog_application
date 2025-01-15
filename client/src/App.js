import './App.css';
import DataProvider from './context/DataProvider';
import {BrowserRouter, Navigate, Route, Routes, Outlet} from 'react-router-dom';
import {useState} from 'react';

import Login from './components/accounts/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header'
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';

const PrivateRoute = ({isAuthenticatedPriv, ...props}) => {
  return isAuthenticatedPriv ?
  <>
    <Header/>
    <Outlet/> {/* this takes us to the child component of our private route */}
  </>
  : <Navigate replace to='/login' />
}

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
           <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={setisAuthenticated}/>}/>
            
            <Route path='/' element={<PrivateRoute isAuthenticatedPriv={isAuthenticated}/>}>
              <Route path='/' element={<Home/>}/>
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticatedPriv={isAuthenticated}/>}>
              <Route path='/create' element={<CreatePost/>}/>
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticatedPriv={isAuthenticated}/>}>
              <Route path='/details/:id' element={<DetailView />}/>
            </Route>

           </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
