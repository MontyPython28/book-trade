import React, {useEffect, useState}from "react"
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";
import ForumPost from "./ForumPost";
import  Header from './Header';

const UserPosts = () => {
    //const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
     const serverURL = 'http://localhost:4000';

    const {currentUser} = useAuth();
    let [posts, setPosts] = useState();
    const [setUp, setSetUp] = useState(false);
    
    const fetchData = async () => {
      await axios({
        "method": "GET",
        "url": serverURL + '/api/posts/' + currentUser.email + '/listing'  
      })
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
      setSetUp(true);
    }
    
    useEffect(() => {
      fetchData();
    }, [])

    let postList;

    if(!posts) {
      postList = "You have not made any posts yet!";
    } else {
      postList = posts.map((post, k) =>
        <ForumPost post={post} key={k} />
      );
    }

    return setUp ? ( 
      <div>
      <Header title="My Posts" />
      <br />
      <div className="container">
        {postList}
      </div>
      
    </div>
    ) : (<Header title="My Posts" />);
}
 
export default UserPosts;