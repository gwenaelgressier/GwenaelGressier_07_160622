import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Profil from "./page/Profil";
import Trending from "./page/Trending";
import { UidContext } from "./components/AppContext";
import axios from "axios";

const App = () => {
    const [uid, setUid] = useState(null);
    //a chaque fois que app est appellé controle du token
    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then((res) => setUid(res.data))
                .catch((err) => console.log("No token"));
        };
        fetchToken();
    }, [uid]);//[uid] à chaque foit que uid evolue tu rejoue App 
    

    return (
        <UidContext.Provider value={uid}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/trending" element={<Trending />} />
                    {/*path ="*"fonctionne si jamais l'url ne corespond à rien déclaré au dessus */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </UidContext.Provider>
    );
};

export default App;
