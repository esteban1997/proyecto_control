const {connection} = require('../config/postgresql')

validarBotActivo = () =>  new Promise((resolve,reject) => {
    try {
        connection.query(
            `select clinica_id,ruta_archivo_pm2,nombre_archivo_ejecutar,nombre_aplicacion from tb_validacion_funcionamiento_bot WHERE ROUND(extract(epoch from (now()::timestamp - ultima_ejecucion::timestamp))/60) > 10 and pm2_activo = 1` , (error, results) => {
            if(error) { 
                console.log(error)
            }
            resolve(results.rows)
        })
    } catch (error) {
        
    }
})

ultimaValidacionBot = () =>  new Promise((resolve,reject) => {
    try {
        connection.query(
            `UPDATE tb_validacion_funcionamiento_bot SET ultima_validacion = NOW() where pm2_activo = 1` , (error, results) => {
            if(error) { 
                console.log(error)
            }
            resolve(results.rows)
        })
    } catch (error) {
        
    }
})

ultimaEjecucionReinicio = (clinica_id) =>  new Promise((resolve,reject) => {
    try {
        connection.query(
            `UPDATE tb_validacion_funcionamiento_bot SET ultimo_restart = NOW() WHERE clinica_id = '${clinica_id}' and pm2_activo = 1` , (error, results) => {
            if(error) { 
                console.log(error)
            }
            resolve(results.rows)
        })
    } catch (error) {
        
    }
})

module.exports = {validarBotActivo,ultimaValidacionBot,ultimaEjecucionReinicio}