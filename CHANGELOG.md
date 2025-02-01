# Changelog

## [1.0.1] - 2024-12-19

### Changed
- Fixed the image icon display on the URL pages.
- Added the option to delete links.
- Enhanced OS usage distribution visualization with different colors.
- Implemented meta tags to display the title, description, and icon when shared on platforms like WhatsApp.
- Improved the login and register page layout for mobile devices.

### Fixed
- Image icon issue on the URL pages.
- Layout issues on the login and register page for mobile devices.

### Added
- Option to delete links.
- OS usage distribution with different colors.
- Meta tags for better sharing experience on WhatsApp, Facebook, etc.

## [1.0.2] - 2024-12-19

### Changed
- Free short URL functionality now works.
- Add structured data for SEO in sitemap

### Fixed
- Add password visibility toggle
- Ehance dashboard navigation

### Added
- Added sitemap
- Added additional browser and OS labels to pie charts and enhance country mapping in horizontal bar chart

## [1.0.3] - 2024-12-20

### Changed
- Updated FAQ layout.
- Enhanced home page structure.

### Added
- Password reset and forgot password
- Added fun facts display during URL redirection.

### Fixed
- Fixed a bug where users could access the create URL page without authentication.

## [1.0.4] - 2024-12-29

### Added
- Implemented component for handling URL redirection and metadata generation.
- New expired page and password protectd URL UI updates.
- Added URL expiry feature to automatically disable links after a certain period.
- Introduced password-protected URLs to enhance security by requiring a password to access the content.
- Add new layout components for Pricing, Products, and Why UrlHub pages
- Updated UI indicators for password protected urls

### Fixed
- Make the fun facts random
- Update ShortUrlRedirect to use window.location.href for redirection and clean up console logs

## [2.0.1] - 2025-01-28

### Added
- Add AuroraBackground component and refactor Hero section; update Tailwind config for new animations
- Implement copyToClipboard helper and refactor copy logic in dashboard URLs
- Implement screenshot fetching for URLs with debounced input handling and loading states
- Implement user authentication checks in admin routes and enhance SVG attributes

### Fixed
- Remove copyToClipboard helper and implement clipboard functionality directly in components
- Removed background-lines component
- Improve user feedback on account verification and enhance UI elements in various components

### Docs
- Update README to enhance project overview and feature descriptions