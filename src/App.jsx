import './App.css';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';


function App() {


  return (
    <Container className="App">
      <h1>Clima</h1>

      <Form>
        <Form.Group className="mb-3" >
        <FloatingLabel label="Ciudad">
            <Form.Control id="ciudad" type="text" placeholder="Ciudad" required/>
        </FloatingLabel>
        </Form.Group>

        <Button id="button" variant="primary" type="submit" value="Buscar" >
          Buscar
        </Button>
      </Form>
      
    </Container>
  );
}

export default App
