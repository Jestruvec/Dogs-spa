const dogsRouter = require("express").Router();
const temperamentRouter = require("express").Router();
const {
  postDog,
  getAllDogs,
  deleteDog,
  getDogById,
  getAllTemperaments,
  getDogByQuery,
} = require("../controllers");

//GET

dogsRouter.get("/", async (req, res) => {
  try {
    const allDogs = await getAllDogs();
    res.status(200).json(allDogs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//GET /name?="..."

dogsRouter.get("/name", async (req, res) => {
  try {
    const name = req.query.name;
    const dogs = await getDogByQuery(name);
    if (dogs) {
      res.status(200).json(dogs);
    } else {
      throw Error("No se encontraron perros con ese nombre");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//GET /:ID

dogsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await getDogById(id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//POST

dogsRouter.post("/", async (req, res) => {
  const { image, name, height, weight, lifespan, temperaments } = req.body;

  try {
    if (!image || !name || !height || !weight || !lifespan)
      throw Error("Falta informacion");
    else {
      const newDog = await postDog(
        image,
        name,
        height,
        weight,
        lifespan,
        temperaments
      );
      return res.status(200).json(newDog);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});

//PUT

// dogsRouter.put("/:id", async (req, res) => {
//   const { image, name, height, weight, lifespan } = req.body;
//   const { id } = req.params;
//   try {
//     if (!image || !name || !height || !weight || !lifespan)
//       throw Error("Falta informacion");
//     else {
//       const dog = await putDog(id, image, name, height, weight, lifespan);
//       res.status(200).json(dog);
//     }
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

//DELETE

dogsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDog = await deleteDog(id);
    res.status(200).json(deletedDog);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//GET TEMPERAMENTS

temperamentRouter.get("/", async (req, res) => {
  try {
    const allTemperaments = await getAllTemperaments();
    res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = { dogsRouter, temperamentRouter };
