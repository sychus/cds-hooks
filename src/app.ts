import { initialize } from './server';
import { configuration } from './config';
import * as hook from './hooks/hook-ejemplo';


const { server: serverConfig } = configuration;

// Registramos a modo de ejemplo un hook (definition y hanadler) para obtener las cards
const app = initialize().registerService(hook);

app.listen(serverConfig, () => {
    return console.log(`Servidor corriendo en el port.... ${serverConfig.port}`);
});