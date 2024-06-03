/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, useReducer, createContext, useCallback } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "REMOVE":
      return "";
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  // useCallback hook to memoize callbacks so dont have to call them again
  // can also use to create custom functionality which otherwise
  // would not be possible as hooks need to be used in components or in custom components
  const setNotifAndTimeout = useCallback((message) => {
    notificationDispatch({ type: "SET", payload: message });
    setTimeout(() => notificationDispatch({ type: "REMOVE" }), 5000);
  }, []);

  return (
    // important to provide the context as having context is not enough, you
    // need to still provides the values associated with the context
    // which is only available within the provider
    <NotificationContext.Provider value={[notification, setNotifAndTimeout]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useSetNotifAndTimeout = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
