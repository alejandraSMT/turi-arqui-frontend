import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchReportesIngresos } from '../services/api'; // Asegúrate de crear el servicio para obtener los datos

const ReportesIngresosScreen = () => {
    const navigation = useNavigation();
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReportes = async () => {
            try {
                const data = await fetchReportesIngresos(); // Asegúrate de tener este servicio configurado
                setReportes(data);
            } catch (error) {
                console.error("Error al cargar los reportes", error);
            } finally {
                setLoading(false);
            }
        };

        loadReportes();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.organizacion}</Text>
            <Text style={styles.cardText}>Fecha: {item.fecha}</Text>
            <Text style={styles.cardText}>Total Ingresos: S/ {item.totalIngresos}</Text>
            <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate('DetalleReporte', { reporteId: item.id })}
            >
                <Text style={styles.viewDetailsText}>Ver Detalles</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando reportes...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Reportes de Ingresos por Organización</Text>

            <FlatList
                data={reportes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardText: {
        fontSize: 14,
        color: '#666',
    },
    viewDetailsButton: {
        marginTop: 12,
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
    },
    viewDetailsText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#333',
    },
});

export default ReportesIngresosScreen;
