import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import projectConfig from "../utils/data/project.config";

// Disabled firebase config as there are no ENV variables
const firebaseConfig = {};

let app = null;
// Mock analytics to prevent errors in components calling logEvent
let analytics = {
  logEvent: () => {}
};

export { analytics };
export default app;
