import nextConfig from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  ...nextConfig,
  eslintConfigPrettier,

  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json"],
      },
    },
  },

  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;