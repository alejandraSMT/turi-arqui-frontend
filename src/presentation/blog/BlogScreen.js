import React, { useState, useEffect } from "react";
import Header from "../../shared/header/Header";
import "../../style/blog/Blog.css";
import { createComment, fetchComments } from "../../services/blogService";

function BlogScreen() {
  const [comments, setComments] = useState([]);
  const [newUser, setNewUser] = useState(""); // Nuevo estado para el nombre del usuario
  const [newPlace, setNewPlace] = useState(""); // Nuevo estado para el nombre del restaurante
  const [newHashtag, setNewHashtag] = useState(""); // Nuevo estado para el hashtag
  const [newComment, setNewComment] = useState("");
  const [newPhoto, setNewPhoto] = useState(""); // Comentario
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el popup
  const [message, setMessage] = useState(""); // Estado para el mensaje de éxito
  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el mensaje

  // Fetch para obtener comentarios
  const fetchBlogComments = async () => {
    try {
      const response = await fetchComments();
      setComments(response);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  useEffect(() => {
    fetchBlogComments();
  }, []);

  // Handler para agregar un nuevo comentario
  const handleAddComment = async () => {
    if (newUser.trim() && newPlace.trim() && newHashtag.trim() && newComment.trim()) {
      const newCommentData = {
        NombreUsuario: newUser,       // Se usa el nombre ingresado por el usuario
        Hashtag: "#"+newHashtag, // Se usa el hashtag ingresado
        Comentario: newComment, // El comentario
        NombreLugar: newPlace, 
        FotoLugar: newPhoto    // Se usa el nombre del lugar ingresado
      };

      try {
        const response = await createComment(newCommentData);

        if (response.status != 201) throw new Error("Error al agregar comentario");

        setNewUser("");   // Limpia los campos después de agregar el comentario
        setNewPlace("");
        setNewHashtag("");
        setNewComment("");
        setNewPhoto("");
        setShowPopup(false); // Cierra el popup

        // Volver a cargar los comentarios
        window.location.reload();
        
        // Mostrar mensaje de éxito
        setMessage("Comentario creado exitosamente!");
        setShowMessage(true);

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } catch (error) {
        console.error("Error al agregar comentario:", error);
      }
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
              {["#Lima", "#Peru", "#MisViajes", "#Larcomar", "#Chincha"].map(
                (hashtag, index) => (
                  <tr key={index}>
                    <td>{hashtag}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Lista Desplegable de Categorías */}
          <select className="blog-select">
            <option>Comida marina</option>
            <option>Comida peruana</option>
            <option>Lugar turístico</option>
            <option>Comida criolla</option>
          </select>
          <img 
    src="https://static.vecteezy.com/system/resources/previews/016/314/900/non_2x/comment-icon-free-png.png" 
    alt="Comment Icon" 
    className="comment-icon" 
  />
        </div>

        {/* División Derecha */}
        <div className="blog-right">
          {/* Botón para agregar comentario */}
          <button
            className="blog-add-button primary-button"
            onClick={() => setShowPopup(true)}
          >
            Agregar Comentario
          </button>
        <br/>
          {/* Comentarios */}
          {comments.map((comment, index) => (
  <div key={index} className="blog-comment">
    <div className="blog-comment-header">
      <span className="blog-comment-place">{comment.NombreLugar}</span>
      <span className="blog-comment-hashtag">{comment.Hashtag}</span>
    </div>
    <div className="blog-comment-user">
      <strong className="blog-comment-name">{comment.NombreUsuario}</strong>
    </div>
    <div className="blog-comment-body">
      <p className="blog-comment-text">{comment.Comentario}</p>
      <img
        src={comment.FotoLugar}
        alt="Comment Photo"
        className="blog-comment-photo"
      />
    </div>
    
  </div>
)
)}


        </div>
      </div>

      {/* Popup para agregar comentario */}
      {showPopup && (
        <div className="blog-popup">
          <h3>Agregar Comentario</h3>
          <input
            type="text"
            placeholder="Nombre del Usuario"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre del Lugar"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hashtag"
            value={newHashtag}
            onChange={(e) => setNewHashtag(e.target.value)}
          />
          <input
            type="photo"
            placeholder="Photo"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
          />
          <textarea
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="blog-popup-button primary-button"
            onClick={handleAddComment}
          >
            Publicar
          </button>
          <button
            className="blog-popup-button secondary-button"
            onClick={() => setShowPopup(false)}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Mensaje de éxito */}
      {showMessage && (
        <div className="success-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default BlogScreen;
