// Students ka Data
const students = [
    { name: "Rahul Sharma", course: "Computer Science", status: "Active" },
    { name: "Priya Patel", course: "Information Technology", status: "Active" },
    { name: "Arjun Singh", course: "Electronics", status: "InActive" },
    { name: "Sneha Gupta", course: "Mechanical Engineering", status: "Active" }
];

// Marks ka Data
const marks = [
    { name: "Rahul Sharma", exam: "Data Structures - Mid-term", score: "85/100", percentage: "85.0%" },
    { name: "Priya Patel", exam: "Database Management - Final", score: "92/100", percentage: "92.0%" },
    { name: "Arjun Singh", exam: "Digital Electronics - Mid-term", score: "78/100", percentage: "78.0%", bad: true },
    { name: "Rahul Sharma", exam: "Algorithms - Final", score: "88/100", percentage: "88.0%" }
];

// Function: Students list generate karne ke liye
function renderStudents() {
    const container = document.getElementById("recent-students-list");
    let html = "";
    
    students.forEach(student => {
        const initial = student.name.charAt(0);
        const statusClass = student.status.toLowerCase();
        
        html += `
            <div class="list-item">
                <div class="student-info">
                    <div class="avatar ${initial.toLowerCase()}">${initial}</div>
                    <div class="details">
                        <h4>${student.name}</h4>
                        <p>${student.course}</p>
                    </div>
                </div>
                <div class="badge ${statusClass}">${student.status}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Function: Marks list generate karne ke liye
function renderMarks() {
    const container = document.getElementById("recent-marks-list");
    let html = "";
    
    marks.forEach(mark => {
        // Agar marks kam/alag style dikhana ho
        const percentColor = mark.bad ? 'red-text' : ''; 
        
        html += `
            <div class="list-item">
                <div class="details">
                    <h4>${mark.name}</h4>
                    <p>${mark.exam}</p>
                </div>
                <div class="marks-score">
                    <h4>${mark.score}</h4>
                    <p class="${percentColor}">${mark.percentage}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Page load hote hi data render karna
document.addEventListener("DOMContentLoaded", () => {
    renderStudents();
    renderMarks();
});

