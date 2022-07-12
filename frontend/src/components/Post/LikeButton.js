import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };

    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    useEffect(() => {
        //si mon user et dans le tableau des user qui on liker alor passe liked sur true
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked]);

    return (
        <div className="like-container">
            {/*gere le message ddu popUp si nous ne somme pas connecter*/}
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {uid && liked && (
                <img
                    src="./img/icons/heart-filled.svg"
                    onClick={unlike}
                    alt="unlike"
                />
            )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;
