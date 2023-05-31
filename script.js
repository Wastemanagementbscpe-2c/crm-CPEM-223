function createMatrix() {
  // Get the number of rows and columns from input fields
  var rows = parseInt(document.getElementById("rows").value);
  var columns = parseInt(document.getElementById("columns").value);

  // Get the container element for the matrix
  var matrixContainer = document.getElementById("matrixContainer");

  // Clear the container before creating the new matrix
  matrixContainer.innerHTML = "";

  // Create the matrix inputs
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      // Create a new input element
      var input = document.createElement("input");

      // Set the input type to number
      input.type = "number";

      // Set a unique ID for each input element using row and column indices
      input.id = "matrixInput_" + i + "_" + j;

      // Set the default value of the input to 0
      input.value = 0;

      // Append the input element to the matrix container
      matrixContainer.appendChild(input);
    }

    // Add a line break after each row
    matrixContainer.appendChild(document.createElement("br"));
  }
}

function calculateCramer() {
  // Get the number of rows and columns from input fields
  var rows = parseInt(document.getElementById("rows").value);
  var columns = parseInt(document.getElementById("columns").value);

  var matrix = [];

  // Create the matrix from input values
  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < columns; j++) {
      var inputValue = document.getElementById("matrixInput_" + i + "_" + j).value;
      row.push(parseFloat(inputValue));
    }
    matrix.push(row);
  }

  var determinantA = calculateDeterminant(matrix);
  var results = [];

  // Create a container for steps
  var stepsContainer = document.getElementById("stepsContainer");
  if (stepsContainer) {
    stepsContainer.remove(); // Remove existing steps container if it exists
  }
  stepsContainer = document.createElement("div");
  stepsContainer.id = "stepsContainer";

  // Step 1: Calculate determinant (D)
  var stepText = "<h2>Step 1: Calculate determinant (D)</h2>";
  stepText += printMatrix(matrix, -1, -1);

  // Calculate determinant using manual solving
  var value1 = matrix[0][0] * matrix[1][1] * matrix[2][2];
  var value2 = matrix[0][1] * matrix[1][2] * matrix[2][0];
  var value3 = matrix[0][2] * matrix[1][0] * matrix[2][1];
  var value4 = matrix[2][0] * matrix[1][1] * matrix[0][2];
  var value5 = matrix[2][1] * matrix[1][2] * matrix[0][0];
  var value6 = matrix[2][2] * matrix[1][0] * matrix[0][1];

  // Determine the sign for each value
  var sign1 = value1 >= 0 ? "+" : "-";
  var sign2 = value2 >= 0 ? "+" : "-";
  var sign3 = value3 >= 0 ? "+" : "-";
  var sign4 = value4 >= 0 ? "+" : "-";
  var sign5 = value5 >= 0 ? "+" : "-";
  var sign6 = value6 >= 0 ? "+" : "-";

  // Create the multiplication expressions
  var expression1 = sign1 + Math.abs(value1) + " " + sign2 + " " + Math.abs(value2) + " " + sign3 + " " + Math.abs(value3);
  var expression2 = sign4 + Math.abs(value4) + " " + sign5 + " " + Math.abs(value5) + " " + sign6 + " " + Math.abs(value6);

  stepText += "<p>D = (" + expression1 + ") - (" + expression2 + ") = " + determinantA + "</p>";

  var determinantText = "<p>Determinant (D) = " + determinantA + "</p>";
  stepText += determinantText;

  var stepElement = document.createElement("div");
  stepElement.innerHTML = stepText;
  stepsContainer.appendChild(stepElement);

  // Solve for each variable
  for (var k = 0; k < columns - 1; k++) {
    var modifiedMatrix = [];
    var numeratorMatrix = [];

    // Create modified matrices for calculating determinants
    for (var i = 0; i < rows; i++) {
      var row = [];
      var numeratorRow = [];
      for (var j = 0; j < columns; j++) {
        if (j === k) {
          numeratorRow.push(matrix[i][columns - 1]);
          row.push(matrix[i][columns - 1]);
        } else {
          numeratorRow.push(matrix[i][j]);
          row.push(matrix[i][j]);
        }
      }
      modifiedMatrix.push(row);
      numeratorMatrix.push(numeratorRow);
    }

    var determinantModified = calculateDeterminant(modifiedMatrix);
    var determinantNumerator = calculateDeterminant(numeratorMatrix);
    
    var result = determinantNumerator / determinantA;

    var variableNames = ["D<sub>x</sub>", "D<sub>y</sub>", "D<sub>z</sub>"];
    var determinantVariable = variableNames[k];
    stepText = "<h2>Step " + (k + 2) + ": Calculate determinant (" + determinantVariable + ")</h2>";
    stepText += printMatrix(modifiedMatrix, k, columns - 1);

    // Calculate determinant using manual solving
    var value1 = modifiedMatrix[0][0] * modifiedMatrix[1][1] * modifiedMatrix[2][2];
    var value2 = modifiedMatrix[0][1] * modifiedMatrix[1][2] * modifiedMatrix[2][0];
    var value3 = modifiedMatrix[0][2] * modifiedMatrix[1][0] * modifiedMatrix[2][1];
    var value4 = modifiedMatrix[2][0] * modifiedMatrix[1][1] * modifiedMatrix[0][2];
    var value5 = modifiedMatrix[2][1] * modifiedMatrix[1][2] * modifiedMatrix[0][0];
    var value6 = modifiedMatrix[2][2] * modifiedMatrix[1][0] * modifiedMatrix[0][1];

    // Determine the sign for each value
    var sign1 = value1 >= 0 ? "+" : "-";
    var sign2 = value2 >= 0 ? "+" : "-";
    var sign3 = value3 >= 0 ? "+" : "-";
    var sign4 = value4 >= 0 ? "+" : "-";
    var sign5 = value5 >= 0 ? "+" : "-";
    var sign6 = value6 >= 0 ? "+" : "-";
    
    // Create the multiplication expressions
    var expression1 = sign1 + Math.abs(value1) + " " + sign2 + " " + Math.abs(value2) + " " + sign3 + " " + Math.abs(value3);
    var expression2 = sign4 + Math.abs(value4) + " " + sign5 + " " + Math.abs(value5) + " " + sign6 + " " + Math.abs(value6);

    stepText += "<p> " + determinantVariable + " = (" + expression1 + ") - (" + expression2 + ") </p>";

    var determinantText = "<p>Determinant (" + determinantVariable + ") = " + determinantModified + "</p>";
    stepText += determinantText;

    stepElement = document.createElement("div");
    stepElement.innerHTML = stepText;
    stepsContainer.appendChild(stepElement);

    var variableName = ["x", "y", "z"];
    var determinantVariables = variableName[k];
    var resultText = "<div>" + determinantVariables + " = " + determinantVariable +  "/D<br>"
                      + determinantVariables + " = " + determinantModified + "/" + determinantA +"<br>" 
                      + "<span class='final-ans';>" + determinantVariables + " = " + (result)+ "</span>" + "</div>";
    results.push(resultText);
  }
  var resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "Results: " + results.join(", ");
  resultContainer.appendChild(stepsContainer);
}

