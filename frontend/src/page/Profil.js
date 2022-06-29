import React, { useContext } from "react";
import Log from "../components/Log";
import logo from "../styles/assets/img/icon-left-font-monochrome-black.svg";
import { UidContext } from "../components/AppContext";

const Profil = () => {
    const uid = useContext(UidContext);
    return (
        <div className="profil-page">
            {/*si j'ai un token et que je reclick sur profil aller sur upate page*/}
            {uid ? (
                <h1>UPDATE PAGE</h1>
            ) : (
                <div className="log-container">
                    <Log signin={false} signup={true} />
                    <div className="log-container">
                        <img src={logo} alt="logo groupomania" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;
