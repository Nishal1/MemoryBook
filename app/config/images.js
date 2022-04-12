import { v4 as uuidv4 } from 'uuid';

module.exports.images = [
  {
    id: uuidv4(),
    userid: 1,
    title: "Running",
    category: 'Sports',
    created: new Date(),
    source: require('../assets/user1img1.jpg')
  },
  {
    id: uuidv4(),
    userid: 1,
    title: "Soccer",
    category: 'Sports',
    created: new Date(),
    source: require('../assets/user1img2.jpg')
  },
  {
    id: uuidv4(),
    userid: 1,
    title: "City Skylines",
    category: 'City',
    created: new Date(),
    source: require('../assets/user1img3.jpg')
  },
  {
    id: uuidv4(),
    userid: 1,
    title: "Yellow Banana",
    category: 'Fruits',
    created: new Date(),
    source: require('../assets/user1img4.jpg')
  },
  {
    id: uuidv4(),
    userid: 1,
    title: "My favorite berry fruits",
    category: 'Fruits',
    created: new Date(),
    source: require('../assets/user1img5.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Mountains",
    category: 'Nature',
    created: new Date(),
    source: require('../assets/user2img1.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Green View",
    category: 'Nature',
    created: new Date(),
    source: require('../assets/user2img2.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Nature's bridge",
    category: 'Nature',
    created: new Date(),
    source: require('../assets/user2img3.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Fruit Art",
    category: 'Fruits',
    created: new Date(),
    source: require('../assets/user2img4.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Fruit Market",
    category: 'Fruits',
    created: new Date(),
    source: require('../assets/user2img5.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Elegant Orange",
    category: 'Fruits',
    created: new Date(),
    source: require('../assets/user2img6.jpg')
  },
  {
    id: uuidv4(),
    userid: 2,
    title: "Minion Snap",
    category: 'Fun',
    created: new Date(),
    source: require('../assets/user2img7.jpg')
  },
]