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
    console.log("Fetching grade data...");

    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/grades";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return;
            }

            try {
                const response = xhr.responseText;

                if (!response || response.trim() === "") {
                    console.error("Empty response received from server.");
                    return;
                }

                const data = JSON.parse(response);

                if (!Array.isArray(data)) {
                    console.error("Expected array but got:", data);
                    return;
                }

                console.log("Data received:", data);
                populateGradebook(data);
            } catch (error) {
                console.error("Error parsing grade data:", error);
            }
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}
function populateGradebook(data) {
    if (!Array.isArray(data)) {
        console.error("populateGradebook received invalid data:", data);
        return;
    }

    console.log("Populating gradebook with data:", data);

    let tableElm = document.getElementById("gradebook");
    tableElm.innerHTML = "";

    data.forEach(function (assignment) {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = assignment.last_name + ", " + assignment.first_name;

        let gradeCell = document.createElement("td");
        gradeCell.textContent = assignment.total_grade;

        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        tableElm.appendChild(row);
    });
}
