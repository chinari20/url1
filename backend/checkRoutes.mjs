import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRouter.js';
import shortURLRouter from './src/routes/shortURLRouter.js';

const print = (name, router) => {
  console.log(name, router.stack.map(layer => ({ path: layer.route?.path, methods: layer.route?.methods })));
};

print('auth', authRouter);
print('user', userRouter);
print('short', shortURLRouter);
