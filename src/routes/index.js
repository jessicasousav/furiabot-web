import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Bot from '../pages/Bot';

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='chat' element={ <Bot/> } />
        </Routes>
    );
}