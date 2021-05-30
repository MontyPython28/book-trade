import React from "react";
import Signup from "./Signup";
import { Container } from 'react-bootstrap';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute'
import ShowBookList from "./ShowBookList";
import CreateBook from "./CreateBook";
import UpdateBookInfo from "./UpdateBookInfo";
import ShowBookDetails from "./ShowBookDetails copy";


function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" 
      style={{minHeight: "100vh"}}>
        <div className='w-100' style={{minheight:'100vh'}}>
          <Router>
            <AuthProvider>
              <Switch> 
                <PrivateRoute exact path='/' component={ShowBookList} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <PrivateRoute path='/create-book' component={CreateBook} />
                <PrivateRoute path='/edit-book/:id' component={UpdateBookInfo} />
                <PrivateRoute path='/show-book/:id' component={ShowBookDetails} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  );
}

export default App;
