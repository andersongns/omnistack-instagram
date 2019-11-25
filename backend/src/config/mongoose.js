const mongoose = require('mongoose');

mongoose.connect('mongodb://instagram:1nstagram@ds249008.mlab.com:49008/omnistack-instagram', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.info('Conectado com o mlab');
})