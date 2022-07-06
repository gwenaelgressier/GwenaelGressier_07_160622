import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.redducer";
import postReducer from "./post.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
});
