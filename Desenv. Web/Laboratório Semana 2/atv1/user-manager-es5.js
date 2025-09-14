// "Projeto" legado simples em es5 que gerencia usuários

var users = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  { id: 2, name: 'Bruno', email: 'bruno@email.com' },
  { id: 3, name: 'Carla', email: 'carla@email.com' },
];

function addUser(id, name, email)
{
  var newUser = {
    id: id,
    name: name,
    email: email,
  };

  users.push(newUser);
}

function getUserById(id)
{
  var user;
  for (var i = 0; i < users.length; i++)
  {
    if (users[i].id === id)
    {
      user = users[i];
      break;
    }
  }
  return user;
}

function listNames()
{
  var names = [];
  for (var i = 0; i < users.length; i++)
  {
    names.push(users[i].name);
  }
  return names;
}

addUser(4, 'Daniel', 'daniel@email.com');
console.log(getUserById(2));
console.log(listNames());