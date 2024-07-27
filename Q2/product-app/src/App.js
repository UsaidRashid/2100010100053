import React, {useState} from 'react';
import './App.css';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [responses, setResponses] = useState([]);
  const [categoryname, setCategoryname] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/categories/${categoryname}/products`); 
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <h1>Products Listings</h1>
      <div className="text-center my-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter category name"
          value={categoryname}
          onChange={(e)=>setCategoryname(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchData}>Fetch Data</button>
      </div>
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
