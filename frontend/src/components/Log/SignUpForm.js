import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlePassword, setControlePassword] = useState("");

    const hanleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlePassword || !terms.checked) {
            if (password !== controlePassword)
                passwordConfirmError.innerHTML =
                    "Les mot de passe ne correspondent pas";

            if (!terms.checked)
                termsError.innerHTML =
                    "Veuillez valider les conditions générales";
        }
    };

    return (
        <form action="" onSubmit={hanleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)} //permet de au changement d'incrementer la value
                value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="controle-conf">Confirmer mot de passe</label>
            <br />
            <input
                type="password"
                name="controlePassword"
                id="controle-conf"
                onChange={(e) => setControlePassword(e.target.value)}
                value={controlePassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                    conditions générales
                </a>
            </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="Valider inscription" />
        </form>
    );
};
export default SignUpForm;
