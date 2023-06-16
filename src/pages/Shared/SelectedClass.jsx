import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const SelectedClass = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const storedClasses =
      JSON.parse(localStorage.getItem("selectedClasses")) || [];
    setSelectedClasses(storedClasses);
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedClasses.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  const handleDelete = (itemId) => {
    const updatedClasses = selectedClasses.filter(
      (item) => item._id !== itemId
    );
    setSelectedClasses(updatedClasses);
    localStorage.setItem("selectedClasses", JSON.stringify(updatedClasses));
  };

  return (
    <>
      <Helmet>
        <title>Summer camp | Classes</title>
      </Helmet>
      <div>
        <h1 className="text-5xl font-bold text-orange-500 my-8 text-center">
          Selected Classes
        </h1>
        {selectedClasses.length === 0 ? (
          <p>No classes selected.</p>
        ) : (
          <div>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Instructor Name</th>
                  <th>Available Seats</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedClasses.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.instructorName}</td>
                    <td>{item.availableSeats}</td>
                    <td>{item.price}$</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center">
              <button className="btn btn-primary">
                Total Price: {calculateTotalPrice()}$
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectedClass;
