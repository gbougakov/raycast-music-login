const webpage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Log in with Apple Music</title>

    <meta name="robots" content="noindex" />

    <script
      src="https://js-cdn.music.apple.com/musickit/v3/musickit.js"
      data-web-components
      async
    ></script>

    <style>
      .container {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        box-sizing: border-box;
        padding: 1rem;
      }

      #authorize-button {
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #000;
        color: #fff;
        font-size: 1.5rem;
        font-weight: 600;
        cursor: pointer;
      }
      #token {
        max-width: 80vw;
        word-break: break-all;
        font-family: "Courier New", Courier, monospace;
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <button id="authorize-button">Log in with Apple Music</button>

      <h1 style="display: none" id="token-title">Logged in successfully</h1>
      <p id="token">
        <a href="" id="token-link">Continue in Raycast</a>
      </p>
    </div>

    <script>
      document.addEventListener('musickitloaded', async function () {
        // Call configure() to configure an instance of MusicKit on the Web.
        try {
          const {token} = await fetch('/get-dev-token').then((res) => res.json())
          await MusicKit.configure({
            developerToken: token,
            app: {
              name: 'gbgk app',
              build: '1978.4.1',
            },
          });

          const music = MusicKit.getInstance();

          document.getElementById('authorize-button').addEventListener('click', async () => {
            try {
              const token = await music.authorize();
              document.getElementById('authorize-button').style.display = 'none';
              document.getElementById('token-link').href = "raycast://extensions/gbgk/apple-music/explore?context=" + encodeURIComponent(JSON.stringify({ token }));
              document.getElementById('token-title').style.display = 'flex';
              document.getElementById('token').style.display = 'flex';
            } catch (err) {
              console.error(err);
            }
          });
        } catch (err) {
          console.error(err);
        }
      });
    </script>
  </body>
</html>
`;

export default webpage;
