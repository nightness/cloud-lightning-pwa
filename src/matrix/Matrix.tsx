import React, { useState, useContext, useEffect, useRef } from "react";
import {
  TextInput,
  Button,
  ThemeContext,
  Text,
  Page,
  FormField,
} from "../components";
import { FirebaseContext } from "../database/FirebaseContext";
import { IMatrixClientCreateOpts, MatrixClient } from "matrix-js-sdk";
import { Formik } from "formik";
import * as Yup from "yup";
import { MatrixContext } from "./MatrixContext";

const MatrixScheme = Yup.object({
  userId: Yup.string().required("User ID is a required field"),
  accessToken: Yup.string().required("Access token is a required field"),
});

export default () => {
  const { currentUser } = useContext(FirebaseContext);
  const { client, actions } = useContext(MatrixContext);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(client);
  }, [client]);

  return (
    <Page>
      <Formik
        initialValues={{
          userId: "",
          accessToken: "",
        }}
        validationSchema={MatrixScheme}
        onSubmit={(values, helpers) => {
          if (submitted) return;
          actions.loginWithAccessToken(
            "https://matrix-client.matrix.org",
            values.userId,
            values.accessToken
          ).then((client) => {
            console.log('client', client)
            console.log('client-isLoggedIn', client?.isLoggedIn())
            //setSubmitted(false);
          })
          setSubmitted(true);
        }}
      >
        {(formikProps) => (
          <>
            <FormField
              label="UserId"
              formikProps={formikProps}
              fieldName="userId"
            />
            <FormField
              label="Access Token"
              formikProps={formikProps}
              fieldName="accessToken"
            />
            <Button
              text="Connect"
              disabled={submitted}
              onClick={() => formikProps.handleSubmit()}
            />
          </>
        )}
      </Formik>
    </Page>
  );
};
