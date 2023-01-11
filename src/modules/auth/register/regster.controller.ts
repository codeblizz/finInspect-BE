// import { Db } from '../config/index';
// import { BlogAttrs } from '../config/models/blogModel';

// Declaration merging
// declare module 'fastify' {
//     export interface FastifyInstance {
//         db: Db;
//     }
// }

// interface blogParams {
//     id: string;
// }

const loginController = async (request: any, reply: any) => {
  try {
    // const { Blog } = server.db.models;
    // const blog = await Blog.addOne(request.body);
    // await blog.save();
    console.log('>>>', request)
    return reply.code(201).send('login successful');
  } catch (error) {
    request.log.error(error);
    return reply.send(500);
  }
};

export { loginController };
