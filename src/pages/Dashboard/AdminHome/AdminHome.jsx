import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  const handleApprove = async (classId) => {
    try {
      await axios.patch(`/classes/${classId}`, { status: "approved" });
      fetchClasses();
    } catch (error) {
      console.error("Failed to approve class", error);
    }
  };

  const handleDeny = async (classId) => {
    try {
      await axios.patch(`/classes/${classId}`, { status: "denied" });
      fetchClasses();
    } catch (error) {
      console.error("Failed to deny class", error);
    }
  };

  const handleSendFeedback = async (classId) => {
    const feedback = prompt("Enter feedback for the instructor:");
    if (feedback) {
      try {
        await axios.post(`/classes/${classId}/feedback`, { feedback });
        fetchClasses();
      } catch (error) {
        console.error("Failed to send feedback", error);
      }
    }
  };

  return (
    <div>
      <h2>Manage Classes</h2>
      <table>
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>
                <img src={classItem.classImage} alt={classItem.className} />
              </td>
              <td>{classItem.className}</td>
              <td>{classItem.instructorName}</td>
              <td>{classItem.instructorEmail}</td>
              <td>{classItem.availableSeats}</td>
              <td>{classItem.price}</td>
              <td>{classItem.status}</td>
              <td>
                <button
                  onClick={() => handleApprove(classItem._id)}
                  disabled={classItem.status !== "pending"}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeny(classItem._id)}
                  disabled={classItem.status !== "pending"}
                >
                  Deny
                </button>
                <button
                  onClick={() => handleSendFeedback(classItem._id)}
                  disabled={classItem.status !== "approved"}
                >
                  Send Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
