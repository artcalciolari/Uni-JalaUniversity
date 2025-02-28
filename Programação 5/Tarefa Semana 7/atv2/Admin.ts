import { User } from "./User";

export class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    public authorizationLevel: number,
  ) {
    super(id, name, email);
  }

  // Método específico para administradores
  public manageUsers(): void { 
    console.log(`${this.name} can manage users as an admin with level ${this.authorizationLevel}`);
  }

  // Sobrescreve o método checkPermissions
  public override checkPermissions(): void { 
    console.log(`${this.name} has admin permissions with level ${this.authorizationLevel}`);
  }
}
