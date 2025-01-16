# Hotel System API 🚀

## Módulo de Hotéis 🏩

`Controlador: src/hotels/hotels.controller.ts`

### Rota: POST /hotels 💾

- Descrição: Cria um novo hotel.
  - **Parâmetros**:
    - `createHotelDto` (body): Objeto contendo os dados do hotel.
  - **Resposta:**
    - `201`: Hotel criado.
    - `400`: Bad request.

### Rota: GET /hotels 🔍

- Descrição: Retorna todos os hotéis.
  - Parâmetros:
    - `Nenhum`.
  - Resposta:
    - `200`: Lista de hotéis.
    - `404`: Nenhum hotel encontrado.

### Rota: GET /hotels/id/:id 🔍

- Descrição: Retorna um hotel pelo ID.
  - Parâmetros:
    - `id (path)`: ID do hotel.
  - Resposta:
    - `200`: Hotel encontrado.
    - `404`: Hotel não encontrado.

### Rota: PUT /hotels/:id 🛠️

- Descrição: Atualiza um hotel pelo ID.
  - Parâmetros:
    - `id (path)`: ID do hotel.
    - `updateHotelDto (body)`: Objeto contendo os dados atualizados do hotel.
  - Resposta:
    - `200`: Hotel atualizado.
    - `404`: Hotel não encontrado.

### Rota: DELETE /hotels/:id 🗑️

- Descrição: Deleta um hotel pelo ID.
  - Parâmetros:
    - `id (path)`: ID do hotel.
  - Resposta:
    - `200`: Hotel deletado.
    - `404`: Hotel não encontrado.

`Serviço: src/hotels/hotels.service.ts`

- Contém a lógica de negócios para os hotéis.

`DTOs:`

- src/hotels/dto/create-hotel.dto.ts: `DTO para criação de hotel.`
- src/hotels/dto/hotel-response.dto.ts: `DTO para resposta de hotel.`
- src/hotels/dto/update-hotel.dto.ts: `DTO para atualização de hotel.`

## Módulo de Quartos 🛏️

`Controlador: src/rooms/rooms.controller.ts`

### Rota: POST /rooms 💾

- Descrição: Cria um novo quarto.
  - **Parâmetros**:
    - `createRoomDto` (body): Objeto contendo os dados do quarto.
  - **Resposta:**
    - `201`: Quarto criado.
    - `400`: Bad request.

### Rota: GET /rooms/id/:id 🔍

- Descrição: Retorna um quarto pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID do quarto.
  - **Resposta:**
    - `200`: Quarto encontrado.
    - `404`: Quarto não encontrado.

### Rota: GET /rooms/hotel/:hotelName 🔍

- Descrição: Retorna quartos pelo nome do hotel.
  - **Parâmetros**:
    - `hotelName (path)`: Nome do hotel.
  - **Resposta:**
    - `200`: Lista de quartos.
    - `404`: Nenhum quarto encontrado.

### Rota: PUT /rooms/:id 🛠️

- Descrição: Atualiza um quarto pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID do quarto.
    - `updateRoomDto` (body): Objeto contendo os dados atualizados do quarto.
  - **Resposta:**
    - `200`: Quarto atualizado.
    - `404`: Quarto não encontrado.

### Rota: DELETE /rooms/:id 🗑️

- Descrição: Deleta um quarto pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID do quarto.
  - **Resposta:**
    - `200`: Quarto deletado.
    - `404`: Quarto não encontrado.

`Serviço: src/rooms/rooms.service.ts`

- Contém a lógica de negócios para os quartos.

`DTOs:`

- src/rooms/dto/create-room.dto.ts: `DTO para criação de quarto.`
- src/rooms/dto/room-response.dto.ts: `DTO para resposta de quarto.`
- src/rooms/dto/update-room.dto.ts: `DTO para atualização de quarto.`

## Módulo de Usuários 👤

`Controlador: src/users/users.controller.ts`

### Rota: POST /users 💾

- Descrição: Cria um novo usuário.
  - **Parâmetros**:
    - `createUserDto` (body): Objeto contendo os dados do usuário.
  - **Resposta:**
    - `201`: Usuário criado.
    - `400`: Bad request.

