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
