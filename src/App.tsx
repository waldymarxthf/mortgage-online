import { ActiveFieldFormProvider } from "~context/active-field-context";
import { MortgageCalculator } from "~pages/mortgage-calculator";
import { Provider } from "react-redux";
import { store } from "~store/store";

function App() {
  return (
    <Provider store={store}>
      <ActiveFieldFormProvider>
        <MortgageCalculator />
      </ActiveFieldFormProvider>
    </Provider>
  );
}

export default App;
