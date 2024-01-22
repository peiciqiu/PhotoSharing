// import React from 'react';
// import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom/cjs/react-router-dom.min';
// import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import MainNavigation from './shared/components/Navigation/MainNavigation';

// const App = () => {
//   // return <h1>Let's start!</h1>;
//   //use Switch so it won't execute Redirect if it found a matching path
//   return (
//     <Router>
//       <MainNavigation />
//       <main>
//       <Switch>
//       <Route path="/" exact>
//         <Users />
//       </Route>
//       <Route path="/:userId/places" exact>
//         <UserPlaces />
//       </Route>
//       <Route path="/places/new" exact>
//         <NewPlace />
//       </Route>
//       <Redirect to="/"/>
//       </Switch>
//       </main>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;