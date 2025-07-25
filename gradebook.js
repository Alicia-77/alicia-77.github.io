// TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
  // This function will query the PostgreSQL database and return grade data
  console.log("Fetching grade data...");
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
  // This function will take the fetched grade data and populate the table
  console.log("Populating gradebook with data:", data);
}

// TODO: REMOVE THIS
// Call the stubs to demonstrate the workflow
const gradeData = fetchGradeData();
populateGradebook(gradeData);
// END REMOVE
function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");

    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();

    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";

    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function () {
        // Check if we're done
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Check if we're successful
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return;
            }
            // Call the function to update the HTML with our data
            populateGradebook(JSON.parse(xhr.responseText));
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}
function populateGradebook(data) {
    console.log("Populating gradebook with data:", data);

    let tableElm = document.getElementById("gradebook");

    data.forEach(function (assignment) {
        let row = document.createElement("tr");

        // Create columns
        let nameCell = document.createElement("td");
        nameCell.appendChild(
            document.createTextNode(assignment.last_name + ", " + assignment.first_name)
        );

        let gradeCell = document.createElement("td");
        gradeCell.appendChild(
            document.createTextNode(assignment.total_grade)
        );

        // Append columns to row
        row.appendChild(nameCell);
        row.appendChild(gradeCell);

        // Append row to table
        tableElm.appendChild(row);
    });
}
