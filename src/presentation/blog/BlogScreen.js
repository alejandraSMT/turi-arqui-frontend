import React, { useState } from "react";
import Header from "../../shared/header/Header";

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
    // Más comentarios...
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
      setShowPopup(false);
    }
  };

  return (
    <div>
      <Header />

      {/* Botón de agregar comentario */}
      <div style={{ padding: "20px", textAlign: "right" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowPopup(true)}
        >
          Agregar comentario
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "20px", padding: "20px" }}>
        {/* División Izquierda */}
        <div style={{ width: "30%" }}>
          {/* Tabla Top 5 Hashtags */}
          <table
            border="1"
            style={{
              width: "80%",
              marginBottom: "20px",
              borderCollapse: "collapse",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "#007BFF", color: "white", padding: "10px" }}>
                  Top 5 Hashtags
                </th>
              </tr>
            </thead>
            <tbody>
              {["Lima", "Peru", "MisViajes", "Larcomar", "Chincha"].map((hashtag, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: index % 2 === 0 ? "#f4f4f4" : "white" }}
                >
                  <td style={{ padding: "10px" }}>{hashtag}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Lista Desplegable de Categorías */}
          <select
            style={{
              width: "80%",
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          >
            <option>Comida marina</option>
            <option>Comida peruana</option>
            <option>Lugar turístico</option>
            <option>Comida criolla</option>
          </select>
        </div>

        {/* División Derecha */}
        <div style={{ width: "70%", overflowY: "auto", maxHeight: "80vh" }}>
          {/* Comentarios */}
          {comments.map((comment, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                alignItems: "center",
              }}
            >
              <img
                src={comment.photo}
                alt="User"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <strong style={{ color: "#007BFF" }}>{comment.name}</strong>
                  <span style={{ color: "#28A745", fontWeight: "bold" }}>{comment.hashtag}</span>
                </div>
                <p style={{ margin: "0", lineHeight: "1.3", fontSize: "14px" }}>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup para agregar comentario */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "400px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Agregar Comentario</h3>
            <textarea
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
              rows="3"
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
              placeholder="URL de la foto"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
            />
            <button
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={handleAddComment}
            >
              Publicar
            </button>
            <button
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#DC3545",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowPopup(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogScreen;
