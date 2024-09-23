import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Service Center Location
const SERVICE_CENTER_LOCATION = [6.777, 80.112]; // Coordinates for Hanwella

const CreateRequests = () => {
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [cityName, setCityName] = useState('');
  const [issueType, setIssueType] = useState('');
  const [totalCharge, setTotalCharge] = useState('Flat rate of Rs. 25,000 Plus Distance-Based Add-ons');
  const [totalDistance, setTotalDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const baseRate = 25000;
  const additionalChargePerKm = 400;
    
  // Calculate the distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Calculate total charge based on distance
  const calculateTotalCharge = (distance) => {
    let additionalCharge = 0;
    if (distance > 10) {
      additionalCharge = (distance - 10) * additionalChargePerKm;
    }
    return (baseRate + additionalCharge).toFixed(2);
  };

  // Reverse geocoding to get the city name
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
          addressdetails: 1
        }
      });
      const city = response.data.address.city || response.data.address.town || response.data.address.village || 'Unknown';
      setCityName(city);
    } catch (error) {
      console.error('Error fetching city name', error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]);
        reverseGeocode(lat, lng);
        const distance = calculateDistance(lat, lng, SERVICE_CENTER_LOCATION[0], SERVICE_CENTER_LOCATION[1]);
        setTotalDistance(distance.toFixed(2)); // Update total distance
        setTotalCharge(`Rs. ${calculateTotalCharge(distance)}`); // Update total charge
      }
    });
    return null;
  };

  useEffect(() => {
    if (markerPosition) {
      const distance = calculateDistance(markerPosition[0], markerPosition[1], SERVICE_CENTER_LOCATION[0], SERVICE_CENTER_LOCATION[1]);
      setTotalDistance(distance.toFixed(2));
      setTotalCharge(` Rs. ${calculateTotalCharge(distance)}`); // Update total charge
    }
  }, [markerPosition]);

  const handleSaveRequest = () => {
    const data = {
      customerName,
      contactNumber,
      vehicleNumber,
      location: cityName,
      issueType,
      totalCharge
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/breakdownRequests', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Breakdown request created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating request', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f4f8' }}>
      <BackButton />
      <h1 style={{ fontSize: '2rem', margin: '16px 0', color: '#000039' }}>Create Breakdown Request</h1>
      {loading && <Spinner />}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #ff0038',
        borderRadius: '16px',
        width: '600px',
        padding: '16px',
        margin: '0 auto',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Customer Name</label>
          <input
            type='text'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Contact Number</label>
          <input
            type='text'
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Vehicle Number</label>
          <input
            type='text'
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Issue Type</label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          >
            <option value='' disabled>Select issue type</option>
            <option value='Flat Tire'>Flat Tire</option>
            <option value='Engine Problem'>Engine Problem</option>
            <option value='Battery Issue'>Battery Issue</option>
            <option value='Collision'>Collision</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Location</label>
          <input
            type='text' 
            value={cityName ? `${cityName} ` : 'Select a location'}
            readOnly
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          />
        </div>
        <MapContainer center={SERVICE_CENTER_LOCATION} zoom={13} style={{ height: '400px', marginBottom: '16px' }} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents />
          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>
                Selected Location
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Total Distance</label>
          <input
            type='text'
            value={totalDistance ? `${totalDistance} km` : 'Select a location'}
            readOnly
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '16px', color: '#000039', backgroundColor: '#ffffff', padding: '4px 8px', borderRadius: '8px' }}>Total Charge</label>
          <input
            type='text'
            value={totalCharge}
            readOnly
            style={{
              border: '2px solid #ff0038',
              borderRadius: '16px',
              padding: '8px 16px',
              width: '100%',
              backgroundColor: '#f8f8ff'
            }}
          />
        </div>
        <button
          onClick={handleSaveRequest}
          style={{
            border: 'none',
            borderRadius: '16px',
            padding: '12px 24px',
            backgroundColor: '#ff0038',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginTop: '16px'
          }}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default CreateRequests;