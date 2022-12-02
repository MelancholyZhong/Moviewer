const mongoUtil = require("../mongoUtil");
const { ObjectId } = require("mongodb");

const queryMovieByName = async (movie) => {
  const database = mongoUtil.getDB();
  const query = { Name: movie };
  let foundMovie;
  try {
    foundMovie = await database.collection("movies").findOne(query);
  } catch (err) {
    res.status(500).send({ msg: err });
  }

  return foundMovie;
};

//Yian: One slight improvement for user experience with the search bar is perhaps use regular expression query instead of findOne() because with findOne()
//user has to type the exact same letterings of the title word for word, but maybe users would like to search for keyword
//e.g. (just an example, not sure what properties you have in the movies collection)
const queryMovieByKeyWord = async(keyword)=>{
  const database = mongoUtil.getDB();
  let foundMovie;
 try{
   foundMovie = await database.collection("movies").find({$or:[{movie_title: {$regex:keyword,$options:"i"},{director:{$regex:keyword,$options:"i"}}])
                                                          
                                                       
const queryMovieById = async (id) => {
  const database = mongoUtil.getDB();
  const query = { _id: ObjectId(id) };
  let foundMovie;
  try {
    foundMovie = await database.collection("movies").findOne(query);
  } catch (err) {
    res.status(500).send({ msg: err });
  }

  return foundMovie;
};


const queryTops = async () => {
  const database = mongoUtil.getDB();
  try {
    const movies = await database.collection("movies");
    const tops = await movies
      .find()
      .sort({ RatingValue: -1 })
      .limit(10)
      .toArray();
    return tops;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { queryMovieByName, queryMovieById, queryTops };
