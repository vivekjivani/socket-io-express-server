const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class News extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Comment }) {
			// define association here
			News.belongsTo(User, {
				foreignKey: { name: 'userId' },
			});
			News.hasMany(Comment, {
				foreignKey: { name: 'newsId' },
			});
		}
	}
	News.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
				allowNull: false,
				validate: {
					isUUID: { args: [4], msg: 'UUID must be of Version 4' },
					notEmpty: { msg: 'News`s ID can not be empty' },
					notNull: { msg: 'News must have ID' },
				},
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'News title can not be empty' },
					notNull: { msg: 'News must have title' },
					len: {
						args: [3, 255],
						msg: 'News title must be between 3 and 255 characters',
					},
				},
			},
			subTitle: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'News subTitle can not be Empty' },
					notNull: { msg: 'News subTitle can be Empty' },
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'News description can not be Empty' },
					notNull: { msg: 'News description can be Empty' },
				},
			},
		},
		{
			sequelize,
			modelName: 'News',
			tableName: 'news',
			timestamps: true,
		},
	);
	return News;
};
