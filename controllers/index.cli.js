import express from 'express'

import conexion from '../database/conexion.js'

const router = express.Router();

const controller = {

}

controller.index = (req, res)=>{
  
  res.render('client/index')
    // conexion.query('SELECT * FROM horarios', (err, result) =>{
  
    //      if (err) {
    //          throw err
    //      }
    //     else{
    //          //trae todos los datos
    //          res.render('carga_horas', {result:result})
    //  }
    //      })
        
       
    };
export default controller;

