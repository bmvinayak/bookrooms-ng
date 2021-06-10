const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();
const image4Id = mongoose.Types.ObjectId();
const image5Id = mongoose.Types.ObjectId();
const image6Id = mongoose.Types.ObjectId();
const image7Id = mongoose.Types.ObjectId();
const image8Id = mongoose.Types.ObjectId();

exports.images = [
    {
        _id: image1Id,
        cloudinaryId: 'Penn_Station_yura8a',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621277967/Penn_Station_yura8a.jpg'
    },
    {
        _id: image2Id,
        cloudinaryId: 'Long_Island_Queens_kcefsh',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621277967/Long_Island_Queens_kcefsh.jpg'
    },
    {
        _id: image3Id,
        cloudinaryId: 'Green_street_xttung',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621687084/Green_street_xttung.jpg'
    },
    {
        _id: image4Id,
        cloudinaryId: 'Nehru_Bazaar_mwywoc',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621686971/Nehru_Bazaar_mwywoc.jpg'
    },
    {
        _id: image5Id,
        cloudinaryId: 'Banicka_1_e3u8bv',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621277965/Banicka_1_e3u8bv.jpg'
    },
    {
        _id: image6Id,
        cloudinaryId: 'Union_Street_qnqtys',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621686877/Union_Street_qnqtys.jpg'
    },
    {
        _id: image7Id,
        cloudinaryId: 'Times_Square_es5t07',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621277965/Times_Square_es5t07.jpg'
    },
    {
        _id: image8Id,
        cloudinaryId: 'Maple_ave_tknoky',
        url: 'https://res.cloudinary.com/bookyourroom/image/upload/v1621277965/Maple_ave_tknoky.jpg'
    }
]

exports.users = [{
    _id: user1Id,
    username: "Test User",
    email: "test@gmail.com",
    password: "testtest"
}, {
    _id: user2Id,
    username: "Test User1",
    email: "test1@gmail.com",
    password: "testtest1"
}]

exports.rentals = [{
    title: "Nice view on ocean",
    city: "San Francisco",
    street: "Market street",
    category: "condo",
    bedrooms: 4,
    shared: false,
    description: "Very nice apartment in center of the city.",
    dailyRate: 43,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image1Id,
    owner: user1Id
},
{
    title: "Modern apartment in center",
    city: "New York",
    street: "Time Square",
    category: "apartment",
    bedrooms: 1,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyRate: 11,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image2Id,
    owner: user1Id
},
{
    title: "Old house in nature",
    city: "Spisska Nova Ves",
    street: "Banicka 1",
    category: "house",
    bedrooms: 5,
    shared: false,
    description: "Very nice apartment in center of the city.",
    dailyRate: 23,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image3Id,
    owner: user1Id
},
{
    title: "A large bungalow",
    city: "jaipur",
    street: "Nehru Bazaar",
    category: "house",
    bedrooms: 5,
    shared: false,
    description: "A large and traditional bungalow in the middle of the city",
    dailyRate: 140,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image4Id,
    owner: user1Id
},
{
    title: "Amazing modern place",
    city: "San Francisco",
    street: "Green street",
    category: "house",
    bedrooms: 2,
    shared: false,
    description: "Hiking routes 10 min walking away",
    dailyRate: 140,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image5Id,
    owner: user1Id
},
{
    title: "Apartment In China Town",
    city: "San Francisco",
    street: "Church Street",
    category: "apartment",
    bedrooms: 3,
    shared: false,
    description: "Very nice apartment in China Town",
    dailyRate: 89,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image6Id,
    owner: user1Id
},
{
    title: "House with Garden",
    city: "New York",
    street: "Long Island, Queens",
    category: "house",
    bedrooms: 6,
    shared: false,
    description: "Very nice house in Long Island with garden",
    dailyRate: 189,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image7Id,
    owner: user1Id
},
{
    title: "Cozy modern Condo",
    city: "New York",
    street: "Penn Station",
    category: "condo",
    bedrooms: 3,
    shared: true,
    description: "Building close to Penn Station",
    dailyRate: 68,
    currency: "USD",
    cancelBeforeDays: 3,
    image: image8Id,
    owner: user1Id
}]