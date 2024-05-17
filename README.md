<div style="text-align: center;">
    <h1>FSW Foods</h1>
</div>

<div style="text-align: center;">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style-plastic-green&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style-plastic-green&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style-plastic-green&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=style-plastic-green&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-%23ECC94B.svg?style=&logo=Prisma&logoColor=blue)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=style-plastic-green&logo=postgresql&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=style-plastic-green&logo=google-cloud&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style-plastic-green&logo=github&logoColor=white)

</div>

<div style="display: flex; justify-content: center;">
<div>

![Mockup Desktop](/public/mockup-desktop.png)

</div>

<div>

![Mockup Mobile](/public/mockup-smartphone.png)

</div>
</div>


## Descrição

Projeto de um sistema de delivery semelhante ao Ifood. No contexto desse projeto temos a implementação de autenticação com GitHub e Google. Esse sistema de autenticação foi implementado com o [NextAuth](https://next-auth.js.org/getting-started/example). A aplicação, em termos gerais, utiliza as seguintest tecnologias:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Neon](https://neon.tech/)

## Como rodar na minha máquina?

### Preparando o projeto no [Google Cloud Console](https://console.cloud.google.com/)

- Crie um novo projeto
- Em APIs e serviços acesse o submenu Credenciais
- Crie uma nova credencial em Criar ID do cliente do OAuth, adicione as informações conforme a imagem abaixo ( veja mais em [NextAuth](https://next-auth.js.org/providers/google) ): 

    ![Credencial de OAuth](/public/gcp-instructions.png)

- Após isso você terá as informações para autenticar no Google

### Preparando o projeto no [GitHub](https://github.com/)

- No seu perfil do GitHub vá em Settings -> Developer settings -> OAuth Apps
- Crie uma nova aplicação OAuth e adicone as informações conforme a imagem abaixo ( veja mais em [NextAuth](https://next-auth.js.org/providers/github) ):

    ![Credencial de OAuth](/public/github-instructions.png)

- Finalize a configuração e você terá as informações para autenticar no GitHub

### Preparando o banco de dados no [Neon](https://neon.tech/)

- Crie uma conta, se não houver
- Crie um novo projeto
- Crie um novo banco de dados PostgreSQL
- Na Dashboard você terá acesso a connection string, guarde-a

## Setup do projeto

- Faça um clone do repositório no [GitHub](https://github.com/MatheusAmon12/food-delivery).
- Instale o [Node.js v20.12.2](https://nodejs.org/en/) e o [npm v10.7.0](https://www.npmjs.com/)
- Configure as variáveis de ambiente para:
    - `DATABASE_URL`: string conection obtida ao criar um banco de dados no [Neon](https://neon.tech/)
    - `GOOGLE_CLIENT_ID`: obtenha o client id no [Google Cloud Console](https://console.cloud.google.com/) criando um novo projeto
    - `GOOGLE_CLIENT_SECRET`: obtenha o client secret no [Google Cloud Console](https://console.cloud.google.com/) criando um novo projeto
    - `GITHUB_ID`: obtenha o client id no [GitHub](https://github.com/) criando uma nova aplicação OAuth
    - `GITHUB_SECRET`: obtenha o client secret no [GitHub](https://github.com/) criando uma nova aplicação OAuth
    - `NEXTAUTH_SECRET`: string que você pode gerar aleatoriamente, recomendo passar um prompt para o ChatGPT para gerar essa string
    - Observações: set os valores em formato string (""), com exceção do `NEXTAUTH_SECRET`
    
- No terminal rode os seguintes comandos para instalar as dependências do projeto:

    ```bash
    npm install
    ```
- Popule seu banco de dados com o arquivo `prisma/seed.ts`, para isso rode o seguinte comando:

    ```bash
    npx prisma db seed
    # and
    npx prisma generate
    ```
- Por fim, rode o comando `npm run dev` para iniciar o servidor

## Como me localizar no projeto?

- Como a versão do Next.js é 14 trabalhamos com os conceitos de Server Components, e optei por não utilizar a pasta `src`, todos os arquivos do projeto estão dentro da pasta `app`.
- Vide a estrutura:
    - `app/_actions`
        - `order.ts` cria um novo pedido no banco de dados
        - `restaurant.ts` ação de tornar favorito ou desfavoritar um restaurante
    - `app/_components`
        - `ui` componentes provisionados pelo Shadcn UI
        - `cart-item.tsx` item do carrinho
        - `cart.tsx` carrinho com todos os itens
        - `category-item.tsx` categorias de produtos
        - `category-list.tsx` renderiza os itens na página inicial
        - `delivery-info.tsx` informações sobre entrega dos restaurantes
        - `discount-percentage.tsx` renderiza o percentual de desconto de cada produto
        - `header.tsx` cabecalho da página
        - `product-item.tsx` item de um produto
        - `product-list.tsx` renderiza os itens de cada produto
        - `promo-banner.tsx` renderiza os banners de promoção da página inicial
        - `restaurant-item.tsx` item de um restaurante
        - `restaurant-list.tsx` renderiza os itens de cada restaurante
        - `search.tsx` barra de pesquisa
    - `app/_context`
        - `cart.tsx` contexto do carrinho
    - `app/_helpers`
        - `price.ts` ajuda no tratamento de preços e cálculo de descontos
        - `restaurant.ts` ajuda no tratamento de restaurantes na verificação de favoritos
    - `app/_lib`
        - `auth.ts` autenticação do NextAuth
        - `prisma.ts` configuração do banco de dados
        - `utils.ts` utilitário provisionado pelo Shadcn UI
    - `app/_providers`
        - `next-auth.tsx` provider component do NextAuth para autenticação
    - `app/api/auth/[...nextauth]/route.ts` expõe as rotas `GET` e `POST` do NextAuth
    - `app/categories/[id]/products/page.tsx` renderiza os produtos de uma categoria com base no id
    - `app/hooks`
        - `use-toggle-favorite-restaurant.ts` hook para favoritar e desfavoritar um restaurante
    - `app/my-orders`
        `/components/order-item.tsx` item de um pedido
        `page.tsx` renderiza os pedidos
    - `app/products/[id]`
        - `components`
            - `product-details.tsx` página do produto
            - `product-image.tsx` imagem do produto no topo da página
        - `page.tsx` renderiza o conteúdo da página'
    - `app/products/recommended`
        - `page.tsx` renderiza os produtos recomendados
    - `app/restaurant`
        - `_actions`
            - `search.ts` busca por restaurantes no banco de dados
        - `_components`
            - `restaurants.tsx` renderiza os restaurantes recomendados
        - `[id]` 
            - `_components` 
                - `cart-banner.tsx` renderiza o banner do carrinho apenas nas página do restaurante ao qual os pedidos pertencem
                - `restaurant-image.tsx` imagem do restaurante no topo da página
        - `recommended`
            - `page.tsx` renderiza os restaurantes recomendados
        - `page.tsx` renderiza os restaurantes
    - `app/globals.css` estilos globais
    - `app/layout.tsx` layout/template da página
    - `app/page.tsx` renderiza a home do projeto
    - `prisma/`	
        - `migrations` contém o histórico de migrations realizadas no decorrer do projeto
        - `schema.prisma` contém o esquema do banco de dados
        - `seed.ts` seed do banco de dados, contendo todos os dados necessários para o projeto
    - `public/` arquivos de imagens e vetores utilizados pelo projeto    