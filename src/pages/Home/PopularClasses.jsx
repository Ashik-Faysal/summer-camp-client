import React, { useEffect, useState } from "react";
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

  return (
    <>
      <Helmet>
        <title>Summer camp | Home</title>
      </Helmet>
      <h1 className="text-5xl font-bold text-orange-500 my-8 text-center">
        Popular Class
      </h1>
      <div className="grid md:grid-cols-3 gap-3">
        {classes &&
          classes.map((item) => (
            <div
              key={item.className}
              className="card w-full bg-orange-400-100 shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img src={item.image} alt="Class" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.name}</h2>
                <p>Instructor Name : {item.instructorName}</p>
                <p>Available Sets : {item.availableSeats}</p>
                <p>CoursePrice : {item.price}$</p>
                <div className="card-actions">
                  {item.availableSeats && (
                    <button className="btn btn-primary">Select</button>
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
