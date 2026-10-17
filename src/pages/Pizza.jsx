import { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import imgP001 from '../assets/img/p001.jpeg'; // Hito 4

const Pizza = () => {
    // 1. Estado para almacenar los datos de la pizza individual
    const [pizza, setPizza] = useState({});

    // 2. Función para hacer el fetch de la pizza p001
    const obtenerPizza = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas/p001`);
            const data = await response.json();
            setPizza(data);
        } catch (error) {
            console.log('Error al carga la pizza', error);
        }
    };

    // 3. useEffect para invocar la función al montar el componente
    useEffect(() => {
        obtenerPizza();
    }, []);

    const imagenFinal = pizza.img && pizza.img.includes("firebasestorage")
        ? imgP001
        : pizza.img;

    return (
        <Container className="my-5 d-flex justify-content-center">
            {/* Validamos que la pizza tenga datos antes de renderizar */}
            {pizza.name ? (
                <Card className="tarjeta-pizza shadow-sm" style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={imagenFinal} style={{ height: '250px', objectFit: 'cover' }} />
                    <Card.Body>
                        <Card.Title className="fw-bold">{pizza.name}</Card.Title>
                        <hr />
                        <Card.Text className="text-muted small" style={{ textAlign: 'justify' }}>
                            {pizza.desc}
                        </Card.Text>
                        <hr />
                        <div className="text-center">
                            <Card.Text className="fw-bold mb-1">Ingredientes:</Card.Text>
                            <Card.Text className="text-muted mb-3">
                                🍕 {pizza.ingredients && pizza.ingredients.join(', ')}
                            </Card.Text>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold mb-0">Precio: ${pizza.price}</h4>
                            <Button variant="dark" size="sm">Añadir 🛒</Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <p className="text-center">Cargando información de la pizza...</p>
            )}
        </Container>
    )
}

export default Pizza;