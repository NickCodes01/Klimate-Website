import {dbConnection, closeConnection} from '../config/mongoConnection.js';
// import * as users from '../data/users.js';
// import * as businesses from '../data/businesses.js';

import {create} from '../data/businesses.js';
//import {createUsers} from '../data/users.js';
import {createProjects} from '../data/projects.js';
import {createReview} from '../data/reviews.js';
import {createTipsGuides} from '../data/TipsGuides.js';
import {createForum} from '../data/forum.js';
import {createProducts} from '../data/products.js';
import {createProductReview} from '../data/productReviews.js';

//export const seedDatabase = async () => {
const db = await dbConnection();
await db.dropDatabase();

// const patrick = await users.addUser('Patrick', 'Hill');
// const pid = patrick._id.toString();
// const aiden = await users.addUser('Aiden', 'Hill');
// const aid = aiden._id.toString();
// await posts.addPost('Hello, class!', 'Today we are creating a blog!', pid);
// await posts.addPost(
//   'Using the seed',
//   'We use the seed to have some initial data so we can just focus on servers this week',
//   pid
// );

// await posts.addPost(
//   'Using routes',
//   'The purpose of today is to simply look at some GET routes',
//   pid
// );

// await posts.addPost("Aiden's first post", "This is aiden's first post", aid, [
//   'toys'
// ]);
// await posts.addPost("Aiden's second post", "This is aiden's second post", aid, [
//   'aiden'
// ]);
// await posts.addPost("Aiden's third post", "This is aiden's thrid post", aid, [
//   'aiden',
//   'kid'
// ]);

const business1 = await create(
    "Earth & Me", 
    "Wellness Shop",
    "30-38 Steinway St, Queens, NY 11103",
    "A zero-waste store in New York City offering...",
    "https://www.earthandme.co/",
    "(347) 730-6156"
    );
 const bus1 = business1._id.toString();

//-------- business2
 const business2 = await create(
    "LES Ecology Center", 
    "Recycling and Compost Facility",
    "Seward Park Essex and Canal Street, New York, NY 10002",
    "The LES Ecology Center has pioneered community-based models in urban sustainability since 1987. We provide unique composting  and e-waste  services, environmental stewardship  opportunities, and educational programming  to all New Yorkers to create an equitable, resilient, and sustainable city....",
    "https://www.lesecologycenter.org/",
    "(212) 477-4022"
    );
 const bus2 = business2._id.toString();

//-------- business3
 const business3 = await create(
    "Le Botaniste", 
    "Vegan Restaurant",
    "127 Grand St, New York, NY 10013",
    "Plant-based eats served in a casual space featuring dark wood interiors and a checkered floor....",
    "https://lebotaniste.us/",
    "(646) 870-7770"
    );
 const bus3 = business3._id.toString();

//------------------------------------------------------------------------------------------------------------------users

//users collection ***********************************************

// //user1
// const user1 = await createUsers(
// "John",
// "Doe",
// "johnDoe@gmail.com",
// "johnDoeABC",
// 30,
// //"03/05/2024",
// 200,
// "Le Botaniste"
// );
// const u1 = user1._id.toString();

// //user2
// const user2 = await createUsers(
//     "Eli",
//     "Grant",
//     "eliGrant@gmail.com",
//     "eliGrantABC",
//     28,
//     //"04/06/2024",
//     150,
//     "Le Botaniste"
//     );
//     const u2 = user2._id.toString();

// //user3
//     const user3 = await createUsers(
//         "Alora",
//         "Fraizer",
//         "aloraFraizer@gmail.com",
//         "aloraFraizerABC",
//         22,
//         //"04/06/2024",
//         100,
//         "LES Ecology Center"
//         );
//         const u3 = user3._id.toString();


// console.log('Done seeding database');

//------------------------------------------------------------------------------------------------------------------projects

//projects collection ***********************************************

//project 1
const project1 = await createProjects(
    "Reforest It All!",
    "New York, NY",
    "06/05/2024",
    "Central Park Reforestation Initiative - a community-driven event focused on planting new trees to help improve air quality and urban biodiversity.",
    "https://www.environental-initiative-centralpark.com"
)
const p1 = project1._id.toString();


//project 2
const project2 = await createProjects(
    "AdaptNYC",
    "New York, NY",
    "06/10/2024",
    "Since its colonial founding over 400 years ago, New York City developed and shaped its built environment to a regional climate of moderate seasonal weather patterns and stable sea levels.",
    "https://climate.cityofnewyork.us/initiatives/adaptnyc/"
)
const p2 = project2._id.toString();


//project 3
const project3 = await createProjects(
    "OneNYC 2050",
    "New York, NY",
    "06/12/2024",
    "One NYC 2050 is a strategy to secure our city’s future against the challenges of today and tomorrow.",
    "https://climate.cityofnewyork.us/reports/onenyc-2050/"
)
const p3 = project3._id.toString();

//------------------------------------------------------------------------------------------------------------------TipsGuides

//TipsGuides collection ***********************************************

//TG1
const TipsGuides1 = await createTipsGuides(
"johnDoeABC",
"10 Ways You Can Help Fight the Climate Crisis",
"The evidence is irrefutable: unless we act immediately to reduce greenhouse gas emissions, we will not be able to stave off the worst consequences..."
);
const tg1 = TipsGuides1._id.toString();

