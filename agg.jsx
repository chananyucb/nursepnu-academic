<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ระบบบริหารโครงการบริการวิชาการ · คณะพยาบาลศาสตร์ มนร.</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="styles.css" />
</head>
<body style="background-color: rgb(174, 188, 181)">
  <div id="root"></div>

  <!-- Auth guard — redirect to login if not authenticated -->
  <script>
    if (!sessionStorage.getItem('nursepnu_auth')) {
      window.location.replace('login.html');
    }
  </script>

  <!-- React + Babel (pinned) -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <!-- data + app modules -->
  <script src="sheets-config.js"></script>
  <script src="data.js"></script>
  <script src="data-speakers.js"></script>
  <script src="sheets-db.js"></script>
  <script type="text/babel" src="lib.jsx"></script>
  <script type="text/babel" src="charts.jsx"></script>
  <script type="text/babel" src="agg.jsx"></script>
  <script type="text/babel" src="form.jsx"></script>
  <script type="text/babel" src="form-speaker.jsx"></script>
  <script type="text/babel" src="view-dashboard.jsx"></script>
  <script type="text/babel" src="view-list.jsx"></script>
  <script type="text/babel" src="view-detail.jsx"></script>
  <script type="text/babel" src="view-summary.jsx"></script>
  <script type="text/babel" src="view-speakers.jsx"></script>
  <script type="text/babel" src="view-speaker-dashboard.jsx"></script>
  <script type="text/babel" src="app.jsx"></script>
</body>
</html>
