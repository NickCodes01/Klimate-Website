// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {businesses} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
//create, read (getAll, get), update, delete (remove)

//---------------------------------------------------- get

export const get = async (businessId) => {

  let x = new ObjectId();

    //Error checks ooooooooooooooooooooooo

    if (!businessId) throw 'Error: You must provide an id to search for';
    if (typeof businessId !== 'string') throw 'Error: Id must be a string';
    if (businessId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    businessId = businessId.trim();
    if (!ObjectId.isValid(businessId)) throw 'Error: Invalid object ID';

    //end error checks ooooooooooooooooooooooo

  
    const businessCollection = await businesses();
    const p = await businessCollection.findOne({_id: new ObjectId(businessId)});
    if (p === null || !p) throw 'Error: No business with that id';
    p._id = p._id.toString();
    return p;


};

//---------------------------------------------------- getAll


export const getAll = async () => {


  const businessCollection = await businesses();
 const businessList =  await businessCollection.find({}, { projection: { _id: 1, businessName: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!businessList) throw 'Error: Could not get all business';
 if (businessList === undefined || businessList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return businessList;

};

//---------------------------------------------------------- create

export const create = async (
  businessName,
  type,
  address,
  description,
  link,
  phoneNumber,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!businessName) throw 'Error: Input missing businessName!';
  if (!type) throw 'Error: Input missing type!';
  if (!address) throw 'Error: Input missing address!';
  if (!description) throw 'Error: Input missing description!';
  if (!link) throw 'Error: Input missing link!';
  if (!phoneNumber) throw 'Error: Input missing phoneNumber!';

 if (typeof businessName !== 'string' || typeof type !== 'string' || typeof address !== 'string' || typeof description !== 'string' || typeof link !== 'string' || typeof phoneNumber !== 'string') throw 'Error: Given input must be a string!';
 if (businessName.trim().length === 0 || type.trim().length === 0 || address.trim().length === 0 || description.trim().length === 0 || link.trim().length === 0 || phoneNumber.trim().length === 0) throw 'Error: Cannot be empty string!';


//  if (!link.startsWith('http://www.' || 'https://www.') || !link.endsWith('.com' || '.co' || '.co/')) throw "Error: link has invalid beginning or end!";
//  const lengthBetween = link.length - 'http://www.'.length - '.com'.length;
//  if (lengthBetween < 5) throw "Error: Must be at least 5 characters between http://www. and .com"


//end error checks ooooooooooooooooooooooo


//trim the strings
businessName = businessName.trim();
type = type.trim();
address = address.trim();
description = description.trim();
link = link.trim();
phoneNumber = phoneNumber.trim();


let newBusiness = {
  businessName: businessName,
  type: type,
  address: address,
  description: description,
  link: link,
  phoneNumber: phoneNumber,
//For create: When a product is created, in your DB function, you will initialize the reviews array to be an empty array. You will also initialize averageRating to be 0 when a business is created.
reviews: [],
averageRating: 0
};

const businessCollection = await businesses();
const insertInfo = await businessCollection.insertOne(newBusiness);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add business';

const newId = insertInfo.insertedId.toString();

const prod = await get(newId);
return prod;

};

//---------------------------------------------------- remove

export const remove = async (businessName) => {

//Error checks ooooooooooooooooooooooo

  if (!businessName) throw 'Error: You must provide an ID to search for';
    if (typeof businessName !== 'string') throw 'Error: ID must be a string';
    if (businessName.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    businessName = businessName.trim();
    if (!ObjectId.isValid(businessName)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const businessCollection = await businesses();
    // const deletionInfo = await businessCollection.findOneAndDelete({
    //   _id: new ObjectId(businessId)
    // });
    const deletionInfo = await businessCollection.deleteOne({
      businessName: businessName
    });


    if (!deletionInfo) {
      throw `Error: Could not delete business with id of ${businessName}`;
    }
    return `${deletionInfo.businessName} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const update = async (
  businessId,
  businessName,
  type,
  address,
  description,
  link,
  phoneNumber,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!businessId) throw 'Error: You must provide an id to search for';
  if (typeof businessId !== 'string') throw 'Error: ID must be a string';
  if (businessId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
  businessId = businessId.trim();
  if (!ObjectId.isValid(businessId)) throw 'Error: Invalid object ID';

  if (!businessName) throw 'Error: Input missing businessName!';
  if (!type) throw 'Error: Input missing type!';
  if (!address) throw 'Error: Input missing address!';
  if (!description) throw 'Error: Input missing description!';
  if (!link) throw 'Error: Input missing link!';
  if (!phoneNumber) throw 'Error: Input missing phoneNumber!';

  if (typeof businessName !== 'string' || typeof type !== 'string' || typeof address !== 'string' || typeof description !== 'string' || typeof link !== 'string' || typeof phoneNumber !== 'string') throw 'Error: Given input must be a string!';
 if (businessName.trim().length === 0 || type.trim().length === 0 || address.trim().length === 0 || description.trim().length === 0 || link.trim().length === 0 || phoneNumber.trim().length === 0) throw 'Error: Cannot be empty string!';

//end error checks ooooooooooooooooooooooo


//trim the strings
businessId = businessId.trim();
businessName = businessName.trim();
type = type.trim();
address = address.trim();
description = description.trim();
link = link.trim();
phoneNumber = phoneNumber.trim();



const updatedBusiness = {
  businessName: businessName,
  type: type,
  address: address,
  description: description,
  link: link,
  phoneNumber: phoneNumber
};

const businessCollection = await businesses();


    const updatedInfo = await businessCollection.findOneAndUpdate(
      {_id: new ObjectId(businessId)},
      {$set: updatedBusiness },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update business successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (businessId, newAvg) => {
  const businessCollection = await businesses();
  await businessCollection.updateOne(
    { _id: new ObjectId(businessId)},
    { $set: {averageRating: newAvg}}
  );
};