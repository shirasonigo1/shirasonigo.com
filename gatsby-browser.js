/**
 * Gatsby browser APIs.
 * Phase 1: fonts are now self-hosted via @fontsource (bundled) instead of the
 * render-blocking Google Fonts @import that used to sit atop layout.module.css.
 * Global design tokens and base element styles are loaded here so they apply
 * site-wide, independent of any CSS Module.
 */
import "@fontsource/oswald/200.css";
import "@fontsource/oswald/300.css";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/700.css";
import "@fontsource/roboto-condensed/400.css";

import "./src/styles/tokens.css";
import "./src/styles/global.css";
