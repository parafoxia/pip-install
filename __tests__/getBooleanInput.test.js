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
const main = require("../src/index");

let getInputSpy;

describe("getBooleanInput", () => {
  beforeEach(() => {
    getInputSpy = jest.spyOn(core, "getInput");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("bool input of 'true' returns true", () => {
    getInputSpy.mockImplementation(() => "true");
    expect(main.getBooleanInput("rickroll")).toBe(true);
  });

  it("bool input of 'TRUE' returns true", () => {
    getInputSpy.mockImplementation(() => "TRUE");
    expect(main.getBooleanInput("rickroll")).toBe(true);
  });

  it("bool input of 't' returns true", () => {
    getInputSpy.mockImplementation(() => "t");
    expect(main.getBooleanInput("rickroll")).toBe(true);
  });

  it("bool input of 'T' returns true", () => {
    getInputSpy.mockImplementation(() => "T");
    expect(main.getBooleanInput("rickroll")).toBe(true);
  });

  it("bool input of '1' returns true", () => {
    getInputSpy.mockImplementation(() => "1");
    expect(main.getBooleanInput("rickroll")).toBe(true);
  });

  it("bool input of 'false' returns false", () => {
    getInputSpy.mockImplementation(() => "false");
    expect(main.getBooleanInput("rickroll")).toBe(false);
  });

  it("bool input of 'FALSE' returns false", () => {
    getInputSpy.mockImplementation(() => "FALSE");
    expect(main.getBooleanInput("rickroll")).toBe(false);
  });

  it("bool input of 'f' returns false", () => {
    getInputSpy.mockImplementation(() => "f");
    expect(main.getBooleanInput("rickroll")).toBe(false);
  });

  it("bool input of 'F' returns false", () => {
    getInputSpy.mockImplementation(() => "F");
    expect(main.getBooleanInput("rickroll")).toBe(false);
  });

  it("bool input of '0' returns false", () => {
    getInputSpy.mockImplementation(() => "0");
    expect(main.getBooleanInput("rickroll")).toBe(false);
  });

  it("invalid bool input errors", () => {
    getInputSpy.mockImplementation(() => "radicals");
    try {
      main.getBooleanInput("rickroll");
    } catch (err) {
      expect(err.message).toBe(
        "Invalid Boolean input ('radicals') to input 'rickroll'"
      );
    }
  });
});
