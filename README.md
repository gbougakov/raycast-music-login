# Log in with Apple Music for Raycast

Cloudflare Worker that allows people to log in with Apple Music to use the [Raycast](https://raycast.com) extension. Also handles generation of the developer token.

## Privacy Policy

This thing does not collect any user data

## Deploying

You can deploy this thing like any worker with Wrangler, just don't forget to add the required env variables

```sh
cat '/Users/gbgk/Downloads/AuthKey_XXXXXXXXX.p8' | wrangler secret put APPLE_AUTH_KEY
echo DEVTEAMID | wrangler secret put APPLE_DEV_TEAM_ID
echo KEYID | wrangler secret put APPLE_AUTH_KEY_ID
```