import { useEffect } from "react";
import "../styles/Notification.css";

const Notification = ({ notification, setNotification }) => {
  const { message, type } = notification;

  useEffect(() => {
    const hideTimeout = setTimeout(() => setNotification(null), 5000);

    return () => clearTimeout(hideTimeout);
  }, []);

  return <div className={`alert ${type}`}>{message}</div>;
};

export default Notification;
