# Lars van der Niet

Welcome to my personal website! This project is built with Next.js and showcases my skills as a full stack developer and tech enthusiast. Below you'll find all the necessary information to get started with the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/larsniet/portfolio.git
   ```

2. Change into the project directory:
   ```bash
   cd portfolio
   ```

3. Install the dependencies:
   ```bash
   pnpm install
   ```

## Usage

### Development

To run the project in development mode, use the following command:
```bash
pnpm dev
```

This will start the development server at `http://localhost:3000`.

### Build

To build the project for production, use the following command:
```bash
pnpm build
```

### Start

To start the project in production mode, use the following command:
```bash
pnpm start
```

## Environment Variables

The project uses a single environment variable:

- `NEXT_PUBLIC_BASE_URL`: The base URL for the application.

To set up the environment variable, create a `.env.local` file in the root of the project and add the following line:

```env
NEXT_PUBLIC_BASE_URL=https://your-base-url.com
```

## Features

- **RSS Feed**: Stay updated with the latest posts via the RSS feed.
- **Dynamically Generated Blog Articles**: Blog articles are generated dynamically.
- **SEO**: Sitemap and OpenGraph support for better SEO.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Thank you for checking out my portfolio project! If you have any questions or feedback, feel free to open an issue or contact me directly.