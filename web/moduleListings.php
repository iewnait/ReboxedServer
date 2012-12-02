<?php
session_start();

if (!isset($_SESSION['isLoggedIn']) || !$_SESSION['isLoggedIn']) {
  header('Location: loginPage.php');
  exit();
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>rebox</title>
  <!-- Stylesheets -->
  <link rel="stylesheet" type="text/css" href="external/bootstrap/css/bootstrap.min.css"/>
  <link rel="stylesheet" type="text/css" href="css/master.css"/>
</head>
<body class="moduleListings">
  <div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
      <a class="brand" href="#">&nbsp Reboxed</a>
      <ul class="nav pull-right">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Help</a></li>
        <li class=""><a href="logout.php">Logout</a></li>
      </ul>
    </div>
  </div>
  <div class="fullScreenContainer container-fluid">
    <div class="mainScreen row-fluid">
      <div class="solutionsCol span9">
        <div class="titleText">
          <h1 style="color: #CCC">&nbsp;Dashboard</h1>
        </div>
        <div class="solutionsTable">
          <!-- Header -->
          <div class="solutionsHeader container-fluid">
            <div class="headerDetails row-fluid">
              <div class="statusContainer span2">
                Status
              </div>
              <div class="solutionContainer span5">
                Solution
              </div>
              <div class="deviceContainer span5">
                Device
              </div>
            </div>
          </div>

          <!-- Row -->
          <div class="solutionsRow container-fluid">
            <div class="mainDetails row-fluid">
              <div class="statusContainer span2">
                <div class="status green">
                  Running
                </div>
              </div>
              <div class="solutionContainer span5">
                <div class="solution">
                  My Movement Detector
                </div>
              </div>
              <div class="deviceContainer span5">
                <div class="device">
                  HTC Android 2.5
                </div>
              </div>
            </div>
            <div class="expand-details">
            </div>
          </div>

          <!-- Row -->
          <div class="solutionsRow container-fluid">
            <div class="mainDetails row-fluid">
              <div class="statusContainer span2">
                <div class="status red">
                  Stopped
                </div>
              </div>
              <div class="solutionContainer span5">
                <div class="solution">
                  Lighting Activator
                </div>
              </div>
              <div class="deviceContainer span5">
                <div class="device">
                  Google Nexus Phone
                </div>
              </div>
            </div>
            <div class="expand-details">
            </div>
          </div>

          <!-- Row -->
          <div class="solutionsRow container-fluid">
            <div class="mainDetails row-fluid">
              <div class="statusContainer span2">
                <div class="status green">
                  Running
                </div>
              </div>
              <div class="solutionContainer span5">
                <div class="solution">
                  Fire Alarm
                </div>
              </div>
              <div class="deviceContainer span5">
                <div class="device">
                  HTC Legend
                </div>
              </div>
            </div>
            <div class="expand-details">
            </div>
          </div>
          <div class="solutionsFooter container-fluid">
            <div class="footerDetails row-fluid">
              <a href="#">Add Solution</a>
            </div>
          </div>


        </div>
      </div>
      <div id="devicesCol" class="devicesCol span3">
        <div>
          <h4 style="color: #CCC; padding: 10px;">Device List</h4>
        </div>
        <div class="deviceDetails green">
          <b>HTC Android 2.5</b></br>
          Working</br>
          <div style="text-align:right;"><a href="#">Location</a></div>
        </div>
        <div class="deviceDetails green">
          <b>HTC Legend</b></br>
          Working</br>
          <div style="text-align:right;"><a href="#">Location</a></div>
        </div>
        <div class="deviceDetails green">
          <b>Google Nexus Phone</b></br>
          Idle</br>
          <div style="text-align:right;"><a href="#">Location</a></div>
        </div>
        <div class="deviceDetails red">
          <b>Samsung Galaxy</b></br>
          Not Found</br>
          <div style="text-align:right;"><a href="#">Location</a></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Javascript -->
  <script type="text/javascript" src="external/jQuery/jquery-1.8.3.min.js"></script>
  <script type='text/javascript' src='https://static.firebase.com/v0/firebase.js'></script>
  <script type="text/javascript" src="js/moduleListings.js"></script>
</body>
</html>
