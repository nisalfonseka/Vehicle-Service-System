import jsPDF from 'jspdf';

const VehicleReport = ({ vehicle }) => {
  const calculateDaysUntilNextMaintenance = (lastMaintenance, maintenanceCycle) => {
    const lastDate = new Date(lastMaintenance);
    const nextMaintenanceDate = new Date(lastDate);
    nextMaintenanceDate.setFullYear(lastDate.getFullYear() + maintenanceCycle);

    const today = new Date();
    const timeDifference = nextMaintenanceDate - today;

    const daysUntilNextMaintenance = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysUntilNextMaintenance >= 0 ? daysUntilNextMaintenance : 0; // Return 0 if overdue
  };

  const getReminderMessage = (daysUntilNextMaintenance) => {
    if (daysUntilNextMaintenance === 0) {
      return "Overdue for maintenance!";
    }
    if (daysUntilNextMaintenance <= 5) {
      return "Maintenance due soon!";
    }
    return "";
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(18);
    doc.text('Ashan Auto Service', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text('Vehicle Maintainance Report', 105, 30, null, null, 'center');
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 105, 35, null, null, 'center');

    doc.line(10, 40, 200, 40); // Line after the header

    // Add vehicle details
    doc.setFontSize(14);
    doc.text(`Vehicle Number: ${vehicle.vehicleNo}`, 10, 50);
    doc.text(`Chassis Number: ${vehicle.chassisNo}`, 10, 60);
    doc.text(`Vehicle Type: ${vehicle.vehicleType}`, 10, 70);
    doc.text(`Fuel Type: ${vehicle.fuelType}`, 10, 80);
    doc.text(`Year: ${vehicle.year}`, 10, 90);
    doc.text(`Last Maintenance: ${vehicle.lastMaintenance}`, 10, 100);

    const daysUntilNextMaintenance = calculateDaysUntilNextMaintenance(vehicle.lastMaintenance, 2);
    doc.text(`Days Until Next Maintenance: ${daysUntilNextMaintenance} days`, 10, 110);

    const reminderMessage = getReminderMessage(daysUntilNextMaintenance);
    if (reminderMessage) {
      doc.setTextColor(255, 0, 0);
      doc.text(reminderMessage, 10, 120);
    }

    // Add footer
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.line(10, 280, 200, 280); // Line before the footer
    doc.text('Vehicle Management System © 2024', 105, 285, null, null, 'center');
    doc.text('Confidential Report', 105, 290, null, null, 'center');

    doc.save(`vehicle-report-${vehicle._id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Download Report
    </button>
  );
};

export default VehicleReport;
