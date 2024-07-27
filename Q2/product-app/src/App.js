import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function App() {
  return (
    <Container>
    {responses.map((companyData, index) => (
      <div key={index} className="my-4">
        <h2 className="mb-4">Company {index + 1}</h2>
        <Row>
          {companyData.map((product, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Price:</strong> ${product.price}</ListGroup.Item>
                    <ListGroup.Item><strong>Discount:</strong> {product.discount}%</ListGroup.Item>
                    <ListGroup.Item><strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}</ListGroup.Item>
                    <ListGroup.Item><strong>Rating:</strong> {product.rating} ⭐</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    ))}
  </Container>
  );
}

export default App;
