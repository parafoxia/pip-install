const core = require("@actions/core");
const exec = require("@actions/exec");

function getStringInput(name, options) {
  const input = core.getInput(name, options);
  return input.length > 0 ? input : undefined;
}

function getBooleanInput(name, options) {
  const input = core.getInput(name, options);
  if ([true, "true", "t", "1"].includes(input)) {
    return true;
  } else if ([false, "false", "f", "0"].includes(input)) {
    return false;
  } else {
    throw new Error(`Invalid Boolean input (${input}) to input ${name}`);
  }
}

function split(value) {
  if (typeof value === "boolean") {
    return [value];
  }
  return value
    .split(/(\s+)/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function compileArgs() {
  let args = ["-m", "pip", "install"];

  const packages = getStringInput("packages");

  if (packages) {
    args = args.concat(split(packages));
  }

  const strOptions = {
    requirement: "requirements",
    constraint: "constraints",
    editable: "editable",
  };

  for (let [k, v] of Object.entries(strOptions)) {
    v = getStringInput(v);
    if (v) {
      for (const i of split(v)) {
        args = args.concat(`--${k}`, i);
      }
    }
  }

  const boolOptions = ["no-deps", "pre"];

  for (const k of boolOptions) {
    if (getBooleanInput(k)) {
      args = args.concat(`--${k}`);
    }
  }

  return args;
}

async function main() {
  try {
    console.log(compileArgs());
    await exec.exec("python", compileArgs());
  } catch (err) {
    core.setFailed(err.message);
    throw err;
  }
}

main();
