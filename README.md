<p align="center">
  <h2 align="center">Blogs Frontend — Next.js React Application</h2>
</p>

<p align="center">
A modern and responsive frontend application built with <b>Next.js</b> and <b>React</b> for managing blogs with authentication, role-based access, rich text editor, and admin dashboard support.
</p>

<p align="center">
<a href="#" target="_blank"><img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/framework-Next.js-black" alt="Next.js" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/react-v18-blue" alt="React" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/redux-enabled-purple" alt="Redux" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/license-MIT-yellow" alt="License" /></a>
</p>

---

## Project Overview

The **Blogs Frontend** is a modern blog management application built with **Next.js** (React framework).  
It includes authentication, admin features, a rich text editor, and smooth UI interactions.

###  Features

- **User Authentication** (JWT-based)
- **Role-Based Access** (Admin/User)
- **Blog CRUD** (Create, edit, update, delete, view posts)
- **Rich Text Editor** (TipTap)
- **Light/Dark Theme Toggle**
- **Toast Notifications** (React Hot Toast)
- **React Query** (Fast data loading & caching)
- **Redux** for global state (auth, user)
- **Responsive layouts** for public, auth, and admin pages

---

##  Tech Stack

- **Next.js** – React framework for SSR/SSG
- **React** – UI library
- **Redux** – Global state management
- **React Query** – API caching and synchronization
- **TipTap** – Rich text editor
- **CSS Modules** – Scoped and modular CSS
- **Axios** – API requests
- **React Hot Toast** – Toast notifications
- **Next-Themes** – Theme toggling
- **Zod** – Type-safe schema validation
- **Swiper** – Interactive sliders

---

##  Key Features Explained

###  Authentication with LocalStorage & Redux
- JWT token + user role stored in `localStorage`  
- Synced with Redux for fast global access  
- Automatically restores session on reload

###  React Query for Performance
- Caches API responses  
- Reduces unnecessary requests  
- Speeds up loading for posts & user data

###  Scoped Styles with CSS Modules
- Clean, maintainable styling  
- No global name conflicts  
- Smaller compiled CSS

###  Theme Toggle with Next-Themes
- Light/dark theme switch  
- Theme stored in `localStorage`

---

##  Application Layouts

###  **Auth Layout**
Pages:  
`/login`, `/register`

###  **Public Layout**
Pages:  
`/home`, `/posts`, `/posts/[id]`, `/posts/create`

###  **Admin Dashboard Layout**
Pages:  
`/admin/posts`, `/admin/users`, `/posts/edit/[id]`

---

##  Routes Overview

The application is structured with the following routes, categorized by their purpose and access level:

###  Admin Routes
- **`/admin/posts`** – Manage all blog posts (publish, delete).  
- **`/admin/users`** – Manage user permissions.

###  Public Routes
- **`/home`** – Landing page showing latest blog posts.  
- **`/posts`** – View all posts.  
- **`/posts/[id]`** – View a single blog post.  

### ✍️ User Routes
- **`/posts/create`** – Create a new blog post.  
- **`/posts/edit/[id]`** – Edit an existing blog post.  

### 🔑 Auth Routes
- **`/login`** – User login page.  
- **`/register`** – User registration page.  

---

##  Environment Setup

Create a `.env` file in the root:

```env
NEXT_PUBLIC_API_URL=<your-api-url>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
