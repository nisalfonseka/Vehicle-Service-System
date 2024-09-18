import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { PDFDownloadLink } from "@react-pdf/renderer";
import CustomerReport from "./CustomerReport";
import axios from 'axios';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      {Array.from({ length: 5 }, (_, index) => index + 1).map(star => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: star <= (hover || rating) ? "#FFD700" : "#E0E0E0" // Gold for selected, light gray for unselected
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const CustomerTable = () => {
  const { id } = useParams();
  const [customer,setCustomer] = useState(null);

  useEffect(
    () => {
      axios
      .get(`http://localhost:5555/customer`)
      .then((response) => {
        setCustomer(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    },[id]
  )
  console.log(customer);

  // Check if the customer prop is an array and has items
  /*if (!Array.isArray(customer) || customer.length === 0) {
    return <p>No customer data available</p>;
  }*/

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff" }}>
        <thead>
          <tr>
            {/*<th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>ID</th>*/}
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Customer Name</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }} className='max-md:hidden'>
              Email
            </th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }} className='max-md:hidden'>
              Mobile Number
            </th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Vehicle Number</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Subject</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {customer&& customer.map((customer, index) => (
            <tr
              key={customer._id}
              style={{
                height: "50px",
                backgroundColor: 1 % 2 === 0 ? "#f8d7da" : "#ffffff", // Light red and white alternating rows
                borderBottom: "1px solid #cc0000"
              }}
            >
             {/* <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                {index + 1}
              </td>*/}
              <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                {customer.customerName}
              </td>
              <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }} className='max-md:hidden'>
                {customer.email}
              </td>
              <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }} className='max-md:hidden'>
                {customer.mobileNumber}
              </td>
              <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                {customer.vehicleNumber}
              </td>
              <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                {customer.subject}
              </td>
              <td style={{ textAlign: "center", color: "#000000", border: "1px solid #cc0000" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <Link to={`/support/card/${customer._id}`}>
                    <BsInfoCircle style={{ fontSize: "24px", color: "#6600FF"}} />
                  </Link>
                  <Link to={`/support/edit/${customer._id}`}>
                    <AiOutlineEdit style={{ fontSize: "24px", color: "#000000" }} />
                  </Link>
                  <PDFDownloadLink document={<CustomerReport customer={customer} />} fileName="FORM">
                    {({ loading }) =>
                      loading ? (
                        <button style={{ fontWeight: "bold", color: "#696969" }}>Loading...</button>
                      ) : (
                        <button style={{ fontWeight: "bold", color: "#0000FF" }}>Report</button>
                      )
                    }
                  </PDFDownloadLink>
                  <Link to={`/support/delete/${customer._id}`}>
                    <MdOutlineDelete style={{ fontSize: "24px", color: "#ff0000" }} />
                  </Link>
                </div>
              </td>
            </tr>
          )) }
        </tbody>
      </table> 
      <div style={{ marginTop: "20px", borderTop: "2px solid #cc0000", paddingTop: "10px" }}>
        <h3 style={{ textAlign: "center", color: "#000000" }}>Rate the Customer Service</h3>
        <StarRating />
      </div>
    </>
  );
};

export default CustomerTable;
