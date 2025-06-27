import inquirer from "inquirer";
import chalk from "chalk";
import { clearLastNLines, getActionWithUi } from "./utils.js";

const symbols = {
  bullet: "•",
  arrow: "→",
  branch: "⎇",
  user: "👤",
  remote: "☁️",
  separator: "━",
  progress: "⏳",
};

export async function deleteBranchPrompt({ name, author, remote, progress }) {
  const separator = chalk.dim(symbols.separator.repeat(40));

  console.log(separator);
  console.log(
    chalk.cyan(
      `${symbols.progress} Progress: ${chalk.bold(progress.current)}/${chalk.bold(progress.total)} branches`
    )
  );
  console.log(separator);

  console.log(`${symbols.branch} Branch: ${chalk.bold.green(name)}`);
  console.log(`${symbols.user} Author: ${chalk.yellow(author)}`);
  console.log(
    `${symbols.remote} Remote: ${remote ? chalk.magenta(remote) : chalk.gray("No remote branch")}`
  );
  console.log(separator);

  const result = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: `${symbols.arrow} Do you want to delete branch "${chalk.bold.green(name)}"?`,
      choices: [
        {
          name: `${symbols.bullet} Yes (Y)`,
          value: "Delete",
          key: "y",
        },
        {
          name: `${symbols.bullet} No (N)`,
          value: "Skip",
          key: "n",
        },
        {
          name: `${symbols.bullet} Local only (L)`,
          value: "Delete local",
          key: "l",
        },
        {
          name: `${symbols.bullet} Remote only (R)`,
          value: "Delete remote",
          key: "r",
        },
      ],
      loop: false,
      pageSize: 4,
    },
  ]);

  return result;
}

export function endPrompt({ name, action }) {
  clearLastNLines(8);
  console.log(name, chalk.dim("-"), getActionWithUi(action));
}
