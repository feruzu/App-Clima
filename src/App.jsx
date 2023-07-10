import './App.css';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function App() {

  const API = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`

 const [ciudad, setCiudad] = useState("");

 const [error, setError] = useState(null);

 const [clima, setClima] = useState({
  ciudad: "",
  pais: "",
  temp: "",
  icon: "",
  condicionTexto: "",
 });

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
    setError(null);

    if(!ciudad.trim()) {throw new Error("Coloca una Ciudad");
  }

    const respuesta = await fetch(`${API}${ciudad}`);
    const data = await respuesta.json();


    if(!respuesta.ok) {
      throw new Error("Error al ontener los datos del clima")
    }

    setClima({
      ciudad: data.location.name,
      pais: data.location.country,
      temp: data.current.temp_c,
      condicion: data.current.condition.code,
      icon: data.current.condition.icon,
      condicionTexto: data.current.condition.text,
    });
  } catch (error) {
    setError(error.message || "Error al obtener los datos del clima");
    return;
  }
  setError(null);
};

  return (
    <Container className="App">
      <h1>Clima</h1>

      <Form onSubmit={onSubmit} >
        <Form.Group className="mb-3" >
        <FloatingLabel label="Ciudad">
            <Form.Control id="ciudad" type="text" placeholder="Ciudad" required value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        </FloatingLabel>
        </Form.Group>
        
      
        <Button id="button" variant="primary" type="submit" >
          Buscar
        </Button>
      </Form>

      {clima.ciudad && (
        <div>
        <h2>{clima.ciudad}</h2>
        <h3>{clima.pais}</h3>
        <img src={clima.icon}></img>
        <h4>{clima.temp}°C</h4>
        <h5>{clima.condicionTexto}</h5>
        </div>
      )}
      {error && <p className='error'>{error}</p>}

          
    </Container>
  );
}

export default App
