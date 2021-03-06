import React from "react";
import axios from "axios";

const Logout = () => {
    const logout = async (e) => {
        e.preventDefault();
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        }).catch((err) => console.log(err));

        window.location = "/";
    };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;
