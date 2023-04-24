const { Dog, Temperament } = require("../db");
const axios = require("axios");

//GET

const getAllDogs = async () => {
  const dbDogs = await Dog.findAll({ include: [Temperament] });
  const mappedDbDogs = dbDogs.map((dog) => ({
    ...dog.toJSON(),
    temperament: dog.temperaments.map((t) => t.name).join(", "),
  }));
  const apiDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
  const allDogs = [...mappedDbDogs, ...apiDogs.data];
  return allDogs;
};

//GET/name?="query"

const getDogByQuery = async (name) => {
  const allDogs = await getAllDogs();
  const findDog = allDogs.find((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );
  return findDog;
};

//GET /:ID

const getDogById = async (id) => {
  const allDogs = await getAllDogs();
  const filteredDogs = allDogs.find((dog) => dog.id == id);
  if (filteredDogs) return filteredDogs;
  else {
    throw Error("No se encontro el perro");
  }
};

//POST

const postDog = async (image, name, height, weight, lifespan, temperaments) => {
  const newDog = await Dog.create({
    image,
    name,
    height,
    weight,
    lifespan,
  });

  await newDog.addTemperaments(temperaments);

  return newDog;
};

//DELETE

const deleteDog = async (id) => {
  const findDog = await Dog.findByPk(id);
  if (!findDog) return { Error: "Perro no encontrado" };
  else {
    findDog.destroy();
    return `El perro ${findDog.name} con el id ${id} ha sido eliminado correctamente`;
  }
};

//GET TEMPERAMENTS

const getAllTemperaments = async () => {
  const response = await axios.get("https://api.thedogapi.com/v1/breeds", {
    headers: {
      "x-api-key":
        "live_xeBrzGAdFWtrNPcUtd3ZVJ6rx3n4K4dsHukNcXOyU9w9FybzUvOMII8A57m3aNO7",
    },
  });
  const data = response.data;
  const temperaments = data.map((dog) => dog.temperament && dog.temperament);
  const flattenedTemperaments = temperaments.join(",").split(",");
  const uniqueTemperaments = [...new Set(flattenedTemperaments)];
  const uniqueTemperamentstrim = uniqueTemperaments.map((temp) => temp.trim());
  for (const temperament of uniqueTemperamentstrim) {
    await Temperament.findOrCreate({ where: { name: temperament } });
  }
  const allTemperaments = await Temperament.findAll();
  return allTemperaments;
};

module.exports = {
  postDog,
  getAllDogs,
  deleteDog,
  getDogById,
  getAllTemperaments,
  getDogByQuery,
};
