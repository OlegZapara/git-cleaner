import inquirer from "inquirer";

const branchName = "feature/login";

inquirer
  .prompt([
    {
      type: "list",
      name: "deleteChoice",
      message: `Do you want to delete branch "${branchName}"?`,
      choices: [
        { name: "Yes (Y)", value: "yes", key: "y" },
        { name: "No (N)", value: "no", key: "n" },
        { name: "Local only (L)", value: "local", key: "l" },
        { name: "Remote only (R)", value: "remote", key: "r" },
      ],
      loop: false,
      pageSize: 4,
    },
  ])
  .then((answer) => {
    console.log("Selected:", answer.deleteChoice);
  });
