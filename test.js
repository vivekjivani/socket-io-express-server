const { getNewsById } = require('./utils/newsRepository');

(async () => {
	const news = await getNewsById('eb112300-59cf-447f-8353-87e76eba2598');
	console.log(news);
})();
