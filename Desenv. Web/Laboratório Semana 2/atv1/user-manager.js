// implementação do projeto em typescript
const users = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  { id: 2, name: 'Bruno', email: 'bruno@email.com' },
  { id: 3, name: 'Carla', email: 'carla@email.com' },
];
const addUser = ({ id, name, email }) => 
{
  const newUser = { id, name, email };
  users.push(newUser);
};
const getUserById = (id) => users.find(user => user.id === id) || null;
const listNames = () => users.map(user => user.name);
// exemplo de função genérica
function findItem(array, property, value) 
{
  return array.find(item => item[property] === value) || null;
}
addUser({ id: 4, name: 'Daniel', email: 'daniel@email.com' });
console.log(getUserById(2));
console.log(listNames());
// usando a função genérica para encontrar um usuário por email
const userByEmail = findItem(users, 'email', 'bruno@email.com');
console.log('----- Usando função genérica (email) -----');
console.log(userByEmail);
console.log('----- Usando função genérica (nome) -----');
const userByName = findItem(users, 'name', 'Carla');
console.log(userByName);
//# sourceMappingURL=user-manager.js.map