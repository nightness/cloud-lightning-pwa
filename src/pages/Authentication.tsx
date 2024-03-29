import { useState, useContext, useEffect } from "react";
import {
  Text,
  Button,
  ActivityIndicator,
  ThemeContext,
  FormField,
  Page,
} from "../components";
import {
  FirebaseError,
  UserCredential,
  GoogleAuthProvider,
  getAuth,
} from "../database/Firebase";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../database/FirebaseContext";
import { CSSProperties } from "react";
import { useHistory } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface AuthenticationFields {
  displayName: string;
  eMail: string;
  password: string;
  confirmPassword: string;
}

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

const PasswordResetScheme = Yup.object({
  eMail: Yup.string()
    .required("E-mail is a required field")
    .email("Please enter a valid e-mail address"),
});

const LoginScheme = Yup.object({
  eMail: Yup.string()
    .required("E-mail is a required field")
    .email("Please enter a valid e-mail address"),
  password: Yup.string().required("Password is a required field").min(8),
});

const RegistrationScheme = Yup.object({
  displayName: Yup.string().required("Display name is a required field").min(3),
  eMail: Yup.string()
    .required("E-mail is a required field")
    .email("Please enter a valid e-mail address")
    .matches(
      /^((?!@gmail.com).)*$/gim,
      "Use the Google Sign-In button to automatically sign-in with your Google"
    ),
  password: Yup.string().required("Password is a required field").min(8),
  confirmPassword: Yup.string()
    // @ts-ignore
    .equalTo(Yup.ref("password"), "Both passwords must match")
    .required("Please retype your password"),
});

//type Stage = 'init' | 'user-login' | 'logged-in' | 'logging-out'
enum Stage {
  Init = 0,
  Ready = 1,
  Authenticating = 2,
  LoggedIn = 3,
  LoggedOut = 4,
}

