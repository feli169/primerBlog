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

export async function editPost(id, titulo, img, descripcion) {
  const query = `
    UPDATE posts 
    SET titulo = $1, img = $2, descripcion = $3 
    WHERE id = $4 RETURNING *`;
  const values = [titulo, img, descripcion, id];
  const { rows } = await pool.query(query, values);
  console.log("Post editado con exito");
  return rows[0];
}

export async function likePost(id) {
    const query = "UPDATE posts  SET likes = likes +1 WHERE id = $1 RETURNING *";
    const values = [id];
    const {rows} = await pool.query(query, values);
    return rows[0];
}

export async function deletePosts(id) {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];
  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    return null; 
  }

  console.log("Post eliminado con éxito");
  return rows[0];
}