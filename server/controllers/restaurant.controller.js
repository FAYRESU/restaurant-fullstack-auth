import Restaurant from "../models/restuarant.model.js";
const restaurantController = {};
//Creatw and save a new restaurant
restaurantController.create = async (req, res) => {
  const { title, type, imageUrl } = req.body;
  //validate data
  if (!title || !type || !imageUrl) {
    res.status(400).send({ message: "title , Type or imgUrl Can't be empty" });
    return;
  }
  await Restaurant.findOne({ where: { title } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists" });
      return;
    }
    const newRestaurant = {
      title,
      type,
      imageUrl,
    };

    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error wheile creating the restaurants",
        });
      });
  });
};

//Get  All Restaurant
restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error wheile creating the restaurants",
      });
    });
};

// GETBYID Restaurants
restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No Found restaurants with id" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error wheile getting the restaurants" + id,
      });
    });
};

//Update restaurant
restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const { title, type, imageUrl } = req.body;
  //validate data
  if (!title && !type && !imageUrl) {
    res.status(404).send({ message: "Name, Type and Image can not be empty!" });
    return;
  }
  await Restaurant.update(
    { title, type, imageUrl: imageUrl },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({ message: "update restaurants successfully!" });
      } else {
        res.send({
          message:
            "Cannot update restaurant with id" +
            id +
            ". Maybe restaurants was not found or req body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error wheile getting the restaurants" + id,
      });
    });
};

//Delete a restaurants
restaurantController.deleteById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "ID is missing " });
    return;
  }
  await Restaurant.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Restaurant was delete successful!" });
      } else {
        res.status(404).send({
          message: "Cannot delete restaurant with id" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error wheile delete the restaurants" + id,
      });
    });
};
export default restaurantController;
