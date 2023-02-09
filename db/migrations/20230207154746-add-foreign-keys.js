/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addConstraint('comments', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'comments_user_id_fkey',
			references: {
				table: 'users',
				field: 'id',
			},
		});

		await queryInterface.addConstraint('comments', {
			fields: ['newsId'],
			type: 'foreign key',
			name: 'comments_news_id_fkey',
			references: {
				table: 'news',
				field: 'id',
			},
		});

		await queryInterface.addConstraint('news', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'news_user_id_fkey',
			references: {
				table: 'users',
				field: 'id',
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */

		await queryInterface.removeConstraint('comments', 'comments_user_id_fkey');
		await queryInterface.removeConstraint('comments', 'comments_news_id_fkey');
		await queryInterface.removeConstraint('news', 'news_user_id_fkey');
	},
};
