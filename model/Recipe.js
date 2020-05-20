const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const instructionSchema = new mongoose.Schema({
  step: {
    type: String,
    required: false,
  },
});

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: false,
  },
});

const tagSchema = new mongoose.Schema({
  type: String,
});

const recipeSchema = new mongoose.Schema({
  photos: {
    cover: {
      type: String,
      required: true,
    },
    additionalPhotos: [photoSchema],
  },
  video: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  altName: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
  },
  tags: [tagSchema],
  ingredients: [ingredientSchema],
  procedure: [instructionSchema],
});

// module.exports = mongoose.model("Recipe", recipeSchema);

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
