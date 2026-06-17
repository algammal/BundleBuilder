
import './styles/globals.css'

import { useEffect } from "react";
import { getBundleConfig } from "./api/bundleApi";
import { BundleBuilderPage } from "./pages/BundleBuilderPage";


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

  return <div>
    <BundleBuilderPage />
  </div>;
}

export default App;