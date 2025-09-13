import { Pool } from 'pg' ;

const pool = new Pool({
     host: 'localhost',
      user: 'postgres',
       password: '123456',
       database: 'likeme',
       allowExitOnIdle: true
})


export async function getPosts() {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows.map(post => ({
        id: post.id,
        titulo: post.titulo,
        img: post.img || '',
        descripcion: post.descripcion || '',
        likes: post.likes ?? 0 
    }));
}


export async function  addPost (titulo, img, descripcion, likes = 0)  {
    const query = "INSERT INTO posts VALUES (DEFAULT,$1, $2, $3, $4 )"
    const values = [titulo, img, descripcion, likes] ;
    const result = await pool.query(query, values); 
    console.log("Post agregado con exito");
}


