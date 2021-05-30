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
        <div className="w-100 text-center mt-2 ">
            <p className="float-left">{currentUser}</p>
            <Button className="float-right" variant='link' onClick={handleLogout}>Log Out</Button>
        </div>     
     );
}
 
export default Navbar;