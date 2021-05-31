import { useAuth } from './context/AuthContext'
import { Button, Navbar as navbar } from 'react-bootstrap'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const [error, setError] = useState('');
    const { logout, currentUser } = useAuth()
    const history = useHistory()


    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('failed to log out')
        }
    }

    return (  
        <div>
            <h2 className="float-left">{currentUser}</h2>
            <Button className="float-right" variant='link' onClick={handleLogout}>Log Out</Button>
            <br/><br/>
        </div>     

     );
}
 
export default Navbar;