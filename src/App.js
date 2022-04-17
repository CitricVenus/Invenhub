import Login from "./Views/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import Entry from "./Views/Entry";
import Inventory from "./Views/Inventory";
import Exit from "./Views/Exit";
import { useState } from "react";

function App() {
    const [user, setUser] = useState(null);

    const protectWithLogin = (component, needAdmin = false) =>
        user && (needAdmin ? user.admin : true) ? component : <Navigate to='/' />;

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login setUser={setUser} />} />
                    <Route
                        path='/dash'
                        element={protectWithLogin(<Dashboard setUser={setUser} />)}
                    />
                    <Route path='/entry' element={protectWithLogin(<Entry />)} />
                    <Route path='/inventory' element={protectWithLogin(<Inventory />)} />
                    <Route path='/exit' element={protectWithLogin(<Exit />)} />
                    <Route path='*' element={<Navigate to='/dash' />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
