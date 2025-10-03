
interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Student";
}


class UserManager {
    private users: User[] = []; 
    private nextId: number = 1; 

   
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

    
    public findUserBy<K extends keyof User>(prop: K, value: User[K]): User | undefined {
        return this.users.find(user => user[prop] === value);
    }

    
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

    
    public deleteUser(userId: number): void {
        this.users = this.users.filter(user => user.id !== userId);
        this.renderUsers();
    }

    
    private renderUsers(): void {
        const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
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


function adduser(): void {
    

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const role = (document.getElementById("role") as HTMLSelectElement).value as "Admin" | "Student";

    if (name && email && role) {
        userManager.addUser(name, email, role);
        (document.getElementById("name") as HTMLInputElement).value = "";
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("role") as HTMLSelectElement).value = "";
    }
}


(window as any).deleteUser = (id: number) => {
    userManager.deleteUser(id);
};

(window as any).editUser = (id: number) => {
    const newRole = prompt("Enter new role (Admin/Student):");
    if (newRole) {
        userManager.updateUserRole(id, newRole);
    }
};

