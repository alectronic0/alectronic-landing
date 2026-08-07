# Architecture & Standardization Documentation

## MVC Architecture
The site follows a client-side Model-View-Controller architecture:
- **Model (`js/content.js`)**: Serves as the single source of truth for the site's data. Contains dynamic content for headers, footers, 404 messaging, and lists of projects/socials.
- **View (`index.html`, `404.html`)**: HTML templates providing the structural layout. These are kept lightweight and DRY where possible.
- **Controller (`js/app.js`)**: Executes the application logic. On `DOMContentLoaded`, it retrieves data from the Model and dynamically injects shared UI components (e.g., `<header>`, `<footer>`, `<nav>`) and data-driven content into the Views.

## Unified Cookie Strategy
- **File Consolidation**: The standalone CookieConsent UMD library and its custom configuration have been consolidated into a single `js/cookie.js` file.
- **Styling**: All CookieConsent CSS (`css/cookieconsent.css`) has been merged into the primary `css/style.css`.
- **Initialization**: `<script src="js/cookie.js" defer></script>` is included across all pages. The floating button triggers `CookieConsent.show(true)` strictly to display preferences.

## Layout Rules & JS Injection
- **Consistent Structure**: Shared multi-page elements are removed from individual HTML files.
- **Dynamic Injection**: `js/app.js` is responsible for building and inserting `<header class="profile-header">` and `<footer class="landing-footer">` onto pages that need them. 
- **404 Page Behavior**: The `404.html` page explicitly lacks a profile header to emphasize the error state, but it still utilizes the shared footer injected via `app.js`.

## Site-specific Quirks
- **Particle Background**: A canvas element (`#bg-canvas`) is present on all pages to render an interactive network animation in `app.js`. This canvas is explicitly marked `aria-hidden="true"` for accessibility.
- **Card Glow Effect**: Project and Hub cards (`.hub-card`) rely on mousemove event listeners in `app.js` to update CSS variables (`--mouse-x`, `--mouse-y`) that drive a glassy glow effect on hover.
