import React, { useCallback, useState } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { firebaseConfig } from "@utils/firebase"
import {
  Authenticator,
  // buildCollection,
  // buildProperty,
  // EntityReference,
  FirebaseCMSApp,
  FirebaseLoginView,
  FirebaseLoginViewProps
} from "@camberi/firecms";

import { authorsCollection } from "./collections/authors/authors";
import { categoriesCollection } from "./collections/categories/categories";
import { comicsCollection } from "./collections/comics/comics";
import { newsCollection } from "./collections/news/news";
// import { settingsCollection } from "./collections/settings/settings";
import { tagsCollection } from "./collections/tags/tags";
import { userRolesCollection } from "./collections/userRoles/userRoles";
import { usersCollection } from "./collections/users/users";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { db } from "@utils/firebase"
import { collection, doc, getDoc } from "firebase/firestore"

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
    user,
    authController
  }) => {

    const uid = user?.uid;
    const userRolesColl = collection(db, "user_roles");
    const userRolesRef = doc(userRolesColl, uid);
    const userRoles = await getDoc(userRolesRef);
    const roles = userRoles.get("roles") as Array<string>
    if(!roles.includes("admin")) {
      return false;
    }
    // This is an example of retrieving async data related to the user
    // and storing it in the user extra field.
    const sampleUserRoles = await Promise.resolve(["admin"]);
    authController.setExtra(sampleUserRoles);

    return true;
  }, []);

  const ShitFuckLoginView = function({ allowSkipLogin, logo, signInOptions, firebaseApp, authController, noUserComponent, disabled, additionalComponent, notAllowedError }: FirebaseLoginViewProps){
    return FirebaseLoginView({
      allowSkipLogin, 
      logo, 
      signInOptions, 
      firebaseApp, 
      authController, 
      noUserComponent, 
      disabled, 
      additionalComponent, 
      notAllowedError,
      disableSignupScreen: true
    })
  }

  return <FirebaseCMSApp
    name={"Comics Backend"}
    authentication={myAuthenticator}
    collections={[authorsCollection, categoriesCollection, comicsCollection, newsCollection, tagsCollection, userRolesCollection, usersCollection]}
    firebaseConfig={firebaseConfig}
    signInOptions={["password"]}
    LoginView={ShitFuckLoginView}
  />;
}