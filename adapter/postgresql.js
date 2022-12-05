const {connection} = require('../config/postgresql')

validarBotActivo = (id) =>  new Promise((resolve,reject) => {
    try {
        connection.query(
            `select ruta_archivo_pm2,nombre_archivo_ejecutar,nombre_aplicacion from tb_validacion_funcionamiento_bot WHERE ROUND(extract(epoch from (now()::timestamp - ultima_ejecucion::timestamp))/60) > 10 and pm2_activo = 1 and clinica_id= '${process.env.CLINICA_ID}'` , (error, results) => {
            if(error) { 
                console.log(error)
            }
            resolve(results.rows)
        })
    } catch (error) {
        
    }
})

module.exports = {validarBotActivo}