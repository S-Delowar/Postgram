import React from 'react';
import { useUserActions } from '../hooks/user.actions';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {

    const userActions = useUserActions();
    const handleLogout = () => {
        userActions.logout()
        console.log('user logged out')
    }

    return (
        <div>
            <Button variant='danger' onClick={handleLogout} >Logout</Button>
        </div>
    );
};

export default LogoutButton;