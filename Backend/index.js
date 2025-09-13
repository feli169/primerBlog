import express from 'express' ;
import cors from 'cors' ;
import { getPosts, addPost }  from './querys.js' ;


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

app.post ('/posts', async (req, res) => {
    try {
        const {titulo, img, descripcion, likes} = req.body;
    await addPost(titulo, img, descripcion, likes);
    res.status(201).send("Post agregado con exito");
    } catch (error) {
         console.error(error);
    res.status(500).send("Error agregando post");
    }
    
});

