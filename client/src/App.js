import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
export default function App(){
   return (
    <Router>
      <Switch> 
        <Route exact path='/' component={Login} />
        <Route path='/create-book' component={CreateBook} />
        <Route path='/edit-book/:id' component={UpdateBookInfo} />
        <Route path='/show-book/:id' component={ShowBookDetails} />
        <Route path='/signup' component={Signup} />
        <Route path='/allbooks' component={ShowBookList} />
      </Switch>
  </Router>
   );
}