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
    padding: 30,
    backgroundColor: "#FFFFFF", // Plain white background
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    color: "#333", // Dark color for company name
    fontWeight: "bold",
    textAlign: "center",
  },
  companyAddress: {
    fontSize: 12,
    color: "#666", // Gray color for address
    textAlign: "center",
  },
  separatorLine: {
    borderBottom: "1px solid #FF3333", // Red line to separate header
    marginVertical: 20,
    width: "100%",
  },
  title: {
    fontSize: 22,
    color: "#666", // Red color for the title
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "#FF3333", // Red color for bottom borders
    borderBottomStyle: "solid",
    padding: 10,
    fontWeight: "bold",
  },
  tableCol: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "#FF3333", // Red color for bottom borders
    borderBottomStyle: "solid",
    padding: 10,
  },
  tableCellHeader: {
    fontSize: 14,
    color: "#333", // Darker text for better readability
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 14,
    color: "#333", // Darker text for better readability
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    borderTop: "1px solid #FF3333", // Red line to end the page
    paddingTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: "#666", // Gray color for footer text
  },
});

const Bookreport = ({ book }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={"frontend/images/AaaaAuto (1).png"} />
        <Text style={styles.companyName}>Ashan Auto Services Pvt Ltd</Text>
        <Text style={styles.companyAddress}>
          No 32, Hanwella Rd, Hanwella. 0717564778
        </Text>
        <View style={styles.separatorLine} />
      </View>

      <Text style={styles.title}>Booking Details</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.customerName }</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Vehicle Type</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.vehicleType }</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Vehicle Number</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.vehicleNumber}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Selected Services</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.selectedServices }</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.selectedDate }</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Time</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.selectedTimeSlot }</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Estimated Time</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{book.totalTime}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Estimated Cost</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>LKR: {book.totalCost}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for choosing Ashan Auto Services Pvt Ltd.</Text>
      </View>
    </Page>
  </Document>
);

export default Bookreport;
