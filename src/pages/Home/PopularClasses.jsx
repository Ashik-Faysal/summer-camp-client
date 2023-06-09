import React, { useEffect, useState } from "react";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("popularClass.json")
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
          <h1 className="text-5xl font-bold text-orange-500 my-8 text-center">Popular Class</h1>
      <div className="grid md:grid-cols-3 gap-3">
        {classes &&
          classes.map((item) => (
            <div
              key={item.className}
              className="card w-full bg-orange-400-100 shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img
                  src={item.classPicture}
                  alt="Class"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.className}</h2>
                <p>Number Of Students: {item.NumberOfStudents}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PopularClasses;
