const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, News }) {
			Comment.belongsTo(User, {
				foreignKey: { name: 'userId' },
			});
			Comment.belongsTo(News, {
				foreignKey: { name: 'newsId' },
			});
		}
	}
	Comment.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
				allowNull: false,
				validate: {
					isUUID: { args: [4], msg: 'UUID must be of Version 4' },
					notEmpty: { msg: 'Comment`s ID can not be empty' },
					notNull: { msg: 'Comment must have ID' },
				},
			},
			message: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'Comment`s message can not be empty' },
					notNull: { msg: 'Comment must have message' },
					len: {
						args: [500],
						msg: 'Comment`s message must be 500 characters or less',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Comment',
			tableName: 'comments',
			timestamps: true,
		},
	);
	return Comment;
};
