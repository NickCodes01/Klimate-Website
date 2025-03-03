// This data file should export all functions using the ES6 standard as shown in the lecture code
import {products} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import {updateAvg} from './products.js';


export const createProductReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {

  rating = parseFloat(rating);

   //Error checks ooooooooooooooooooooooo


   if (!productId) return 'Error: Input missing productId!';
   if (!title) return 'Error: Input missing title!';
   if (!reviewerName) return 'Error: Input missing reviewerName!';
   if (!review) return 'Error: Input missing review!';
   if (!rating) return 'Error: Input missing rating!';
 
   if (typeof productId !== 'string' || typeof title !== 'string' || typeof reviewerName !== 'string' || typeof review !== 'string') return 'Error: Given input must be a string!';
   if (productId.trim().length === 0 || title.trim().length === 0 || reviewerName.trim().length === 0 || review.trim().length === 0) return 'Error: Cannot be empty string!';

   productId = productId.trim();
   if (!ObjectId.isValid(productId)) return 'Error: Invalid object ID';

   if (typeof rating !== 'number' || rating < 1 || rating > 5) return "Error: Rating must be a number greater than 0 and less than 5.1 AND must only have 2 decimal places";

   function ratingFunctionForDecimal(rating) {
   
     //convert rating to a string
     const ratingIsString = rating.toString();
     //locate the index of the decimal
     const findDecimal = ratingIsString.indexOf('.');
     //allow for whole numbers (not having a decimal won't casue an error)
     if (findDecimal === -1) {
       return true;
     }
     //check that there are no more than 1 decimal places after the decimal (<= 3 does not work, must be <= 2)
     const decimalGood = (ratingIsString.length - findDecimal <= 2);
 
     return decimalGood
   }
 
   if (!ratingFunctionForDecimal(rating)) return "Error: only allowed 1 decimal place"

   //we must make the date in mm/dd/yyyy format (2 for month, 2 for day, 4 for year) using padding
   const nowDate = new Date();
const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
const d = nowDate.getDate().toString().padStart(2, '0');
const y = nowDate.getFullYear();
const reviewDate = `${m}/${d}/${y}`;


   //end error checks ooooooooooooooooooooooo

   //trim the strings
   productId = productId.trim();
   title = title.trim();
   reviewerName = reviewerName.trim();
   review = review.trim();

   let newReview = {
    //For the _id field, you will need to generate a new objectID and pass it in when you create the review
    _id: new ObjectId(),////////////////////////////////////////////////////
    //productId: productId,
    title: title,
    reviewerName: reviewerName,
    review: review,
    rating: rating,
    reviewDate: reviewDate,////////////////////////////////////////////
    };


    //again, we await products because we are ONLY using one collection, the products collection
    const reviewCollection = await products();
const insertInfo = await reviewCollection.findOneAndUpdate(
{_id: new ObjectId(productId)},
{$push: {reviews: newReview}},
{returnDocument: 'after'}
);

//console.log("Insert Info:", insertInfo);
if (insertInfo === null || !insertInfo) return 'Error: No product with that id'; ///////////////////////////////////////////////

 //recalculate average review 88888888888888888888888888888888888888888888888888888888888888888888888888888
 const allReviews = await getAllProductReviews(productId)
 const newAvg = calculateAverageRating(allReviews);
 await updateAvg(productId, newAvg);
 //return newReview;
 return insertInfo;
 //88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

};


//--------------------------------------------------- getAllReviews


export const getAllProductReviews = async (productId) => {

  //Error checks ooooooooooooooooooooooo


  if (!productId) throw 'Error: Input missing productId!';
  if (typeof productId !== 'string') throw 'Error: Given input must be a string!';
  if (productId.trim().length === 0) throw 'Error: Cannot be empty string!';
  productId = productId.trim();
  if (!ObjectId.isValid(productId)) throw 'Error: Invalid object ID';


  //end error checks ooooooooooooooooooooooo

  const reviewCollection = await products();
 
    const product =  await reviewCollection.findOne({ _id: new ObjectId(productId)});
    if (product === null || !product) throw 'Error: No product with that id'; ////////////////////////////////////////////

    if (product.reviews.length === 0 || !product.reviews) throw 'Error; invalid or empty';

    return product.reviews;

};


//--------------------------------------------------- getReview


export const getProductReview = async (reviewId) => {

  //Error checks ooooooooooooooooooooooo


  if (!reviewId) throw 'Error: You must provide an id to search for';
  if (typeof reviewId !== 'string') throw 'Error: reviewId must be a string';
  if (reviewId.trim().length === 0) throw 'Error: reviewId cannot be an empty string or just spaces';
  reviewId = reviewId.toString().trim();
  if (!ObjectId.isValid(reviewId)) throw 'Error: Invalid object ID';


  //end error checks ooooooooooooooooooooooo

  const reviewCollection = await products();
  const review = await reviewCollection.findOne({
    'reviews._id': new ObjectId(reviewId) ////////////////////////////////////
  });

  if (!review) throw 'Error: No review with that id';

  const retrieve =  review.reviews.find(rev => rev._id.toString() === reviewId);
 
  return retrieve;

};


