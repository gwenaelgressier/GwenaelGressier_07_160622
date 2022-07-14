import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import axios from "axios";
import cookie from "js-cookie";

const UpdateProfil = () => {
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    };

    const deleteUser = async () => {
        await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/user/${userData._id}`,
            withCredentials: true,
        })
            .then(async () => {
                const removeCookie = (key) => {
                    if (window !== "undefined") {
                        cookie.remove(key, { expires: 1 });
                    }
                };

                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/user/logout`,
                    withCredentials: true,
                })
                    .then(() => removeCookie("jwt"))
                    .catch((err) => console.log(err));
            })
            .then(() => (window.location = "/"))
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
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>
                                    {userData.bio}
                                </p>
                                <button
                                    onClick={() => setUpdateForm(!updateForm)}
                                >
                                    Modifier bio
                                </button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>
                                    Valider modifications
                                </button>
                            </>
                        )}
                    </div>
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
