import express from 'express'
import usersRouter from './routes/users.js';
import categoriesRouter from './routes/categories.js';
import postsRouter from './routes/posts.js';
import  commentsRouter from './routes/comments.js'
import loginRouter from './routes/login.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(process.env.PORT, (error) => {
    if(error) throw error;
    console.log(`listening to port ${process.env.PORT}`);
})