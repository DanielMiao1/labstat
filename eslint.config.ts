import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
	globalIgnores(["dist"]),
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		files: ["**/*.config.ts"],
		extends: [tseslint.configs.disableTypeChecked]
	},
	{
		rules: {
			"@typescript-eslint/no-unused-expressions": [
				"error", { "allowShortCircuit": true }
			]
		}
	}
);
