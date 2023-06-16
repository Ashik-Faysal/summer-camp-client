import React, { useEffect, useState } from 'react';
import InstructorsCard from './InstructorsCard';

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch(
      "https://summer-camp-school-server-ashik-faysal.vercel.app/instructor"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setInstructors(data); // Store the fetched data in state
      });
  }, []);
    return (
      <>
        <div>
          <h1 className="text-5xl font-bold text-orange-500 my-8 text-center">
            Popular Instructors
          </h1>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {instructors.map((instructor) => (
            <InstructorsCard key={instructor._id} instructor={instructor} />
          ))}
        </div>
      </>
    );
};

export default PopularInstructors;