import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching popular classes:", error);
      });
  }, []);

  const handleSelected = (item) => {
    // Retrieve existing selected classes from local storage
    let selectedClasses =
      JSON.parse(localStorage.getItem("selectedClasses")) || [];

    // Check if the item already exists in the selected classes array
    const itemExists = selectedClasses.some(
      (selectedItem) => selectedItem._id === item._id
    );

    // If the item does not exist, add it to the array
    if (!itemExists) {
      selectedClasses.push(item);

      // Store the updated array back in local storage
      localStorage.setItem("selectedClasses", JSON.stringify(selectedClasses));
    }
  };



  return (
    <>
      <Helmet>
        <title>Summer camp | Home</title>
      </Helmet>
      <h1 className="text-5xl font-bold text-orange-500 my-8 text-center">
        Popular Class
      </h1>
      <div className="grid md:grid-cols-3 gap-3">
        {classes.map((item) => (
          <div
            key={item._id}
            className="card w-full bg-orange-400-100 shadow-xl"
          >
            <figure className="px-10 pt-10">
              <img src={item.image} alt="Class" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.name}</h2>
              <p>Instructor Name: {item.instructorName}</p>
              <p>Available Seats: {item.availableSeats}</p>
              <p>Course Price: {item.price}$</p>
              <div className="card-actions">
                {item.availableSeats && (
                  <button
                    onClick={() => handleSelected(item)}
                    className="btn btn-primary"
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularClasses;
