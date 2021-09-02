
let {productos, categoria, formas, marcas, materials, writeJson} = require ('../data/dataBase');
const { report } = require('../routes/home');
module.exports = {
    add: (req, res)=>{
         res.render("add",{
            categoria
         })
    },
  edit: (req, res) => {
        let product = productos.find(product => {
            return product.id === +req.params.id})
        res.render('edicion', {
            categoria, 
            product
        })
    },
edicion: (req, res) => {
        productos.forEach( product => {
            if(product.id === +req.params.id){
                product.id = product.id,
                product.name = req.body.name ? req.body.name : product.name,
                product.price =  req.body.price ? req.body.price : product.price,
                product.discount =  req.body.discount ? req.body.discount : product.discount,
                product.category = req.body.category ? req.body.category : product.category,
                product.subCatForma =  req.body.subCatForma ? req.body.subCatForma : product.subCatForma,
                product.subCatMarca =  req.body.subCatMarca ? req.body.subCatMarca : product.subCatMarca,
                product.subCatmaterial =  req.body.subCatmaterial ? req.body.subCatmaterial : product.subCatmaterial,
                product.heigth =  req.body.heigth ? req.body.heigth : product.heigth,
                product.width =  req.body.width ? req.body.width : product.width
            }
        })

        writeJson(productos)

        res.redirect('/admin/listado')
    },



   
    lista: (req, res)=>{
        let prod = productos;
        
        
        res.render("listado",{
            categoria,
            prod
        })
    },
    borrarProducto:(req, res)=> {
        /* res.send(req.params.id) */
        productos.forEach(producto => {
            if(producto.id === +req.params.id){
            let productoAEliminar = productos.indexOf(producto);
            productos.splice(productoAEliminar, 1)
        }
        })
        writeJson(productos)

        res.redirect('/admin/listado/')
    }
}