import db from "../models/index.js";

const User = db.User;
const Role = db.Role;

import bcrypt from "bcryptjs"; // ใช้เข้ารหัสของ password
import jwt from "jsonwebtoken";
import { Op } from "sequelize"; // import operator เช่น AND OR


const authController = {};
authController.Register = async (req, res) => {
    // user ส่ง ข้อมูลผ่าน body
    const { username, fullName, email, password } = req.body;


    // validate ข้อมูล ที่ user ส่งมา
    if (!username || !fullName || !email || !password){
        res.status(400).send({ message: "Please provide all require fields." });
        return;
    }


    // เช็ค username ซ้ำว่ากันไหม
    // SQL = SELECT * FROM user WHERE username = username;
    //await User.findOne({ where: {username: username} }).select(-password) // .select(-password) คือ ไม่ดึง field password มาแสดง
    await User.findOne({ where: { username: username }, attributes: { exclude: ['password'] } }) //.select('.password') คือ ไม่ดึง field password มาแสดง
    .then((user) => {
        // ถ้ามี username อยู่แล้วจะไม่ให้ทำ process ต่อไป
        if(user){
            res.status(400).send({ message: "Username is already existed." });
            return;
        }


        const newUser = {
            username: username,
            fullName: fullName,
            email: email,
            password: password,
        };


        User.create(newUser).then((user) => {
            // เช็คว่า user ส่ง role มาด้วยไหม
            // send roles in body [ADMIN] *แอดมินเป็นคนส่งมา
            if(req.body.roles){
                // นำ roles ที่ส่งมา เทียบกับ role ที่อยู่ใน table
                // SQL = SELECT * FROM ROLE WHERE roleName = role1 OR roleName = role2 OR roleName = role3
                Role.findAll({
                    where: {
                        name: { [Op.or]: req.body.roles } // เช็ค roles ที่ส่งมา
                    }
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully" });
                    })
                })
            }else {
                // ใส่ค่า default role เป็น user
                // user สมัคร
                user.setRoles([1]).then(() => {
                        res.send({ message: "User registered successfully" });
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Something error while registering a new user"
            });
        });
    });
}
export default authController;
