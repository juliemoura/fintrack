# FinTrack

#### Link do Projeto: https://fintrack-xi-seven.vercel.app/

Aplicação web desenvolvida com **React**, **TypeScript** e **Vite**, focada na visualização de indicadores e dados de negócio por meio de dashboards interativos. O projeto utiliza **Redux** para gerenciamento global de estado, garantindo previsibilidade e escalabilidade na manipulação dos dados da aplicação.

A interface foi construída com **Tailwind CSS** e componentes do **Shadcn/UI**, customizados para seguir a identidade visual da plataforma. Para a exibição de métricas e análises, foram utilizados gráficos interativos desenvolvidos com **Recharts**, proporcionando uma experiência intuitiva e responsiva para os usuários.

Para simulação da camada de backend e consumo de APIs REST, foi utilizado **JSON Server**, permitindo a criação rápida de endpoints mockados para desenvolvimento, testes e validação das funcionalidades da aplicação sem a necessidade de um servidor backend completo.

## Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* Redux
* Tailwind CSS
* Shadcn/UI
* Recharts

### Backend (Mock API)

* JSON Server

### Testes

* Vitest

## Estrutura de Pastas

#### Components

##### Dashboard
Nesta pasta ficam centralizados todos os componentes utilizados na página de Dashboard.

- **BalanceCard**: Renderiza o card que exibe o valor guardado na poupança.
- **CardsGroup**: Renderiza os cards de Receitas e Despesas.
- **ChartsGroup**: Renderiza os gráficos de Receita x Despesa e de Despesas.
- **Sidebar**: Renderiza a sidebar e seus itens, utilizando como base o componente `Sidebar` localizado em `components/ui/sidebar`.
- **SummaryCard**: Componente reutilizável importado em `CardsGroup` para renderizar os cards de Receitas e Despesas.

##### Entries
Nesta pasta ficam centralizados todos os componentes utilizados na página de Entries.

- **EntryAddForm/EntryAddFormFields.test**: Testes unitários do modal de adição com Jest e React Testing Library: cobre abertura/fechamento do dialog, integração com Redux e exibição de toast.
- **EntryAddForm**: Renderiza o modal de adição de registros, gerenciando a criação de novas entradas e a atualização do estado por meio dos reducers da aplicação.
- **EntryEditForm/EntryEditFormFields.test**: Testes unitários do modal de edição com Jest e React Testing Library: cobre abertura/fechamento do dialog, integração com Redux e exibição de toast.
- **EntryEditForm**: Renderiza o modal de edição, concentrando as principais ações de atualização dos registros e acionando os reducers responsáveis pelas alterações de estado.
- **EntryFormFields/EntryFormFields.test**: Testes unitários dos campos do formulário com Jest e React Testing Library: cobre renderização dos campos, validação de erros, interação com selects e inputs.
- **EntryFormFields**: Componente reutilizável responsável por renderizar os campos do formulário de registros, sendo utilizado tanto nos modais de adição quanto de edição.
- **EntryList.test**: Teste##### Entries
Nesta pasta ficam centralizados todos os componentes utilizados na página de Entries.

- **EntryAddForm/EntryAddFormFields.test**: Testes unitários do modal de adição com Jest e React Testing Library: cobre abertura/fechamento do dialog, integração com Redux e exibição de toast.
- **EntryAddForm**: Renderiza o modal de adição de registros, gerenciando a criação de novas entradas e a atualização do estado por meio dos reducers da aplicação.
- **EntryEditForm/EntryEditFormFields.test**: Testes unitários do modal de edição com Jest e React Testing Library: cobre abertura/fechamento do dialog, integração com Redux e exibição de toast.
- **EntryEditForm**: Renderiza o modal de edição, concentrando as principais ações de atualização dos registros e acionando os reducers responsáveis pelas alterações de estado.
- **EntryFormFields/EntryFormFields.test**: Testes unitários dos campos do formulário com Jest e React Testing Library: cobre renderização dos campos, validação de erros, interação com selects e inputs.
- **EntryFormFields**: Componente reutilizável responsável por renderizar os campos do formulário de registros, sendo utilizado tanto nos modais de adição quanto de edição.
- **EntryList.test**: Testes unitários da listagem de entradas com Jest e React Testing Library: cobre renderização dos dados, formatação de datas e valores, e ação de remoção via Redux.
- **EntryList**: Componente responsável por renderizar a listagem de entradas cadastradas, exibindo informações como data, categoria, descrição e valor, além de disponibilizar ações de edição e remoção.
- **schema**: Define as regras de validação dos formulários de entrada com Zod e exporta a tipagem `entrySchema` utilizada na aplicação.s unitários da listagem de entradas com Jest e React Testing Library: cobre renderização dos dados, formatação de datas e valores, e ação de remoção via Redux.
- **EntryList**: Componente responsável por renderizar a listagem de entradas cadastradas, exibindo informações como data, categoria, descrição e valor, além de disponibilizar ações de edição e remoção.
- **schema**: Define as regras de validação dos formulários de entrada com Zod e exporta a tipagem `entrySchema` utilizada na aplicação.

