const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ News, Comment }) {
			// define association here
			User.hasMany(News, { foreignKey: { name: 'userId' } });
			User.hasMany(Comment, { foreignKey: { name: 'userId' } });
		}

		static toJSON = function () {
			const values = {
				...this.get(),
			};
			delete values.password;
			return values;
		};
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
				allowNull: false,
				validate: {
					isUUID: { args: [4], msg: 'UUID must be of Version 4' },
					notEmpty: { msg: 'User`s id can not be empty' },
					notNull: { msg: 'User must have ID' },
				},
			},
			firstName: {
				type: DataTypes.STRING(20),
				allowNull: false,
				validate: {
					notEmpty: { msg: 'User`s firstName can not be empty' },
					notNull: { msg: 'User must have a name' },
					len: {
						args: [3, 20],
						msg: 'User`s firstName length must in between 3 characters to 20 characters',
					},
				},
			},
			lastName: { type: DataTypes.STRING(30), allowNull: true },
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: { msg: 'User`s email must be a valid email' },
					notEmpty: { msg: 'User`s email can not be empty' },
					notNull: { msg: 'User must have a email' },
					len: [1, 255],
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'User`s password can not be empty' },
					notNull: { msg: 'User must have a password' },
					min: {
						args: [6],
						msg: 'User`s password must have minimum 6 characters',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
			timestamps: true,
		},
	);

	const securePassword = function (user) {
		const hash = bcrypt.hashSync(user.get('password'), 10);
		user.set('password', hash);
	};

	User.beforeCreate((user) => {
		user.email = user.email.toLowerCase();
		if (user.password) securePassword(user);
	});

	User.beforeUpdate((user) => {
		user.email = user.email.toLowerCase();
		if (user.password) securePassword(user);
	});

	return User;
};
