import React from "react";
import Navigation from "../components/Navigation";
import Log from "../components/Log";
import logo from "../styles/assets/img/icon-left-font-monochrome-black.svg";

const Profil = () => {
    return (
        <div className="profil-page">
            <Navigation />
            <div className="log-container">
                <Log signin={false} signup={true} />
                <div className="log-container">
                    <img src={logo} alt="logo groupomania" />
                </div>
            </div>
        </div>
    );
};

export default Profil;
