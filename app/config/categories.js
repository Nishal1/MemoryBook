import { v4 as uuidv4 } from 'uuid'; //package to generate ids
/**
 * Sample categories, not changable to users
 */
module.exports.categories = [
    {
        id: uuidv4(),
        name: 'Fruits',
        icon: 'fruit-watermelon'
    },
    {
        id: uuidv4(),
        name: 'Sports',
        icon: 'basketball'
    },
    {
        id: uuidv4(),
        name: 'City',
        icon: 'city'
    },
    {
        id: uuidv4(),
        name: 'Nature',
        icon: 'nature-people'
    },
    {
        id: uuidv4(),
        name: 'Food',
        icon: 'food'
    },
    {
        id: uuidv4(),
        name: 'Fun',
        icon: 'popcorn'
    },
]