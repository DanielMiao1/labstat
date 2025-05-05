import { exec } from "child_process";
import { readdirSync } from "fs";

function cmdExists(cmd: string): boolean {
	/**
	 * Checks if specified command exists by searching through every $PATH
	 * directory.
	 *
	 * Unexecutable files and directories that have the same name as the specified
	 * command can cause a false negative to be returned.
	 */

	const path = process.env.PATH;
	if (!path) return false;

	const directories = path.split(":");
	return directories.some(dir => {
		try {
			const items = readdirSync(dir);
			return items.some(item => item === cmd);
		} catch {
			if (!dir.endsWith("/node_modules/.bin")) {
				console.warn(
					"[util/shell] failed to parse a PATH item, some functions may be "
					+ "incorrectly flagged as unavailable."
				);
			}
		}
	});
}

async function cmdExitCode(cmd: string): Promise<boolean> {
	return new Promise(resolve => {
		exec(cmd).on("exit", code => {
			resolve(code);
		});
	});
}

export { cmdExists, cmdExitCode };
