import { Switch, Route,Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './components/store/Auth-Context';

function App() {
  const AuthCtx=useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!AuthCtx.isLoggedIn&&<Route path='/auth'>
          <AuthPage />
        </Route>}
        
        {AuthCtx.isLoggedIn&&<Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path='*'>
        <Redirect to="/"/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
