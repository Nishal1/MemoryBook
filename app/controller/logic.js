import DataManager from "../config/DataManager";

/**
 * 
 * @param {*} users The list of users in the data manager
 * @param {*} user The user trying to log in
 * @returns true, if the user exists, false otherwise
 */
module.exports.authenticate = (users, user) => {
    return users.filter(u => u.username === user.username && 
                            u.password === user.password).length > 0;
}

module.exports.getUser = (users, user) => {
    return users.find(u => u.username === user.username);
}

module.exports.beginSession = (users, user) => {
    let commonData = DataManager.getInstance();
    let currUser = users.find(u => u.username === user.username);
    commonData.login(currUser);

    console.log("currUser");
    console.log(currUser);
}

module.exports.isUniqueUser = (users, user) => {
    let newUser = users.filter(u => u.username === user.username);
    return !(newUser.length > 0);
}

module.exports.registerUser = (user) => {
    if(user != null) {
        let commonData = DataManager.getInstance();
        commonData.register(user);
        commonData.login(user);
    }
}
