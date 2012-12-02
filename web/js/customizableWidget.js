  var fbRef = new Firebase('https://rebox.firebaseio.com');

  var user_id = "dummy1";
  var userRef = fbRef.child('users').child(""+user_id);
  var solnsRef = fbRef.child('solutions');

  loadPage();
  function loadPage(){
    window.currentEdit = null;
    showBlockVars("motion");
    var query = getQuery();
    if(query){
      var solnRef = solnsRef.child(query);
      if(solnRef){
        solnRef.on('value', function(solnVal) {
          if(solnVal.val()){
            loadEditPage(solnRef,solnVal.val(),query);
          }else{
            loadAddPage();
          }
        });
      }else{
        loadAddPage();
      }
    }else{
      loadAddPage();
    }
  }
  function loadAddPage(){
    window.isEditing = false;
    console.log("adding");
    $("#edit_solution_label").html("Add Solution");
    $("#stepsTable").html("");
  }
  function loadEditPage(solnRef,solnVal,query){
    console.log("editing");
    $("#soln_input_name").val(solnVal["1"].name);
    $("#soln_input_description").val(solnVal["1"].desc);
    window.isEditing = true;
    window.currentEdit = query;
    var blocks = solnVal["1"].blocks;

    $("#solution-flow-container").html("");
    var solnsHtml= "";
    if(blocks){
      for(var blockKey in blocks){
        var param = blocks[blockKey];
        console.log(param);
        solnsHtml += new Block(param).solutionBlockHtml();
      }
    }
    $("#solution-flow-container").html(solnsHtml);
  }
  function solnExists(solnRef){

    return solnRef && solnRef.za && solnRef.ya && solnRef.va;
  }
  function solutionSavedPressed(){
    var solnName = $("#soln_input_name").val();
    var solnDesc = $("#soln_input_description").html();
    solnsRef.child(solnName).child("1").set({desc:solnDesc,name:solnName},function(yay){
      console.log(yay);
      if(window.isEditing){
        document.location="moduleListings.html";
      }else{
        document.location="customizableWidget.html?q="+solnName;
      }
    });
    return false;
  }
  function getQuery(){
    var query = document.location.search; 
    if(query && query.length && query.length >3){
      return query.substring(3);
    }else return false;
  }

  function showBlockVars(block_type){
    $("#block-var-motion").hide();
    $("#block-var-phone").hide();
    $("#block-var-email").hide();
    $("#block-var-accel").hide();
    $("#block-var-smoke").hide();
    switch(block_type){
      case "motion":
      $("#block-var-motion").show();
      break;
      case "accel":
      $("#block-var-accel").show();
      break;
      case "smoke":
      $("#block-var-smoke").show();
      break;

      case "phone":
      $("#block-var-phone").show();
      break;
      case "email":
      $("#block-var-email").show();
      break;
    }
  }

  $("#block-dropdown-1").change(function(){
    if($(this).find(":selected").text()=="Action"){
      $("#block-dropdown-2-condition").hide();
      $("#block-dropdown-2-action").show();
      $("#block-dropdown-2-action").change();
      $("#block-label-2").text("Action");

    }else{
      $("#block-dropdown-2-action").hide();
      $("#block-dropdown-2-condition").show();
      $("#block-dropdown-2-condition").change();
      $("#block-label-2").text("Sensor");
    }

  });
  $("#block-dropdown-2-condition").change(function (){
    var condition = $(this).find(":selected").attr("val");
    console.log(condition);
    showBlockVars(condition);
  });
  $("#block-dropdown-2-action").change(function(){
    var action = $(this).find(":selected").attr("val");
    console.log(action);
    showBlockVars(action);
  });

  function paramsFromAddButton(){
    var params ={};
    if($("#block-var-motion").is(':visible')){
      params ={
        id:"motion",
        gtlt:$("#block-var-motion-gtlt").val(),
        percentage:$("#block-var-motion-var1").val()
      };
    }else if($("#block-var-accel").is(':visible')){
      params ={
        id:"accel",
        gtlt:$("#block-var-accel-gtlt").val(),
        acceleration:$("#block-var-accel-var1").val()
      };
    }else if($("#block-var-smoke").is(':visible')){
      params ={
        id:"smoke",
        gtlt:$("#block-var-smoke-gtlt").val(),
        percentage:$("#block-var-smoke-var1").val()
      };
    }else if($("#block-var-email").is(':visible')){
      params ={
        id:"email",
        address:$("#block-var-email-address").val(),
        subject:$("#block-var-email-subject").val(),
        content:$("#block-var-email-content").val(),
        suppression_delay:$("#block-var-email-delay").val()
      };
    }else if($("#block-var-phone").is(':visible')){
      params ={
        id:"phone",
        number:$("#block-var-phone-number").val(),
        message:$("#block-var-phone-message").val(),
        suppression_delay:$("#block-var-phone-delay").val()
      };
    }

    if (params.gtlt=="<")params.gtlt="lt";
    if (params.gtlt==">")params.gtlt="gt";
    return params;
  }
  function submitForm(){
    var newBlock = new Block (paramsFromAddButton());
    newBlock.postToFirebase();
    console.log(newBlock);
    return false;
  }
  function Block(params){
    var block_type = params.id;
    function postToFirebase(){
      solnsRef.child(window.currentEdit).child("1").child("blocks").push().set(params,function(yay){
        location.reload();
      });
    }

    function solutionBlockHtml(){
      var html ='<div class="stepRow">';
      switch (block_type){
        case "motion":
        var gtltHtml = (params.gtlt=="gt")?"faster":"slower";
        html +='<u>Condition</u> <span class="pull-right">x</span><br/>'+
        'Motion Sensor detects motion '+gtltHtml+' than '+params.percentage+'%<br/>';
        break;
        case "accel":
        var gtltHtml = (params.gtlt=="gt")?"more":"less";
        html +='<u>Condition</u> <span class="pull-right">x</span><br/>'+
        'Acceleration Sensor detects acceleration '+gtltHtml+' than '+params.acceleration+'%<br/>';
        break;
        case "smoke":
        var gtltHtml = (params.gtlt=="gt")?"more":"less";
        html +='<u>Condition</u> <span class="pull-right">x</span><br/>'+
        'Smoke Sensor detects smoke '+gtltHtml+' than '+params.percentage+'%<br/>';
break;
        case "email":
        html +='<u>Action</u> <span class="pull-right">x</span><br/>'+
        'Email '+params.address+' with \"'+params.subject+'\":\"'+params.content+'\" every '+params.suppression_delay+' seconds<br/>';
break;
        case "phone":
        html +='<u>Action</u> <span class="pull-right">x</span><br/>'+
        'SMS '+params.number+' with \"'+params.message+'\" every '+params.suppression_delay+' seconds<br/>';
break;
        default:break;
      }
      html += "</div>";
      return html;
    };
    return {
      postToFirebase:postToFirebase,
      params:params,
      solutionBlockHtml: solutionBlockHtml
    };
  }

  var global_solutionsRef = fbRef.child('solutions');
  global_solutionsRef.on('value', function(snapshot) {
    var solutions = snapshot.val();

    updateSolutionsList(solutions);
  });

  function updateSolutionsList(solutions) {
    var premadeCol = document.getElementById('premadeCol');
    $('.premadeRow').remove();
    for (var solution in solutions) {
      var div = document.createElement('div');
      div.className = 'premadeRow';

      var data = solutions[solution][1];
      div.innerHTML = "Name: " + data.name + '<br />' + data.desc;
      
      premadeCol.appendChild(div);
    }
  }