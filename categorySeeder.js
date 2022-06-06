const mongoose = require("mongoose");
const Category = require("../models/category");
const {categories} = require("./seedData");

const connectionString = "mongodb://127.0.0.1/nyc-thamel"

mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Database connected for seeding");
}).catch(()=>{
    console.log("failed seeding db");
});

categories.map(async(category, index)=>{
    const dbCategory = await Category.findOne({name: category.name});
    if(dbCategory){
        console.log(`${category.name} already exists`);
        if(index === categories.length-1){
            mongoose.disconnect();
        }
    }else{
        const newCategory = new Category({
            name: category.name,
        });
        await newCategory.save((error, result)=>{
            if(error){
                console.log(error);
                console.log(`${category.name} failed to save`);
            }else{
                console.log(`${category.name} saved`);
                if(index === categories.length-1){
                    mongoose.disconnect();
                }
            }
        });
    }
});