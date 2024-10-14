import comlogo from "../components/comlogo.png"; // Import your local image
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from 'date-fns'; // Import date-fns for date formatting

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF3333",
  },
  logo: {
    width: 110,
    height: 60,
  },
  companyInfo: {
    textAlign: "right",
  },
  companyName: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
  },
  companyAddress: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000000",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#333",
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
    borderWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
  },
  tableRowAlternate: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  tableColHeader: {
    width: "40%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#000000",
    backgroundColor: "#F7F7F7",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tableCol: {
    width: "60%",
    fontSize: 12,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footer: {
    marginTop: 40, // Adjust margin to push footer to the bottom
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#FF3333",
    fontSize: 10,
    color: "#666",
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

const OrderReport = ({ order }) => {
  // Get current date and time
  const currentDate = format(new Date(), 'MMMM dd, yyyy');
  const currentTime = format(new Date(), 'hh:mm a');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={comlogo} /> {/* Local image used here */}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{"Ashan Auto Services"}</Text>
            <Text style={styles.companyAddress}>{"No 34, Colombo Road, Hanwella"}</Text>
            <Text style={styles.companyAddress}>{"+94-75675759"}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{"Order Report"}</Text>

        {/* Date and Time */}
        <Text style={styles.text}>{"Date: " + currentDate}</Text>
        <Text style={styles.text}>{"Time: " + currentTime}</Text>

        {/* Customer Information */}
        <Text style={styles.sectionTitle}>Customer Information:</Text>
        <Text style={styles.text}>Name: {order.customerInfo.name}</Text>
        <Text style={styles.text}>Address: {order.customerInfo.address}</Text>
        <Text style={styles.text}>Phone: {order.customerInfo.phone}</Text>
        <Text style={styles.text}>Email: {order.customerInfo.email}</Text>

        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Item</Text>
            <Text style={styles.tableColHeader}>Quantity</Text>
            <Text style={styles.tableColHeader}>Price (LKR)</Text>
          </View>
          {order.items.map((item, index) => (
            <View
              key={index}
              style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
            >
              <Text style={styles.tableCol}>{item.name}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text>Total Price: LKR {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{"Thank you for choosing our services!"}</Text>
          <Text style={styles.footerContact}>{"Contact us: +94-75675759"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderReport;
