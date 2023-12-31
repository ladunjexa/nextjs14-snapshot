# Next.js 14 SnapShot

<!-- GitHub badges -->

[![Latest release](https://img.shields.io/github/v/release/ladunjexa/nextjs14-snapshot?label=Latest%20release&style=social)](https://github.com/ladunjexa/nextjs14-snapshot/releases/tag/v0.1.0)
[![Stars](https://img.shields.io/github/stars/ladunjexa/nextjs14-snapshot?style=social)](https://github.com/ladunjexa/nextjs14-snapshot/stargazers)
[![Fork](https://img.shields.io/github/forks/ladunjexa/nextjs14-snapshot?style=social)](https://github.com/ladunjexa/nextjs14-snapshot/forks)
[![GitHub commits](https://img.shields.io/github/commit-activity/t/ladunjexa/nextjs14-snapshot?style=social&logo=github)](https://github.com/ladunjexa/nextjs14-snapshot/commits)
[![Pull requests](https://img.shields.io/github/issues-pr/ladunjexa/nextjs14-snapshot?style=social&logo=github)](https://github.com/ladunjexa/nextjs14-snapshot/pulls)

![demo](https://i.ibb.co/k4BQtdP/Thumbnail.png)

[![ladunjexa](https://custom-icon-badges.demolab.com/badge/made%20by%20-ladunjexa-556bf2?logo=github&logoColor=white&labelColor=101827)](https://github.com/luadnjexa)
[![License](https://img.shields.io/github/license/ladunjexa/nextjs14-snapshot?color=dddddd&labelColor=000000)](https://github.com/ladunjexa/nextjs14-snapshot/blob/main/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/ladunjexa/nextjs14-snapshot?logo=github&logoColor=%23007ACC&label=TypeScript)](https://www.typescriptlang.org/)
[![Contributors](https://img.shields.io/github/contributors/ladunjexa/nextjs14-snapshot?style=flat&color=orange&label=Contributors)](https://github.com/ladunjexa/nextjs14-snapshot/graphs/contributors)
![Release](https://img.shields.io/github/release/ladunjexa/nextjs14-snapshot.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)
![deployment](https://img.shields.io/github/deployments/ladunjexa/nextjs14-snapshot/Production?logo=vercel&label=Website)
[![Known Vulnerabilities](https://snyk.io/test/github/ladunjexa/nextjs14-snapshot/badge.svg)](https://snyk.io/test/github/ladunjexa/nextjs14-snapshot)

## 🌐 Live Demo

Explore the live demonstration of the project: [nextjs14-snapshot](https://nextjs14-snapshot.vercel.app/)

## 📝 Description

**SnapShot** is a modern social app with a stunning UI with a native mobile feel, a special tech stack, an infinite scroll feature, and amazing performance using Next.js, Appwrite, TypeScript, and more.

<details><summary><b>Folder Structure</b></summary>

```bash
nextjs14-snapshot/
├── app/
├   ├── (auth)/
├   ├   ├── sign-in/[[...sign-in]]/
├   ├   ├   └── page.tsx
├   ├   ├── sign-up/[[...sign-up]]/
├   ├   ├   └── page.tsx
├   ├   └── layout.tsx
├   ├── (root)/
├   ├   ├── layout.tsx
├   ├   ├── (home)/
├   ├   ├   └── page.tsx
├   ├   ├── collection/
├   ├   ├   └── page.tsx
├   ├   ├── community/
├   ├   ├   └── page.tsx
├   ├   ├── explore/
├   ├   ├   └── page.tsx
├   ├   ├── create-post/
├   ├   ├   └── page.tsx
├   ├   ├── edit-post/
├   ├   ├   └── [id]/
├   ├   ├       └── page.tsx
├   ├   ├── edit-profile/
├   ├   ├   └── [id]/
├   ├   ├       └── page.tsx
├   ├   ├── posts/
├   ├   ├   └── [id]/
├   ├   ├       └── page.tsx
├   ├   └── profile/
├   ├       └── [id]/
├   ├           ├── followers/
├   ├           ├   └── page.tsx
├   ├           ├── following/
├   ├           ├   └── page.tsx
├   ├           └── page.tsx
├   ├── favicon.ico
├   ├── globals.css
├   ├── layout.tsx
├── components/
├   ├── cards/
├   ├   ├── FollowCard.tsx
├   ├   ├── PostCard.tsx
├   ├   └── UserCard.tsx
├   ├── forms/
├   ├   ├── Auth.tsx
├   ├   ├── Post.tsx
├   ├   └── Profile.tsx
├   ├── scenes/
├   ├   ├── AllStories.tsx
├   ├   ├── AllUsers.tsx
├   ├   ├── Follows.tsx
├   ├   ├── Post.tsx
├   ├   ├── Profile.tsx
├   ├   ├── RecentPosts.tsx
├   ├   └── SavedPosts.tsx
├   ├── shared/
├   ├   ├── FileUploader.tsx
├   ├   ├── GridPostList.tsx
├   ├   ├── PostStats.tsx
├   ├   ├── Story.tsx
├   ├   ├── atoms/
├   ├   ├   ├── Alert.tsx
├   ├   ├   └── Loader.tsx
├   ├   ├── layout/
├   ├   ├   ├── Bottombar.tsx
├   ├   ├   ├── LeftSidebar.tsx
├   ├   ├   ├── RightSidebar.tsx
├   ├   ├   └── Topbar.tsx
├   ├   └── search/
├   ├       ├── LocalResult.tsx
├   ├       └── LocalSearchbar.tsx
├   └── ui/ (generated by shadcn-ui)
├       ├── button.tsx
├       ├── dialog.tsx
├       ├── form.tsx
├       ├── input.tsx
├       ├── label.tsx
├       ├── tabs.tsx
├       ├── textarea.tsx
├       ├── toast.tsx
├       ├── toaster.tsx
├       └── use-toast.ts
├── appwrite/
├   ├── env.ts
├   ├── client.ts
├   ├── actions/
├   ├   ├── post.action.ts
├   ├   ├── save.action.ts
├   ├   └── user.action.ts
├   └── conf/
├       └── index.ts
├── constants/
├   └── index.ts
├── context/
├   └── AuthContext.tsx
├── hooks/
├   └── useDebounce.ts
├── lib/
├   ├── utils.ts
├   ├── react-query/
├   ├   ├── Provider.tsx
├   ├   ├── QueryKeys.ts
├   ├   ├── mutations/
├   ├   ├   ├── post.mutation.ts
├   ├   ├   ├── save.mutation.ts
├   ├   ├   └── user.mutation.ts
├   ├   └── queries/
├   ├       ├── post.mutation.ts
├   ├       └── user.mutation.ts
├   └── validations/
├       └── index.ts
├── public/
├   ├── next.svg
├   ├── vercel.svg
├   └── assets/
├       ├── icons/[[...]].svg
├       └── images/[[...]].{svg,png}
├── styles/
├   ├── prism.css
├   └── theme.css
├── types/
├   └── index.d.ts
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── README.md
├── components.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.ts
```

</details>

## 📖 Table of Contents

<details><summary>Table of Contents</summary>

- [Live Demo](#-live-demo)
- [Description](#-description)
- [Technologies Used](#-technologies-used)
- [Get Started](#-get-started)
  - [Prerequisites](#-prerequisites)
  - [Installation and Run Locally](#-installation-and-run-locally)
  - [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
  - [Deploy to production (manual)](#-deploy-to-production-manual)
  - [Deploy on Vercel (recommended)](#-deploy-on-vercel-recommended)
  - [Deploy on Netlify](#-deploy-on-netlify)
- [Contributing](#-contributing)
  - [Bug / Feature Request](#-bug--feature-request)
- [Acknowledgements](#-acknowledgements)
- [References](#-references)
- [Contact Us](#-contact-us)
- [License](#-license)

</details>

## ✨ Technologies Used

<details><summary><b>SnapShot</b> is built using the following technologies:</summary>

- [TypeScript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Next.js](https://nextjs.org/): Next.js is a React framework for building server-side rendered and statically generated web applications.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
- [ESLint](https://eslint.org/): ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code.
- [Prettier](https://prettier.io/): Prettier is an opinionated code formatter.
- [Shadcn-UI](https://ui.shadcn.com/): Shadcn UI is a React UI library that helps developers rapidly build modern web applications.
- [Appwrite](https://appwrite.io/): Appwrite is a secure end-to-end backend server for Web, Mobile, and Flutter developers that is packaged as a set of Docker containers for easy deployment.
- [React Query](https://react-query.tanstack.com/): React Query is a data-fetching library for React.
- [Query String](https://www.npmjs.com/package/query-string): Parse and stringify URL query strings.
- [Zod](https://zod.dev/): Zod is a TypeScript-first schema declaration and validation library.
- [Vercel](https://vercel.com/): Vercel is a cloud platform for frontend developers, providing the frameworks, workflows, and infrastructure to build a faster, more personalized Web.

</details><br/>

[![Technologies Used](https://skillicons.dev/icons?i=ts,nextjs,tailwind,appwrite,vercel)](https://skillicons.dev)

## 🧰 Get Started

To get this project up and running in your development environment, follow these step-by-step instructions.

### 📋 Prerequisites

In order to install and run this project locally, you would need to have the following installed on your local machine.

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/downloads)

### ⚙️ Installation and Run Locally

**Step 0:**

Note :bangbang: the application uses Appwrite for Authentication and User Management, therefore, you need to create Appwrite account [here](https://appwrite.io/) and sets the `NEXT_PUBLIC_APPWRITE_PROJECT_ID` and `NEXT_PUBLIC_APPWRITE_URL` environment variables in `.env` file.

Also,

- you need to create a new storage in Appwrite called `media` and set the `NEXT_PUBLIC_APPWRITE_STORAGE_ID` environment variable in `.env` file.
- you need to create a new database in Appwrite and set the `NEXT_PUBLIC_APPWRITE_DATABASE_ID` environment variable in `.env` file.
- within the database, you need to create those collections: `posts`, `users`, and `saves` and set the `NEXT_PUBLIC_APPWRITE_{NAME}_COLLECTION_ID` environment variable in `.env` file.

_(the storage and database design can be found in [Reference](#-reference))_

**Step 1:**

Download or clone this repo by using the link below:

```bash
git clone https://github.com/ladunjexa/nextjs14-snapshot.git
```

**Step 2:**

Execute the following command in the root directory of the downloaded repo in order to install dependencies:

```bash
npm install
```

**Step 3:**

Execute the following command in order to run the development server locally:

```bash
npm run dev
```

**Step 4:**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 📜 Scripts

All scripts are defined in the `package.json` file. Here is a list of all scripts:

| Script          | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production site to `./dist/`     |
| `npm run start` | Start your production site locally          |
| `npm run lint`  | Run ESLint                                  |

## 🔒 Environment Variables

Environment variables[^7] can be used for configuration. They must be set before running the app.

> [Environment variables](https://en.wikipedia.org/wiki/Environment_variable) are variables that are set in the operating system or shell, typically used to configure programs.

**SnapShot** uses [Appwrite](https://appwrite.io) as external service. You need to create an account on Appwrite and get the required credentials to run the app.

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<NEXT_PUBLIC_APPWRITE_PROJECT_ID>
NEXT_PUBLIC_APPWRITE_URL=<NEXT_PUBLIC_APPWRITE_URL>

NEXT_PUBLIC_APPWRITE_STORAGE_ID=<NEXT_PUBLIC_APPWRITE_STORAGE_ID>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<NEXT_PUBLIC_APPWRITE_DATABASE_ID>

NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=<NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID>
NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=<NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID>
NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID=<NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID>
```

## 🚀 Deployment

#### Deploy to production (manual)

You can create an optimized production build with the following command:

```bash
npm run build
```

#### Deploy on Vercel (recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fladunjexa%2Fnextjs14-snapshot)

#### Deploy on Netlify

You can also deploy this Next.js app with [Netlify](https://www.netlify.com/).

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ladunjexa/nextjs14-snapshot)

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🔧 Contributing

[![contributors](https://contrib.rocks/image?repo=ladunjexa/nextjs14-snapshot)](https://github.com/ladunjexa/nextjs14-snapshot/graphs/contributors)

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To fix a bug or enhance an existing module, follow these steps:

1. Fork the repo
2. Create a new branch (`git checkout -b improve-feature`)
3. Make the appropriate changes in the files
4. Commit your changes (`git commit -am 'Improve feature'`)
5. Push to the branch (`git push origin improve-feature`)
6. Create a Pull Request 🎉

### 📩 Bug / Feature Request

If you find a bug (failure of a module to execute its intended function), kindly open an issue [here](https://github.com/ladunjexa/nextjs14-snapshot/issues/new) by including the issue with a title and clear description.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/ladunjexa/nextjs14-snapshot/issues/new). Please include sample queries and their corresponding results.

## 💎 Acknowledgements

I'd like to express my gratitude to the following people who helped me with this project and made it possible:

- [React Query](https://react-query.tanstack.com/)
- [Appwrite](https://appwrite.io/)
- [Zod](https://zod.dev/)
- [Shadcn](https://shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [JavaScript Mastery](https://www.jsmastery.pro/)

## 📚 References

JSMastery. (2023). [Build and Deploy a Full Stack Social Media App | React JS, Appwrite, Tailwind CSS, React Query](https://www.youtube.com/watch?v=_W3R2VwRyF4&t=10273s). YouTube.

## 📞 Contact Us

[![Telegram](https://img.shields.io/badge/Telegram-@ladunjexa-2CA5E0?style=social&logo=telegram&logoColor=000000)](https://t.me/ladunjexa)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ladunjexa-blue?style=flat&logo=linkedin&logoColor=b0c0c0&labelColor=363D44)](https://www.linkedin.com/in/lironabutbul)
[![Instagram](https://img.shields.io/badge/Instagram-ladunjexa-grey?style=flat&logo=instagram&logoColor=b0c0c0&labelColor=8134af)](https://www.instagram.com/ladunjexa)
[![Discord](https://img.shields.io/badge/Discord-ladunjexa-7289da?style=flat&logo=discord&logoColor=b0c0c0&labelColor=2c2f33)](https://discord.com/users/827996364331810816)

<!-- [![Twitter](https://img.shields.io/twitter/follow/ladunjexa.svg?style=social)](https://twitter.com/intent/follow?screen_name=ladunjexa) -->

## 📋 License

**SnapShot** is open source software [licensed as MIT](https://opensource.org/license/mit/) and is free to use — See [LICENSE](https://github.com/ladunjexa/nextjs14-snapshot/blob/main/LICENSE) for more details.
