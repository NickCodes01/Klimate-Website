// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {forum} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
//create, read (getAll, get), update, delete (remove)

//---------------------------------------------------- get

export const getForum = async (forumId) => {

  let x = new ObjectId();

    //Error checks ooooooooooooooooooooooo

    if (!forumId) throw 'Error: You must provide an id to search for';
    if (typeof forumId !== 'string') throw 'Error: Id must be a string';
    if (forumId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    forumId = forumId.trim();
    if (!ObjectId.isValid(forumId)) throw 'Error: Invalid object ID';

    //end error checks ooooooooooooooooooooooo

  
    const businessCollection = await forum();
    const p = await businessCollection.findOne({_id: new ObjectId(forumId)});
    if (p === null || !p) throw 'Error: No product with that id';
    p._id = p._id.toString();
    return p;


};

//---------------------------------------------------- getAll


export const getAllForum = async () => {


  const forumCollection = await forum();
 const forumList =  await forumCollection.find({}, { projection: { _id: 1, userId: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!forumList) throw 'Error: Could not get all forums';
 if (forumList === undefined || forumList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return forumList;

};

//---------------------------------------------------------- create

export const createForum = async (
  userId,
  text
) => {


  //Error checks ooooooooooooooooooooooo

  if (!userId) throw 'Error: Input missing type!';
  if (!text) throw 'Error: Input missing address!';

 if (typeof userId !== 'string' || typeof text !== 'string') throw 'Error: Given input must be a string!';
 if (userId.trim().length === 0 || text.trim().length === 0) throw 'Error: Cannot be empty string!';


//  if (!link.startsWith('http://www.' || 'https://www.') || !link.endsWith('.com' || '.co' || '.co/')) throw "Error: link has invalid beginning or end!";
//  const lengthBetween = link.length - 'http://www.'.length - '.com'.length;
//  if (lengthBetween < 5) throw "Error: Must be at least 5 characters between http://www. and .com"


//end error checks ooooooooooooooooooooooo


//trim the strings
userId = userId.trim();
text = text.trim();

let newForum = {
    userId: userId,
    text: text,
};

const forumCollection = await forum();
const insertInfo = await forumCollection.insertOne(newForum);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add forum';

const newId = insertInfo.insertedId.toString();

const prod = await getForum(newId);
return prod;

};

//---------------------------------------------------- remove

export const removeForum = async (forumId) => {

//Error checks ooooooooooooooooooooooo

  if (!forumId) throw 'Error: You must provide an ID to search for';
    if (typeof forumId !== 'string') throw 'Error: ID must be a string';
    if (forumId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    forumId = forumId.trim();
    if (!ObjectId.isValid(forumId)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const forumCollection = await forum();
    const deletionInfo = await forumCollection.findOneAndDelete({
      _id: new ObjectId(forumId)
    });


    if (!deletionInfo) {
      throw `Error: Could not delete forum with id of ${forumId}`;
    }
    return `${deletionInfo.userId} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const updateForum = async (
  forumId,
  userId,
  text
) => {


  //Error checks ooooooooooooooooooooooo

  if (!forumId) throw 'Error: You must provide an id to search for';
  if (typeof forumId !== 'string') throw 'Error: ID must be a string';
  if (forumId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
  forumId = forumId.trim();
  if (!ObjectId.isValid(forumId)) throw 'Error: Invalid object ID';

  if (!userId) throw 'Error: Input missing userId!';
  if (!text) throw 'Error: Input missing text!';

 if (typeof userId !== 'string' || typeof text !== 'string') throw 'Error: Given input must be a string!';
 if (userId.trim().length === 0 || text.trim().length === 0) throw 'Error: Cannot be empty string!';

//end error checks ooooooooooooooooooooooo


//trim the strings
forumId = forumId.trim();
userId = userId.trim();
text = text.trim();



const updatedForum = {
    userId: userId,
    text: text,
};

const forumCollection = await forum();


    const updatedInfo = await forumCollection.findOneAndUpdate(
      {_id: new ObjectId(forumId)},
      {$set: updatedForum },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update forum successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (forumId, newAvg) => {
  const forumCollection = await forum();
  await forumCollection.updateOne(
    { _id: new ObjectId(forumId)},
    { $set: {averageRating: newAvg}}
  );
};