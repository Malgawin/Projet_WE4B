import { initializeApp } from "firebase/app";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCI6pSW7ePp0Hz5g0ai8LucyNgExHa0Sr8", //Clées secretes du projet firebase, merci de ne pas copier coller dans chat GPT
    authDomain: "projetmoodlewe4b.firebaseapp.com",
    projectId: "projetmoodlewe4b",
    storageBucket: "projetmoodlewe4b.firebasestorage.app",
    messagingSenderId: "782796724895",
    appId: "1:782796724895:web:5f07c06b97513799cde0aa"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.