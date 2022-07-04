import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Profil from "./page/Profil";
import Trending from "./page/Trending";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import LeftNav from "./components/LeftNav";

const App = () => {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();
    //a chaque fois que app est appellé controle du token
    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then((res) => setUid(res.data)) //fait evoluer le uid
                .catch((err) => console.log("No token"));
        };
        fetchToken();
        if (uid) dispatch(getUser(uid));
    }, [uid, dispatch]); //[uid] à chaque foit que uid evolue tu rejoue App

    return (
        <UidContext.Provider value={uid}>
            <BrowserRouter>
                <Navbar />
                <LeftNav />
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
