import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

export const Loader = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/login`);
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <br />
      <h1>Redirecting you in {count} seconds</h1>;
    </div>
  );
};
