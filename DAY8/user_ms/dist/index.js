"use strict";
class UserManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    addUser(name, email, role) {
        const newUser = {
            id: this.nextId++,
            name,
            email,
            role
        };
        this.users.push(newUser);
        this.renderUsers();
    }
    findUserBy(prop, value) {
        return this.users.find(user => user[prop] === value);
    }
    updateUserRole(userId, newRole) {
        const validRoles = ["Admin", "Student"];
        if (!validRoles.includes(newRole)) {
            console.error("Invalid role assigned!");
            return false;
        }
        const user = this.findUserBy("id", userId);
        if (user) {
            user.role = newRole;
            this.renderUsers();
            return true;
        }
        return false;
    }
    deleteUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
        this.renderUsers();
    }
    renderUsers() {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        this.users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="editUser(${user.id})" class="edit-btn">Edit</button>
                    <button onclick="deleteUser(${user.id})" class="edit-btn">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}
const userManager = new UserManager();
function adduser() {
    event?.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    if (name && email && role) {
        userManager.addUser(name, email, role);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("role").value = "";
    }
}
window.deleteUser = (id) => {
    userManager.deleteUser(id);
};
window.editUser = (id) => {
    const newRole = prompt("Enter new role (Admin/Student):");
    if (newRole) {
        userManager.updateUserRole(id, newRole);
    }
};
//# sourceMappingURL=index.js.map