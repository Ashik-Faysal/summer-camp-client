import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const InstructorDash = () => {
    const {user}= useContext(AuthContext)
  const [className, setClassName] = useState("");
  const [classImage, setClassImage] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new class using the form data and user information
    const newClass = {
      className,
      classImage,
      instructorName: user?.displayName,
      instructorEmail: user?.email,
      availableSeats,
      price,
      status: "pending",
    };

    // Send a request to the server to add the class to the database
    // You can use Axios or fetch for this

    // Reset form fields
    setClassName("");
    setClassImage("");
    setAvailableSeats(0);
    setPrice(0);
  };

  return (
    <div>
      <h2>Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="className">Class Name:</label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="classImage">Class Image:</label>
          <input
            type="text"
            id="classImage"
            value={classImage}
            onChange={(e) => setClassImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructor Name:</label>
          <input type="text" value={user?.displayName} readOnly />
        </div>
        <div>
          <label>Instructor Email:</label>
          <input type="email" value={user?.email} readOnly />
        </div>
        <div>
          <label htmlFor="availableSeats">Available Seats:</label>
          <input
            type="number"
            id="availableSeats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default InstructorDash;
