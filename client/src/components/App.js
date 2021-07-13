import React from "react"
import Signup from "./Signup"
import { AuthProvider} from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdatePswd from "./UpdatePswd";
import UpdateProfile from "./UpdateProfile";
import ShowBookDetails from "./ShowBookDetails";
import UpdateBookInfo from "./UpdateBookInfo";
import CreateBook from "./CreateBook";
import ShowBookList from "./ShowBookList";
import SearchQueryResults from "./SearchQueryResults";
import sirwait from "./SirWait";
import wishlist from './UserWishlist'
import listing from './UserListing'
import SellingChats from "./SellingChats";
import Chatroom from "./Chatroom";
import BuyingChats from "./BuyingChats";


function App() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={ShowBookList} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/update-password" component={UpdatePswd} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/wait" component={sirwait} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path='/search/:query' component={SearchQueryResults} />
              <PrivateRoute path='/show-book/:id' component={ShowBookDetails} />
              <PrivateRoute path='/create-book' component={CreateBook} />
              <PrivateRoute path='/wishlist' component={wishlist} />
              <PrivateRoute path='/listing' component={listing} />
              <PrivateRoute path='/edit-book/:id' component={UpdateBookInfo} />
              <PrivateRoute path='/sellingchats' component={SellingChats} />
              <PrivateRoute path='/buyingchats' component={BuyingChats} />
              <PrivateRoute path='/chatroom/:roomId' component={Chatroom} />         
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App;
