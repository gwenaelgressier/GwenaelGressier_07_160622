import React from "react";
import App from "./App";
import "./styles/style.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App tab="home" />
    </Provider>
);
