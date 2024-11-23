import React, { useState } from "react";
import Header from "../../shared/header/Header";
import "../../style/blog/Blog.css";

function BlogScreen() {
  const [comments, setComments] = useState([
    {
      name: "Juan Pérez",
      hashtag: "#ComidaMarina",
      comment: "¡El ceviche en 'La Mar' es increíble!",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "María López",
      hashtag: "#ComidaPeruana",
      comment: "Me encanta el lomo saltado de Panchita.",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Carlos Sánchez",
      hashtag: "#LugarTuristico",
      comment: "La vista desde Larcomar es espectacular.",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Ana Martínez",
      hashtag: "#Chincha",
      comment: "La comida en Chincha es una delicia, especialmente la sopa seca.",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Luis Gómez",
      hashtag: "#MisViajes",
      comment: "Viajar por el Perú es una experiencia inolvidable.",
      photo: "https://via.placeholder.com/50",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() && newPhoto.trim()) {
      setComments([
        ...comments,
        {
          name: "Usuario Anónimo",
          hashtag: "#NuevoComentario",
          comment: newComment,
          photo: newPhoto,
        },
      ]);
      setNewComment("");
      setNewPhoto("");
      setShowPopup(false); // Cerrar popup después de publicar
    }
  };

  return (
    <div>
      <Header />
      <div className="blog-container">
        {/* División Izquierda */}
        <div className="blog-left">
          {/* Tabla Top 5 Hashtags */}
          <table className="blog-table" border="1">
            <thead>
              <tr>
                <th>Top 5 Hashtags</th>
              </tr>
            </thead>
            <tbody>
              {["Lima", "Peru", "MisViajes", "Larcomar", "Chincha"].map((hashtag, index) => (
                <tr key={index}>
                  <td>{hashtag}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Lista Desplegable de Categorías */}
          <select className="blog-select">
            <option>Comida marina</option>
            <option>Comida peruana</option>
            <option>Lugar turístico</option>
            <option>Comida criolla</option>
          </select>
        </div>

        {/* División Derecha */}
        <div className="blog-right">
          {/* Botón para agregar comentario */}
          <button className="blog-add-button" onClick={() => setShowPopup(true)}>
            Agregar Comentario
          </button>

          {/* Comentarios */}
          {comments.map((comment, index) => (
            <div key={index} className="blog-comment">
              <div className="blog-comment-content">
                <div className="blog-comment-header">
                  <strong className="blog-comment-name">{comment.name}</strong>
                  <span className="blog-comment-hashtag">{comment.hashtag}</span>
                </div>
                <p>{comment.comment}</p>
              </div>
              <img src={comment.photo} alt="User" className="blog-comment-photo" />
            </div>
          ))}
        </div>
      </div>

      {/* Popup para agregar comentario */}
      {showPopup && (
        <div className="blog-popup">
          <h3>Agregar Comentario</h3>
          <textarea
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="URL de la foto"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
          />
          <button className="blog-popup-button publish" onClick={handleAddComment}>
            Publicar
          </button>
          <button className="blog-popup-button cancel" onClick={() => setShowPopup(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogScreen;
