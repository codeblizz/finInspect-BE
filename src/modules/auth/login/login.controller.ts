import loginService from './login.service';

const loginController = async (request: any, reply: any) => {
  try {
    await loginService();
    return reply.code(201).send('login successful');
  } catch (error) {
    request.log.error(error);
    return reply.send(500);
  }
};

export { loginController };
