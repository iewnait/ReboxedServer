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
  <title>Reboxed - Customize</title>
  <!-- Stylesheets -->
  <link rel="stylesheet" type="text/css" href="external/bootstrap/css/bootstrap.min.css"/>
  <link rel="stylesheet" type="text/css" href="css/master.css"/>
</head>
<body class="customizableWidget">
  <div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
      <a class="brand" href="#"><img src="images/logosmall.png" style="height: 15px; padding-left: 35px;"/></a>
      <ul class="nav pull-right">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Help</a></li>
        <li class=""><a href="#">Logout</a></li>
      </ul>
    </div>
  </div>
  <div class="fullScreenContainer container-fluid">
    <div class="mainScreen row-fluid">

      <div id='premadeCol' class="premadeCol span3">
        <div class="titleText">
          <h4 style="color: #333; font-weight: 100;">Preset Solutions <span class="pull-right">[+]</span></h4>
        </div>
        <div class="premadeRow">
          Name: Detect Fire</br>
          Sends you a text-message if a place is on fire. Will call your handphone for it.
        </div>
        <div class="premadeRow">
          Name: Detect Fire</br>
          Sends you a text-message if a place is on fire. Will call your handphone for it.
        </div>
        <div class="premadeRow">
          Name: Detect Fire</br>
          Sends you a text-message if a place is on fire. Will call your handphone for it.
        </div>
      </div>

      <div class="optionsCol span9">
        <div class="titleText">
          <h2 style="color: #333; font-weight: 100;">Edit Solution</h2>
        </div>

        <form class="form-horizontal" action="moduleListings.html">
          <div class="control-group">
            <label class="control-label" for="inputEmail">Name</label>
            <div class="controls">
              <input type="text" id="inputEmail" value="Your Database Name Here">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputPassword">Description</label>
            <div class="controls">
              <textarea rows="5" style="max-width: 350px; min-width: 350px; width:350px; max-height: 200px">Your database description here. You should preput text in this area from your database.</textarea>
            </div>
          </div>
          <div class="control-group">
            <div class="controls">
              <button type="submit" class="btn">Save</button>
            </div>
          </div>
        </form>

        <div class="stepsTable">
          
          <div class="stepHeader">
            Solution Flow
          </div>
          <!-- Iterate These Guys -->
          <div class="stepRow">
            <u>Condition</u> <span class="pull-right">x</span><br/>
            Condition: Heat Sensor Over X<br/>
            X: 60 Degree Celsius<br/>
          </div>

          <div class="stepRow">
            <u>Action</u> <span class="pull-right">x</span><br/>
            Action: Send Message to Phone<br/>
            Message: Your house is on fucking fire.<br/>
          </div>

          <div class="stepRow">
            <u>Action</u> <span class="pull-right">x</span><br/>
            Action: Scream like a mofo. Interval.<br/>
            Interval: Beep like fuck.<br/>
          </div>

          <div class="stepFooter">
            <span class="pull-right">[+] Add Step</span>
          </div>
        </div>


      </div>
      
    </div>
  </div>


  <!-- Javascript -->
  <script type="text/javascript" src="external/jQuery/jquery-1.8.3.min.js"></script>
  <script type='text/javascript' src='https://static.firebase.com/v0/firebase.js'></script>
  <script type="text/javascript" src="js/customizableWidget.js"></script>
</body>
</html>


