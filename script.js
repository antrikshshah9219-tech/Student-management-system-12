// ========================================
// STUDENT MANAGEMENT SYSTEM
// ========================================


// Get students from Local Storage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Variable for editing student

let editIndex = -1;


// ========================================
// ADD STUDENT
// ========================================

function addStudent() {

    const rollNo =
        document.getElementById("rollNo").value.trim();

    const studentName =
        document.getElementById("studentName").value.trim();

    const course =
        document.getElementById("course").value;


    // Validation

    if (rollNo === "" ||
        studentName === "" ||
        course === "") {

        alert("Please fill all fields!");

        return;
    }


    // Check duplicate roll number

    const duplicate = students.some(
        (student, index) =>
            student.rollNo === rollNo &&
            index !== editIndex
    );


    if (duplicate) {

        alert("Roll Number already exists!");

        return;
    }


    // Edit existing student

    if (editIndex !== -1) {

        students[editIndex] = {

            rollNo: rollNo,

            name: studentName,

            course: course

        };

        alert("Student updated successfully!");

        editIndex = -1;

        document.getElementById("formTitle").innerText =
            "➕ Add New Student";

        document.getElementById("addBtn").innerText =
            "➕ Add Student";

        document.getElementById("cancelBtn").style.display =
            "none";

    }

    // Add new student

    else {

        const student = {

            rollNo: rollNo,

            name: studentName,

            course: course

        };


        students.push(student);

        alert("Student added successfully!");
    }


    // Save data

    saveStudents();


    // Clear form

    clearForm();


    // Display students

    displayStudents();

}


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents(studentList = students) {

    const table =
        document.getElementById("studentTable");


    table.innerHTML = "";


    // No student found

    if (studentList.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    📭 No student records found
                </td>
            </tr>
        `;

        updateDashboard();

        return;
    }


    studentList.forEach((student, index) => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>
                <strong>${student.rollNo}</strong>
            </td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${students.indexOf(student)})"
                >
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${students.indexOf(student)})"
                >
                    🗑️ Delete
                </button>

            </td>
        `;


        table.appendChild(row);

    });


    updateDashboard();
}


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(index) {

    const student = students[index];


    document.getElementById("rollNo").value =
        student.rollNo;


    document.getElementById("studentName").value =
        student.name;


    document.getElementById("course").value =
        student.course;


    editIndex = index;


    document.getElementById("formTitle").innerText =
        "✏️ Edit Student";


    document.getElementById("addBtn").innerText =
        "💾 Update Student";


    document.getElementById("cancelBtn").style.display =
        "inline-block";


    // Scroll to form

    document.querySelector(".form-box")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;
    }


    students.splice(index, 1);


    saveStudents();


    displayStudents();


    alert("Student deleted successfully!");
}


// ========================================
// DELETE ALL STUDENTS
// ========================================

function deleteAllStudents() {

    if (students.length === 0) {

        alert("There are no students to delete.");

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete ALL students?"
        );


    if (!confirmDelete) {

        return;
    }


    students = [];


    saveStudents();


    displayStudents();


    alert("All students deleted!");
}


// ========================================
// SEARCH STUDENT
// ========================================

function searchStudent() {

    const searchValue =
        document.getElementById("searchInput")
            .value
            .toLowerCase();


    const filterCourse =
        document.getElementById("filterCourse")
            .value;


    const filteredStudents =
        students.filter(student => {

            const matchSearch =

                student.rollNo
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchCourse =

                filterCourse === ""

                ||

                student.course === filterCourse;


            return matchSearch && matchCourse;

        });


    displayStudents(filteredStudents);
}


// ========================================
// CLEAR FORM
// ========================================

function clearForm() {

    document.getElementById("rollNo").value = "";

    document.getElementById("studentName").value = "";

    document.getElementById("course").value = "";

}


// ========================================
// CANCEL EDIT
// ========================================

function cancelEdit() {

    editIndex = -1;


    clearForm();


    document.getElementById("formTitle").innerText =
        "➕ Add New Student";


    document.getElementById("addBtn").innerText =
        "➕ Add Student";


    document.getElementById("cancelBtn").style.display =
        "none";

}


// ========================================
// SAVE DATA IN LOCAL STORAGE
// ========================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ========================================
// DASHBOARD UPDATE
// ========================================

function updateDashboard() {

    document.getElementById("totalStudents")
        .innerText = students.length;


    document.getElementById("totalRecords")
        .innerText = students.length;


    const courses =
        new Set(
            students.map(student => student.course)
        );


    document.getElementById("totalCourses")
        .innerText = courses.size;

}


// ========================================
// DARK MODE
// ========================================

function toggleTheme() {

    document.body.classList.toggle("dark");


    const button =
        document.getElementById("themeBtn");


    if (document.body.classList.contains("dark")) {

        button.innerText = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    }

    else {

        button.innerText = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");

    }

}


// ========================================
// LOAD SAVED THEME
// ========================================

function loadTheme() {

    const theme =
        localStorage.getItem("theme");


    if (theme === "dark") {

        document.body.classList.add("dark");

        document.getElementById("themeBtn")
            .innerText = "☀️ Light Mode";

    }

}


// ========================================
// START APPLICATION
// ========================================

displayStudents();

loadTheme();
