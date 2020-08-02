import { initialize } from './server';
import { configuration } from './config';
import { definition, handler } from './hooks/hook-ejemplo';


const { server: serverConfig } = configuration;

// Registramos a modo de ejemplo un hook (definition y hanadler) para obtener las cards
const app = initialize().registerService({ definition, handler });

app.listen(serverConfig, () => {
    return console.log(`Servidor corriendo en el port.... ${serverConfig.port}`);
});
