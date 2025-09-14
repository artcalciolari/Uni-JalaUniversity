// Projeto refatorado em es6 que gerencia usuários

const users = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  { id: 2, name: 'Bruno', email: 'bruno@email.com' },
  { id: 3, name: 'Carla', email: 'carla@email.com' },
];

// Uso de destructuring para parâmetros e spread operator
const addUser = ({ id, name, email }) =>
{
  const newUser = { id, name, email };
  users.push(newUser);
};

// Uso de find para buscar usuário ao invés de loop manual
const getUserById = (id) => users.find(user => user.id === id);

// Uso de map para transformar o array
const listNames = () => users.map(user => user.name);

// Uso de spread operator para criar uma cópia do array
const usersCopy = [...users, { id: 5, name: 'Eva', email: 'eva@email.com' }];

addUser({ id: 4, name: 'Daniel', email: 'daniel@email.com' });
console.log(getUserById(2));
console.log(listNames());

// Spread não afeta o array original
console.log('----- Array Original -----');
console.log(users);
console.log('----- Cópia com Novo Usuário -----');
console.log(usersCopy);