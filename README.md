# Advertiser Dashboard Mobile App

### Installation

- When you first open the project, just run `npm install` or `yarn install` to configure all the various packages

- Create `.env.dev` and `.env.prod` files using `.env.example`

#### Run

##### Development

`npm start` or `yarn start`

##### Production

`npm run start:prod` or `yarn start:prod`

- In Metro server switch to "Expo go" by pressing (s) to run app directly on device or simulator.
- To run development build, you have to build app using Xcode or Gradle/Android Studio.

### Notes

- To install a package, do not just run `npm install`. Expo has a built in installer which checks to see the compatible version with expo and your project. `npx expo install [package name] -- -D`