export const Authentication = () => {
  const { currentUser, getCurrentUsername } = useContext(FirebaseContext);
  const [mode, setMode] = useState<"login" | "register" | "password-reset">(
    "login"
  );
  const [scheme, setScheme] = useState<object>();
  const [stage, setStage] = useState<Stage>(Stage.Init);
  const auth = getAuth();
  const history = useHistory();
  const { activeTheme, setActiveTheme } = useContext(ThemeContext);

  const softReset = (formikProps: FormikProps<any>) => {
    formikProps.setValues({
      displayName: "",
      eMail: formikProps.values.eMail,
      password: "",
      confirmPassword: "",
    });
    formikProps.setTouched({
      displayName: false,
      eMail: false,
      password: false,
      confirmPassword: false,
    });
    formikProps.setErrors({
      displayName: undefined,
      eMail: undefined,
      password: undefined,
      confirmPassword: undefined,
    });
  };

  const onSignUpPress = (formikProps: FormikProps<any>) => {
    setMode("register");
    softReset(formikProps);
  };

  const onGotoLoginPress = (formikProps: FormikProps<any>) => {
    setMode("login");
    softReset(formikProps);
  };

  const onSuccessfulLogin = ({ user }: UserCredential) => {
    setStage(Stage.LoggedIn);
    // updateProfile(user, {
    //     //  displayName: // some displayName,
    //     //  photoURL: // some photo url
    //   })
    //   .catch(console.error)
    //   .finally(() => history.push("/"));
    history.push("/");
  };

  const onRegisterPress = async (
    values: AuthenticationFields,
    helpers: FormikHelpers<any>
  ) => {
    setStage(Stage.Authenticating);
    createUserWithEmailAndPassword(getAuth(), values.eMail, values.password)
      .then(onSuccessfulLogin)
      .catch((error: FirebaseError) => {
        setStage(Stage.Ready);
        alert(error.message);
      });
  };

  const signInWithGoogle = async (formikProps: FormikProps<any>) => {
    const provider = new GoogleAuthProvider();
    setStage(Stage.Authenticating);
    signInWithPopup(getAuth(), provider)
      .then(onSuccessfulLogin)
      .catch((error) => {
        setStage(Stage.Ready);
        alert(error);
      });
    formikProps.resetForm();
  };

  const signInWithEMail = (
    values: AuthenticationFields,
    helpers: FormikHelpers<any>
  ) => {
    setStage(Stage.Authenticating);
    signInWithEmailAndPassword(getAuth(), values.eMail, values.password)
      .then((user) => {
        helpers.resetForm();
        onSuccessfulLogin(user);
      })
      .catch((err) => {
        alert(err);
        setStage(Stage.Ready);
      });
  };

  const sendPasswordReset = (
    values: AuthenticationFields,
    helpers: FormikHelpers<any>
  ) => {
    sendPasswordResetEmail(getAuth(), values.eMail)
      .then(() => setMode("login"))
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    switch (mode) {
      case "login":
        setScheme(LoginScheme);
        break;
      case "register":
        setScheme(RegistrationScheme);
        break;
      case "password-reset":
        setScheme(PasswordResetScheme);
    }
  }, [mode]);

  useEffect(() => {
    if (!currentUser && stage === Stage.LoggedIn) setStage(Stage.LoggedOut);
  }, [currentUser]);

  useEffect(() => {
    setStage(Stage.Ready);
  }, []);

  if (stage !== Stage.LoggedIn && stage !== Stage.Ready) {
    return <ActivityIndicator size="gigantic" fullscreen />;
  } else if (currentUser) {
    return (
      <Page>
        <div style={{ flex: 1 }}>
          <Text size={2}>{`Logged is as ${getCurrentUsername()}`}</Text>
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ marginRight: "10px" }}
              text="Toggle Theme"
              onClick={() => {
                if (!setActiveTheme) return;
                setActiveTheme(activeTheme === "Dark" ? "Light" : "Dark");
              }}
            />
            <Button
              text="Logout"
              onClick={() => {
                auth.signOut().finally(() => {
                  // Reload the page to clean out any state from previous login
                  window.location.assign(`/auth`);
                });
              }}
            />
          </div>
        </div>
      </Page>
    );
  }
  // Logged Out
  return (
    <Page>
      <Formik
        initialValues={{
          displayName: "",
          eMail: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={scheme}
        onSubmit={(values, helpers) => {
          switch (mode) {
            case "login":
              signInWithEMail(values, helpers);
              break;
            case "register":
              onRegisterPress(values, helpers);
              break;
            case "password-reset":
              sendPasswordReset(values, helpers);
          }
        }}
      >
        {(formikProps) => (
          <>
            {mode === "register" ? (
              <FormField
                label="Full Name"
                formikProps={formikProps}
                fieldName="displayName"
              />
            ) : (
              <></>
            )}
            <FormField
              formikProps={formikProps}
              fieldName="eMail"
              label="E-Mail"
            />
            {mode !== "password-reset" ? (
              <FormField
                formikProps={formikProps}
                secureTextEntry={true}
                label="Password"
                fieldName="password"
              />
            ) : (
              <></>
            )}

            {mode === "register" ? (
              <>
                <FormField
                  formikProps={formikProps}
                  secureTextEntry={true}
                  label="Confirm Password"
                  fieldName="confirmPassword"
                />
                <div style={footerView}>
                  <Button
                    text="Create Account"
                    onClick={() => formikProps.handleSubmit()}
                  />
                </div>
                <div style={footerView}>
                  <Text style={{ fontSize: 16 }}>Already got an account?</Text>
                  <Button
                    text="Log in"
                    onClick={() => onGotoLoginPress(formikProps)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {mode === "password-reset" ? (
              <>
                <div style={footerView}>
                  <Button
                    text="Reset Password"
                    onClick={() => formikProps.handleSubmit()}
                    style={{ marginTop: 5 }}
                  />
                  <Button
                    text="Cancel"
                    onClick={() => onGotoLoginPress(formikProps)}
                    style={{ marginTop: 5 }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {mode === "login" ? (
              <>
                <div style={footerView}>
                  <Button
                    text="Log in"
                    onClick={() => formikProps.handleSubmit()}
                  />
                  <Button
                    text="Google Sign-In"
                    onClick={() => signInWithGoogle(formikProps)}
                    style={{ margin: 5 }}
                  />
                </div>
                <div style={{ flexDirection: "row" }}>
                  <div style={footerView}>
                    <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
                    <Button
                      text="Sign up"
                      onClick={() => onSignUpPress(formikProps)}
                    />
                  </div>
                  <div style={footerView}>
                    <Text style={{ fontSize: 16 }}>
                      Did you forget your password?
                    </Text>
                    <Button
                      text="Password Reset"
                      onClick={() => setMode("password-reset")}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Formik>
      <div style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}>
        <Text>{`Cloud Lightning Messenger - Beta`}</Text>
      </div>
    </Page>
  );
};

export default Authentication;

const footerView: CSSProperties = {
  flex: 1,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
};
