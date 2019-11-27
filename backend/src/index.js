const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./config/mongoose');

app.use((req, res, next) => {
	req.io = io;
	next();
})
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(require('./routes'));

http.listen(3000, () => {
	console.info('Backend rodando na porta 3000');
});