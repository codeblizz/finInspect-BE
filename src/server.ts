import appFramework from './app';
import DBConnector from '../src/helpers/useDB';

async function initAppServer() {
  const app = await appFramework();

  try {
    await app.ready();
    await app.listen({ port: app.config.PORT }, (err, address) => {
      console.log(`Server is now listening on ${address}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initAppServer();
