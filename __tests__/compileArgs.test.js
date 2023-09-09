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
const fs = require("fs");
const main = require("../src/index");
const yaml = require("js-yaml");

let getInputSpy;

const doc = yaml.load(fs.readFileSync("action.yml", "utf-8"));
const options = Object.entries(doc.inputs).filter(([k]) => k !== "packages");

describe("compileArgs", () => {
  beforeEach(() => {
    getInputSpy = jest.spyOn(core, "getInput");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("compile args with no packages", () => {
    getInputSpy.mockImplementation((k) => "");
    expect(main.compileArgs(options)).toStrictEqual(["-m", "pip", "install"]);
  });

  it("compile args with packages", () => {
    getInputSpy.mockImplementation((k) =>
      k === "packages" ? "never gonna give" : ""
    );
    expect(main.compileArgs(options)).toStrictEqual([
      "-m",
      "pip",
      "install",
      "never",
      "gonna",
      "give",
    ]);
  });

  it("compile args with string option", () => {
    getInputSpy.mockImplementation((k) =>
      k === "requirement" ? "a.txt b.txt c.txt" : ""
    );
    expect(main.compileArgs(options)).toStrictEqual([
      "-m",
      "pip",
      "install",
      "--requirement",
      "a.txt",
      "--requirement",
      "b.txt",
      "--requirement",
      "c.txt",
    ]);
  });

  it("compile args with bool option", () => {
    getInputSpy.mockImplementation((k) => (k === "no-deps" ? "true" : ""));
    expect(main.compileArgs(options)).toStrictEqual([
      "-m",
      "pip",
      "install",
      "--no-deps",
    ]);
  });

  it("compile args with all", () => {
    getInputSpy.mockImplementation((k) => {
      switch (k) {
        case "packages":
          return "rick roll";
        case "requirement":
          return "a.txt b.txt";
        case "no-deps":
          return "true";
        default:
          return "";
      }
    });
    expect(main.compileArgs(options)).toStrictEqual([
      "-m",
      "pip",
      "install",
      "rick",
      "roll",
      "--requirement",
      "a.txt",
      "--requirement",
      "b.txt",
      "--no-deps",
    ]);
  });
});