##### Login
Nesta pasta ficam centralizados todos os componentes utilizados na página de Login.

- **LoginForm.test**: Testes unitários do fluxo de autenticação com Jest e React Testing Library: cobre validação de campos, estados de erro e integração com Redux.
- **LoginForm**: Componente de login responsável por renderizar os inputs de email e senha, gerenciar o estado do formulário e despachar as actions de autenticação via Redux.
- **schema**: Define as regras de validação dos formulários de login com Zod e exporta a tipagem `loginSchema` utilizada na aplicação.

##### Relatory
Nesta pasta ficam centralizados todos os componentes utilizados na página de Relatório.

- **RelatoryList**: Componente responsável por renderizar a listagem de entradas cadastradas em tabela em forma de relatório, exibindo informações como data, categoria, descrição e valor, além de disponibilizar ações de edição e remoção.
- **RelatoryList.test**: Testes unitários do relatório com Jest e React Testing Library: cobre renderização dos cabeçalhos da tabela, formatação de datas e valores, exibição de badges por tipo e comportamento com lista vazia.

##### UI
Todos os componentes reutilizáveis usados na aplicação e são baseados no Shadcn/UI.

#### Hooks
- **use-mobile**: Hook que detecta se o dispositivo está em viewport mobile (abaixo de 768px), reagindo em tempo real a mudanças de tamanho de tela via `matchMedia`, que é uma lib que avisa automaticamente quando a tela cruza o breakpoint definido, sem precisar de polling ou resize listener manual. 

#### Layout
- **index.tsx**: Componente que centraliza a estrutura base da aplicação, renderiza a `Sidebar` e os títulos das páginas uma única vez, evitando repetição nos demais componentes. É chamado em `appRoutes` como wrapper das rotas autenticadas.

#### Lib
- **exportHelpers**: Componente que exporta os lançamentos financeiros para um arquivo .xlsx com estilização completa: cores por tipo, linhas alternadas e resumo de totais (Receitas, Despesas e Saldo) ao final da planilha.
- **utils**: Funções utilitárias reutilizáveis da aplicação, como formatação de moeda, resolução de categorias e helpers de data.

#### Pages
- **Dashboard**: Página principal da aplicação, exibe um resumo financeiro com gráficos de evolução de receitas e despesas.
- **Entries**: Página de lançamentos, onde o usuário pode visualizar, adicionar, editar e excluir suas receitas e despesas.
- **Layout**: Componente base das páginas autenticadas, renderiza a `Sidebar`, o header com título dinâmico e o `ProfileMenu`, e ao montar busca automaticamente os lançamentos do usuário logado via Redux. As páginas internas são injetadas pelo Outlet.
- **Login**: Página de autenticação, composta pelo formulário de login e ilustração hero.
- **Relatory**: Página de relatórios, onde o usuário pode visualizar e exportar seus lançamentos em XLSX.

#### Routes
- **AppRoutes**: Define a estrutura de rotas da aplicação separando a rota pública de login das rotas protegidas (`/dashboard`, `/entries`, `/relatory`), que exigem autenticação e são renderizadas dentro do `Layout`.
- **ProtectedRoute**: Componente de guarda de rotas: verifica se o usuário possui token de autenticação e redireciona para o login caso não esteja autenticado.

