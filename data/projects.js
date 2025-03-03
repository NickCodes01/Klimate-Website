// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {projects} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
//create, read (getAll, get), update, delete (remove)

//---------------------------------------------------- get

export const getProjects = async (projectId) => {

  let x = new ObjectId();

    //Error checks ooooooooooooooooooooooo

    if (!projectId) throw 'Error: You must provide an id to search for';
    if (typeof projectId !== 'string') throw 'Error: Id must be a string';
    if (projectId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    projectId = projectId.trim();
    if (!ObjectId.isValid(projectId)) throw 'Error: Invalid object ID';

    //end error checks ooooooooooooooooooooooo

  
    const projectsCollection = await projects();
    const p = await projectsCollection.findOne({_id: new ObjectId(projectId)});
    if (p === null || !p) throw 'Error: No project with that id';
    p._id = p._id.toString();
    return p;


};

//---------------------------------------------------- getAll


export const getAllProjects = async () => {


  const projectsCollection = await projects();
 const productList =  await projectsCollection.find({}, { projection: { _id: 1, projectName: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!productList) throw 'Error: Could not get all projects';
 if (productList === undefined || productList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return productList;

};

//---------------------------------------------------------- create

export const createProjects = async (
  projectName,
  eventLocation,
  eventDate,
  description,
  link,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!projectName) throw 'Error: Input missing projectName!';
  if (!eventLocation) throw 'Error: Input missing type!';
  if (!eventDate) throw 'Error: Input missing address!';
  if (!description) throw 'Error: Input missing description!';
  if (!link) throw 'Error: Input missing link!';

 if (typeof projectName !== 'string' || typeof eventLocation !== 'string' || typeof eventDate !== 'string' || typeof description !== 'string' || typeof link !== 'string') throw 'Error: Given input must be a string!';
 if (projectName.trim().length === 0 || eventLocation.trim().length === 0 || eventDate.trim().length === 0 || description.trim().length === 0 || link.trim().length === 0) throw 'Error: Cannot be empty string!';


//  if (!link.startsWith('http://www.' || 'https://www.') || !link.endsWith('.com' || '.co' || '.co/')) throw "Error: link has invalid beginning or end!";
//  const lengthBetween = link.length - 'http://www.'.length - '.com'.length;
//  if (lengthBetween < 5) throw "Error: Must be at least 5 characters between http://www. and .com"


//end error checks ooooooooooooooooooooooo


//trim the strings
projectName = projectName.trim();
eventLocation = eventLocation.trim();
eventDate = eventDate.trim();
description = description.trim();
link = link.trim();

let newProduct = {
    projectName: projectName,
    eventLocation: eventLocation,
    eventDate: eventDate,
    description: description,
    link: link,
};

const projectsCollection = await projects();
const insertInfo = await projectsCollection.insertOne(newProduct);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add project';

const newId = insertInfo.insertedId.toString();

const prod = await getProjects(newId);
return prod;

};

//---------------------------------------------------- remove

export const removeProjects = async (projectId) => {

//Error checks ooooooooooooooooooooooo

  if (!projectId) throw 'Error: You must provide an ID to search for';
    if (typeof projectId !== 'string') throw 'Error: ID must be a string';
    if (projectId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    projectId = projectId.trim();
    if (!ObjectId.isValid(projectId)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const projectsCollection = await projects();
    const deletionInfo = await projectsCollection.findOneAndDelete({
      _id: new ObjectId(projectId)
    });


    if (!deletionInfo) {
      throw `Error: Could not delete product with id of ${projectId}`;
    }
    return `${deletionInfo.projectName} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const updateProjects = async (
  projectId,
  projectName,
  eventLocation,
  eventDate,
  description,
  link,
) => {


 //Error checks ooooooooooooooooooooooo

 if (!projectName) throw 'Error: Input missing projectName!';
 if (!eventLocation) throw 'Error: Input missing type!';
 if (!eventDate) throw 'Error: Input missing address!';
 if (!description) throw 'Error: Input missing description!';
 if (!link) throw 'Error: Input missing link!';

if (typeof projectName !== 'string' || typeof eventLocation !== 'string' || typeof eventDate !== 'string' || typeof description !== 'string' || typeof link !== 'string') throw 'Error: Given input must be a string!';
if (projectName.trim().length === 0 || eventLocation.trim().length === 0 || eventDate.trim().length === 0 || description.trim().length === 0 || link.trim().length === 0) throw 'Error: Cannot be empty string!';


//  if (!link.startsWith('http://www.' || 'https://www.') || !link.endsWith('.com' || '.co' || '.co/')) throw "Error: link has invalid beginning or end!";
//  const lengthBetween = link.length - 'http://www.'.length - '.com'.length;
//  if (lengthBetween < 5) throw "Error: Must be at least 5 characters between http://www. and .com"


//end error checks ooooooooooooooooooooooo


//trim the strings
projectId = projectId.trim();
projectName = projectName.trim();
eventLocation = eventLocation.trim();
eventDate = eventDate.trim();
description = description.trim();
link = link.trim();



const updatedprojects = {
    projectName: projectName,
    eventLocation: eventLocation,
    eventDate: eventDate,
    description: description,
    link: link,
};

const projectsCollection = await projects();


    const updatedInfo = await projectsCollection.findOneAndUpdate(
      {_id: new ObjectId(projectId)},
      {$set: updatedprojects },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update project successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (projectId, newAvg) => {
  const projectsCollection = await projects();
  await projectsCollection.updateOne(
    { _id: new ObjectId(projectId)},
    { $set: {averageRating: newAvg}}
  );
};