import readline from "readline";
import chalk from "chalk";

export function clearLastNLines(n) {
  for (let i = 0; i < n; i++) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  }
}

export function getActionWithUi(action) {
  switch (action) {
    case "Delete":
      return chalk.red("Delete");
    case "Skip":
      return chalk.yellow("Skip");
    case "Delete local":
      return chalk.cyan("Delete local");
    case "Delete remote":
      return chalk.magenta("Delete remote");
  }
}
