import userService from './user.service';

const registerController = {
  login: async (request: any, reply: any) => {
    const { sessionId } = request.session;
    try {
      const result: any = await userService.login(request.body);
      if (result.status === false) reply.code(404);
      return reply.send(result);
    } catch (error: any) {
      return reply.send(error);
    }
  },
  register: async (request: any, reply: any) => {
    try {
      const result: any = await userService.register(request.body);
      if (result.status === false) reply.code(404);
      return reply.send(result);
    } catch (error: any) {
      console.log('error', error);
      return reply.send(error);
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
