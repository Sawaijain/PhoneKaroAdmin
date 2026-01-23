# PhoneKaro Admin Panel

Admin panel for managing patients and drivers.

## Features

- Login authentication
- View all patients in a table
- View patient details on row click
- View all drivers in a table
- View driver details on row click
- Sidebar navigation
- Logout functionality

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Login Credentials

- Username: `administrator`
- Password: `superadmin@321`

## Project Structure

```
src/
  ├── components/       # Reusable components
  │   ├── Layout.tsx           # Sidebar layout
  │   ├── Login.tsx            # Login page
  │   ├── PatientDetailModal.tsx
  │   └── DriverDetailModal.tsx
  ├── pages/           # Page components
  │   ├── Patients.tsx
  │   └── Drivers.tsx
  ├── context/         # React Context
  │   └── AuthContext.tsx
  ├── services/        # API services
  │   └── api.ts
  ├── types/           # TypeScript types
  │   └── index.ts
  ├── App.tsx          # Main app component
  └── main.tsx         # Entry point
```
