import express from 'express';
import cors from 'cors';
import { 
    getPosts,
    addPost,
    editPost,
    likePost,
    deletePosts,
} from './querys.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, console.log("SERVIDOR ENCENDIDO"));

app.get('/posts', async (req, res) => {
    try {
        const post = await getPosts();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error obteniendo posts");
    }

});

app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, descripcion, likes } = req.body;
        await addPost(titulo, img, descripcion, likes);
        res.status(201).send("Post agregado con exito");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error agregando post");
    }

});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, img, descripcion } = req.body;
    try {
        const post = await editPost(id, titulo, img, descripcion);
        if (!post) {
            return res.status(404).send("No se encontró el post con ese id");
        }
        
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error editando post");
    }
});

app.put('/posts/like/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await likePost(id);
        if (!post) {
            return res.status(404).send("No se encontró el post con ese id");
        }
        res.json(post);
    } catch (error) {
        return res.status(500).send("Error dando like al post");
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await deletePosts(id);
       if (!post) {
            return res.status(404).send("No se encontró el post con ese id");
        }
         res.send("Post eliminado con éxito");
    } catch (error) {
          return res.status(500).send("Error eliminando el post");
    }
})