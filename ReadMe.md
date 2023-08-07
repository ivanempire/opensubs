<div align="center">

![npm](https://img.shields.io/npm/v/opensubs)
![dependencies](https://img.shields.io/librariesio/release/npm/opensubs)
![license](https://img.shields.io/npm/l/opensubs)
![minified size](https://img.shields.io/bundlephobia/minzip/opensubs)
![build](https://github.com/ivanempire/opensubs/actions/workflows/continuous.yml/badge.svg)

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="banner-light.png" width="800px">
    <source media="(prefers-color-scheme: light)" srcset="banner-dark.png" width="800px">
    <img src="banner-light.png" alt="Opensubs banner" width="800px" />
</picture>
</div>

### Getting started
Install the module using your package manager of choice:

```shell
$ npm install opensubs
$ yarn add opensubs
$ pnpm install opensubs
```

To start accessing the API, you will need a username, password, and an API key. The key may be created in the consumers section of your profile [here](https://www.opensubtitles.com/en/consumers). With this, you may now instantiate the `OpenSubtitles` client:

```typescript
import { OpenSubtitles } from "opensubs";

const subtitleClient = new OpenSubtitles(
    "username", "password", "key"
);
```
At this point you're good to go for almost all API calls! Some require the user JWT, so I would recommend calling `await subtitleClient.auth.login()` to make sure the library updates your credentials. This is all done internally, and you do not have to worry about a thing!

#### Choosing a server
The constructor accepts a 4th optional argument, which specifies which server to use. The default value is `Servers.PRIMARY`, however, if you're a VIP user, feel free to pass in `Servers.VIP`. There's a 3rd option, `Servers.MOCK`, which tends to be more lenient in terms of data returned and credential + header checks. This could be a useful option if you're stubbing out UIs. Enum may be found [here](src/constants/Servers.ts).

#### A note on API responses
All network responses are wrapped in a `Result` type - see the source code [here](src/core/types.ts#L14). This means that you have several choices in regard to control flow when using `opensubs`:
```typescript
// Grab the value directly, will be null if something goes wrong
const { value } = await subtitleClient.info.getSubtitleFormats();

// Alternatively, check for an OK status or error
const formatCall = await subtitleClient.info.getSubtitleFormats();
if (formatCall.ok) {
    // We are, as the hip kids say, Gucci fam
    console.log(formatCall.value);
} else {
    console.log(formatCall.error);
}
```

### Supported calls
This library was developed in accordance to the spec found [here](https://opensubtitles.stoplight.io/), and in addition to this I tried to make sure all function and type comments provided additional clarification. Below is a table listing all the calls `opensubs` supports and their required parameters.

| Library call        | Params                                         |
|---------------------|------------------------------------------------|
| client.auth.login() | N/A                                            |
| client.auth.logout() | N/A                                            |
| client.discover.getPopularFeatures() | languages: string, type: string                |
| client.discover.getLatestSubtitles() | languages: string, type: string                |
| client.discover.getMostDownloaded() | languages: string, type: string                |
| client.download.requestDownload() | [RequestDownloadParams](src/core/types.ts#L21) |
| client.features.findFeatures() | [FindSubtitlesParams](src/core/types.ts#L34)   |
| client.info.getSubtitleFormats()  | N/A                                            |
| client.info.getLanguages()  | N/A                                            |
| client.info.getUserInformation()  | N/A                                            |
| client.subtitles.findSubtitles() | [FindSubtitlesParams](src/core/types.ts#L54)   |
| client.utilities.guessIt() | filename: string                               |


### Testing
The library uses integration tests, and the current setup has room for improvement. Some of the tests are flaky, and the test suites contain a mixture of calls made against the primary and mock servers. If you'd like to run tests locally, you'll need to put your credentials into an `.env` file first:
```shell
cp sample.env .env
# Fill out .env with your credentials
jest # (or run the test command through your package manager)
```

### Upcoming work
In no particular order, here's a list of incoming features:

- **Automatic login**: Since some endpoints require a JWT, one will need to explicitly call `await myClient.auth.login()` to have the `CredentialManager` populate the JWT field. In the future, an additional flag may be passed during `OpenSubtitles()` initialization that will automatically perform this call so that one won't have to worry about it.
- **Automatic server selection**: Building on top of automatic login, there may be a way to automatically select which server to use for the API calls. I would imagine a failed login attempt to the VIP server would make the library fall back to the primary base URL.
- **Improved error handling**: At the very least, I'd love to see descriptive error messages when an API call fails. Checking for `response.ok` every time may be a pain (or figuring out why `value` is null).
- **Automatic subtitle download**: The `requestDownload()` endpoint simply returns an information object which contains the temporary download URL for a subtitle file. It would be nice to have `opensubs` return the raw contents of that file should a download be requested.
- **Improve testing setup**: As mentioned in the testing section, some of the tests are flaky and the test suites are mixed - there's some cleanup to do.

### Similar Projects
If this wrapper doesn't tickle your fancy, there are several other options out there on GitHub - check them out!
- **[opensubtitles.com](https://github.com/vankasteelj/opensubtitles.com)**
- **[node-opensubtitles-api](https://github.com/ka2er/node-opensubtitles-api)** (Callback, not async/await based)