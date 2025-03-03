import {dbConnection} from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

// Note: You will need to change the code below to have the collection required by the assignment!

//collection for businesses
export const businesses = getCollectionFn('businesses');

//collection for users
export const users = getCollectionFn('users');

//collection for environmental projects
export const projects = getCollectionFn('projects');

//collection for tips and guides
export const TipsGuides = getCollectionFn('TipsGuides');

//collection for forum
export const forum = getCollectionFn('forum');

//collection for products
export const products = getCollectionFn('products');

