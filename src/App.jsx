import './App.css';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function App() {

  const API = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`

 const [ciudad, setCiudad] = useState("");


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
    if(!ciudad.trim()) throw {message: "Coloca una Ciudad"};

    const respuesta = await fetch(`${API}${ciudad}`);
    const data = await respuesta.json();

    setClima({
      ciudad: data.location.name,
      pais: data.location.country,
      temp: data.current.temp_c,
      condicion: data.current.condition.code,
      icon: data.current.condition.icon,
      condicionTexto: data.current.condition.text,
    });
  } catch (error) {
      console.log(error)
  } finally {
    console.log('Conexión lograda')
  }
}


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

          
    </Container>
  );
}

export default App
