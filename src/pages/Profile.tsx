import { Page, ScrollView, Text, FormField, Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dialog, Alert, Checkbox } from "@blueprintjs/core";
import { useContext, useEffect, useState } from "react";
import firebase, {
  getCollection,
  getDocument,
  useDocument,
} from "../database/Firebase";
import { FirebaseContext } from "../database/FirebaseContext";
import { NavigationContext } from "../navigation/NavigationContext";

function equalTo(ref: any, msg: any) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path,
    },
    test: function (value: any) {
      return value === this.resolve(ref);
    },
  });
}
// @ts-ignore
Yup.addMethod(Yup.string, "equalTo", equalTo);

const ChangePasswordScheme = Yup.object({
  oldPassword: Yup.string().required("Old password is a required field").min(8),
  newPassword: Yup.string().required("New password is a required field").min(8),
  retypeNewPassword: Yup.string()
    // @ts-ignore
    .equalTo(Yup.ref("newPassword"), "Both passwords must match")
    .required("Please retype your new password"),
});

const ProfileScheme = Yup.object({
  displayName: Yup.string()
    .required("Display name is a required field")
    .min(3, "Display names must be at least three characters in length"),
  photoURL: Yup.string().url("Invalid Photo URL"),
});

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => any;
}

const ChangePassword = ({ isOpen, title, onClose }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSharePublic, setIsSharePublic] = useState();

  return (
    <Dialog isOpen={isOpen} title={title} onClose={onClose}>
      <div style={{ marginTop: 10 }}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            retypeNewPassword: "",
          }}
          validationSchema={ChangePasswordScheme}
          onSubmit={(values, helpers) => {
            const user = firebase.auth().currentUser;
            if (!user || !user.email) return;
            var credential = firebase.auth.EmailAuthProvider.credential(
              user.email,
              values.oldPassword
            );

            user
              .reauthenticateWithCredential(credential)
              .then(() => user.updatePassword(values.newPassword))
              .then(onClose)
              .catch((err) => {
                console.log(err);
                alert(err.message);
              });
          }}
        >
          {(formikProps) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
                justifyItems: "center",
              }}
            >
              <FormField
                label="Old Password"
                formikProps={formikProps}
                fieldName="oldPassword"
                secureTextEntry={true}
              />
              <FormField
                label="New Password"
                formikProps={formikProps}
                fieldName="newPassword"
                secureTextEntry={true}
              />
              <FormField
                label="Retype New Password"
                formikProps={formikProps}
                fieldName="retypeNewPassword"
                secureTextEntry={true}
              />
              <div>
                <Button
                  intent="primary"
                  text="Update Password"
                  disabled={submitted}
                  onClick={() => formikProps.handleSubmit()}
                />
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export const Profile = () => {
  const { forceUpdate } = useContext(NavigationContext);
  const { currentUser, getCurrentUsername } = useContext(FirebaseContext);
  const [submitted, setSubmitted] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Profile Updated");

  const onClose = () => {
    setIsPasswordDialogOpen(false);
  };

  const onAlertClose = () => {
    setIsAlertOpen(false);
    forceUpdate();
  };

  return (
    <>
      <ChangePassword
        title="Change Password"
        onClose={onClose}
        isOpen={isPasswordDialogOpen}
      />
      <Alert
        canEscapeKeyCancel
        canOutsideClickCancel
        confirmButtonText={"Ok"}
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        icon={alertMessage === "Profile Updated" ? "info-sign" : "error"}
        intent={alertMessage === "Profile Updated" ? "primary" : "warning"}
      >
        <h3>{alertMessage}</h3>
      </Alert>
      <Page>
        <div style={{ flex: 1 }}>
          <Text>{`Logged is as ${getCurrentUsername()}`}</Text>
        </div>
        <Formik
          initialValues={{
            displayName: currentUser?.displayName ?? "",
            photoUrl: currentUser?.photoURL ?? "",
          }}
          validationSchema={ProfileScheme}
          onSubmit={(values, helpers) => {
            if (submitted || !currentUser) return;
            setSubmitted(true);

            const usernameDoc = firebase
              .firestore()
              .collection("/usernames")
              .doc(values.displayName);

            usernameDoc
              .get()
              .then((docRef) => {
                if (!docRef.exists) {
                  // Create username protection token
                  usernameDoc.set({
                    uid: currentUser.uid,
                  });
                  return;
                }
                const data = docRef.data();
                if (!data || data.uid !== currentUser.uid)
                  throw new Error("Username already exists");
              })
              .then(() =>
                currentUser.updateProfile({
                  displayName: values.displayName,
                  photoURL: values.photoUrl,
                })
              )
              .then(() =>
                firebase
                  .firestore()
                  .collection("/profiles")
                  .doc(currentUser.uid)
                  .set({
                    displayName: values.displayName,
                    photoURL: values.photoUrl,
                  })
              )
              .then(() => {
                setAlertMessage("Profile Updated");
                setIsAlertOpen(true);
              })
              .catch((error: Error) => {
                const message = error?.message ?? "Error saving your profile!";
                setAlertMessage(message);
                setIsAlertOpen(true);
              })
              .finally(() => setSubmitted(false));
          }}
        >
          {(formikProps) => (
            <>
              <FormField
                label="Display Name"
                formikProps={formikProps}
                fieldName="displayName"
              />
              <FormField
                label="Photo URL"
                formikProps={formikProps}
                fieldName="photoUrl"
              />
              <Button
                text="Save"
                disabled={submitted}
                onClick={() => formikProps.handleSubmit()}
              />

              {currentUser?.providerData[0]?.providerId === "password" ? (
                <Button
                  text="Change Password"
                  disabled={submitted}
                  onClick={() => setIsPasswordDialogOpen(true)}
                />
              ) : undefined}
            </>
          )}
        </Formik>
      </Page>
    </>
  );
};

export default Profile;
