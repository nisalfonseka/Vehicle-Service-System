import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { PDFDownloadLink } from "@react-pdf/renderer";
import CustomerReport from "../CustomerReport";

const CustomerTable = ({ customer }) => {
  // Log customer data to verify it is being passed correctly
  console.log(customer);

  return (
    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "8px", backgroundColor: "#f0f8ff" }}>
      <thead>
        <tr>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }}>ID</th>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }}>Customer Name</th>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }} className='max-md:hidden'>
            Email
          </th>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }} className='max-md:hidden'>
            Mobile Number
          </th>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }}>Vehicle Number</th>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }}>Subject</th>
          <th style={{ border: "2px solid #4682b4", borderRadius: "10px", padding: "10px", backgroundColor: "#add8e6", color: "#000080" }}>Operations</th>
        </tr>
      </thead>
      <tbody>
        {customer.map((customer, index) => (
          <tr key={customer._id} style={{ height: "50px", backgroundColor: index % 2 === 0 ? "#e0ffff" : "#ffffff" }}>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f", fontWeight: "bold" }}>
              {index + 1}
            </td>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f", fontWeight: "bold" }}>
              {customer.customerName}
            </td>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f", fontWeight: "bold" }} className='max-md:hidden'>
              {customer.email}
            </td>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f", fontWeight: "bold" }} className='max-md:hidden'>
              {customer.mobileNumber}
            </td>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f", fontWeight: "bold" }}>
              {customer.vehicleNumber}
            </td>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f", fontWeight: "bold" }}>
              {customer.subject}
            </td>
            <td style={{ border: "2px solid #5f9ea0", borderRadius: "10px", textAlign: "center", color: "#2f4f4f" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                <Link to={`/customer/details/${customer._id}`}>
                  <BsInfoCircle style={{ fontSize: "24px", color: "#2e8b57" }} />
                </Link>
                <Link to={`/customer/edit/${customer._id}`}>
                  <AiOutlineEdit style={{ fontSize: "24px", color: "#ff8c00" }} />
                </Link>
                <PDFDownloadLink document={<CustomerReport customer={customer} />} fileName="FORM">
                  {({ loading }) =>
                    loading ? (
                      <button style={{ fontWeight: "bold", color: "#696969" }}>Loading...</button>
                    ) : (
                      <button style={{ fontWeight: "bold", color: "#000000" }}>Report</button>
                    )
                  }
                </PDFDownloadLink>
                <Link to={`/customer/delete/${customer._id}`}>
                  <MdOutlineDelete style={{ fontSize: "24px", color: "#ff4500" }} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
