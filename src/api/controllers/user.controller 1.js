const User = require("../models/user.model 1");
/*bcrypt vale para Encriptar las claves y usuarios de los clientes*/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");

const createUser = async (req, res, next) => {
	try {
		const user = new User();
		user.name = req.body.name;

		// Hash de la contraseña antes de guardarla en la base de datos
		const saltRounds = 10; // Número de rondas para generar el salt
		user.password = await bcrypt.hash(req.body.password, saltRounds);

		// Verificar si ya existe el usuario
		if (await User.findOne({ name: req.body.name })) {
			return res.status(409).json({
				status: 409,
				message: HTTPSTATUSCODE[409],
				data: null,
			});
		}

		// Guardar el usuario en la base de datos
		const userDb = await user.save();

		return res.status(201).json({
			status: 201,
			message: HTTPSTATUSCODE[201],
			data: null,
		});
	} catch (error) {
		next(error);
	}
};

const authenticate = async (req, res, next) => {
	try {
		const userInfo = await User.findOne({ name: req.body.name });
		if (bcrypt.compareSync(req.body.password, userInfo.password)) {
			userInfo.password = "not Show";
			const token = jwt.sign(
				{
					id: userInfo._id,
					name: userInfo.name,
				},
				req.app.get("secretKey"),
				{ expiresIn: "1d" }
			);

			return res.json({
				status: 200,
				message: HTTPSTATUSCODE[200],
				data: { user: userInfo, token: token },
			});
		} else {
			return res.json({
				status: 400,
				message: HTTPSTATUSCODE[400],
				data: null,
        
			});
		}
	} catch (error) {
		return next(error);
	}
};

const logout = (req, res, next) => {
	try {
		return res.json({
			status: 200,
			message: HTTPSTATUSCODE[200],
			token: null,
		});
	} catch (error) {
		return next(error);
	}
};

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: 200,
			message: HTTPSTATUSCODE[200],
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createUser,
	authenticate,
	logout,
	getUsers,
};
