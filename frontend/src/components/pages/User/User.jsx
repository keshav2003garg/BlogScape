import React from 'react';
import Sidebar from '../../layouts/Sidebar/Sidebar';
import UserSettings from '../../layouts/UserSettings/UserSettings';

const User = () => {
    return (
        <div className='flex'>
            <UserSettings />
            <Sidebar />
        </div>
    )
}

export default User;
