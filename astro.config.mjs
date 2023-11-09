import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/functions";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [qwikdev()]
});