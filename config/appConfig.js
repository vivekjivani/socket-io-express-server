require('dotenv').config();

module.exports = {
	app: {
		port: process.env.APP_PORT || 3000,
		appName: process.env.APP_NAME || 'server',
		env: process.env.NODE_ENV || 'development',
	},
	db: {
		port: process.env.DB_PORT || 5432,
		database: process.env.DB_NAME || 'development',
		password: process.env.DB_PASS || 'root',
		username: process.env.DB_USER || 'root',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		logging: true,
	},
	winston: {
		logPath: 'logs/',
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'jkfkbjksd823ur92377857hwdu87yu',
		tokenExpiresIn: '30m',
	},
};
