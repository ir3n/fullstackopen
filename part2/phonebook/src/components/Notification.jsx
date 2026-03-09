import "../styles/Notification.css";

const Notification = ({ notification }) => {
  const { message, type } = notification;

  return <div className={`alert ${type}`}>{message}</div>;
};

export default Notification;
