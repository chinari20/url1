import express from 'express';
import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRouter.js';
import shortURLRouter from './src/routes/shortURLRouter.js';

const app = express();
console.log('starting');
app.use('/api/auth', authRouter);
console.log('auth ok');
app.use('/api/user', userRouter);
console.log('user ok');
app.use('/api/s', shortURLRouter);
console.log('short ok');
app.use(express.static('frontend/dist'));
console.log('static ok');
app.get('/*', (req, res) => res.send('ok'));
console.log('wildcard ok');
