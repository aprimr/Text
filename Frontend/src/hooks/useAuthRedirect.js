import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    navigate("/chat");
  }, []);
};

export default useAuthRedirect;
