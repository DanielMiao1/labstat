import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	stylistic.configs.customize({
		braceStyle: "1tbs",
		commaDangle: "never",
		indent: "tab",
		quotes: "double",
		semi: true
	}),
	globalIgnores(["dist", ".nx"]),
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			"default-param-last": "off",
			"no-shadow": "off",
			"no-use-before-define": "off",
			"prefer-destructuring": "off",
			"@stylistic/arrow-parens": ["error", "as-needed"],
			"@stylistic/function-call-spacing": "error",
			"@stylistic/max-len": ["warn", {
				code: 80,
				tabWidth: 2
			}],
			"@stylistic/multiline-comment-style": "warn",
			"@stylistic/no-extra-semi": "error",
			"@stylistic/no-confusing-arrow": "error",
			"@stylistic/nonblock-statement-body-position": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/default-param-last": "error",
			"@typescript-eslint/member-ordering": "warn",
			"@typescript-eslint/method-signature-style": "error",
			"@typescript-eslint/naming-convention": ["warn", {
				format: ["snake_case", "UPPER_CASE"],
				selector: "variable"
			}, {
				format: ["camelCase"],
				selector: "function"
			}, {
				format: ["PascalCase"],
				selector: "interface"
			}, {
				format: ["PascalCase"],
				selector: "class"
			}, {
				format: ["snake_case"],
				selector: "typeAlias"
			}],
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-unnecessary-qualifier": "error",
			"@typescript-eslint/no-unused-expressions": ["error", {
				allowShortCircuit: true
			}],
			"@typescript-eslint/no-use-before-define": "error",
			"@typescript-eslint/no-useless-empty-export": "error",
			"@typescript-eslint/prefer-destructuring": "error"
		}
	},
	{
		files: ["**/*.config.ts"],
		extends: [tseslint.configs.disableTypeChecked]
	}
);
