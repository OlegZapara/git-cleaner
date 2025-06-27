export const gitListCommand =
  "git for-each-ref --format='%(refname:short);%(authorname);%(upstream:short)' refs/heads refs/remotes";

export const alwaysSkip = ["main", "master", "dev", "development"];

export const deleteLocalBranch = (name) => `git branch -D ${name}`;

export const deleteRemoteBranch = (name) => `git push origin --delete ${name}`;
