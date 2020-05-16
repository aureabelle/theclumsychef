const router = require("express").Router();

const Recipe = require("../model/Recipe");

router.get("/recipes", async (req, res) => {
  try {
    let r = Recipe.find();
    r.sort({ createdAt: -1 });

    let recipes = await r.exec();
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
