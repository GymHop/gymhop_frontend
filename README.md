# Hi!

This contains useful tips on how to build the project into files that can be sent to the android and ios app stores

### Android
Make sure to increment the versionCode in android/app/build.gradle

- cd android
- gradlew clean
- gradlew assembleRelease

Make sure you've setup the keystore
the keystore password is roryjudah

### IOS
Make sure to increment the bundle version in info.plist

- open Xcode
- set build target (thing in top left near play btn) to generic ios device
- build -> archive -> say yes to everything
