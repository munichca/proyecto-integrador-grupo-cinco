module.exports = function userAdmin(req,res,next){
    if(req.session.user.rol == 1){
        /* res.send(req.session.user) */
        next()
    }else{
        res.redirect('/')
    }
}