/* =====================================================
   STUDENT MANAGEMENT SYSTEM
   JavaScript
===================================================== */


/* ================= INITIAL STUDENT DATA ================= */

let students = JSON.parse(localStorage.getItem("students")) || [

    {
        id: 1,
        name: "Rahul Sharma",
        roll: "IT101",
        email: "rahul@gmail.com",
        course: "B.Tech IT",
        attendance: 88,
        marks: 82
    },

    {
        id: 2,
        name: "Priya Singh",
        roll: "IT102",
        email: "priya@gmail.com",
        course: "B.Tech IT",
        attendance: 92,
        marks: 91
    },

    {
        id: 3,
        name: "Aman Verma",
        roll: "CS103",
        email: "aman@gmail.com",
        course: "B.Tech CSE",
        attendance: 76,
        marks: 74
    },

    {
        id: 4,
        name: "Sneha Gupta",
        roll: "CS104",
        email: "sneha@gmail.com",
        course: "B.Tech CSE",
        attendance: 95,
        marks: 88
    },

    {
        id: 5,
        name: "Rohit Kumar",
        roll: "BCA105",
        email: "rohit@gmail.com",
        course: "BCA",
        attendance: 81,
        marks: 79
    }

];


/* Save data */

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* ================= PAGE NAVIGATION ================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        showPage(page);

    });

});


function showPage(pageName) {

    /* Hide all pages */

    document.querySelectorAll(".page").forEach(page => {

        page.classList.remove("active-page");

    });


    /* Show selected page */

    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    /* Update sidebar */

    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.page === pageName) {

            item.classList.add("active");

        }

    });


    /* Close mobile sidebar */

    document
        .querySelector(".sidebar")
        .classList.remove("open");


    /* Refresh data */

    renderAll();

}


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        document
            .querySelector(".sidebar")
            .classList.toggle("open");

    });

}


/* ================= ADD STUDENT ================= */

const studentForm =
    document.getElementById("studentForm");


studentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("studentName").value.trim();

    const roll =
        document.getElementById("rollNumber").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const course =
        document.getElementById("studentCourse").value;

    const attendance =
        Number(document.getElementById("studentAttendance").value);

    const marks =
        Number(document.getElementById("studentMarks").value);


    /* Validate */

    if (
        !name ||
        !roll ||
        !email ||
        !course
    ) {

        showToast("Please fill all fields!");

        return;

    }


    /* Check duplicate roll */

    const duplicate =
        students.some(student =>
            student.roll.toLowerCase() === roll.toLowerCase()
        );


    if (duplicate) {

        showToast("Roll number already exists!");

        return;

    }


    /* Create student */

    const newStudent = {

        id: Date.now(),

        name: name,

        roll: roll,

        email: email,

        course: course,

        attendance: attendance,

        marks: marks

    };


    /* Add */

    students.unshift(newStudent);

    saveStudents();


    /* Reset form */

    studentForm.reset();


    /* Refresh */

    renderAll();


    /* Success */

    showToast(
        `${name} added successfully!`
    );

});


/* ================= DELETE STUDENT ================= */

function deleteStudent(id) {

    const student =
        students.find(student => student.id === id);


    if (!student) return;


    const confirmDelete =
        confirm(
            `Delete ${student.name}?`
        );


    if (!confirmDelete) return;


    students =
        students.filter(student =>
            student.id !== id
        );


    saveStudents();

    renderAll();

    showToast("Student deleted successfully!");

}


/* ================= RENDER STUDENT TABLE ================= */

