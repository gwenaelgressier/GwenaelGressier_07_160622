import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

// eslint-disable-next-line
{
    /*suivant la page de par la quelle on apelle le component on aura signup ou signin afficher*/
}
const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    // eslint-disable-next-line
    {
        /*si on appuie sur s'inscrire change les etat si on appuie sur se connecter change les etat a l''inverse*/
    }
    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {/*si on click sur inscription alor SignUpForm*/}

                {signInModal && <SignInForm />}
                {/*si on click sur se connecter alor SignInForm*/}
            </div>
        </div>
    );
};
export default Log;
