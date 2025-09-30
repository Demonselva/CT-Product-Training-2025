// User interface
interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Student";
}

// UserManager class
class UserManager {
    private users: User[] = []; // store all users
    private nextId: number = 1; // auto increment ID

    // Add a new user
    public addUser(name: string, email: string, role: "Admin" | "Student"): void {
        const newUser: User = {
            id: this.nextId++,
            name,
            email,
            role
        };
        this.users.push(newUser);
        this.renderUsers();
    }

    // Generic method to find user by property
    public findUserBy<K extends keyof User>(prop: K, value: User[K]): User | undefined {
        return this.users.find(user => user[prop] === value);
    }

    // Update user role (with validation)
    public updateUserRole(userId: number, newRole: string): boolean {
        const validRoles: Array<User["role"]> = ["Admin", "Student"];
        if (!validRoles.includes(newRole as User["role"])) {
            console.error("Invalid role assigned!");
            return false;
        }
        const user = this.findUserBy("id", userId);
        if (user) {
            user.role = newRole as User["role"];
            this.renderUsers();
            return true;
        }
        return false;
    }

    // Delete user by ID
    public deleteUser(userId: number): void {
        this.users = this.users.filter(user => user.id !== userId);
        this.renderUsers();
    }

    // Render users into the HTML table
    private renderUsers(): void {
        const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
        tbody.innerHTML = ""; // clear before rendering

        this.users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Instance of UserManager
const userManager = new UserManager();

// Handle Add User Form
function adduser(): void {
    event?.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const role = (document.getElementById("role") as HTMLSelectElement).value as "Admin" | "Student";

    if (name && email && role) {
        userManager.addUser(name, email, role);

        // Clear form
        (document.getElementById("name") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("role") as HTMLSelectElement).value = "";
    }
}

// Global functions for edit/delete
(window as any).deleteUser = (id: number) => {
    userManager.deleteUser(id);
};

(window as any).editUser = (id: number) => {
    const newRole = prompt("Enter new role (Admin/Student):");
    if (newRole) {
        userManager.updateUserRole(id, newRole);
    }
};
