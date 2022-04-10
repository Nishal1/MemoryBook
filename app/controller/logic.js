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