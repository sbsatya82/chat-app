import React from "react";
import { useAuthStore }  from "../store/useAuthStore.js";
const HomePage = () => {

  const { authUser } = useAuthStore();
  return (
    <div>
    </div>
  );
};

export default HomePage;
