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
    paddingTop: 50, // Adjusted to accommodate header
    paddingBottom: 70, // Adjusted to accommodate footer
    paddingHorizontal: 40,
    backgroundColor: "#fefefe", // Slightly off-white for a softer look
  },
  headerFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#dc2626", // Red 500
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff", // White text
  },
  header: {
    top: 0,
  },
  footer: {
    bottom: 0,
    height: 70, // Increased height for a more informative footer
    paddingHorizontal: 20, // Added padding for cleaner layout
    justifyContent: "space-between", // Align footer items appropriately
    flexDirection: "column", // Allow multi-line text
  },
  headerText: {
    fontSize: 18, // Large enough to stand out
    fontWeight: "bold",
    color: "#ffffff", // White text
    textTransform: "uppercase",
  },
  footerText: {
    fontSize: 12,
    color: "#ffffff", // White for footer text
    textAlign: "center",
  },
  logo: {
    width: 80, // Slightly larger logo for better visibility
    height: 80,
  },
  title: {
    fontSize: 26, // Slightly larger font for the title
    color: "#222222", // Slightly softer black
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.2, // Added letter spacing for better readability
  },
  section: {
    marginVertical: 12, // Slightly larger margins for better separation
    padding: 18, // Increased padding for better text spacing
    backgroundColor: "#fafafa", // Very light gray background for sections
    borderRadius: 10, // Slightly more rounded corners
    borderColor: "#cccccc", // Softer gray border
    borderWidth: 1,
  },
  text: {
    fontSize: 13, // Slightly larger text for better readability
    marginBottom: 7, // Increased margin for spacing between text
    color: "#333333", // Softer black for better visual balance
  },
  label: {
    fontSize: 15, // Slightly larger label text
    fontWeight: "bold",
    color: "#111111", // Darker for labels to stand out
  },
  vehicleNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111111",
    backgroundColor: "#e6e6e6", // Slightly darker gray background
    padding: 8, // Increased padding for emphasis
    borderRadius: 6, // More rounded for smoother edges
  },
  contactNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111111",
    padding: 8, // Consistent padding with vehicle number
  },
  coloredSection: {
    backgroundColor: "#f2f2f2", // Slightly darker background for better contrast
    borderRadius: 8, // More rounded corners for a smoother look
    padding: 12, // Increased padding for a spacious feel
    marginVertical: 7, // Slightly larger margin for separation
    borderWidth: 1,
    borderColor: "#cccccc", // Softer gray for a cleaner border
  },
  highlightText: {
    color: "#111111", // Consistent with other text
    fontWeight: "bold",
  },
});

const CustomerReport = ({ customer }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={[styles.headerFooter, styles.header]}>
        <Text style={styles.headerText}>Ashan Auto Service</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Customer Ticket Details</Text>

        <View style={styles.coloredSection}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.text}>{customer.customerName}</Text>
        </View>

        <View style={styles.coloredSection}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{customer.email}</Text>
        </View>

        <View style={styles.coloredSection}>
          <Text style={styles.label}>Vehicle Number:</Text>
          <Text style={styles.vehicleNumber}>{customer.vehicleNumber}</Text>
        </View>

        <View style={styles.coloredSection}>
          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.contactNumber}>{customer.mobileNumber}</Text>
        </View>

        <View style={styles.coloredSection}>
          <Text style={styles.label}>Subject:</Text>
          <Text style={styles.text}>{customer.subject}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.headerFooter, styles.footer]}>
        <Text style={styles.footerText}>Ashan Auto Service | Quality Service, Reliable Care</Text>
        <Text style={styles.footerText}>Phone: 071 3745565 | Email: info@ashanauto.com</Text>
        <Text style={styles.footerText}>© 2002 Ashan Auto Service. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);

export default CustomerReport;
