import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (e){
            setError("failed to create an account");
            console.log(e);
        }
        
       
        setLoading(false);
    }


    return ( 
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    
                    {error && <Alert variant='danger'>{error}</Alert>}
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
                        <Button disabled={loading} onClick={handleSubmit} className='w-100' type='submit'>Signup</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to='/Login'>Log In</Link>
            </div>
        </div>
     );
}
 
export default Signup;