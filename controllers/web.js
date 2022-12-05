const axios = require("axios")
const { validarBotActivo } = require('../adapter/postgresql')
const { exec } = require("child_process");

const restartBots = async (req, res) => {
    
    const response = await validarBotActivo();
    
    response.map((procesos,index)=>{
        console.log(`cd ${procesos.ruta_archivo_pm2} ; pm2 restart ${procesos.ruta_archivo_pm2}\\${procesos.nombre_archivo_ejecutar} --name ${procesos.nombre_aplicacion}`);
        exec(`cd ${procesos.ruta_archivo_pm2} ; pm2 restart ${procesos.ruta_archivo_pm2}\\${procesos.nombre_archivo_ejecutar} --name ${procesos.nombre_aplicacion}`, (error, stdout, stderr) => {
            if (error) {

                console.log(`error: ${error.message}`);
                let mensajeValidar = error.message.toLowerCase();

                if(
                mensajeValidar.includes('command failed: pm2 restart') && 
                mensajeValidar.includes('process or namespace') && 
                mensajeValidar.includes('not found')
                ){
                    console.log(`cd ${procesos.ruta_archivo_pm2} ; pm2 start ${procesos.ruta_archivo_pm2} --name ${procesos.nombre_aplicacion}`);
                    exec(`cd ${procesos.ruta_archivo_pm2} ; pm2 start ${procesos.ruta_archivo_pm2} --name ${procesos.nombre_aplicacion}`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: ${stderr}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        return;
                    });
                }
            return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    });
  res.send('esta ejecuto');
}

module.exports = {restartBots}