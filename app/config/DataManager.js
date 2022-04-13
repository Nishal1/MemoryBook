import { users } from "./users";
import { images } from "./images";
import { categories } from "./categories";
export default class DataManager {
    static myInstance = null;
    session = null;
    
    static getInstance() {
        if(DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
    }
    /**
     * 
     * @param {*} user - user object trying to login
     */
    login(user) {
        this.session = user;
        console.log("session")
        console.log(this.session)
    }

    logout() {
        this.session = null;
    }

    register(user) {
        users.push(user);
        console.log("after register")
        console.log(users);
    }

    getLoggedInUser() {
        if(this.session) {
            return this.session;
        }
        return null;
    }

    getUserId() {
        if(this.session) {
            return this.session.id
        } else {
            return "";
        }
    }

    getAllUsers() {
        return users;
    }

    getImages() {
        let signedInUserId = this.getUserId();
        let currImgs = images.filter(img => img.userid === signedInUserId);
        return currImgs;
    }

    getCategories() {
        return categories;
    }

    addMemory(memory) {
        if(memory == null) {
            return;
        }
        images.push(memory);
        console.log(images);
    }

    deleteMemory(memory) {
        if(memory == null) {
            return;
        }
        //only signed in user can delete their own memory
        let signedInUserId = this.getUserId(); 
        images = images.filter(img => (img.id === memory.id) && 
                                       (img.userid === signedInUserId));
        console.log(images);
    }

    updateMemory(memory) {
        if(memory == null) {
            return;
        }
        let signedInUserId = this.getUserId();
        images = images.map(img => {
            if(img.id === memory.id) {
                return memory;
            }
        });
        console.log(images);
    }
}