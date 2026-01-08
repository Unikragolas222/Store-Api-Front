
# Project Blueprint

## Overview

This project is an e-commerce store built with Next.js and styled with Tailwind CSS. It fetches product data from the Fake Store API and displays it in a modern, user-friendly interface. The application is designed to be resilient, with graceful error handling for API data fetching and a complete user authentication system.

## Features

*   **Product Catalog:** Browse a grid of all available products on a single page.
*   **Dynamic Shopping Cart:** A fully functional shopping cart that allows users to add, remove, and adjust the quantity of items.
*   **User Authentication:** Users can sign up for a new account and log in to their existing account using Firebase Authentication.
*   **Protected Routes (Future):** The groundwork is laid to protect certain routes, making them accessible only to logged-in users.
*   **Responsive Design:** The layout adapts to different screen sizes for a seamless experience on desktop and mobile devices.
*   **Modern Styling:** The UI is designed with a clean and modern aesthetic, featuring a dark mode, custom fonts, and subtle animations.

## Style and Design

*   **Layout:** The application uses a main layout with a header containing the store's title and a cart icon. The main content area displays the product grid.
*   **Typography:** The application uses the "Geist" font for a modern and clean look.
*   **Color Palette:** The color scheme is based on a dark theme with a black background and white text, and a light theme with a white background and black text. Accent colors are used for buttons and notifications.
*   **Product Cards:** Product cards have a border, rounded corners, and a box shadow to create a "lifted" effect. They also feature a subtle hover effect.
*   **Shopping Cart:** The shopping cart is a slide-out panel that provides a clear overview of the selected items, quantities, and total price.

## Current Plan: Implement User Authentication

1.  **Configure Firebase:** Add Firebase to the project for backend services.
2.  **Install Firebase SDK:** Add the `firebase` client library to the project dependencies.
3.  **Create Firebase Config:** Set up the Firebase initialization file (`lib/firebase.ts`) with placeholder credentials.
4.  **Implement Auth Context:** Create a global `AuthContext` to manage the user's authentication state throughout the application.
5.  **Build Register Page:** Create a single page at the `/register` route containing forms for both user sign-up and login.
6.  **Update Layout & Navbar:** Integrate the `AuthProvider` into the root layout and update the main navigation to show dynamic links for "Login" and "Logout".

