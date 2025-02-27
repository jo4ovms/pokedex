# Pokédex

![Pokedex](https://img.shields.io/badge/React-Vite-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![API](https://img.shields.io/badge/PokeAPI-red)

Um projeto de Pokédex feito com **React Vite** e **TypeScript**, consumindo a **PokeAPI** para exibir informações sobre Pokémons.

##  Funcionalidades
- Buscar Pokémons pelo nome ou ID
- Listagem de Pokémons
- Exibição de detalhes de cada Pokémon (tipo, habilidades, estatísticas, etc.)

## Tecnologias Utilizadas
- **React Vite** - Estrutura rápida para desenvolvimento frontend
- **TypeScript** - Tipagem segura e desenvolvimento escalável
- **PokeAPI** - API para obter informações sobre Pokémons
- **Material UI** - Biblioteca de componentes

## Estrutura do Projeto
```
/front
├── src/
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/        # Páginas principais
│   ├── services/     # Consumo da API
│   ├── types/        # Tipos
│   ├── utils/        # Funções utilitárias
│   ├── App.tsx       # Componente principal
│   ├── main.tsx      # Ponto de entrada
├── package.json      # Dependências e scripts
├── vite.config.ts    # Configurações do Vite
├── tsconfig.json     # Configuração do TypeScript
└── README.md         # Documentação do projeto
```

## 🔧 Instalação e Execução

Clone o repositório e instale as dependências:
```bash
git clone https://github.com/jo4ovms/pokedex.git
cd pokedex
npm install
```

Para iniciar o projeto em modo de desenvolvimento:
```bash
npm run dev
```
