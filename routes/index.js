import express from 'express'
import  Router  from "express";
import conexion from '../database/conexion.js'
import bcrypt from "bcryptjs";

import session from "express-session";


 const router = Router();

 router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// router.get('/', (req, res)=>{
//     res.render('index' , {title: 'Inicio'})  
//   });
//   const dbcon = conexion();
// router.get('/login', (req, res)=>{
//     const usuarios = "SELECT * FROM usuarios"
//     conexion.query(usuarios, (err, result) =>{

//         if (err) {
//             throw err
//         }
//         else{
//             //trae todos los datos
//             console.log(result);

            
//          res.render('login',{
//            title: result
//         })
//     }
//         })
        

//     })
   


// const horarios = "SELECT * FROM usuarios"
// conexion.query(horarios, function(err,lista){
//     if (err) {
//         throw err
//     }
//     else{
//         //trae todos los datos
//         console.log(lista); 

//         //console.log(lista.length); cantidad de datos
//         //console.log(lista[0]); trae un datos
//         //console.log(lista[0].estado) un datoque solo quiero mostrar

//     }
// });
//   router.get('/login', (req, res)=>{
//     res.render('login',{title: 'login'})  
//   });
  
  
  router.get('/register', (req, res)=>{
    res.render('register')  
  });

  router.post('/register',async(req, res)=>{
    const usuario =  req.body.usuario;
         const rol = req.body.rol;
        const pass = req.body.pass
        let passHas = await bcrypt.hash(pass, 8)

        conexion.query('INSERT INTO usuarios SET ?',{usuario:usuario, rol:rol, pass:passHas}, async(error, result)=>{
            if (error) {
                console.log(error)
            }else{
                res.render('register',{
                      alert: true,
                    alertTitle:"Registracion",
                    alertMessage: "Registracion exitosa!",
                  alertIcon: 'success',
                    showConfirmButton: false,
                    time: 2000,
                     ruta: ''
                                })
        
            }
        })
  })



//autenticacion
router.post('/auth',async (req, res)=>{
   const usuario = req.body.usuario
   const pass = req.body.pass
   let passHas = await bcrypt.hash(pass, 8)

   if (usuario && pass) {
    conexion.query('SELECT * FROM usuarios WHERE usuario = ?',[usuario], async(error, result)=>{
        if (result.length == 0 || !(await bcrypt.compare(pass,result[0].pass))) {
            res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "USUARIO y/o PASSWORD incorrectas",
                alertIcon:'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'  
            });
        }else{
            req.session.loggedin = true;
            req.session.usuario = result[0].usuario
            res.render('login', {
                alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: ''
            });
        }
        
    })
        }else{
            res.render('login', {
                alert: true,
                    alertTitle:"¡ Advertencia ¡",
                    alertMessage: "Ingrese su usuario y su Contraseña!",
                  alertIcon: 'warning',
                    showConfirmButton: true,
                    timer: false,
                     ruta: 'login'
            });
        }
   
})

router.get('/',(req, res)=>{
    if (req.session.loggedin) {
        res.render('index',{
            login: true,
            name: req.session.usuario
        });
    }else{
        res.render('index',{
            login: false,
            name: 'Debe iniciar sesion'
        })
    }
})
//12

//13
router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

export default router;