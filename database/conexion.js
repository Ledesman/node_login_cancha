
import mysql from 'mysql'

 const conexion = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
     database: "canchad"
});



// const insertarHorarios = "INSERT INTO usuarios(id, nombre, rol, contrasenia) VALUES (NULL,'nicocancha@gamil.com','usuario','sevent123')";

// conexion.query(insertarHorarios, function(err, rows){

//     if (err) {
//         throw err
//     }
//     else{
//         console.log('datos insertados correctamente');
//     }
// });



// const modificarHorarios ="UPDATE horios SET hora='2023-10-02 11:00:00',estado=1,color='red' WHERE id= 4"

// conexion.query(modificarHorarios, function(err, lista){
//     if (err) {
//         throw err;
//     }
//     else{
//         console.log("dato modificado correctamente")
//     }
// });

// const eliminarHorarios = "DELETE FROM horios WHERE id= 5"

// conexion.query(eliminarHorarios, function(err, lista){
//     if (err) {
//         throw err
//     }
//     else{
//         console.log("El horio fue borrado correctamente")
//     }
// });


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

// conexion.end();
export default conexion;