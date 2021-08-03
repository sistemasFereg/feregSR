# README #

# FEREG MOBILE APP

### How build standalone app for Android? ###
* expo build:android -t apk
* This generates an apk without sign
* 
* expo build:android -t app-bundle
* this generates a signed app 

### How build standalone app for iOS? ###
* expo build:ios -t simulator
* This generates an app for simulator
* 
* expo build:ios -t archive
* this generates an app to distibute or testflight

## Documentation to upload the app to TestFlight (iOS)
https://docs.expo.io/distribution/uploading-apps/

### How to get Android hash keys ###
* expo fetch:android:hashes
* This generates Android hash keys
