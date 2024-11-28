import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Importamos jsPDF
import Header from "../../shared/header/Header"; // Reutilizas el Header
import SearchBar from "./components/SearchBar";
import "../../style/business/ReportesIngresosScreen.css"; // Importa tu CSS personalizado

const ReportesIngresos = () => {
    const [reportes, setReportes] = useState([
        { id: 1, organizacion: "Organizacion A", fecha: "2024-10-01", ingresos: 5000 },
        { id: 2, organizacion: "Organizacion A", fecha: "2024-10-05", ingresos: 7500 },
        { id: 3, organizacion: "Organizacion A", fecha: "2024-10-10", ingresos: 3000 },
        { id: 4, organizacion: "Organizacion A", fecha: "2024-11-01", ingresos: 4000 },
        { id: 5, organizacion: "Organizacion A", fecha: "2024-11-15", ingresos: 10000 },
        { id: 6, organizacion: "Organizacion A", fecha: "2024-12-01", ingresos: 12000 },
    ]);

    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState(""); // Estado para el texto de busqueda
    const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
    const [mesSeleccionado, setMesSeleccionado] = useState(null); // Almacenar el mes seleccionado para el modal

    // Manejo de busqueda
    const inputHandler = (e) => {
        setInputText(e.target.value.toLowerCase()); // Convertir a minusculas para no diferenciar entre mayusculas y minusculas
    };

    // Filtrar reportes segun el texto ingresado en el SearchBar
    const reportesFiltrados = reportes.filter((reporte) => {
        const mesAnio = new Date(reporte.fecha).toLocaleString('default', { month: 'long', year: 'numeric' }).toLowerCase();
        return (
            reporte.organizacion.toLowerCase().includes(inputText) ||
            reporte.fecha.toLowerCase().includes(inputText) ||
            reporte.ingresos.toString().includes(inputText) ||
            mesAnio.includes(inputText)  // Filtrar tambien por el mes/anio
        );
    });

    // Agrupar reportes por mes y año
    const reportesPorMes = reportesFiltrados.reduce((acc, reporte) => {
        const mesAnio = new Date(reporte.fecha).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[mesAnio]) {
            acc[mesAnio] = { totalIngresos: 0, reportes: [] };
        }
        acc[mesAnio].totalIngresos += reporte.ingresos;
        acc[mesAnio].reportes.push(reporte);
        return acc;
    }, {});

    const mesesOrdenados = Object.keys(reportesPorMes).sort((a, b) => new Date(a) - new Date(b)); // Ordenar los meses

    // Función para abrir el modal con los detalles del mes seleccionado
    const verDetalles = (mesAnio) => {
        setMesSeleccionado(mesAnio);
        setModalVisible(true); // Mostrar el modal
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalVisible(false);
        setMesSeleccionado(null); // Limpiar la seleccion al cerrar el modal
    };

    // Función para generar y descargar el PDF
    const descargarPDF = () => {
        const doc = new jsPDF();

        // Titulo del PDF
        doc.setFontSize(16);
        doc.text(`Detalles de los ingresos para ${mesSeleccionado}`, 10, 10);

        // Cabeceras de la tabla
        doc.setFontSize(12);
        doc.text("Fecha", 10, 20);
        doc.text("Ingreso", 60, 20);
        doc.text("Organizacion", 110, 20);

        // Detalles de los reportes
        reportesPorMes[mesSeleccionado].reportes.forEach((reporte, index) => {
            const yPosition = 30 + index * 10; // Calculamos la posicion Y para cada fila
            doc.text(new Date(reporte.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }), 10, yPosition);
            doc.text(reporte.ingresos.toString(), 60, yPosition);
            doc.text(reporte.organizacion, 110, yPosition);
        });

        // Guardar el PDF
        doc.save(`${mesSeleccionado}_ingresos.pdf`);
    };

    return (
        <div className="reportes-ingresos-wrapper2">
            <Header />
            <div className="container2 my-42">
                <div className="search-container2 mb-42">
                    <SearchBar
                        inputHandler={inputHandler}
                        input={inputText}
                        searchValues={reportes.map((reporte) => reporte.organizacion)} // Proporcionamos las organizaciones para el autocompletado
                    />
                </div>

                <div className="reportes-list">
                    {loading ? (
                        <p>Cargando reportes...</p>
                    ) : (
                        <div className="table-responsive2">
                            <table className="table2 table2-striped table2-bordered">
                                <thead>
                                    <tr>
                                        <th>Mes</th>
                                        <th>Total de Ingresos</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mesesOrdenados.length > 0 ? (
                                        mesesOrdenados.map((mesAnio) => (
                                            <tr key={mesAnio}>
                                                <td>{mesAnio}</td>
                                                <td>{reportesPorMes[mesAnio].totalIngresos}</td>
                                                <td>
                                                    <button
                                                        className="btn2 btn2-info"
                                                        onClick={() => verDetalles(mesAnio)} // Al hacer clic, muestra los detalles de ese mes
                                                    >
                                                        Ver Detalles
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center2">No se encontraron reportes.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal con los detalles */}
            {modalVisible && mesSeleccionado && (
                <div className="modal2">
                    <div className="modal-content2">
                        <button className="close-modal2" onClick={cerrarModal}>X</button>
                        <h2>Detalles de los ingresos para {mesSeleccionado}</h2>
                        <table className="table2">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Ingreso</th>
                                    <th>Organizacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportesPorMes[mesSeleccionado].reportes.map((reporte) => (
                                    <tr key={reporte.id}>
                                        <td>{new Date(reporte.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td>{reporte.ingresos}</td>
                                        <td>{reporte.organizacion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Botón para descargar el PDF */}
                        <button className="btn2-pdf" onClick={descargarPDF}>Descargar PDF</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportesIngresos;
