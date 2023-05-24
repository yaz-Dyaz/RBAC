const { User, Role } = require('../db/models');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const exist = await User.findOne({ where: { email } });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!',
                    data: null
                });
            }

            const hashPassword = await bcryp.hash(password, 10);
            const userData = {
                name, email, password: hashPassword
            };
            const userRole = await Role.findOne({ where: { name: 'User' } });
            if (userRole) {
                userData.role_id = userRole.id;
            }
            const user = await User.create(userData);
            return res.status(201).json({
                status: true,
                message: 'user created!',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role_id: user.role_id
                }
            });
        } catch (error) {
            throw error;
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'credential is not valid!',
                    data: null
                });
            }

            const passwordCorrect = await bcryp.compare(password, user.password);
            if (!passwordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'credential is not valid!',
                    data: null
                });
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id
            };

            const token = await jwt.sign(payload, JWT_SECRET_KEY);
            return res.status(200).json({
                status: true,
                message: 'login success!',
                data: {
                    token: token
                }
            });

        } catch (error) {
            throw error;
        }
    },

    whoami: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                message: 'fetch user success!',
                data: req.user
            });
        } catch (error) {
            throw error;
        }
    }
};