//TG2
const TipsGuides2 = await createTipsGuides(
    "eliGrantABC",
    "Save energy at home",
    "Much of our electricity and heat are powered by coal, oil and gas. Use less energy by reducing your heating and cooling use, switching to LED light bulbs and..."
    );
    const tg2 = TipsGuides2._id.toString();

//TG3
    const TipsGuides3 = await createTipsGuides(
        "aloraFraizerABC",
        "Walk, bike or take public transport",
        "The world’s roadways are clogged with vehicles, most of them burning diesel or gasoline. Walking or riding a bike instead of driving will reduce greenhouse gas emissions -- and..."
        );
        const tg3 = TipsGuides3._id.toString();

//------------------------------------------------------------------------------------------------------------------forum

//forum collection ***********************************************

//forum1
const forum1 = await createForum(
    "abbyJones@email.com",
    "Hi, just wanted to say this place is great. Can't believe they..."
);
const f1 = forum1._id.toString();

//forum2
const forum2 = await createForum(
    "eliGrantABC@email.com",
    "Nice being here..."
);
const f2 = forum2._id.toString();

//forum3
const forum3 = await createForum(
    "aloraFraizer1@email.com",
    "Hello, does anyone know..."
);
const f3 = forum3._id.toString();

//------------------------------------------------------------------------------------------------------------------products

//products collection ***********************************************

//product1
const product1 = await createProducts(
    "Avocado Facial Cleanser",
    "Mindfully handmade in small batches in South Australia, this best selling all natural facial cleanser is gentle on your skin and will help to remove impurities and blemishes."
);
const prod1 = product1._id.toString();


//product2
const product2 = await createProducts(
    "Biodegradable Cotton Swabs - 100pk",
    "Cotton swabs: they're often used for 5 seconds, but with plastic handles, can stick around on our planet for 500+ years! Unlike plastic swabs, these Biodegradable Cotton Swabs from The Humble Co. are made from biodegradable and compostable materials that easily break down without harming our planet."
);
const prod2 = product2._id.toString();


//product3
const product3 = await createProducts(
    "Baking Soda Free Zero Waste Deodorant Stick",
    "Looking for a package-free, natural deodorant that's still a snap to apply? Introducing the Baking Soda Free Zero Waste Deodorant Stick by Meow Meow Tweet!"
);
const prod3 = product3._id.toString();

//------------------------------------------------------------------------------------------------------------------reviews for businesses
//create a bunch of reviews to seed database (the function we use to create a review is **createReview** from our file reviews.js)

//reviews for business collection ***********************************************

//reviews for business1
await createReview(
    bus1,
    "Wow!!",
    "John O'Neal",
    "Great place!",
    4
    );

    await createReview(
        bus1,
        "Eh",
        "John Doe",
        "Average food!",
        2
        );

        await createReview(
            bus1,
            "Nice!",
            "Jane Doe",
            "Nice shop, impressive!",
            4
            );

            //.......................................
            //reviews for business2
            await createReview(
                bus2,
                "Easy!!",
                "Jen Morris",
                "Always easy here!",
                5
                );
            
                await createReview(
                    bus2,
                    "The best!",
                    "Ivan Luna",
                    "Coming here for years!",
                    4
                    );
            
                    await createReview(
                        bus2,
                        "Not the best!",
                        "Bjorn Santiago",
                        "Could be better!",
                        2
                        );

                        //.................................................
                        //reviews for business3
                        await createReview(
                            bus3,
                            "Enjoyable!!",
                            "Jackie Gordon",
                            "The design is beautiful. Everything looks well thought out!",
                            3
                            );
                        
                            await createReview(
                                bus3,
                                "WOW WOW WOW",
                                "Frugal Cyclist",
                                "I just can’t put into words! Amazing quality & simplicity.",
                                5
                                );
                        
                                await createReview(
                                    bus3,
                                    "Highly Recommend!",
                                    "Aja Brandman",
                                    "Ordered to go, and food was tasty and colorful!",
                                    5
                                    );

//------------------------------------------------------------------------------------------------------------------reviews for products

//reviews for products collection ***********************************************

//reviews for product1
await createProductReview(
    prod1,
    "Helps!!",
    "Hayley Doe",
    "Love this product!",
    5
    );

    await createProductReview(
        prod1,
        "Not great",
        "Josh Willow",
        "Could be better!",
        3
        );

        await createProductReview(
            prod1,
            "Love it!",
            "Francis Glass",
            "Nice product!",
            3
            );

//---------

//reviews for product2
await createProductReview(
    prod2,
    "Cool!",
    "Kyle Gregory",
    "Cool and easy to use!",
    4
    );

    await createProductReview(
        prod2,
        "Cheap and functional",
        "Jade Walsh",
        "Always use this product!",
        4
        );

        await createProductReview(
            prod2,
            "Need more!",
            "Ricky Evans",
            "Gotta buy more!",
            5
            );

//---------

//reviews for product3
await createProductReview(
    prod3,
    "Not the best",
    "Lily Shaw",
    "Not that good.",
    2
    );

    await createProductReview(
        prod3,
        "Best!",
        "Jalen Villa",
        "The best thing I ever purchased!",
        5
        );

        await createProductReview(
            prod3,
            "Great, need more!",
            "Lenny Elliott",
            "Great product need to get more!",
            5
            );


    
    





console.log('Done seeding database');

await closeConnection();
//    }