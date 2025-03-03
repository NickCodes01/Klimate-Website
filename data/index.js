// This file should import both data files and export them as shown in the lecture code


import * as businessesDataFunctions from './businesses.js';
import * as reviewsDataFunctions from './reviews.js';
import * as usersDataFunctions from './users.js';
import * as TipsGuidesDataFunctions from './TipsGuides.js';
import * as forumDataFunctions from './forum.js';
import * as productsDataFunctions from './products.js';
import * as productReviewsDataFunctions from './productReviews.js';
import * as calculatorDataFunctions from './calculator.js';

// import businessesDataFunctions from './businesses.js';
// import reviewsDataFunctions from './reviews.js';
// import usersDataFunctions from './users.js';
// import TipsGuidesDataFunctions from './TipsGuides.js';
// import forumDataFunctions from './forum.js';
// import productsDataFunctions from './products.js';
// import productReviewsDataFunctions from './productReviews.js';

// export const businessesData = businessesDataFunctions;
// export const reviewsData = reviewsDataFunctions;
// export const usersData = usersDataFunctions;
// export const TipsGuidesData = TipsGuidesDataFunctions;
// export const forumData = forumDataFunctions;
// export const productsData = productsDataFunctions;
// export const productReviewsData = productReviewsDataFunctions;

export {
businessesDataFunctions as businessData,
reviewsDataFunctions as reviewsData,
usersDataFunctions as userData,
TipsGuidesDataFunctions as TipsGuidesData,
forumDataFunctions as forumData,
productsDataFunctions as productsData,
productReviewsDataFunctions as productReviewsData, 
calculatorDataFunctions as calculatorData
};
