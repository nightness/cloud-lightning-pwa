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

const MatrixScheme = Yup.object({
  userId: Yup.string().required("User ID is a required field"),
  accessToken: Yup.string().required("Access token is a required field"),
});

export default () => {
  const { currentUser } = useContext(FirebaseContext);
  const client = useRef<MatrixClient>();
  const [submitted, setSubmitted] = useState(false);

  const connect = () => {
    const ops: IMatrixClientCreateOpts = {
      baseUrl: "https://matrix-client.matrix.org",
      // accessToken: myAccessToken,
      // userId: myUserId,
    };

    client.current = new MatrixClient(ops);
  };

  useEffect(() => {
    //console.log(client.current);
  }, []);

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
          // setSubmitted(true);
          // currentUser
          //   ?.updateProfile({
          //     displayName: values.displayName,
          //     photoURL: values.photoUrl,
          //   })
          //   .then(() => {
          //     setSubmitted(false);
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //     setSubmitted(false);
          //   });
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
              title="Connect"
              disabled={submitted}
              onPress={formikProps.handleSubmit}
            />
          </>
        )}
      </Formik>
    </Page>
  );
};
