var premadeCol = document.getElementById('premadeCol');
var fbRef = new Firebase('https://rebox.firebaseio.com');

var global_solutionsRef = fbRef.child('solutions');
global_solutionsRef.on('value', function(snapshot) {
  var global_solutions = snapshot.val();

  var existingRows = document.getElementsByClassName('premadeRow');
  for (i = existingRows.length - 1; i >= 0; i--) {
    premadeCol.removeChild(existingRows[0]);
  }

  for (var solution in global_solutions) {
    insertPremadeSolution(getLatestVersion(global_solutions[solution]), premadeCol);
  }
});

function getLatestVersion(solution) {
  for (var version in solution) {
    var latestVersion = solution[version];
  }
  return latestVersion;
}

function insertPremadeSolution(latestSoln, premadeCol) {
  var premade = document.createElement('div');
  premade.className = 'premadeRow';
  premade.innerHTML = "Name: " + latestSoln.name + '<br />';
  premade.innerHTML += latestSoln.desc;
  premadeCol.appendChild(premade);
}