/**
 * This file performs all the data handling operations
 */
import { users } from "./users";
import { images } from "./images";
import { categories } from "./categories";
export default class DataManager {
    static myInstance = null;
    session = null; //keeps track of user signed in
    imgList = [...images]; //image collection
    userList = [...users]; //user collection
    static getInstance() {
        if(DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
    }
    /**
     * 
     * @param {*} user - user object trying to login
     * this function logs the user by setting
     * the session object
     */
    login(user) {
        this.session = user;
        console.log("session")
        console.log(this.session)
    }

    /**
     * logs the user out of the system 
     * by setting the session object
     * back to null
     */
    logout() {
        this.session = null;
    }

    /**
     * 
     * @param {*} user - user object to register
     * this method register's the user on to
     * the system by pushing the user object on to
     * the userList collection
     */
    register(user) {
        this.userList.push(user);
        console.log("after register")
        console.log(this.userList);
    }

    /**
     * 
     * @returns the current logged in user object
     */
    getLoggedInUser() {
        if(this.session) {
            return this.session;
        }
        return null;
    }

    /**
     * 
     * @returns the current logged in user's id, if no user is
     * present, it returns empty string ("")
     */
    getUserId() {
        if(this.session) {
            return this.session.id
        } else {
            return "";
        }
    }

    /**
     * 
     * @returns all the users in the user's collection
     */
    getAllUsers() {
        return this.userList;
    }

    /**
     * 
     * @returns the images belonging to the signed in user
     */
    getImages() {
        let signedInUserId = this.getUserId();
        if(this.imgList == null) {
            return [];
        }
        let currImgs = this.imgList.filter(img => img.userid === signedInUserId);
        return currImgs;
    }

    /**
     * 
     * @returns the categories available
     */
    getCategories() {
        return categories;
    }

    /**
     * 
     * @param {*} memory -memory object to add
     * @returns nothing, if memory is null
     * This method adds memory on to the collection
     */
    addMemory(memory) {
        if(memory == null) {
            return;
        }
        this.imgList.push(memory);
    }

    /**
     * 
     * @param {*} memory -memory object to delete
     * @returns nothing if memeory is null
     * This method deletes the specific memory
     */
    deleteMemory(memory) {
        if(memory == null) {
            return;
        }
        //only signed in user can delete their own memory
        let signedInUserId = this.getUserId();
        if(memory.userid !== signedInUserId) {
            alert("You do not have permission to do that action!");
            return;
        } 
        this.imgList = this.imgList.filter(img => (img.id !== memory.id));
    }

    /**
     * 
     * @param {*} memory -memory object to update
     * @returns nothing, if memory is null
     * This method updates the specific memory
     */
    updateMemory(memory) {
        if(memory == null) {
            return;
        }
        let signedInUserId = this.getUserId();
        this.imgList = this.imgList.map(img => {
            if(img.id === memory.id && img.userid === signedInUserId) {
                return memory;
            } else {
                return img;
            }
        });
    }

    updateProfilePic(updatedUser) {
        if(updatedUser == null) {
            return;
        }
        this.userList = this.userList.map(person => {
            if(person.id === updatedUser.id) {
                return updatedUser;
            } else {
                return person;
            }
        })

    }
}