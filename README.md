# Rick and Morty API Search Application

"This application performs searches and displays information obtained from the private ['Rick and Morty' API](https://rickandmortyapi-sigma.vercel.app/api/character), while avatars are sourced from the [official API](https://rickandmortyapi.com/documentation/#get-character-information)."

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AleksaRoad/react-components.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application in development mode:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

4. **Build the project:**
   ```bash
   npm run build
   ```

## Available Scripts

- **`npm run dev`**: Run the application in development mode using Vite.
- **`npm run build`**: Build the project (TypeScript compilation and Vite build).
- **`npm run lint`**: Lint the code using ESLint.
- **`npm run format:fix`**: Automatically format the code using Prettier.
- **`npm run stylelint`**: Lint styles using Stylelint.
- **`npm run stylelint:fix`**: Automatically fix styles using Stylelint.
- **`npm run preview`**: Preview the built project.
- **`npm run prepare`**: Set up Husky for Git Hooks.
- **`npm run type-check`**: Type-check the project using TypeScript without emitting files.

## Technologies Used

- **React**: A library for building user interfaces.
- **TypeScript**: Static typing for JavaScript.
- **Vite**: A modern build tool for development and production.
- **ESLint**: A linter for JavaScript/TypeScript code.
- **Prettier**: A code formatting tool.
- **Stylelint**: A linter for CSS code.
- **Husky**: Git Hooks for automating tasks (e.g., linting before commit).

### Student can get 100 points:

- [x] Eslint is set up, when lint command is run it doesn't produce any errors (if there are warnings score might be less) - 15 points

- [x] Prettier is set up, format:fix command fixes issues - 15 points

- [x] Husky is set up, linting is run on pre-commit - 10 points

- [x] Page is split into at least two sections, top one has Search input and "Search" button, main section displays the list of results from the selected api when page is opened for the first time (loader should be shown while app makes a call to the api) - 20 points

- [x] When user types something to the Search input and clicks "Search" button, a loader is displayed and the list is changed according to the response results for a provided search term - 15 points

- [x] The search term typed into the Search input is saved in the LS when user clicks on "Search" button (check it by closing the tab and open the app in the new one - the initial call should contain previously entered search term) - 15 points

- [x] Application is wrapped with ErrorBoundary, which logs error to a console and shows a fallback UI. There should be a button to throw an error - 10 points