//--------------------------------------------------- updateReview


export const updateProductReview = async (reviewId, updateObject) => {


   //Error checks ooooooooooooooooooooooo


  if (reviewId !== undefined && !reviewId) return 'Error: You must provide an id to search for';
  if (reviewId !== undefined && typeof reviewId !== 'string') return 'Error: reviewId must be a string';
  if (reviewId !== undefined && reviewId.trim().length === 0) return 'Error: reviewId cannot be an empty string or just spaces';
  reviewId = reviewId.toString().trim();
  if (!ObjectId.isValid(reviewId)) return 'Error: Invalid object ID';

  const needOne = Object.keys(updateObject);
  if (needOne.length === 0) return 'Error: need at least one field in the request body!';

//end error checks ooooooooooooooooooooooo

//we must make the date in mm/dd/yyyy format (2 for month, 2 for day, 4 for year) using padding
const nowDate = new Date();
const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
const d = nowDate.getDate().toString().padStart(2, '0');
const y = nowDate.getFullYear();
const reviewDate = `${m}/${d}/${y}`;

const  updateSpecific = {};
//use $ to update only specific fields of the array for a PATCH request

if ('title' in updateObject) {
  const title = updateObject.title.trim();
  if (typeof updateObject.title !== 'string' || updateObject.title === '') return 'Error: issue with title';
  updateSpecific['reviews.$.title'] = title;
}

if ('reviewerName' in updateObject) {
  const reviewerName = updateObject.reviewerName.trim();
  if (typeof updateObject.reviewerName !== 'string' || updateObject.reviewerName === '') return 'Error: issue with reviewerName';
  updateSpecific['reviews.$.reviewerName'] = reviewerName;
}

if ('review' in updateObject) {
  const review = updateObject.review.trim();
  if (typeof updateObject.review !== 'string' || updateObject.review === '') return 'Error: issue with review';
  updateSpecific['reviews.$.review'] = review;
}

if ('rating' in updateObject) {
  const rating = parseFloat(updateObject.rating);
  if (typeof updateObject.rating !== 'number' || updateObject.rating === '' || updateObject.rating < 1 || updateObject.rating > 5) return 'Error: issue with rating';
  updateSpecific['reviews.$.rating'] = rating;
}

updateSpecific['reviews.$.reviewDate'] = reviewDate;

const reviewCollection = await products();
const updatedReview = await reviewCollection.findOneAndUpdate(
{'reviews._id': new ObjectId(reviewId)}, ////////////////////////////////////////////
{$set: updateSpecific},
{ returnDocument: 'after'}
);

if (updatedReview === null || !updatedReview) return 'Error: No review with that id'; ////////////////////////////////////////////

//recalculate average review 88888888888888888888888888888888888888888888888888888888888888888888888888888
const productId = updatedReview._id.toString();
const allReviews = await getAllProductReviews(productId)
const newAvg = calculateAverageRating(allReviews);
await updateAvg(productId, newAvg);
//return updatedReview.value.reviews.find(rev => rev._id.equals(reviewId));
//88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

return updatedReview;


};


//--------------------------------------------------- removeReview


export const removeProductReview = async (reviewId) => {

  //Error checks ooooooooooooooooooooooo
 
 
  if (!reviewId) throw 'Error: You must provide an id to search for';
  if (typeof reviewId !== 'string') throw 'Error: reviewId must be a string';
  if (reviewId.trim().length === 0) throw 'Error: reviewId cannot be an empty string or just spaces';
  reviewId = reviewId.toString().trim();
  if (!ObjectId.isValid(reviewId)) throw 'Error: Invalid object ID';
 
 
  //end error checks ooooooooooooooooooooooo

    const reviewCollection = await products();
    const deletionInfo = await reviewCollection.findOneAndUpdate(
      {'reviews._id': new ObjectId(reviewId)},
     {$pull: {reviews: { _id: new ObjectId(reviewId)}}},
     {returnDocument: 'after'}
    );
   
    if (deletionInfo === null || !deletionInfo) throw 'Error: No review with that id'; ////////////////////////////////////////////
 
//recalculate average review 88888888888888888888888888888888888888888888888888888888888888888888888888888
const productId = deletionInfo._id.toString();
const allReviews = await getAllProductReviews(productId);
const newAvg = calculateAverageRating(allReviews);
await updateAvg(productId, newAvg);
//88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888  
   
return deletionInfo;
 
 
  };
 
 
//--------------------------------------------------- calculateAverageRating


//function to calculate avg rating
const calculateAverageRating = (reviews) => {
  //if no reviews, return 0
  if (reviews.length === 0 || !reviews) {
    return 0;
  }
  let totalRating = 0;
  //iterate over each review of a product
  for (const review of reviews) {
    totalRating += review.rating;
  }
  //and divide the total rating by the number of reviews to get the average
  //only one decimal place
  const avgRating =  (totalRating / reviews.length).toFixed(1);
  //need to convert back to a number though, above it returns it like "4.0"
return parseFloat(avgRating);
};















