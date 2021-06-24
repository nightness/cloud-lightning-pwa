import React, { useState, useContext, useEffect } from 'react'
import {
    Image,
    Text,
    Button,
    ActivityIndicator,
    DisplayError,
    ThemeContext,
    FormField,
    ScrollView
} from '../components'
import { Icon } from '@blueprintjs/core'
import {
    firebaseAuth,
    FirebaseError,
    getAuth,
    GoogleAuthProvider,
} from '../database/Firebase'
import { Formik, FormikHelpers, FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../database/FirebaseContext'
import { CSSProperties } from 'styled-components'
//import { Styles } from '../app/Styles'
// import { StackNavigationProp } from '@react-navigation/stack'
// import { LinearGradient } from 'expo-linear-gradient'
//import { GradientColors } from '../app/GradientColors'

interface AuthenticationProps {
    customToken?: string
}

interface AuthenticationFields {
    displayName: string
    eMail: string
    password: string
    confirmPassword: string
}

function equalTo(ref: any, msg: any) {
    return Yup.mixed().test({
        name: 'equalTo',
        exclusive: false,
        message: msg || '${path} must be the same as ${reference}',
        params: {
            reference: ref.path,
        },
        test: function (value: any) {
            return value === this.resolve(ref);
        },
    });
}
// @ts-ignore
Yup.addMethod(Yup.string, 'equalTo', equalTo);

const PasswordResetScheme = Yup.object({
    eMail: Yup.string()
        .required('E-mail is a required field')
        .email('Please enter a valid e-mail address')
})

const LoginScheme = Yup.object({
    eMail: Yup.string()
        .required('E-mail is a required field')
        .email('Please enter a valid e-mail address'),
    password: Yup.string()
        .required('Password is a required field')
        .min(8),
})

const RegistrationScheme = Yup.object({
    displayName: Yup.string()
        .required('Full name is a required field')
        .min(3),
    eMail: Yup.string()
        .required('E-mail is a required field')
        .email('Please enter a valid e-mail address')
        .matches(/^((?!@gmail.com).)*$/igm, 'Use the Google Sign-In button to automatically sign-in with your Google'),
    password: Yup.string()
        .required('Password is a required field')
        .min(8),
    confirmPassword: Yup.string()
        // @ts-ignore
        .equalTo(Yup.ref('password'), 'Both passwords must match')
        .required('Please retype your password')
})

export const Authentication = ({ customToken }: AuthenticationProps) => {
    const { setProfile: firestoreSetProfile } = useContext(FirebaseContext)
    const [mode, setMode] = useState<'login' | 'register' | 'password-reset'>('login')
    const [scheme, setScheme] = useState<object>()
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(undefined)
    const { activeTheme, setActiveTheme } = useContext(ThemeContext)
    const auth = firebaseAuth()

    const { currentUser } = getAuth()
    useEffect(() => {
        // if (currentUser)
        //     navigation.replace('Main')
    }, [currentUser])

    const softReset = (formikProps: FormikProps<any>) => {
        formikProps.setValues({
            displayName: '',
            eMail: formikProps.values.eMail,
            password: '',
            confirmPassword: ''
        })
        formikProps.setTouched({
            displayName: false,
            eMail: false,
            password: false,
            confirmPassword: false
        })
        formikProps.setErrors({
            displayName: undefined,
            eMail: undefined,
            password: undefined,
            confirmPassword: undefined
        })
    }

    const onSignUpPress = (formikProps: FormikProps<any>) => {
        setMode('register')
        softReset(formikProps)
    }

    const onGotoLoginPress = (formikProps: FormikProps<any>) => {
        setMode('login')
        softReset(formikProps)
    }

    const onRegisterPress = async (values: AuthenticationFields, helpers: FormikHelpers<any>) => {
        const setProfile = async () => {
            console.log(values)
            await firestoreSetProfile({
                displayName: values.displayName
            })
            //navigation.navigate('LoginActivity')
        }

        auth.createUserWithEmailAndPassword(values.eMail, values.password)
            .then(() => {
                setIsLoading(true)
            })
            .then(setProfile)
            .catch((error: FirebaseError) => {
                setSubmitted(false)
                setIsLoading(false)
                alert(error.message)
            })
    }

    const signInWithGoogle = async (formikProps: FormikProps<any>) => {
        const provider = new GoogleAuthProvider()
        auth.signInWithPopup(provider)
            .catch((error) => {
                setSubmitted(false)
                alert(error)
            })
        // navigation.navigate('LoginActivity')
        formikProps.resetForm()
    }

    const onLoginPress = async (values: AuthenticationFields, helpers: FormikHelpers<any>) => {
        setSubmitted(true)
        try {
            await auth.signInWithEmailAndPassword(values.eMail, values.password)
            //navigation.navigate('LoginActivity')
        }
        catch (error) {
            setSubmitted(false)
            alert(error)
        }
    }

    const sendPasswordReset = (values: AuthenticationFields, helpers: FormikHelpers<any>) => {
        setSubmitted(true)
        auth.sendPasswordResetEmail(values.eMail)
            .then(() => {
                setMode('login')
                setSubmitted(false)
            })
            .catch((error) => {
                alert(error)
                setSubmitted(false)
            })
    }

    useEffect(() => {
        if (activeTheme === 'Dark') setActiveTheme('Light')
    })

    useEffect(() => {
        if (customToken) {
            auth.signInWithCustomToken(customToken)
                .then(() => {
                    //navigation.navigate('LoginActivity')
                })
                .catch((error) => {
                    alert('Invalid custom token specified')
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        switch (mode) {
            case 'login':
                setScheme(LoginScheme)
                break
            case 'register':
                setScheme(RegistrationScheme)
                break
            case 'password-reset':
                setScheme(PasswordResetScheme)
        }

    }, [mode])

    // useEffect(() => {
    //     if (isKeyboardOpen && height) {
    //         setScreenStyle({
    //             height: height - keyboardHeight, width, position: 'absolute'
    //         })
    //     } else {
    //         setScreenStyle({
    //             height, width, position: 'absolute'
    //         })
    //     }
    // }, [isKeyboardOpen, keyboardHeight, screenOrientation, width, height])

    if (isLoading) {
        return <ActivityIndicator fullscreen={true} />
    } else if (error) {
        return <DisplayError error={error} />
    } else {
        return (
            <div style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {/* <Image
                        style={Styles.auth.logo}
                        source={require('../assets/icon.png')}
                    /> */}
                    <Formik
                        initialValues={{
                            displayName: '',
                            eMail: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={scheme}
                        onSubmit={(values, helpers) => {
                            switch (mode) {
                                case 'login':
                                    onLoginPress(values, helpers)
                                    break
                                case 'register':
                                    onRegisterPress(values, helpers)
                                    break;
                                case 'password-reset':
                                    sendPasswordReset(values, helpers)
                            }
                        }}
                    >
                        {(formikProps) => (
                            <>
                                {mode === 'register' ? (
                                    <FormField
                                        label='Full Name'
                                        formikProps={formikProps}
                                        fieldName='displayName'
                                    />
                                ) : <></>}
                                <FormField
                                    formikProps={formikProps}
                                    fieldName='eMail'
                                    label="E-Mail"
                                />
                                {mode !== 'password-reset' ?
                                    <FormField
                                        formikProps={formikProps}
                                        secureTextEntry={true}
                                        label='Password'
                                        fieldName='password'
                                    /> : <></>}

                                {mode === 'register' ? (
                                    <>
                                        <FormField
                                            formikProps={formikProps}
                                            secureTextEntry={true}
                                            label="Confirm Password"
                                            fieldName='confirmPassword'
                                        />
                                        <div style={footerView}>
                                            <Button
                                                title="Create Account"
                                                disabled={submitted}
                                                onPress={formikProps.handleSubmit}
                                            />
                                        </div>
                                        <div style={footerView}>
                                            <Text style={{ fontSize: 16 }}>Already got an account?</Text>
                                            <Button title="Log in" onPress={() => onGotoLoginPress(formikProps)} />
                                        </div>
                                    </>
                                ) : <></>}
                                {mode === 'password-reset' ? (
                                    <>
                                        <div style={footerView}>
                                            <Button
                                                disabled={submitted}
                                                title="Reset Password"
                                                onPress={formikProps.handleSubmit}
                                                style={{ marginTop: 5 }}
                                            />
                                            <Button
                                                disabled={submitted}
                                                title="Cancel"
                                                onPress={() => onGotoLoginPress(formikProps)}
                                                style={{ marginTop: 5 }}
                                            />
                                        </div>
                                    </>
                                ) : <></>}
                                {mode === 'login' ? (
                                    <>
                                        <div style={footerView}>
                                            <Button
                                                title="Log in"
                                                disabled={submitted}
                                                onPress={formikProps.handleSubmit}
                                            />
                                            <Button
                                                title="Google Sign-In"
                                                onPress={() => signInWithGoogle(formikProps)}
                                                style={{ margin: 5 }}
                                            />
                                        </div>
                                        <div style={{ flexDirection: 'row' }}>
                                            <div style={footerView}>
                                                <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
                                                <Button title="Sign up" onPress={() => onSignUpPress(formikProps)} />
                                            </div>
                                            <div style={footerView}>
                                                <Text style={{ fontSize: 16 }}>
                                                    Did you forget your password?
                                                </Text>
                                                <Button
                                                    title="Password Reset"
                                                    onPress={() => setMode('password-reset')}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : <></>}
                            </>
                        )}
                    </Formik>
                    <div style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                        <Text>{`Cloud Lightning Messenger - Beta`}</Text>
                    </div>
                </ScrollView>
            </div>
        )
    }
}

interface Props {

}

export default (props: Props) => (
    <Authentication
    //  customToken={'abc.123.45657'} {/* This is not a valid custom token */}
    />
)

const footerView: CSSProperties = {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

}