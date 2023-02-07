import appFramework from './app';

async function initAppServer() {
  const app = await appFramework();

  try {
    await app.ready();
    // await app.redis.ping();
    // console.log('redis connected');
    await app.listen({ port: app.config.PORT, host: app.config.HOST }, (err, address) => {
      console.log(`Server is now listening on ${address}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initAppServer();
