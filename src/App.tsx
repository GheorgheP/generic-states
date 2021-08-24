import "./styles.css";
import { Provider } from "react-redux";
import { getStore } from "./store";
import { Main } from "./containers/Main";

export default function App() {
  const store = getStore();
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
