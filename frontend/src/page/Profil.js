import React, { useContext } from "react";
import Log from "../components/Log";
import logo from "../styles/assets/img/icon-left-font-monochrome-black.svg";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
    const uid = useContext(UidContext);

    const showlogin = () => {
        if (uid !== "") {
            return <UpdateProfil />;
        }
        return (
            <div className="log-container">
                <Log signin={false} signup={true} />
                <div className="images-container">
                    <img src={logo} alt="logo groupomania" />
                </div>
            </div>
        );
    };
    return <div className="profil-page">{showlogin()}</div>;
};

export default Profil;
