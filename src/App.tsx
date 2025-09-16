import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ItemDetail from './components/ItemDetail';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import React, {Suspense} from 'react';

const Dashboard = React.lazy(() => import('./components/Dashboard'))
export default function App() {
    const [userAnonymousName , setUserAnonymousName] = useState<string>("")
    const userNames = ["Shadow", 
    "Mystic", 
    "Echo", 
    "Spectre", 
    "Phantom", 
    "Vortex", 
    "Cipher", 
    "Ghost", 
    "Oblivion", 
    "Nexus",
    "Sable", 
    "Rogue", 
    "Eclipse", 
    "Wraith", 
    "Enigma", 
    "Noir", 
    "Silent", 
    "Echo", 
    "Cloak"]
    useEffect(()=> {
        let userName:string
        const storedName = localStorage.getItem("userAnonymousName");
        if(storedName != null) {
            userName = storedName
        } else {
            const randomUsername = Math.floor(Math.random() * userNames.length);
            userName = "Anonymous "+userNames[randomUsername];
            localStorage.setItem("userAnonymousName", userName);
        }
        setUserAnonymousName(userName)
    },[])

    console.log(userAnonymousName)
    return (
        <Router>
            <Suspense fallback={<div>Loading Page...</div>}>
                <Navbar userAnonymousName={userAnonymousName} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pokemon/:pid" element={<ItemDetail />} />
                </Routes>
            </Suspense>
        </Router>
    )
}