import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF", // Plain white background
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 20,
    color: "#333", // Dark color for company name
    fontWeight: "bold",
    textAlign: "center",
  },
  companyAddress: {
    fontSize: 10,
    color: "#666", // Gray color for address
    textAlign: "center",
  },
  separatorLine: {
    marginVertical: 20,
    height: 2,
    backgroundColor: "#FF3333", // Red line to separate header
    width: "100%",
  },
  title: {
    fontSize: 18,
    color: "#000000", // Red color for the title
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: "#dddddd", // Red color for bottom borders
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: "bold",
    backgroundColor: "#F2F2F2", // Light gray background for headers
  },
  tableCol: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD", // Light gray for table borders
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableCellHeader: {
    fontSize: 12,
    color: "#333", // Darker text for better readability
  },
  tableCell: {
    fontSize: 12,
    color: "#666", // Gray color for cell content
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: "#FF3333", // Red line to end the page
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: "#666", // Gray color for footer text
  },
});

const Bookreport = ({ book }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src={"frontend/images/AaaaAuto (1).png"} />
        <Text style={styles.companyName}>Ashan Auto Services Pvt Ltd</Text>
        <Text style={styles.companyAddress}>
          No 32, Hanwella Rd, Hanwella. 0717564778
        </Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Vehicle Service Report</Text>

      {/* Table with Booking Details */}
      <View style={styles.table}>
        {[
          { label: "Name", value: book.customerName },
          { label: "Vehicle Type", value: book.vehicleType },
          { label: "Vehicle Number", value: book.vehicleNumber },
          { label: "Selected Services", value: Array.isArray(book.selectedServices) ? book.selectedServices.join(', ') : '' },
          { label: "Date", value: book.selectedDate },
          { label: "Time", value: book.selectedTimeSlot },
          { label: "Estimated Time", value: book.totalTime },
          { label: "Estimated Cost", value: `LKR: ${book.totalCost}` },
        ].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>{item.label}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for choosing Ashan Auto Services Pvt Ltd.</Text>
      </View>
    </Page>
  </Document>
);

export default Bookreport;
