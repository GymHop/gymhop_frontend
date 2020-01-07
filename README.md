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
Make sure to increment the bundle version in info.plist

- open Xcode
- click on top level ios project (its the blue thing in the top left that says gymhop_frontend with the little app store icon)
- increment the build and do what you want to the version (major.minor.patch syntax is good)
- set build target (thing in top left near play btn) to generic ios device
- product -> archive -> say yes to everything
