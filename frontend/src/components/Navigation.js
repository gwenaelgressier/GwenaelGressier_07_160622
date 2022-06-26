import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <ul>
                <NavLink to="/">
                    <li>accueil</li>
                </NavLink>
                <NavLink to="/Profil">
                    <li>profil</li>
                </NavLink>
                <NavLink to="/trending">
                    <li>best post</li>
                </NavLink>
            </ul>
        </div>
    );
};
export default Navigation;
