require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./db/models');
const Logger = require('./utils/logger');

const logger = new Logger();
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	},
});

const news = require('./services/newsHandler')(io);
const user = require('./services/userHandler')(io);
const comment = require('./services/commentHandler')(io);

function onConnection(socket) {
	logger.log(`Client Connected ${socket.id}`, 'info');
	socket.on('ping', (message) => {
		logger.log(`${message}`);
	});
	socket.on('user:register', user.register);
	socket.on('user:login', user.login);
	socket.on('news:list', news.listNews);
	socket.on('news:create', news.createNews);
	socket.on('news:view', news.readNews);
	socket.on('comment:add', comment.addComment);
	socket.on('comment:list', comment.getAllCommentsOfaNews);
}

io.on('connection', onConnection);
io.on('disconnect', () => {
	logger.log('Client Disconnected', 'info');
});

const port = process.env.APP_PORT || 4000;
httpServer.listen(port, async () => {
	logger.log('Listening on port', 'info', port);
	try {
		await sequelize.authenticate();
		logger.log('Connection has been established successfully.', 'info');
	} catch (error) {
		logger.log('Unable to connect to the database:', 'error', error);
	}
});
