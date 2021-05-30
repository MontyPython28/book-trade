import React, { useRef, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios'

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    useEffect( ()=>{
        console.log('hello');
    }, [] );

    const register = (userid, password) => {
        Axios({
          method: "POST",
          data: {
            username: userid,
            password: password,
          },
          withCredentials: true,
          url: "http://localhost:4000/register",
        }).then((res) => console.log(res));
      };
    
      function handleSubmit(e) {
        e.preventDefault();

        try {
            register(emailRef.current.value, passwordRef.current.value);
            history.push('/allbooks');
        } catch {
           console.log('some error')
        }
    }

    return ( 
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label> 
                            <Form.Control type='email' ref={emailRef}
                                required />
                        </Form.Group>  
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label> 
                            <Form.Control type='password' ref={passwordRef}
                                required />
                        </Form.Group> 
                        <Button onClick={handleSubmit} className='w-100' type='submit'>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
               Have an account? <Link to='/login'>Log In</Link>
            </div>       
        </>
     );
}
 
export default Signup;