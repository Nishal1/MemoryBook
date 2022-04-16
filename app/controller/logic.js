/**
 * This file acts as an interface to the 
 * Data Manager
 */

import DataManager from "../config/DataManager";
import { v4 as uuidv4 } from 'uuid'; //used to generate ids

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

/**
 * 
 * @param {*} username to search in the users list
 * @returns the user object found
 */
module.exports.getUser = (username) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
    return users.find(u => u.username === username);
}

/**
 * 
 * @param {*} user trying to login
 * the functions begins the user's session
 */
module.exports.beginSession = (user) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
    let currUser = users.find(u => u.username === user.username);
    commonData.login(currUser);
}

/**
 * proxy function to log the user out of the system
 */
module.exports.endSession = () => {
    let commonData = DataManager.getInstance();
    commonData.logout();
}

/**
 * 
 * @returns the current user signed in 
 */
module.exports.getCurrUser = () => {
    let commonData = DataManager.getInstance();
    let currUser = commonData.getLoggedInUser();
    return currUser;
}

/**
 * 
 * @returns true, if there is a user signed in,
 * false otherwise
 */
module.exports.isCurrUser = () => {
    let commonData = DataManager.getInstance();
    if(commonData.getLoggedInUser() != null) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param {*} user a user object
 * @returns true if the user object (argument passed to
 * the method) does not exist in the current users list,
 * false otherwise
 */
module.exports.isUniqueUser = (user) => {
    let commonData = DataManager.getInstance();
    let users = commonData.getAllUsers();
    let newUser = users.filter(u => u.username === user.username);
    return !(newUser.length > 0);
}
/**
 * 
 * @param {*} user -new user to register to the system
 * This methods registeres the user into the
 * system & logs the user into the system by calling the login method
 */
module.exports.registerUser = (user) => {
    if(user != null) {
        let commonData = DataManager.getInstance();
        user.username = user.username.trim() //extra measure to avoid spaces around in username
        let newUser = {
            ...user,
            id: uuidv4(),
            profilePic: null
        }
        commonData.register(user);
        commonData.login(user);
    }
}

/**
 * 
 * @returns the image collection
 */
module.exports.getImgs = () => {
    let commonData = DataManager.getInstance();
    return commonData.getImages();
}

/**
 * 
 * @param {*} str string to reduce the length
 * @returns a shorter string based on the total 
 * length
 */
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

/**
 * 
 * @returns the categoris available,
 * Note: a user cannot alter the categories collection
 */
module.exports.getCategories = () => {
    let commonData = DataManager.getInstance();
    return commonData.getCategories();
}

/**
 * 
 * @param {*} category the category used to filter images
 * @returns the collection of image under the specific
 * catefory
 */
module.exports.filterCategories = (category) => {
    let commonData = DataManager.getInstance();
    const imgs = commonData.getImages();
    const result = imgs.filter(im => im.category === category.name);
    return result;
}

/**
 * 
 * @param {*} memory - new memory object to add
 * @param {*} uid - userid of the memory's author
 * @returns nothing, if memory is null
 */
module.exports.addMemory = (memory, uid) => {
    if(memory == null) {
        return;
    }
    let commonData = DataManager.getInstance();
    let newMemory = {
        id: uuidv4(),
        userid: uid,
        ...memory,
        created: new Date()
    }
    commonData.addMemory(newMemory);
}

/**
 * 
 * @param {*} memory - memory object to delete
 * @returns nothing, if memory is null
 */
module.exports.deleteMemory = (memory) => {
    if(memory == null) {
        return;
    }
    let commonData = DataManager.getInstance();
    commonData.deleteMemory(memory);
}

/**
 * 
 * @param {*} memory - memory object to update
 * @param {*} memoryId - id of the memory object
 * @param {*} uid - usedid of the memory's author
 * @returns 
 */
module.exports.updateMemory = (memory, memoryId, uid) => {
    if(memory == null) {
        return;
    }
    let commonData = DataManager.getInstance();
    let updatedMemory = {
        id: memoryId,
        userid: uid,
        ...memory,
        created: new Date()
    }
    commonData.updateMemory(updatedMemory);
}

/**
 * 
 * @param {*} user - user's who's profile image is to be updated
 * updates the profile image of the user
 */
module.exports.editProfileImage = (user, newProfilePic) => {
    if(user == null) {
        return;
    }
    let commonData = DataManager.getInstance();
    let updatedUser = {
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
        profilePic: newProfilePic.source,
        username: user.username
    }
    commonData.updateProfilePic(updatedUser);
}