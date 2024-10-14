import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import comlogo from "../components/comlogo.png"; // Import your local image

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
    width: "30%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#000000",
    backgroundColor: "#F7F7F7",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tableCol: {
    width: "70%",
    fontSize: 12,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footer: {
    marginTop: 40,
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

const SalesReport = ({ totalRevenue, pendingOrders, completedOrders, canceledOrders, orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src={comlogo} /> {/* Local image used here */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{"Ashan Auto Services"}</Text>
          <Text style={styles.companyAddress}>{"No 34,Colombo Road, Hanwella"}</Text>
          <Text style={styles.companyAddress}>{"+94-75675759"}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{"Sales Report"}</Text>
{/* Date */}
<Text style={styles.date}>{"Generated on: " + formatDate()}</Text> {/* Add date here */}
      {/* Sales Summary */}
      <Text style={styles.sectionTitle}>Sales Summary:</Text>
      <Text style={styles.text}>Total Revenue: LKR {totalRevenue}</Text>
      <Text style={styles.text}>Pending Orders: {pendingOrders}</Text>
      <Text style={styles.text}>Completed Orders: {completedOrders}</Text>
      <Text style={styles.text}>Canceled Orders: {canceledOrders}</Text>

      {/* Orders Breakdown */}
      <Text style={styles.sectionTitle}>Orders Breakdown:</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Order ID</Text>
          <Text style={styles.tableColHeader}>Customer Name</Text>
          <Text style={styles.tableColHeader}>Status</Text>
          <Text style={styles.tableColHeader}>Total Price (LKR)</Text>
        </View>
        {orders.map((order, index) => (
          <View
            key={index}
            style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
          >
            <Text style={styles.tableCol}>{order._id}</Text>
            <Text style={styles.tableCol}>{order.customerInfo.name}</Text>
            <Text style={styles.tableCol}>{order.status}</Text>
            <Text style={styles.tableCol}>
              {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{"Thank you for choosing our services!"}</Text>
        <Text style={styles.footerContact}>{"Contact us: +94-75675759"}</Text>
      </View>
    </Page>
  </Document>
);

export default SalesReport;
