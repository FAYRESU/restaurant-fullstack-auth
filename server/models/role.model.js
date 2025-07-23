import { DataTypes } from "sequelize";
import sequelize from "./db.js";


const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


Role.sync({ force: false })
  .then(() => {
    // Role.create({ id: 1, roleName: "user"});
    // Role.create({ id: 2, roleName: "moderator"});
    // Role.create({ id: 3, roleName: "admin"});

    console.log("create role table success")
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });


export default Role;