### Rota: GET /users 🔍

- Descrição: Retorna todos os usuários.
  - **Resposta:**
    - `200`: Lista de usuários.
    - `404`: Nenhum usuário encontrado.

### Rota: GET /users/id/:id 🔍

- Descrição: Retorna um usuário pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID do usuário.
  - **Resposta:**
    - `200`: Usuário encontrado.
    - `404`: Usuário não encontrado.

### Rota: PUT /users/:id 🛠️

- Descrição: Atualiza um usuário pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID do usuário.
    - `updateUserDto` (body): Objeto contendo os dados atualizados do usuário.
  - **Resposta:**
    - `200`: Usuário atualizado.
    - `404`: Usuário não encontrado.

### Rota: DELETE /users/:id 🗑️

- Descrição: Deleta um usuário pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID do usuário.
  - **Resposta:**
    - `200`: Usuário deletado.
    - `404`: Usuário não encontrado.

`Serviço: src/users/users.service.ts`

- Contém a lógica de negócios para os usuários.

`DTOs:`

- src/users/dto/create-user.dto.ts: `DTO para criação de usuário.`
- src/users/dto/user-responde.dto.ts: `DTO para resposta de usuário.`
- src/users/dto/update-user.dto.ts: `DTO para atualização de usuário.`

## Módulo de Reservas 📅

`Controlador: src/reservations/reservations.controller.ts`

### Rota: POST /reservations 💾

- Descrição: Cria uma nova reserva.
  - **Parâmetros**:
    - `createReservationDto` (body): Objeto contendo os dados da reserva.
  - **Resposta:**
    - `201`: Reserva criada.
    - `400`: Bad request.

### Rota: GET /reservations/hotelName/:hotelName 🔍

- Descrição: Retorna reservas pelo nome do hotel.
  - **Parâmetros**:
    - `hotelName (path)`: Nome do hotel.
  - **Resposta:**
    - `200`: Lista de reservas.
    - `404`: Nenhuma reserva encontrada.

### Rota: PUT /reservations/:id 🛠️

- Descrição: Atualiza uma reserva pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID da reserva.
    - `updateReservationDto` (body): Objeto contendo os dados atualizados da reserva.
  - **Resposta:**
    - `200`: Reserva atualizada.
    - `404`: Reserva não encontrada.

### Rota: DELETE /reservations/:id 🗑️

- Descrição: Deleta uma reserva pelo ID.
  - **Parâmetros**:
    - `id (path)`: ID da reserva.
  - **Resposta:**
    - `200`: Reserva deletada.
    - `404`: Reserva não encontrada.

`Serviço: src/reservations/reservations.service.ts`

- Contém a lógica de negócios para as reservas.

`DTOs:`

- src/reservations/dto/create-reservation.dto.ts: `DTO para criação de reserva.`
- src/reservations/dto/reservation-response.dto.ts: `DTO para resposta de reserva.`
- src/reservations/dto/update-reservation.dto.ts: `DTO para atualização de reserva.`

## Módulo de Autenticação 🔐

`Controlador: src/auth/auth.controller.ts`

### Rota: POST /auth 💾

- Descrição: Autentica um usuário.
  - **Parâmetros**:
    - `UserLoginDto` (body): Objeto contendo os dados de login do usuário.
  - **Resposta:**
    - `200`: Usuário autenticado.
    - `401`: Unauthorized.

`Serviço: src/auth/auth.service.ts`

- Contém a lógica de autenticação.

`DTOs:`

- src/auth/dto/user-login.dto.ts: `DTO para login de usuário.`

## Módulo Principal 🏠

`Módulo: src/app.module.ts`

- Importa e configura todos os módulos da aplicação.

`Arquivo de Entrada: src/main.ts`

- Inicializa a aplicação e configura o Swagger para documentação da API.

Esses são os detalhes dos principais módulos da API. Cada módulo é responsável por uma parte específica da aplicação, e os DTOs são usados para definir a estrutura dos dados que são enviados e recebidos pelas rotas.
