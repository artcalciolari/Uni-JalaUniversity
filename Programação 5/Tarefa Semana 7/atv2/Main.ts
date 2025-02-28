import { User } from "./User";
import { Admin } from "./Admin";

// Type guard para verificar se um usuário é administrador
function isAdmin(user: User): user is Admin {
  return user instanceof Admin;
}

// Método que usa type narrowing para executar métodos dependendo do tipo
function manageSystem(user: User): void {
  // Log simples para indicar qual usuário acessou o sistema
  console.log(`\n${user.name} accessed the system`);

  // Type narrowing - verificamos se o usuário é Admin
  if (isAdmin(user)) {
    // Aqui, o TypeScript sabe que user é um Admin
    console.log(`Admin detected. Access level: ${user.authorizationLevel}`);
    user.manageUsers(); // Chamamos o método específico de Admin
  } else {
    // Aqui, o TypeScript sabe que user é plebe rs
    console.log("Normal user detected");
    user.checkProfile(); // Chamamos o método comum a todos os usuários
  }
}

// Tipo condicional - retorna um Admin ou User dependendo de um parâmetro
type UserType<T extends boolean> = T extends true ? Admin : User;

// Função que retorna um Admin ou User dependendo do parâmetro isAdmin
function createUser<T extends boolean>(
  isAdmin: T,
  id: number,
  name: string,
  email: string,
  authorizationLevel?: number
): UserType<T> {
  if (isAdmin) {
    // Garantindo que o nível foi fornecido quando isAdmin é true
    if (authorizationLevel === undefined) {
      throw new Error("Admin must have an authorization level");
    }
    return new Admin(id, name, email, authorizationLevel) as UserType<T>;
  }
  return new User(id, name, email) as UserType<T>;
}

// Testando tudo

// Criando um usuário comum usando tipo condicional
const user = createUser(false, 1, "Arthur", "Arthur@exemplo.com");
console.log("\n--- Testing normal user ---");
user.checkProfile();
user.checkPermissions();

// Criando um administrador usando tipo condicional
const admin = createUser(true, 2, "Admin", "Admin@exemplo.com", 3);
console.log("\n--- Testing admin ---");
admin.checkProfile();
admin.checkPermissions();
admin.manageUsers();

// Testando o type narrowing em uma função
console.log("\n--- Testing system management with a normal user ---");
manageSystem(user);

console.log("\n--- Testing system management with an admin ---");
manageSystem(admin);

// Demonstração de array com tipos misturados e narrowing
const users: User[] = [user, admin];
console.log("\n--- Processing user list ---");
users.forEach((u) => {
  if (isAdmin(u)) {
    console.log(`Admin detected: ${u.name}, level ${u.authorizationLevel}`);
  } else {
    console.log(`Normal user detected: ${u.name}`);
  }
});
