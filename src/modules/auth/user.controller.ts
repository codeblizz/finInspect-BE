import userService from './user.service';

const registerController = {
  login: async (request: any, reply: any) => {
    try {
      const result = await userService.login(request.body);
      if (result.message === 'Login successful') {
        return reply.send(result);
      } else return reply.code(404).send(result);
    } catch (error: any) {
      return reply.send({
        message: error.message,
      });
    }
  },
  register: async (request: any, reply: any) => {
    try {
      const result = await userService.register(request.body);
      if (result.message === 'Registration successful') {
        return reply.send(result);
      } else return reply.code(404).send(result);
    } catch (error: any) {
      return reply.send({
        message: error.message,
      });
    }
  },
  getCountry: async (request: any, reply: any) => {
    try {
      const result = await userService.getCountry();
      return reply.send(result);
    } catch (error: any) {
      return reply.send({
        message: error.message,
      });
    }
  },
};

export default registerController;
