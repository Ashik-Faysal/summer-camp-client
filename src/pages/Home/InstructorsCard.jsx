import React from 'react';

const InstructorsCard = ({ instructor }) => {
    // console.log(instructor);
    const { name, image, email, students} = 
        instructor;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
              <h2 className="card-title">{name}</h2>
              <p>{email}</p>
              <p>Num_of_Students:{students}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Instructors Details</button>
        </div>
      </div>
    </div>
  );
};

export default InstructorsCard;