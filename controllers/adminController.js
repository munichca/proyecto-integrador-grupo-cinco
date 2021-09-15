
let {productos, categoria, formas, marcas, materials, writeProductJson} = require ('../data/dataBase');
const { report } = require('../routes/home');
module.exports = {
    add: (req, res)=>{
        if(req.session.user.rol === "ROL_ADMIN"){
            res.render("add",{
                productos, categoria, formas, marcas, materials,
                session: req.session
             })
        }else{
            res.redirect('/')
        }
         
    },
    nuevoProducto: (req, res) => {
        let lastId = 1;
/* res.send(req.body) */
        productos.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        })
        let arrayImages = [];
            if(req.files){
                req.files.forEach(image => {
                    arrayImages.push(image.filename)
                })
            }
        let {
            name, 
            price, 
            discount, 
            category, 
            subCatForma, 
            subCatMarca,
            subCatmaterial,
            height,
            width
            } = req.body;
        let cate = categoria.find(cate => cate.name === category); 
        
        let productoNuevo = {
            id: lastId + 1,
            name,
            price: +price,
            discount: +discount,
            category: cate.id,
            subCatForma: +subCatForma,
            subCatMarca: +subCatMarca,
            subCatmaterial: +subCatmaterial,
            height: +height,
            width: +width,
            image: arrayImages.length > 0 ? arrayImages : []
        };

        productos.push(productoNuevo);

        writeProductJson(productos)

        res.redirect('/admin/listado')
    }, 
  edit: (req, res) => {
        let product = productos.find(product => {
            return product.id === +req.params.id})
        res.render('edicion', {
            categoria, 
            product, formas, marcas, materials,
            session: req.session
        })
    },
    edicion: (req, res) => {
        /* res.send(req.body) */
        let category = categoria.find(cate => cate.name === req.body.category)
        let forma = formas.find(forma => forma.shape === req.body.forma)
        let marca = marcas.find(marca => marca.brand === req.body.marca)
        let material = materials.find(material => material.mater === req.body.material)
        let arrayImages = [];
            if(req.files){
                req.files.forEach(image => {
                    arrayImages.push(image.filename)
                })
            }
            productos.forEach( product => {
                if(product.id === +req.params.id){
                    product.id = product.id,
                    product.name = req.body.name ? req.body.name : product.name,
                    product.price =  +req.body.price ? +req.body.price : product.price,
                    product.discount =  +req.body.discount ? +req.body.discount : product.discount,
                    product.category = category.id,
                    product.subCatForma = forma.id,
                    product.subCatMarca =  marca.id,
                    product.subCatmaterial =  material.id,
                    product.height =  +req.body.height ? +req.body.height : product.height,
                    product.width =  +req.body.width ? +req.body.width : product.width
                    product.image= arrayImages.length > 0 ? arrayImages : []
                }
            })

            writeProductJson(productos)
            
            if(req.session.user.rol === "ROL_ADMIN"){
                res.redirect('/admin/listado')
            }else{
                res.redirect('/')
            }
           
        },
    lista: (req, res)=>{
        let prod = productos;
        if(req.session.user.rol === "ROL_ADMIN"){
            res.render("listado",{
                categoria,
                prod, formas, marcas, materials,
                session: req.session
            })
        }else{
            res.redirect('/')
        }
        
        
    },
    borrarProducto:(req, res)=> {        
        productos.forEach(producto => {
            if(producto.id === +req.params.id){
            let productoAEliminar = productos.indexOf(producto);
            productos.splice(productoAEliminar, 1)
        }
        })
        writeProductJson(productos)

        res.redirect('/admin/listado/')
    },
}