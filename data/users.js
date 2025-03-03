// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {users} from '../config/mongoCollections.js';

//import mongo collections, bcrypt and implement the following data functions
//import {users} from '../config/mongoCollections.js';
//import { getCollectionFn } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';



//You will have one data module in your data folder named: users.js that will only export two functions:

const usersCollection = await users();


export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {

//0000000000000000000000
//Error checks
const valid = /^[a-zA-Z]/;

if (!firstName || !lastName || !emailAddress || !password || !role) throw 'Error: Missing fields!';
if (typeof firstName !== 'string' || !valid || firstName.length < 2 || firstName.length > 25) throw 'Error: incorrect input for firstName';
if (typeof lastName !== 'string' || !valid || lastName.length < 2 || lastName.length > 25) throw 'Error: incorrect input for lastName';
//for emailAddress, non-whitespace/ contains @/ contains ./ more non-whitespace 
if (!/^\S+@\S+\.\S+$/.test(emailAddress)) throw 'Error: invalid email address!';
//for password (uppercase(A-Z), lowercase(a-z), num(d) and non-word char(W))
if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/.test(password)) throw 'Error: Password incorrect format! Must be 8 char long, one upper, one lower, one num and one char';
//make sure user email is not already in use
const already = await usersCollection.findOne({ emailAddress: emailAddress.toLowerCase() });
if (already) throw 'Error: A user with that email already exists!';
//role is either admin or user, that's it
if (role.toLowerCase() !== 'admin' && role.toLowerCase() !== 'user') throw 'Error: Only valid values for role are admin and user';

//0000000000000000000000

const hashPass = await bcrypt.hash(password, 10);

//insert user into our database
await usersCollection.insertOne ({
  firstName,
  lastName,
  emailAddress: emailAddress.toLowerCase(),
  password: hashPass,
  role: role.toLowerCase()
});

return { insertedUser: true };

};

//-------------------------------------------------------------------------------

export const loginUser = async (emailAddress, password) => {

//0000000000000000000000
//Error checks

if (!emailAddress || !password) throw 'Error: Missing fields!';
//for emailAddress
if (!/^\S+@\S+\.\S+$/.test(emailAddress)) throw 'Error: Invalid email address!';
//for password
if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)/.test(password)) throw 'Error: Invalid password!';

//0000000000000000000000
console.log("Attempting to login with email", emailAddress);
const user = await usersCollection.findOne({ emailAddress: emailAddress.toLowerCase() } );
console.log("User found:", user);
if (!user) throw 'Error: Email of password invalid!';

const passMatching = await bcrypt.compare(password, user.password);
if (!passMatching) throw 'Error: Either the email address or password is invalid';


return {
  firstName: user.firstName,
  lastName: user.lastName,
  emailAddress: user.emailAddress,
  role: user.role
};

};

