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
    backgroundColor: "#f2f2f2", // Light gray background for contrast
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2px solid #333", // Add a border at the bottom
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#cc0000", // Bright red for the title to match the automotive theme
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase", // Uppercase text for a bold effect
    letterSpacing: 2, // Spacing between letters for a modern look
  },
  section: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#ffffff", // White background for sections
    borderRadius: 10,
    borderColor: "#cc0000", // Red border for sections
    borderWidth: 2,
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)", // More prominent shadow for depth
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333", // Darker text for better readability
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#cc0000", // Red for labels
  },
  infoBlock: {
    marginBottom: 10,
  },
  vehicleNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366", // Dark blue for emphasis
    backgroundColor: "#e6e6e6", // Light gray background for the vehicle number
    padding: 8,
    borderRadius: 5,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#cc0000", // Red for emphasis
    padding: 8,
  },
});

const CustomerReport = ({ customer }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={"AaaaAuto (1).png"} />
        <Text style={styles.title}>Customer Ticket Details</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.text}>{customer.customerName}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{customer.email}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Vehicle Number:</Text>
          <Text style={styles.vehicleNumber}>{customer.vehicleNumber}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.contactNumber}>{customer.mobileNumber}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Subject:</Text>
          <Text style={styles.text}>{customer.subject}</Text>
        </View>
      </View>

      {/* You can add images or other elements as needed */}
    </Page>
  </Document>
);

export default CustomerReport;
