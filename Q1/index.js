const express = require ('express');
const app = express();
const port = 8000;
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const productRouter = require('./routes/products');

app.use('/',productRouter);


app.listen(port,()=>{
    console.log(`Server listening to port ${port}`);
});