#### Services
- **api**: Instância configurada do Axios com a URL base apontando para o JSON Server local, utilizada em todas as chamadas à API da aplicação.

#### Store
- **authSlice**: Slice de autenticação responsável pelo login do usuário, geração de token e persistência da sessão no `localStorage`. Expõe as actions `logout` e `clearError`, e gerencia os estados `idle`, `loading`, `succeeded` e `failed` do fluxo de autenticação.
- **entrySlice**: Slice responsável pelo CRUD completo dos lançamentos financeiros : busca, criação, edição, remoção e exclusão em massa. Expõe selectors memoizados (`selectAllRevenues`, `selectAllExpenses`, `selectAllSavings`) para filtrar as entradas por tipo e categoria sem re-renders desnecessários.
- **hooks**: Wrappers tipados sobre o `useDispatch` e `useSelector` do Redux, garantindo autocompletar e validação de tipos ao acessar o estado global da aplicação. **store**: Repositório central do Redux, combinando os slices `auth` e `entry` num único estado global e exporta os tipos `RootState` e `AppDispatch` para uso tipado em toda a aplicação.


#### Tests
- **setup**: Configuração global dos testes, importa os matchers do Jest DOM e mocka o `localStorage` para que os testes que dependem de armazenamento local funcionem corretamente no ambiente Vitest.

#### Types
- **index**: Tipos e interfaces globais da aplicação, compartilhados entre os diferentes módulos e componentes.
- **xls-js-style**: Declaração de tipos para o pacote `xlsx-js-style`, reexportando os tipos do `xlsx` padrão para garantir compatibilidade com o TypeScript.

#### App.tsx
- Define as rotas da aplicação, separando as rotas públicas (login) das rotas protegidas que exigem autenticação.


#### Index.css
- Estilos globais da aplicação, configuração base do Tailwind CSS e variáveis de fonte.


#### Main.tsx
- Ponto de entrada da aplicação, monta o React na DOM, envolve tudo com o `Provider` do Redux e renderiza o `App`.



### API (JSON Server)

A aplicação utiliza o **JSON Server** para simular uma API REST durante o desenvolvimento.

### Endpoints

#### Usuários

| Método | Endpoint | Descrição                 |
| ------ | -------- | ------------------------- |
| GET    | `/users` | Retorna todos os usuários |

#### Entradas

| Método | Endpoint                          | Descrição                               |
| ------ | --------------------------------- | --------------------------------------- |
| GET    | `/entries`                        | Retorna todas as entradas               |
| GET    | `/entries?userId=1`               | Filtra entradas por usuário             |
| GET    | `/entries?type=receita`           | Retorna apenas entradas do tipo receita |
| GET    | `/entries?type=despesa`           | Retorna apenas entradas do tipo despesa |
| GET    | `/entries?category=nomecategoria` | Filtra entradas por categoria           |
| POST   | `/entries`                        | Cria uma nova entrada                   |
| PUT    | `/entries/:id`                    | Atualiza uma entrada existente          |
| DELETE | `/entries/:id`                    | Remove uma entrada                      |

### URL Base

```text
http://localhost:3001
```

### Exemplos

```http
GET http://localhost:3001/users
```

```http
GET http://localhost:3001/entries?userId=1
```

```http
POST http://localhost:3001/entries
```

```http
PUT http://localhost:3001/entries/1
```

```http
DELETE http://localhost:3001/entries/1
```


## Como rodar o projeto

### Backend

Inicie o servidor da API:

```bash
npm run server
```

### Frontend

Em outro terminal, inicie a aplicação React:

```bash
npm run dev
```

Após a inicialização, o frontend estará disponível no endereço informado pelo Vite, geralmente `http://localhost:5173` e o backend estará provavelmente em `http://localhost:3001`.

## Rodando os Testes

Rodar todos os testes:
```bash
npm test
```

Rodar uma vez só (sem watch mode):
```bash
npm test -- --run
```

Rodar um arquivo específico:
```bash
npm test LoginForm
```

Ver cobertura de código:
```bash
npm test -- --coverage
```