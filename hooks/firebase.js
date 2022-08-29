import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";

export const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};


const app = initializeApp(clientCredentials);
const fbauth = getAuth(app);

export default fbauth
