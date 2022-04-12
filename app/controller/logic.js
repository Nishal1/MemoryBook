import DataManager from "../config/DataManager";

/**
 * 
 * @param {*} user The user trying to log in
 * @returns true, if the user exists, false otherwise
 */
module.exports.authenticate = (user) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
    return users.filter(u => u.username === user.username && 
                            u.password === user.password).length > 0;
}

module.exports.getUser = (username) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
    return users.find(u => u.username === username);
}

module.exports.beginSession = (user) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
    let currUser = users.find(u => u.username === user.username);
    commonData.login(currUser);

    console.log("currUser");
    console.log(currUser);
}

module.exports.endSession = () => {
    let commonData = DataManager.getInstance();
    commonData.logout();
}

module.exports.getCurrUser = () => {
    let commonData = DataManager.getInstance();
    let currUser = commonData.getLoggedInUser();
    return currUser;
}

module.exports.isCurrUser = () => {
    let commonData = DataManager.getInstance();
    if(commonData.getLoggedInUser() != null) {
        return true;
    } else {
        return false;
    }
}

module.exports.isUniqueUser = (user) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
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

module.exports.getImgs = () => {
    let commonData = DataManager.getInstance();
    return commonData.getImages();
}

module.exports.textLengthReducer = (str) => {
    if(str == null) {
        return;
    }
    if(str.length > 13) {
        return str.substring(0, 9) + "...";
    } else {
        return str;
    }
}