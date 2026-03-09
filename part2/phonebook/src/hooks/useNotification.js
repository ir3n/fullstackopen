import { useState } from "react";

export const useNotification = (timeout = 5000) => {
  const [notification, setNotification] = useState(null);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), timeout);
  };

  return { notification, notify };
};
