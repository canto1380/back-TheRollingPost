import Clientes from '../models/clientes'

const clientesCtrl = {};

clientesCtrl.nuevaSuscripcion = async(req,res) =>{
    try{   
const clienteCreado = new Clientes({
            nomAp: req.body.nomAp,
            direccion: req.body.direccion,
            localidad: req.body.localidad,
            codigoPostal: req.body.codigoPostal,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            plan: req.body.plan
})
const email = req.body.email

/*verifico que no haya otro  usuario registrado con ese email*/
await Clientes.findOne({email}, function(err, email){
   if(!email){
       res.status(200).json({ mensaje: "direccion de email disponible, registrando..."})
       clienteCreado.save();
   }else{
       res.status(400).json({
           mensaje: "el email ya se encuentra registrado"
       })
}})
}catch(err){
   console.log(err)
}
};

clientesCtrl.listarClientes = async (req,res)=>{
    try{
const arregloClientes = await Clientes.find();
        res.status(200).json(arregloClientes)
    }catch(error){
        console.log(error)
        res.status(404).json({
            mensaje: "No se pudo encontrar el cliente"
        })

    }
}

clientesCtrl.rechazarCancelarSuscripcion = async(req, res)=>{
   try{
    console.log(req.params.id)
    /*elimino usando id*/
    await Clientes.findByIdAndDelete(req.params.id)
    res.status(200).json({
        mensaje: "la suscripcion fue rechazada o cancelada correctamente"
    })
   } catch(error){
       console.log(error);
       res.status(404).json({
           mensaje: "No se pudo encontra la solicitud de suscripcion"
       })
   }
}

clientesCtrl.errorEliminar = async(req, res)=>{
    try{
        console.log(req.params)
       const ultimo= await Clientes.findOneAndDelete({email: req.params.email} )
        res.status(200).json({mensaje:"usuario borrado"})
        console.log(ultimo)
    }catch(error){  
        res.status(404).json({
            mensaje: "No se pudo borrar el ultimo cliente"
        })
    }
}

export default clientesCtrl;