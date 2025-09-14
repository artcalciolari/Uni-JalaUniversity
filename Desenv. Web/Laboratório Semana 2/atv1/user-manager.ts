// implementação do projeto em typescript

// interface para garantir tipagem dos dados do usuário
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  { id: 2, name: 'Bruno', email: 'bruno@email.com' },
  { id: 3, name: 'Carla', email: 'carla@email.com' },
];

const addUser = ({ id, name, email }: User): void => 
{
  const newUser: User = { id, name, email };
  users.push(newUser);
};

const getUserById = (id: number): User | null => users.find(user => user.id === id) || null;

const listNames = (): string[] => users.map(user => user.name);

// exemplo de função genérica
function findItem<T>(
  array: T[],
  property: keyof T,
  value: unknown, // usando unknown para maior flexibilidade
): T | null 
{
  return array.find(item => item[property] === value) || null;
}

addUser({ id: 4, name: 'Daniel', email: 'daniel@email.com' });
console.log(getUserById(2));
console.log(listNames());

// usando a função genérica para encontrar um usuário por email
const userByEmail = findItem<User>(users, 'email', 'bruno@email.com');
console.log('----- Usando função genérica (email) -----');
console.log(userByEmail);

console.log('----- Usando função genérica (nome) -----');
const userByName = findItem<User>(users, 'name', 'Carla');
console.log(userByName);