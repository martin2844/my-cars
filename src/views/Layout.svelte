<!doctype html />
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Bebas+Neue&family=Dancing+Script&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"
    />
    <script
      src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <script
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/151801/fullpage.js"></script>
    %head%
  </head>
  <body>
    <div class="toggle-switch">
      <label>
        <input checked id="toggle" type="checkbox" />
        <span class="slider" />
      </label>
    </div>
    <slot />
    <script>
      const themeEl = document.getElementById('theme');
      const toggleSwitch = document.getElementById('toggle');
      toggleSwitch.addEventListener('change', () => {
        document.querySelectorAll('.section').forEach((node) => {
          if (
            node.className.includes('sectionl2') ||
            node.className.includes('sectionl1')
          ) {
            document.querySelectorAll('.inner-content').forEach((node) => {
              node.style.background = '#262525';
            });
            node.className.includes('sectionl2')
              ? (node.className = node.className.replace(
                  'sectionl2',
                  'sectiond2',
                ))
              : (node.className = node.className.replace(
                  'sectionl1',
                  'sectiond1',
                ));
          } else {
            document.querySelectorAll('.inner-content').forEach((node) => {
              node.style.background = '#fff';
            });
            node.className.includes('sectiond2')
              ? (node.className = node.className.replace(
                  'sectiond2',
                  'sectionl2',
                ))
              : (node.className = node.className.replace(
                  'sectiond1',
                  'sectionl1',
                ));
          }
        });
      });
    </script>
  </body>
</html>
