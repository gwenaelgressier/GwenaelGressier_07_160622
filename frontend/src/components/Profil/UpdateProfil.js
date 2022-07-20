import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { dateParser } from "../Utils";
import axios from "axios";

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);

    const deleteUser = async () => {
        await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/user/${userData._id}`,
            withCredentials: true,
        })
            .then(async () => {
                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/user/logout`,
                    withCredentials: true,
                })
                    .then(() => (window.location = "/"))
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="profil-container">
            <h1> Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Voulez-vous supprimer votre profil ?"
                                )
                            ) {
                                deleteUser(userData._id);
                            }
                        }}
                    >
                        suppression du compte
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;
