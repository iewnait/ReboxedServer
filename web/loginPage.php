<?php

include 'php/firebase.php';

session_start();

if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn']) {
  header('Location: moduleListings.php');
  exit();
}

if (isset($_POST['username']) && isset($_POST['password'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $fb = new Firebase('rebox');
  if ($fb->isValidLogin($username, $password)) {
    $_SESSION['isLoggedIn'] = true;
    header('Location: moduleListings.php');
    exit();
  } else {
    unset($_POST['username']);
    unset($_POST['password']);
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Rebox - Login Page</title>
  <!-- Stylesheets -->
  <link rel="stylesheet" type="text/css" href="external/bootstrap/css/bootstrap.min.css"/>
  <link rel="stylesheet" type="text/css" href="css/master.css"/>
</head>
<body class="loginPage radialBackground">

  <div class="greenBorder" style="display: table; height: 100%; #position: relative; overflow: hidden; margin: 0 auto;">
    <div style=" #position: absolute; #top: 50%;display: table-cell; vertical-align: middle;">
      <div class="greenBorder" style=" #position: relative; #top: -50%">
        <div class="loginPod">
          <div class="headerDiv">
            <h3>Login</h3>
          </div>
          <div class="bodyDiv">

            <form action="loginPage.php" method="post">
              <input type="text" name="username" placeholder="Username"></br/>
              <input type="password" name="password" placeholder="Password"></br/>
              <button type='submit' class="btn pull-right">Sign In</button>
            </form>

          </div>

          <div class="footerDiv">
            <h6 class="pull-right">#AngelHack</h6>
          </div>



        </div>
      </div>
    </div>
  </div>

  <!-- Javascript -->
  <script type="text/javascript" src="external/jQuery/jquery-1.8.3.min.js"></script>
  <script type="text/javascript" src="js/loginPage.js"></script>
</body>
</html>
