// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let prevId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;

    if (typeof author !== 'string' ||
        author === '' ||
        typeof title !== 'string' ||
        title === '' ||
        typeof contents !== 'string' ||
        contents === ''
    ) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para crear el Post",
            });
    }
    const post = { author, title, contents, id: ++prevId };

    posts.push(post);

    res.json(post);
})

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;

    if (
        typeof title !== 'string' ||
        title === '' ||
        typeof contents !== 'string' ||
        contents === ''
    ) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para crear el Post",
            });
    }
    const post = { author, title, contents, id: ++prevId };

    posts.push(post);

    res.json(post);
})

server.get('/posts', (req, res) => {
    const { term } = req.query;
    if (term !== undefined) {
        return res.json(
            posts.filter(post => post.title.includes(term) || post.contents.includes(term))
        );
    }
    res.json(posts);
})

server.get("/posts/:author", (req, res) => {
    const { author } = req.params;

    const result = posts.filter(post => post.author === author);

    if (!result.length) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No existe ningun post del autor indicado",
            });
    }

    return res.json(result);
})

server.get("/posts/:author/:title", (req, res) => {
    const { author, title } = req.params

    const result = posts.filter(post => post.author === author && post.title === title);

    if (!result.length) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No existe ningun post con dicho titulo y autor indicado",
            });
    }

    return res.json(result);
})

server.put("/posts", (req, res) => {
    const { id, title, contents } = req.body;

    if (
        typeof id !== 'number' ||
        typeof title !== 'string' ||
        title === '' ||
        typeof contents !== 'string' ||
        contents === ''
    ) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para modificar el Post",
            });
    }

    const post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No existe el Post buscado",
            });
    }

    post.title = title;
    post.contents = contents;

    res.json(post);
})

server.delete("/posts", (req, res) => {
    const { id } = req.body;

    if (typeof id !== "number") {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "Mensaje de error",
            });
    }

    const post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No existe el Post con dicho id",
            });
    }

    posts.splice(posts.indexOf((post), 1)) // cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.

    res.json({ success: true });
})

server.delete("/author", (req, res) => {
    const { author } = req.body;

    if (typeof author !== "string" || author === "") {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No existe el autor indicado",
            });
    }

    const post = posts.filter((post) => post.author === author);

    if (!post.length) {
        return res.status(STATUS_USER_ERROR)
            .json({
                error: "No existe el autor indicado",
            });
    }

    post.forEach((p) => posts.splice(posts.indexOf(p), 1));

    res.json(post);
})




module.exports = { posts, server };

/*
GET         /posts
POST        /posts
GET         /posts/:id
PUT         /posts/:id
PATCH       /posts/:id
DELETE      /posts/:id
*/
