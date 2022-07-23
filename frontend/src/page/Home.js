import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";

const Home = () => {
    const uid = useContext(UidContext);
    const showlogin = () => {
        if (uid !== "") {
            return <NewPostForm />;
        }
        return <Log signin={true} signup={false} />;
    };

    return (
        <div className="home">
            <div className="main">
                <div className="home-header">{showlogin()}</div>
                <Thread />
            </div>
        </div>
    );
};

export default Home;
