import express from 'express'
import  Router  from "express";
import conexion from '../database/conexion.js'
import bcrypt from "bcryptjs";
import controller from '../controllers/index.cli.js';


import session from "express-session";


 const router = Router();

 router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


router.get('/carga', (req, res)=>{
  
  
  conexion.query('SELECT * FROM horarios', (err, result) =>{

       if (err) {
           throw err
       }
      else{
           //trae todos los datos
           res.render('carga_horas', {result:result})
   }
       })
      
     
  });

  router.get('/carga2', (req, res)=>{
    
  
    conexion.query('SELECT * FROM horario2', (err, result) =>{
  
         if (err) {
             throw err
         }
        else{
             //trae todos los datos
             res.render('carga_hora2', {result:result})
     }
         })
        
       
     });

// LLENDO A LA RUTA DOS PARA CREAR
  router.get('/create2', (req, res)=>{
    res.render('create2' )  
  });

//RUTA PARA INSERTAR LA EN EL FORMULARIO DE LA CANCHA 2
  router.post('/cancha2', (req, res)=>{
    const hora = req.body.hora;
     const estado = req.body.estado;
     const color = req.body.color;

  
     conexion.query('INSERT INTO horario2 SET ?', {hora:hora, estado:estado, color:color}, (err, result)=>{
        if (err) {
            console.log(err)
        }else{
          res.redirect('carga2');
        }
     })
  })
//Ruta con controlador que se conecta el cliente
  router.get('/canchas', controller.index);


  router.get('/cancha2', (req, res)=>{
    res.render('canchas2' )  
  });

  //oB TENIENDO EL ID DE LA CHANCHA UNO
router.get('/edit/:id', (req, res)=>{
  const id = req.params.id
  conexion.query('SELECT * FROM horarios WHERE id=?',[id], (err, result) =>{

    if (err) {
        throw err
    }
   else{
        //trae todos los datos
        res.render('edit', {horas:result[0]})
}
    })
})
//OBTENIENDO EL ID DE LA CANCHA2
router.get('/edit2/:id', (req, res)=>{
  const id = req.params.id
  conexion.query('SELECT * FROM horario2 WHERE id=?',[id], (err, result) =>{

    if (err) {
        throw err
    }
   else{
        //trae todos los datos
        res.render('edit2', {horas:result[0]})
}
    })
})

//ELIMINAR UN REGISTRO DE LA CANCHA UNO
router.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  conexion.query('DELETE FROM horarios WHERE id = ?',[id], (err, result) =>{
    if (err) {
      throw err
  }
 else{
      //trae todos los datos
      res.render('edit')
    }
  })
})

//ELIMINAR UN REGISTRO DE LA CANCHA DOS
router.get('/delete2/:id', (req, res)=>{
  const id = req.params.id;
  conexion.query('DELETE FROM horario2 WHERE id = ?',[id], (err, result) =>{
    if (err) {
      throw err
  }
 else{
      //trae todos los datos
      res.render('edit')
    }
  })
})


  router.get('/create', (req, res) =>{
    res.render('create')
  });
  
  // INSTERTAR DE LA CANCHA UNO
router.post('/save', (req, res)=>{
  const hora = req.body.hora;
   const estado = req.body.estado;
   const color = req.body.color;

   conexion.query('INSERT INTO horarios SET ?', {hora:hora, estado:estado, color:color}, (err, result)=>{
      if (err) {
          console.log(err)
      }else{
        res.redirect('carga');
      }
   })
})

// MUESTRAS LOS DATOS QUE SE ENVIA A CANCHA DOS
router.post('/save2', (req, res)=>{
  const hora = req.body.hora;
   const estado = req.body.estado;
   const color = req.body.color;

   conexion.query('INSERT INTO horarios SET ?', {hora:hora, estado:estado, color:color}, (err, result)=>{
      if (err) {
          console.log(err)
      }else{
        res.redirect('/');
      }
   })
})
// EDITAR LA CONSULTA DE LA CANCHA UNO
router.post('/update', (req, res)=>{
  const id = req.body.id;
  const hora = req.body.hora;
  const estado = req.body.estado;
  const color = req.body.color;

  conexion.query('UPDATE horarios SET ? WHERE id =?',[{ hora:hora, estado:estado, color:color}, id], (err, result)=>{
    if (err) {
      console.log(err)
  }else{
    res.redirect('carga');
  }
  });
})


 router.get('/login', (req, res)=>{
     res.render('login')  
   });
  
  
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
					ruta: 'carga'
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