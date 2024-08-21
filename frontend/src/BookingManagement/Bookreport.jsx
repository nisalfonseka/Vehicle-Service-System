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
    backgroundColor: "#E5E5F7", // Soft lavender background for a modern look
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    color: "#4A90E2", // Vibrant blue for the title
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  section: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#FFF", // White background for sections
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Slightly stronger shadow for depth
    borderLeft: "8px solid #4A90E2", // Accent border on the left for style
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333", // Darker text for better readability
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF5733", // Bright orange for labels
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 200,
    backgroundColor: "linear-gradient(135deg, #FFFFFF, #9013FE)", // Changed gradient to start with white
    zIndex: -1,
  },
  abstractShape1: {
    position: "absolute",
    top: 50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#50E3C2", // Light teal abstract shape
    opacity: 0.6,
  },
  abstractShape2: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#ff3333", // Changed to a vivid red color
    opacity: 0.4,
  },
});

const Bookreport = ({ book }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Abstract Shapes */}
      <View style={styles.gradient} />
      <View style={styles.abstractShape1} />
      <View style={styles.abstractShape2} />

      <View style={styles.header}>
        <Image style={styles.logo} src={"../images/AaaaAuto (1).png"} />
      </View>

      <Text style={styles.title}>Booking Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{book.customerName}</Text>

        <Text style={styles.label}>Vehicle Type:</Text>
        <Text style={styles.text}>{book.vehicleType}</Text>

        <Text style={styles.label}>Vehicle Number:</Text>
        <Text style={styles.text}>{book.vehicleNumber}</Text>

        <Text style={styles.label}>Selected Services:</Text>
        <Text style={styles.text}>{book.selectedServices}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.text}>{book.selectedDate}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.text}>{book.selectedTimeSlot}</Text>

        <Text style={styles.label}>Estimated Time:</Text>
        <Text style={styles.text}>{book.totalTime}</Text>

        <Text style={styles.label}>Estimated Cost:</Text>
        <Text style={styles.text}>LKR: {book.totalCost}</Text>
      </View>
    </Page>
  </Document>
);

export default Bookreport;
