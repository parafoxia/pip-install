// BSD 3-Clause License
//
// Copyright (c) 2023-present, Ethan Henderson
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const yaml = require("js-yaml");
const { env } = require("process");

function getStringInput(name, options) {
  const input = core.getInput(name, options);
  return input.length > 0 ? input : undefined;
}

function getBooleanInput(name, options) {
  const input = core.getInput(name, options);
  if (["true", "t", "1"].includes(input.toLowerCase())) {
    return true;
  } else if (["false", "f", "0", ""].includes(input.toLowerCase())) {
    return false;
  } else {
    throw new Error(`Invalid Boolean input ('${input}') to input '${name}'`);
  }
}

function split(value) {
  return value
    .split(/(\s+)/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function compileArgs(options) {
  let args = ["-m", "pip", "install"];

  const packages = getStringInput("packages");
  if (packages) {
    args = args.concat(split(packages));
  }

  // `options` is not an object, but instead, it's entries.
  for (const [k, attrs] of options) {
    switch (attrs.default) {
      case "true":
      case "false":
        // Boolean input.
        if (getBooleanInput(k)) {
          args = args.concat(`--${k}`);
        }
        break;

      default:
        // String input.
        const v = getStringInput(k);
        if (v) {
          for (const i of split(v)) {
            args = args.concat(`--${k}`, i);
          }
        }
        break;
    }
  }
  return args;
}

async function main() {
  try {
    actionFile = __filename.split("/").slice(1, -2).join("/") + "/action.yml";
    const doc = yaml.load(fs.readFileSync(actionFile, "utf-8"));
    const options = Object.entries(doc.inputs).filter(
      ([k]) => k !== "packages"
    );
    await exec.exec("python", compileArgs(options));
  } catch (err) {
    core.setFailed(err.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { compileArgs, getStringInput, getBooleanInput, main, split };
