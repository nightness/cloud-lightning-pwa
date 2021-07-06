import { Container, ScrollView, Text, FormField } from "../components";
import { Formik, FormikHelpers, FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { H1, Button, Dialog } from "@blueprintjs/core";
import { useState } from "react";

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
  displayName: Yup.string().required("Display name is a required field").min(3),
  eMail: Yup.string()
    .required("E-mail is a required field")
    .email("Please enter a valid e-mail address")
    .matches(
      /^((?!@gmail.com).)*$/gim,
      "Use the Google Sign-In button to automatically sign-in with your Google"
    ),
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
      <div style={{ marginTop: 10}}>
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
                  text="Save"
                  disabled={submitted}
                  onClick={formikProps.handleSubmit as React.EventHandler<any>}
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
  const [submitted, setSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onClose = () => {
    setIsDialogOpen(false);
  };

  // Can only change a password with email/password accounts

  return (
    <>
      <ChangePassword
        title="Change Password"
        onClose={onClose}
        isOpen={isDialogOpen}
      />
      <Container>
        <ScrollView style={{ flex: 1 }}>
          <Formik
            initialValues={{
              displayName: "",
              eMail: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={ProfileScheme}
            onSubmit={(values, helpers) => {
              console.log("onSubmit", values, helpers);
              //setSubmitted(true);
              setIsDialogOpen(true);
            }}
          >
            {(formikProps) => (
              <>
                <FormField
                  label="Full Name"
                  formikProps={formikProps}
                  fieldName="displayName"
                />
                <FormField
                  disabled={
                    formikProps.values.eMail
                      .toLowerCase()
                      .indexOf(".gmail.com") >= 0
                  }
                  formikProps={formikProps}
                  fieldName="eMail"
                  label="E-Mail"
                />
                <Button
                  title="Save"
                  text="Save"
                  disabled={submitted}
                  onClick={formikProps.handleSubmit as React.EventHandler<any>}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </Container>
    </>
  );
};

export default Profile;
