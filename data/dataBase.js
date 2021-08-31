const fs = require ("fs");
const path = require ("path");


module.exports = {
    productos: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")),
    categoria: JSON.parse(fs.readFileSync(path.join(__dirname, "/category.json"), "utf-8")),
    
    writeProductsJSON: (dataBase) => {
        fs.writeFileSync(path.join(__dirname, "/products.json"), JSON.stringify(dataBase), "utf-8")
    },

}