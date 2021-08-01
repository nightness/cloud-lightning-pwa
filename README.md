<!-- Comment -->

# Cloud Lightning PWA

This project is an attempt to build a social media platform with only Firestore rules, so that it's Firebase free tier accessible. Explore Firebase without giving Google your credit card number. 

You can visit the live site @ [Cloud Lightning PWA](https://cloud-lightning-lite.web.app/)

## Setup

```
npm i -g firebase-tools
yarn
```

## Configure

1. Setup a new (or use and existing) firebase project. I also recommend that you double check project settings right away.
2. Click on the 'web button' above the `Add an app to get started` text.
3. Give your app an arbitrary nickname and click the `Register App` button.
4. From the CLI, in the project folder, type `firebase init` to change to your project, out update .firebaserc with your project's name.
5. Replace my firebaseConfig in `src/database/Firebase.ts` with yours.
6. Build and deploy: `yarn build && firebase deploy`

## Start Locally

```
yarn start
```
