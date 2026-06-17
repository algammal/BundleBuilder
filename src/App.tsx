
import './styles/globals.css'

import { useEffect } from "react";
import { getBundleConfig } from "./api/bundleApi";
import { useBundleStore } from "./features/store/bundleContext";

function App() {
  const { state, dispatch } =
    useBundleStore();
  useEffect(() => {
    async function testApi() {
      try {
        const data = await getBundleConfig();
        console.log("API SUCCESS:", data);
      } catch (error) {
        console.error("API FAILED:", error);
      }
    }

    testApi();
  }, []);

  return <div>
    <button
      onClick={() =>
        dispatch({
          type: "SELECT_VARIANT",
          payload: {
            productId: "cam-v4",
            variantId: "white",
          },
        })
      }
    >
      Select White
    </button>
    <button
      onClick={() =>
        dispatch({
          type: "SET_QUANTITY",
          payload: {
            productId: "cam-v4",
            variantId: "white",
            quantity: 2,
          },
        })
      }
    >
      Set Qty
    </button>
    <button
      onClick={() =>
        dispatch({
          type: "SELECT_VARIANT",
          payload: {
            productId: "cam-v4",
            variantId: "black",
          },
        })
      }
    >
      Set Qty
    </button>
    <button
      onClick={() =>
        dispatch({
          type: "SET_QUANTITY",
          payload: {
            productId: "cam-v4",
            variantId: "black",
            quantity: 1
          },
        })
      }
    >
      Set Qty
    </button>
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  </div>;
}

export default App;