function renderStudents(list = students) {

    const tbody =
        document.getElementById("studentTableBody");


    if (list.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <i class="fa-solid fa-users"></i>
                        <p>No students found.</p>
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML = list.map(student => {

        return `

        <tr>

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>${student.roll}</td>

            <td>${student.email}</td>

            <td>
                <span class="badge badge-blue">
                    ${student.course}
                </span>
            </td>

            <td>
                <span class="badge ${
                    student.attendance >= 75
                    ? "badge-green"
                    : "badge-red"
                }">
                    ${student.attendance}%
                </span>
            </td>

            <td>
                <strong>${student.marks}%</strong>
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                    title="Delete student">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    }).join("");

}


/* ================= RECENT STUDENTS ================= */

function renderRecentStudents() {

    const container =
        document.getElementById(
            "recent-students-list"
        );


    const recent =
        students.slice(0, 5);


    if (recent.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-users"></i>
                <p>No students available.</p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        recent.map(student => {

            const initial =
                student.name
                    .charAt(0)
                    .toUpperCase();


            return `

            <div class="student-item">

                <div class="student-left">

                    <div class="avatar">
                        ${initial}
                    </div>

                    <div>

                        <div class="item-name">
                            ${student.name}
                        </div>

                        <div class="item-sub">
                            ${student.roll} • ${student.course}
                        </div>

                    </div>

                </div>

            </div>

            `;

        }).join("");

}


/* ================= MARKS ================= */

function renderMarksTable(list = students) {

    const tbody =
        document.getElementById(
            "marksTableBody"
        );


    if (list.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="fa-solid fa-file-lines"></i>
                        <p>No marks records found.</p>
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        list.map(student => {

            return `

            <tr>

                <td>
                    <strong>${student.name}</strong>
                </td>

                <td>${student.roll}</td>

                <td>${student.course}</td>

                <td>
                    <strong>
                        ${student.marks}%
                    </strong>
                </td>

                <td>
                    ${getGrade(student.marks)}
                </td>

            </tr>

            `;

        }).join("");

}


/* Recent marks */

function renderRecentMarks() {

    const container =
        document.getElementById(
            "recent-marks-list"
        );


    const recent =
        students.slice(0, 5);


    container.innerHTML =
        recent.map(student => {

            return `

            <div class="mark-item">

                <div class="mark-left">

                    <div class="avatar">
                        ${student.name.charAt(0)}
                    </div>

                    <div>

                        <div class="item-name">
                            ${student.name}
                        </div>

                        <div class="item-sub">
                            ${student.course}
                        </div>

                    </div>

                </div>

                <div class="mark-value">
                    ${student.marks}%
                </div>

            </div>

            `;

        }).join("");

}


/* ================= GRADE ================= */

function getGrade(marks) {

    if (marks >= 90) {

        return `
            <span class="badge badge-green">
                A+
            </span>
        `;

    }

    if (marks >= 80) {

        return `
            <span class="badge badge-green">
                A
            </span>
        `;

    }

    if (marks >= 70) {

        return `
            <span class="badge badge-blue">
                B
            </span>
        `;

    }

    if (marks >= 60) {

        return `
            <span class="badge badge-orange">
                C
            </span>
        `;

    }

    return `
        <span class="badge badge-red">
            F
        </span>
    `;

}


/* ================= ATTENDANCE ================= */

function renderAttendance(list = students) {

    const tbody =
        document.getElementById(
            "attendanceTableBody"
        );


    if (list.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="fa-solid fa-calendar-xmark"></i>
                        <p>No attendance records found.</p>
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        list.map(student => {

            const status =
                student.attendance >= 75
                ? "Good"
                : "Low";


            return `

            <tr>

                <td>
                    <strong>
                        ${student.name}
                    </strong>
                </td>

                <td>${student.roll}</td>

                <td>${student.course}</td>

                <td>

                    <span class="badge ${
                        student.attendance >= 75
                        ? "badge-green"
                        : "badge-red"
                    }">

                        ${student.attendance}%

                    </span>

                </td>

                <td>

                    <span class="badge ${
                        student.attendance >= 75
                        ? "badge-green"
                        : "badge-red"
                    }">

                        ${status}

                    </span>

                </td>

            </tr>

            `;

        }).join("");

}


/* ================= DASHBOARD STATS ================= */

function updateStats() {

    document.getElementById(
        "totalStudents"
    ).textContent = students.length;


    if (students.length === 0) {

        document.getElementById(
            "averageAttendance"
        ).textContent = "0%";


        document.getElementById(
            "averageMarks"
        ).textContent = "0%";

        return;

    }


    const attendanceTotal =
        students.reduce(
            (sum, student) =>
                sum + student.attendance,
            0
        );


    const marksTotal =
        students.reduce(
            (sum, student) =>
                sum + student.marks,
            0
        );


    const averageAttendance =
        Math.round(
            attendanceTotal / students.length
        );


    const averageMarks =
        Math.round(
            marksTotal / students.length
        );


    document.getElementById(
        "averageAttendance"
    ).textContent =
        averageAttendance + "%";


    document.getElementById(
        "averageMarks"
    ).textContent =
        averageMarks + "%";

}


/* ================= SEARCH ================= */

const studentSearch =
    document.getElementById("studentSearch");


studentSearch.addEventListener(
    "input",
    function() {

        const search =
            this.value.toLowerCase().trim();


        const filtered =
            students.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.roll
                    .toLowerCase()
                    .includes(search)

                ||

                student.course
                    .toLowerCase()
                    .includes(search)

                ||

                student.email
                    .toLowerCase()
                    .includes(search)

            );


        renderStudents(filtered);

    }
);


/* Attendance search */

const attendanceSearch =
    document.getElementById(
        "attendanceSearch"
    );


attendanceSearch.addEventListener(
    "input",
    function() {

        const search =
            this.value.toLowerCase().trim();


        const filtered =
            students.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.roll
                    .toLowerCase()
                    .includes(search)

            );


        renderAttendance(filtered);

    }
);


/* Marks search */

const marksSearch =
    document.getElementById(
        "marksSearch"
    );


marksSearch.addEventListener(
    "input",
    function() {

        const search =
            this.value.toLowerCase().trim();


        const filtered =
            students.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.roll
                    .toLowerCase()
                    .includes(search)

            );


        renderMarksTable(filtered);

    }
);


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= RENDER ALL ================= */

function renderAll() {

    renderStudents();

    renderRecentStudents();

    renderMarksTable();

    renderRecentMarks();

    renderAttendance();

    updateStats();

}


/* ================= INITIAL LOAD ================= */

renderAll();
