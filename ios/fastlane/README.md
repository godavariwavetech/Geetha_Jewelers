# iOS deployment (fastlane)

Pushing to the `ios-deployment` branch runs `.github/workflows/ios-deploy.yml` on a macOS runner,
which builds a signed release and uploads it to TestFlight. Use **Actions → iOS Deploy → Run workflow**
to choose the `release` lane (App Store upload, not submitted for review).

## Lanes

| Lane | What it does |
| --- | --- |
| `install_deps` | `npm ci` + `pod install` |
| `certificates` | Fetch App Store cert/profile via `match` (readonly on CI) |
| `build` | Set bundle id + signing, bump build number, build `.ipa` |
| `beta` | `install_deps` → `build` → upload to TestFlight |
| `release` | `install_deps` → `build` → upload to App Store Connect |

## One-time setup

1. Register the bundle id in the Apple Developer portal and create the app in App Store Connect.
2. Create an App Store Connect API key (Admin or App Manager role) and download the `.p8`.
3. Create an empty **private** repo for certificates, then on a Mac run once:
   `cd ios && bundle install && bundle exec fastlane certificates readonly:false`
4. Add these GitHub repository secrets:

| Secret | Value |
| --- | --- |
| `APP_IDENTIFIER` | Bundle id, e.g. `com.geethajewellers.app` |
| `TEAM_ID` | Apple Developer Team ID |
| `APPLE_ID` | Apple ID email |
| `ASC_KEY_ID` / `ASC_ISSUER_ID` | From the API key page |
| `ASC_KEY_CONTENT` | `base64 -i AuthKey_XXXX.p8` |
| `MATCH_GIT_URL` | Certificates repo URL |
| `MATCH_PASSWORD` | Passphrase chosen when running match |
| `MATCH_GIT_BASIC_AUTHORIZATION` | `echo -n "user:PAT" \| base64` |
| `GOOGLE_SERVICE_INFO_PLIST` | `base64 -i GoogleService-Info.plist` (Firebase) |

## Local run (macOS)

```sh
cp ios/fastlane/.env.example ios/fastlane/.env   # fill in values
cd ios && bundle install && bundle exec fastlane beta
```
