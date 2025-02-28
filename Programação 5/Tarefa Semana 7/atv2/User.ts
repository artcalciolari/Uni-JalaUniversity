export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) { }
  
  // Método comum para todos os usuários
  public checkProfile(): void {
    console.log(`User Profile: ${this.name} (${this.email})`);
  }

  // Método para mostrar permissões básicas
  public checkPermissions(): void {
    console.log(`${this.name} has basic permissions`);
  }
}