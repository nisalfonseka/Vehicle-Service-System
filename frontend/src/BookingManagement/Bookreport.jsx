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
    color: "#333", // Dark color for company name
    fontWeight: "bold",
  },
  companyAddress: {
    fontSize: 10,
    color: "#666", // Gray color for address
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000000",
  },
  reportTime: {
    fontSize: 12,
    textAlign: "right",
    color: "#666", // Gray color for report time
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
    borderWidth: 0, // Remove all borders for a clean look
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1, // Subtle bottom border for each row
    borderBottomColor: "#E0E0E0", // Light gray line for row dividers
    backgroundColor: "#FAFAFA", // Light background for each row
  },
  tableRowAlternate: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFFFFF", // Alternating background color for rows
  },
  tableColHeader: {
    width: "40%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#000000", // Dark gray for headers
    backgroundColor: "#F7F7F7", // Slightly lighter gray background for header
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tableCol: {
    width: "60%",
    fontSize: 12,
    color: "#333", // Darker color for content for better readability
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#FF3333", // Red line at the top of footer
    paddingTop: 10,
    fontSize: 10,
    color: "#666", // Gray color for footer text
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#666",
  },
  footerContact: {
    fontSize: 10,
    color: "#666",
  },
});

const Bookreport = ({ books = [] }) => {
  // Get current date and time
  const currentTime = new Date().toLocaleString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
       <View style={styles.header}>
          <Image style={styles.logo} src="https://i.imgur.com/Y06SdPV.png" />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{"Ashan Auto Services"}</Text>
            <Text style={styles.companyAddress}>{"No 34, Colombo Road, Hanwella"}</Text>
            <Text style={styles.companyAddress}>{"+94-75675759"}</Text>
          </View>
        </View> 

        {/* Report generated time */}
        <Text style={styles.reportTime}>{"Report generated on: " + currentTime}</Text>

        {/* Title */}
        <Text style={styles.title}>{"Vehicle Service Report"}</Text>

        {/* Check if books has data */}
        {books.length === 0 ? (
          <Text>No booking data available</Text>
        ) : (
          books.map((book, index) => (
            <View key={index}>
              <View style={styles.table}>
                {[
                  { label: "Name", value: book.customerName },
                  { label: "Vehicle Type", value: book.vehicleType },
                  { label: "Vehicle Number", value: book.vehicleNumber },
                  {
                    label: "Selected Services",
                    value: Array.isArray(book.selectedServices)
                      ? book.selectedServices.join(", ")
                      : "",
                  },
                  { label: "Date", value: book.selectedDate },
                  { label: "Time", value: book.selectedTimeSlot },
                  { label: "Estimated Time", value: book.totalTime },
                  { label: "Estimated Cost", value: `LKR: ${book.totalCost}` },
                ].map((item, rowIndex) => (
                  <View
                    style={rowIndex % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
                    key={rowIndex}
                  >
                    <View style={styles.tableColHeader}>
                      <Text>{item.label}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text>{item.value || "N/A"}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{"Thank you for choosing our services!"}</Text>
          <Text style={styles.footerContact}>{"Contact us: +94-75675759"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Bookreport;