function printMatrix(matrix, markedRow, markedColumn) {
  var rows = matrix.length;
  var columns = matrix[0].length - 1;
  var matrixStr = "<table>";

  for (var i = 0; i < rows; i++) {
    matrixStr += "<tr>";
    for (var j = 0; j < columns; j++) {
      // Check if the current cell should be marked with a special class
      var cellStyle = (j === markedRow || i === markedColumn) ? " class='pushed-row'" : "";
      matrixStr += "<td" + cellStyle + ">" + matrix[i][j] + "</td>";
    }
    matrixStr += "</tr>";
  }
  matrixStr += "</table>";
  return matrixStr;
}

function calculateDeterminant(matrix) {
  var n = matrix.length;
  // Base case: if matrix has only one element, return its value
  if (n === 1) {
    return matrix[0][0];
  }
  var determinant = 0;
  var sign = 1;
  for (var i = 0; i < n; i++) {
    var subMatrix = [];
    // Create the submatrix by excluding the current row and column
    for (var j = 1; j < n; j++) {
      var row = [];
      for (var k = 0; k < n; k++) {
        if (k !== i) {
          row.push(matrix[j][k]);
        }
      }
      subMatrix.push(row);
    }
    // Recursive call to calculate determinant of the submatrix
    determinant += sign * matrix[0][i] * calculateDeterminant(subMatrix);

    // Alternate the sign for the next iteration
    sign *= -1;
  }

  return determinant;
}
