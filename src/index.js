const express = require('express');
const handlers = require('./express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../data/files`);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const filename = `image-${Date.now()}.${ext}`;
        req.body.image = filename;
        req.body.images = [];
        cb(null, filename);
    },
});

const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
    }

    cb(null, true);
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1024 * 1024 * 5, files: 1 },
});
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();
const server = require('http').createServer(app);
const { WebSocketServer } = require('ws');

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.set('trust proxy', true);
app.get(`/data/files/:filename`, (req, res) => {
    const filePath = req.params.filename;
    console.log(filePath)
        res.sendFile(path.resolve(`${__dirname}/../../data/files/${filePath}`));
});

app.get('/api/user/:id', handlers.users.getUser);
app.post('/api/user', handlers.users.addUser);
app.delete('/api/user/:id', handlers.users.deleteUser);
app.get('/api/message/:id', handlers.messages.getMessage);
app.post('/api/message', upload.single('attachment'), handlers.messages.sendMessage);
app.delete('/api/message/:id', handlers.messages.deleteMessage);
app.get('/api/messages/:user_id', handlers.messages.getUserMessages);
app.get('/api/stat/messages', handlers.messages.getMessageHistory);

server.listen(PORT, () => {
    console.log(`***********SERVER HAS BEEN STARTED ON PORT ${PORT}***********`);
});
