import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Registering fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/src/Home/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/src/Home/Roboto-Bold.ttf', fontWeight: 'bold' },
    { src: '/src/Home/Roboto-Italic.ttf', fontStyle: 'italic' },
  ],
});

// Helper function to get the current date and time
const getCurrentDateTime = () => {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString('en-US', options);
  const time = now.toLocaleTimeString('en-US');
  return `${date}, ${time}`;
};

// Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Roboto' },
  bookingContainer: { marginBottom: 10 },
  field: { marginBottom: 5, fontSize: 12, fontFamily: 'Roboto' },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#FF3333", // Red line under the header
    paddingBottom: 10,
  },
  logo: {
    width: 110,
    height: 55,
  },
  companyInfo: {
    textAlign: "right",
  },
  companyName: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
    fontFamily: 'Roboto',
  },
  companyAddress: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000000",
    fontFamily: 'Roboto',
  },
  dateTime: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#FF3333",
    paddingTop: 10,
    fontSize: 10,
    color: "#666",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#666",
    fontFamily: 'Roboto',
    fontWeight: "bold",
  },
  footerContact: {
    fontSize: 10,
    color: "#666",
    fontFamily: 'Roboto',
  },
  table: {
    width: "100%",
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: "#FF3333",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "normal",
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    width: "50%",
    fontFamily: 'Roboto', // Apply font here as well
  },
  tableCellLast: {
    borderRightWidth: 0,
  },
});

const Allbookreport = ({ books }) => {
  const currentDateTime = getCurrentDateTime();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="https://i.imgur.com/Y06SdPV.png" />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{"Ashan Auto Services"}</Text>
            <Text style={styles.companyAddress}>{"No 34, Colombo Road, Hanwella"}</Text>
            <Text style={styles.companyAddress}>{"+94-75675759"}</Text>
          </View>
        </View> 

        <Text style={styles.title}>Service Appointment Report</Text>

        {/* Display current date and time */}
        <Text style={styles.dateTime}>Generated on: {currentDateTime}</Text>
        
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: "10%" }]}>ID</Text>
            <Text style={styles.tableCell}>Customer Name</Text>
            <Text style={styles.tableCell}>Vehicle Number</Text>
            <Text style={styles.tableCell}>Contact Number</Text>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Time</Text>
            <Text style={styles.tableCell}>Services</Text>
            <Text style={styles.tableCell}>Status</Text>
          </View>

          {books.map((book, index) => (
            <View key={book._id} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "10%" }]}>{index + 1}</Text>
              <Text style={styles.tableCell}>{book.customerName}</Text>
              <Text style={styles.tableCell}>{book.vehicleNumber}</Text>
              <Text style={styles.tableCell}>{book.contactNumber}</Text>
              <Text style={styles.tableCell}>{book.selectedDate}</Text>
              <Text style={styles.tableCell}>{book.selectedTimeSlot}</Text>
              <Text style={[styles.tableCell, styles.tableCell]}>
                {Array.isArray(book.selectedServices) ? book.selectedServices.join(', ') : ''}
              </Text>
              <Text style={[styles.tableCell, styles.tableCell]}>
                {book.status === 'New' ? 'Pending' : book.status}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{"Thank you for choosing our services!"}</Text>
          <Text style={styles.footerContact}>{"Contact us: +94-75675759"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Allbookreport;
