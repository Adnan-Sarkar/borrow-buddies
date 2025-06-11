import { AlertNotificationRoot } from "react-native-alert-notification";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type TProps = { children: React.ReactNode };

const Providers = ({ children }: TProps) => {
  return (
    <Provider store={store}>
      <AlertNotificationRoot
        theme="dark"
        toastConfig={{
          autoClose: 1000,
        }}
      >
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </AlertNotificationRoot>
    </Provider>
  );
};

export default Providers;
