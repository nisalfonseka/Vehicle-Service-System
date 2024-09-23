import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const ItemDetails = () => {
  const { id } = useParams(); // Get item ID from URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [updatedItem, setUpdatedItem] = useState({}); // For handling updates
  const [categories, setCategories] = useState([]); // To store available categories

  // Fetch item details and available categories
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemResponse = await axios.get(`http://localhost:5555/inventory-items/${id}`);
        setItem(itemResponse.data);
        setUpdatedItem(itemResponse.data); // Initialize with fetched data

        const categoriesResponse = await axios.get('http://localhost:5555/categories');
        setCategories(categoriesResponse.data); // Set available categories
      } catch (error) {
        setError('Error fetching item or category details');
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/inventory-items/${id}`);
      alert('Item deleted successfully');
      navigate('/'); // Redirect back to the inventory list
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5555/inventory-items/${id}`, updatedItem);
      alert('Item updated successfully');
      setShowModal(false); // Close the modal after successful update
      navigate(`/items/${id}`); // Refresh item details page after update
    } catch (error) {
      alert('Error updating item');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat._id === e.target.value);
    setUpdatedItem({ ...updatedItem, category: selectedCategory });
  };

  if (error) return <div>{error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Item Details</h1>
      <div className="card mb-4">
        {item.photo && (
          <img
            src={`data:image/jpeg;base64,${item.photo}`}
            className="card-img-top"
            alt={item.name}
            style={{ height: '300px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Price: LKR:{item.price.toFixed(2)}</p>
          <p className="card-text">Quantity: {item.qty}</p>
          <p className="card-text">Description: {item.description}</p>
          <p className="card-text">Company: {item.companyName}</p>
          <p className="card-text">Category: {item.category?.name || 'N/A'}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-warning" onClick={() => setShowModal(true)}>
          Update
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* Modal for updating the item */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedItem.name || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedItem.price || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={updatedItem.qty || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={updatedItem.description || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={updatedItem.companyName || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={updatedItem.category?._id || ''}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemDetails;
