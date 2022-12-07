const axios = require("axios")
const { validarBotActivo,ultimaValidacionBot,ultimaEjecucionReinicio } = require('../adapter/postgresql')
const { exec } = require("child_process");

const restartBots = async (req, res) => {
    
    const response = await validarBotActivo();
    await ultimaValidacionBot();

    response.map(async (procesos)=>{
        await ultimaEjecucionReinicio(procesos.clinica_id);
        exec(`pm2 restart ${procesos.ruta_archivo_pm2}\\${procesos.nombre_archivo_ejecutar} --name ${procesos.nombre_aplicacion}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
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