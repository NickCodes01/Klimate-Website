// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {products} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
//create, read (getAll, get), update, delete (remove)

//---------------------------------------------------- get

export const getProducts = async (productId) => {

  let x = new ObjectId();

    //Error checks ooooooooooooooooooooooo

    if (!productId) throw 'Error: You must provide an id to search for';
    if (typeof productId !== 'string') throw 'Error: Id must be a string';
    if (productId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    productId = productId.trim();
    if (!ObjectId.isValid(productId)) throw 'Error: Invalid object ID';

    //end error checks ooooooooooooooooooooooo

  
    const productsCollection = await products();
    const p = await productsCollection.findOne({_id: new ObjectId(productId)});
    if (p === null || !p) throw 'Error: No product with that id';
    p._id = p._id.toString();
    return p;


};

//---------------------------------------------------- getAll


export const getAllProducts = async () => {


  const productsCollection = await products();
 const productList =  await productsCollection.find({}, { projection: { _id: 1, productName: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!productList) throw 'Error: Could not get all products';
 if (productList === undefined || productList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return productList;

};

//---------------------------------------------------------- create

export const createProducts = async (
  productName,
  description,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!productName) throw 'Error: Input missing productName!';
  if (!description) throw 'Error: Input missing description!';


 if (typeof productName !== 'string' || typeof description !== 'string') throw 'Error: Given input must be a string!';
 if (productName.trim().length === 0 || description.trim().length === 0) throw 'Error: Cannot be empty string!';


//  if (!link.startsWith('http://www.' || 'https://www.') || !link.endsWith('.com' || '.co' || '.co/')) throw "Error: link has invalid beginning or end!";
//  const lengthBetween = link.length - 'http://www.'.length - '.com'.length;
//  if (lengthBetween < 5) throw "Error: Must be at least 5 characters between http://www. and .com"


//end error checks ooooooooooooooooooooooo


//trim the strings
productName = productName.trim();
description = description.trim();



let newProduct = {
  productName: productName,
  description: description,

//For create: When a product is created, in your DB function, you will initialize the reviews array to be an empty array. You will also initialize averageRating to be 0 when a product is created.
reviews: [],
averageRating: 0
};

const productsCollection = await products();
const insertInfo = await productsCollection.insertOne(newProduct);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add product';

const newId = insertInfo.insertedId.toString();

const prod = await getProducts(newId);
return prod;

};

//---------------------------------------------------- remove

export const removeProducts = async (productId) => {

//Error checks ooooooooooooooooooooooo

  if (!productId) throw 'Error: You must provide an ID to search for';
    if (typeof productId !== 'string') throw 'Error: ID must be a string';
    if (productId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    productId = productId.trim();
    if (!ObjectId.isValid(productId)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const productsCollection = await products();
    const deletionInfo = await productsCollection.findOneAndDelete({
      _id: new ObjectId(productId)
    });


    if (!deletionInfo) {
      throw `Error: Could not delete product with id of ${productId}`;
    }
    return `${deletionInfo.productName} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const updateProducts = async (
  productId,
  productName,
  description,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!productId) throw 'Error: You must provide an id to search for';
  if (typeof productId !== 'string') throw 'Error: ID must be a string';
  if (productId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
  productId = productId.trim();
  if (!ObjectId.isValid(productId)) throw 'Error: Invalid object ID';

  if (!productName) throw 'Error: Input missing productName!';
  if (!description) throw 'Error: Input missing description!';

  if (typeof productName !== 'string' || typeof description !== 'string') throw 'Error: Given input must be a string!';
 if (productName.trim().length === 0 || description.trim().length === 0) throw 'Error: Cannot be empty string!';

//end error checks ooooooooooooooooooooooo


//trim the strings
productId = productId.trim();
productName = productName.trim();
description = description.trim();



const updatedProducts = {
  productName: productName,
  description: description,
};

const productsCollection = await products();


    const updatedInfo = await productsCollection.findOneAndUpdate(
      {_id: new ObjectId(productId)},
      {$set: updatedProducts },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update product successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (productId, newAvg) => {
  const productsCollection = await products();
  await productsCollection.updateOne(
    { _id: new ObjectId(productId)},
    { $set: {averageRating: newAvg}}
  );
};