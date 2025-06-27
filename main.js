#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";
import { promisify } from "util";
import {
  alwaysSkip,
  deleteLocalBranch,
  deleteRemoteBranch,
  gitListCommand,
} from "./git.js";
import { deleteBranchPrompt, endPrompt } from "./prompt.js";
import { getActionWithUi } from "./utils.js";

const execAsync = promisify(exec);

async function processBranches() {
  try {
    const { stdout } = await execAsync(gitListCommand);
    const branches = stdout.split("\n").filter((line) => line.trim());
    const totalBranches = branches
      .filter((x) => !alwaysSkip.includes(x))
      .filter((x) => !x.startsWith("origin")).length;
    let currentBranch = 0;

    for (const branchLine of branches) {
      const [name, author, remote] = branchLine.split(";");
      currentBranch++;

      if (!name) continue;
      if (alwaysSkip.includes(name)) {
        console.log(name, chalk.dim("-"), getActionWithUi("Skip"));
        continue;
      }
      if (name.startsWith("origin")) continue;

      const answer = await deleteBranchPrompt({
        name,
        author,
        remote,
        progress: {
          current: currentBranch,
          total: totalBranches,
        },
      });

      try {
        if (answer.choice === "Delete") {
          if (remote) {
            await execAsync(deleteRemoteBranch(name));
          }
          await execAsync(deleteLocalBranch(name));
        } else if (answer.choice === "Delete local") {
          await execAsync(deleteLocalBranch(name));
        } else if (answer.choice === "Delete remote") {
          await execAsync(deleteRemoteBranch(name));
        }
      } catch (deleteError) {
        console.error(`Error deleting branch ${name}:`, deleteError.message);
      }

      endPrompt({ name, action: answer.choice });
    }
  } catch (error) {
    console.error("Error processing branches:", error.message);
  }
}

process.on("exit", () => {
  process.removeAllListeners();
});

processBranches();
