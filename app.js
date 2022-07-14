const express = require('express');
const app = express();
const ejs = require('ejs');
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use(express.urlencoded({
    'extended': 'true'
}));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(path.join(__dirname, 'public')));

require('./configs/db_connection');

app.listen(3000, (err) => {
    if (!err) console.log('Sunucu çalıştırıldı');
});
const routes = require('./routes/routes');


//require('./configs/token_black_list')
app.use('/', routes);


// database işlemleri: taratılan kartları kaydetme, kazanılan puanları kaydetme, çözülen testleri kydetme