import express from 'express'
import usersRouter from './routes/users';
import categoriesRouter from './routes/categories';
import postsRouter from './routes/posts';
import  commentsRouter from './routes/comments'

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(process.env.PORT, (error) => {
    if(error) throw error;
    console.log(`listening to port ${process.env.PORT}`);
})