import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

function App() {
  const [responses, setResponses] = useState([]);
  const [formData, setFormData] = useState({
    categoryname: "",
    top: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const { categoryname, top, minPrice, maxPrice } = formData;
      const response = await axios.get(
        `http://localhost:8000/categories/products`,
        {
          params: {
            categoryname,
            top,
            minPrice,
            maxPrice
          }
        }
      );
      if(response.status===200) setResponses(response.data);
      else alert('error fetching data');
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <form onSubmit={fetchData}>
        <div className="form-group">
          <h1>Products Listings</h1>
          <div className="text-center my-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter category name"
              name="categoryname"
              value={formData.categoryname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Top N products"
              name="top"
              value={formData.top}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Minimum Price"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Maximum Price"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Fetch Data
          </button>
        </div>
      </form>
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
                      <ListGroup.Item>
                        <strong>Price:</strong> ${product.price}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Discount:</strong> {product.discount}%
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Availability:</strong>{" "}
                        {product.availability ? "In Stock" : "Out of Stock"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Rating:</strong> {product.rating} ⭐
                      </ListGroup.Item>
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
