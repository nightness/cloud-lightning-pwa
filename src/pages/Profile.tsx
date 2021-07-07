import { Container, ScrollView, Text, FormField, Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dialog, Alert } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { FirebaseContext } from "../database/FirebaseContext";

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

  return (
    <Dialog isOpen={isOpen} title={title} onClose={onClose}>
      <div style={{ marginTop: 10 }}>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ChangePasswordScheme}
          onSubmit={(values, helpers) => {
            setSubmitted(true);
            onClose();
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
                  title="Save"
                  disabled={submitted}
                  onPress={formikProps.handleSubmit}
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
  const { currentUser } = useContext(FirebaseContext);
  const [submitted, setSubmitted] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const onClose = () => {
    setIsPasswordDialogOpen(false);
  };

  const onAlertClose = () => {
    setIsAlertOpen(false);
  };

  // Can only change a password with email/password accounts
  const username = currentUser?.displayName
    ? `${currentUser?.displayName} (${currentUser?.email})`
    : undefined || currentUser?.email || currentUser?.uid;

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
        isOpen={isAlertOpen}
        confirmButtonText={"Ok"}        
        onClose={onAlertClose}
        icon='info-sign'        
        intent='primary'
      >
        <h3>Profile Updated</h3>
      </Alert>
      <Container>
        <ScrollView style={{ flex: 1 }}>
          <div style={{ flex: 1 }}>
            <Text>{`Logged is as ${username}`}</Text>
          </div>
          <Formik
            initialValues={{
              displayName: currentUser?.displayName ?? "",
              photoUrl: currentUser?.photoURL ?? "",
            }}
            validationSchema={ProfileScheme}
            onSubmit={(values, helpers) => {
              if (submitted) return
              setSubmitted(true);
              currentUser
                ?.updateProfile({
                  displayName: values.displayName,
                  photoURL: values.photoUrl,
                })
                .then(() => {                  
                  setSubmitted(false);
                  setIsAlertOpen(true);
                })
                .catch((err) => {
                  console.error(err)
                  setSubmitted(false)
                });
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
                  title="Save"
                  disabled={submitted}
                  onPress={formikProps.handleSubmit}
                />
              </>
            )}
          </Formik>
          {currentUser?.providerData[0]?.providerId === "password" ? (
            <Button
              title="Change Password"
              disabled={submitted}
              onPress={() => setIsPasswordDialogOpen(true)}
            />
          ) : undefined}
        </ScrollView>
      </Container>
    </>
  );
};

export default Profile;
