
import './styles/globals.css'

import { useEffect } from "react";
import { getBundleConfig } from "./api/bundleApi";

function App() {
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

  return <div>Testing MSW API...</div>;
}

export default App;