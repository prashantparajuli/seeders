const mongoose = require("mongoose");
const Product = require("../models/product");

const {products} = require("./seedData");

const connectionString = "mongodb://127.0.0.1/nyc-thamel"

mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Database connected for seeding");
}).catch(()=>{
    console.log("failed seeding db");
});

products.map(async(product, index) => {
    const dbProduct = await Product.findOne({name: product.name});
    if(dbProduct){
        console.log(`${product.name} already exists`);
        if(index === products.length-1){
            mongoose.disconnect();
        }
    }else{
        const newProduct = new Product({
            name: product.name,
            description: product.description,
            categories: [product.category],
            price: product.price,
        })
        newProduct.save((err, result)=>{
            if(err){
                console.log(err);
                console.log(`${product.name} failed to save`);
            }else{
                console.log(`${product.name} saved`);
                if(index === products.length-1){
                    mongoose.disconnect();
                }
            }
        })
    }
})