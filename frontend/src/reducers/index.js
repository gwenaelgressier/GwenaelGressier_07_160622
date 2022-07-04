import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.redducer";

export default combineReducers({
    userReducer,
    usersReducer,
});
