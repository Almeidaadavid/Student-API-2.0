import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './Components/Login';
import Students from './Components/Students';
import NewStudent from './Components/NewStudent';
import Theme from './Components/ThemeToggle/ThemeToggle';

export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Theme />
            <Routes>
                <Route path='/' exact Component={Login} />
                <Route path='/students' Component={Students} />
                <Route path='/student/new/:studentID' Component={NewStudent} />
            </Routes>
        </BrowserRouter>
    );
}