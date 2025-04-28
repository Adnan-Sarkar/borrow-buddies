import { store } from "../redux/store";
import { Provider } from "react-redux";

type TProps = { children: React.ReactNode };

const Providers = ({ children }: TProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
