import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Profil from "./page/Profil";
import Trending from "./page/Trending";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/trending" element={<Trending />} />
                {/*path ="*"fonctionne si jamais l'url ne corespond à rien déclaré au dessus */}
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
