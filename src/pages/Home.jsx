import { useState, useEffect } from 'react'; // Hito 4
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
// import { pizzas } from '../data/pizzas'; // Importamos el arreglo de pizzas desde la carpeta data

const Home = () => {
    // 1. Estado para almacenar las pizzas que vienen en la API
    const [pizzas, setPizzas] = useState([]);

    // 2. Función para hacer el fetch al backend
    const consultarApi = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/pizzas`;
            const response = await fetch(url);
            const data = await response.json();
            setPizzas(data);
        } catch (error) {
            console.log('Error al cargar las pizzas', error);
        }
    };

    // 3. UseEffect para ejecutar la consulta al cargar el componente
    useEffect(() => {
        consultarApi();
    }, []);

    return (
        <div>
            <Header />
            <Container className="my-4">
                <Row className="g-4">
                    {pizzas.map((pizza) => (
                        <Col md={4} sm={6} xs={12} className="d-flex justify-content-center" key={pizza.id}>
                            <CardPizza
                                id={pizza.id}
                                name={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                img={pizza.img}
                                desc={pizza.desc}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Home;