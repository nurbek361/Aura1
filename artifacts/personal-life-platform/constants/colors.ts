/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#17213B',
    tint: '#D98F48',

    // Core surfaces
    background: '#F7F4EF',
    foreground: '#17213B',

    // Cards / elevated surfaces
    card: '#FFFDF9',
    cardForeground: '#17213B',

    // Primary action color (buttons, links, active states)
    primary: '#D98F48',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#E7E4DD',
    secondaryForeground: '#17213B',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#ECE9E2',
    mutedForeground: '#6D7280',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#DDE7E0',
    accentForeground: '#315B4C',

    // Destructive actions (delete, error states)
    destructive: '#B85C55',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#DDD8CE',
    input: '#DDD8CE',
  },

  dark: {
    text: '#F7F4EF',
    tint: '#E5A35B',
    background: '#121A2C',
    foreground: '#F7F4EF',
    card: '#1D2740',
    cardForeground: '#F7F4EF',
    primary: '#E5A35B',
    primaryForeground: '#17213B',
    secondary: '#29344D',
    secondaryForeground: '#F7F4EF',
    muted: '#24304A',
    mutedForeground: '#A9B1C2',
    accent: '#29463E',
    accentForeground: '#BFE0D0',
    destructive: '#DC8178',
    destructiveForeground: '#17213B',
    border: '#36415A',
    input: '#36415A',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
