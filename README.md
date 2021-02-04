# Hi!

This contains useful tips on how to build the project into files that can be sent to the android and ios app stores

### Android

## Running locally
- npm jettify
----  also try npx jetify
- react-native run-android

## Building a release
Make sure to increment the versionCode in android/app/build.gradle

- cd android
- gradlew clean (try ./gradlew if gradlew isnt working)
- gradlew assembleRelease

- Then go to [this link](https://play.google.com/apps/publish/?account=7354857333958526380#PrepareReleasePlace:p=com.gymhop&appid=4975097408597175993&releaseTrackId=4701536757076105370&releaseId=4704269146666222835) and go to release management -> app releases -> under the production track click edit release. Then upload the apk that gets generated buy the gradlew assembleRelease (its in /android/app/build/outputs/apk)
- Write a little comment on what you changed in the bottom thing on the google play page and then click review.
- Click release. Your version will be available within 1-3 hours


Make sure you've setup the keystore
the keystore password is roryjudah

### IOS
First time setup. please follow these steps verbatim. DO NOT USE NPM FOR ANYTHING EVER

`brew install rbenv`

`rbenv init`

`rbenv install 2.7.1`

`rbenv global 2.7.1`

`rbenv rehash`

`gem install bundler`

`bundle install`

`yarn install`

`yarn run podInstall`

`yarn start --reset-cache` 

If you want to run on a physical iPhone: open up terminal, and do:

`ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2`

Copy your IP address, and paste into ios/gymhop_frontend/AppDelegate.m line 19

In another terminal: 

`npx react-native run-ios`


Make sure to increment the bundle version in info.plist

- open Xcode
- click on top level ios project (its the blue thing in the top left that says gymhop_frontend with the little app store icon)
- increment the build and do what you want to the version (major.minor.patch syntax is good)
- set build target (thing in top left near play btn) to generic ios device
- product -> archive -> say yes to everything

Xcode troubleshooting:
if you get any "invalid symlink", "native module cannot be null", "no permission handler detected"- follow these steps in order:

1.) Force quit simulator, File-> workspace settings-> delete the Derived Data folder, Product -> clean build folder, delete the pods folder and reinstall
2.) Run a full audit of the dependencies used for the app. Native modules will just be renamed/ brokenly updated without warning. Start by commenting out imports in app.js to narrow it down. Impossible to trace errors with this shit so theres literally not a more efficient way to do this LOL
