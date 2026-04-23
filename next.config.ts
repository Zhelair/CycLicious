import path from "node:path";
import {fileURLToPath} from "node:url";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");
const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

export default withNextIntl({
  reactStrictMode: true,
  turbopack: {
    root: workspaceRoot
  }
});
