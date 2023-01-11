import appFramework from './app';
import DBConnector from '../src/helpers/useDB';

async function initAppServer() {
  const app = await appFramework();
  // app.addHook('preHandler', (request, reply, next) => {
  //   request.session.user = { name: 'max' };
  //   next();
  // })
  try {
    await app.ready();
    app.swagger();
    await app.listen({ port: app.config.PORT }, (err, address) => {
      console.log(`Server is now listening on ${address}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initAppServer();
