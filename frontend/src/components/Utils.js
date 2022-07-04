/**
 *permet d'avoir la date au format voulue
 *
 * @param {*} num
 * @returns
 */
export const dateParser = (num) => {
    //creation de mes option d'affichage de la date
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    //recupere la date en millisecondes depuis le millisecondes depuis le 1er janvier 1970
    let timestamp = Date.parse(num);
    //convertie ma date en millisecondes au format de date fr

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

/**
 * sert a voir si la valeur user data est vidde ou non
 *
 * @param {*} value
 * @returns
 */
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};
