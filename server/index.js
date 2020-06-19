const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
//console.log('path', path.join(__dirname, 'public'))
app.use('/static', express.static(path.join(__dirname, 'static')));

const storage = require('./routes/api/storage');
app.use('/api/storage', storage);

const blogs = require('./routes/api/blogs');
app.use('/api/blogs', blogs);

const news = require('./routes/api/news');
app.use('/api/news', news);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
