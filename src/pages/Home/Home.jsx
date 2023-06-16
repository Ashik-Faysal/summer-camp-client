import { useContext } from "react";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import Slider from "./Slider";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {
  const {user}= useContext(AuthContext)
  console.log(user);
  return (
    <div>
      <Slider />
      <PopularClasses />
      <PopularInstructors />
    </div>
  );
};

export default Home;
