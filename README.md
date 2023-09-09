<!-- start title -->

# Install Packages with Pip

<!-- end title -->

<!-- start description -->

A fully-featured `pip install` wrapper for GitHub Actions.

<!-- end description -->

## Prerequisits

The [`actions/setup-python`](https://github.com/actions/setup-python) action should be run before this.

## Usage

You can use pip-install to install packages directly...

```yaml
- uses: parafoxia/pip-install@v1
  with:
    packages: package1 package2
```

...or from requirements files...

```yaml
- uses: parafoxia/pip-install@v1
  with:
    # Any input that accepts multiple parameters can accept them on a
    # single line, or across multiple lines.
    requirements: |
      requirements.txt
      requirements-dev.txt
```

...or as an editable install...

```yaml
- uses: parafoxia/pip-install@v1
  with:
    editable: "."
```

...or all three!

You can also provide options to modify the command's behaviour.

```yaml
- uses: parafoxia/pip-install@v1
  with:
    packages: package3

    # Don't install package dependencies.
    no-deps: true

    # Install pre-release versions, if available.
    pre: true
```

## Inputs

Inputs with defaults are Boolean inputs.

<!-- start inputs -->

| **Input**                      | **Description**                                                                                                                                                                                                                                                                                                                                                                        | **Default** | **Required** |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------ |
| **`packages`**                 | The packages to install.                                                                                                                                                                                                                                                                                                                                                               |             | **false**    |
| **`requirement`**              | Install from the given requirements file. Multiple files can be provided.                                                                                                                                                                                                                                                                                                              |             | **false**    |
| **`constraint`**               | Constrain versions using the given constraints file. Multiple files can be provided.                                                                                                                                                                                                                                                                                                   |             | **false**    |
| **`no-deps`**                  | Don't install package dependencies.                                                                                                                                                                                                                                                                                                                                                    | `false`     | **false**    |
| **`pre`**                      | Include pre-release and development versions. By default, pip only finds stable versions.                                                                                                                                                                                                                                                                                              | `false`     | **false**    |
| **`editable`**                 | Install a project in editable mode (i.e. setuptools "develop mode") from a local project path or a VCS url.                                                                                                                                                                                                                                                                            |             | **false**    |
| **`dry-run`**                  | Don't actually install anything, just print what would be. Can be used in combination with `ignore_installed` to 'resolve' the requirements.                                                                                                                                                                                                                                           | `false`     | **false**    |
| **`target`**                   | Install packages into \<dir>. By default this will not replace existing files/folders in \<dir>. Set `upgrade` to true to replace existing packages in \<dir> with new versions.                                                                                                                                                                                                       |             | **false**    |
| **`platform`**                 | Only use wheels compatible with \<platform>. Defaults to the platform of the running system. Use this option multiple times to specify multiple platforms supported by the target interpreter.                                                                                                                                                                                         |             | **false**    |
| **`python-version`**           | The Python interpreter version to use for wheel and "Requires-Python" compatibility checks. Defaults to a version derived from the running interpreter. The version can be specified using up to three dot-separated integers (e.g. "3" for 3.0.0, "3.7" for 3.7.0, or "3.7.3"). A major-minor version can also be given as a string without dots (e.g. "37" for 3.7.0).               |             | **false**    |
| **`implementation`**           | Only use wheels compatible with Python implementation \<implementation>, e.g. 'pp', 'jy', 'cp', or 'ip'. If not specified, then the current interpreter implementation is used. Use 'py' to force implementation-agnostic wheels.                                                                                                                                                      |             | **false**    |
| **`abi`**                      | Only use wheels compatible with Python abi \<abi>, e.g. 'pypy_41'. If not specified, then the current interpreter abi tag is used. Use this option multiple times to specify multiple abis supported by the target interpreter. Generally you will need to specify `implementation`, `platform`, and `python-version` when using this option.                                          |             | **false**    |
| **`user`**                     | Install to the Python user install directory for your platform. Typically ~/.local/, or %APPDATA%\Python on Windows. (See the Python documentation for site.USER_BASE for full details.)                                                                                                                                                                                               | `false`     | **false**    |
| **`root`**                     | Install everything relative to this alternate root directory.                                                                                                                                                                                                                                                                                                                          |             | **false**    |
| **`prefix`**                   | Installation prefix where lib, bin and other top-level folders are placed. Note that the resulting installation may contain scripts and other resources which reference the Python interpreter of pip, and not that of `prefix`. See also the `python` option if the intention is to install packages into another (possibly pip-free) environment.                                    |             | **false**    |
| **`src`**                      | Directory to check out editable projects into. The default in a virtualenv is "\<venv path>/src". The default for global installs is "\<current dir>/src".                                                                                                                                                                                                                             |             | **false**    |
| **`upgrade`**                  | Upgrade all specified packages to the newest available version. The handling of dependencies depends on the upgrade-strategy used.                                                                                                                                                                                                                                                     | `false`     | **false**    |
| **`upgrade-strategy`**         | Determines how dependency upgrading should be handled [default: only-if-needed]. "eager" - dependencies are upgraded regardless of whether the currently installed version satisfies the requirements of the upgraded package(s). "only-if-needed" - are upgraded only when they do not satisfy the requirements of the upgraded package(s).                                           |             | **false**    |
| **`force-reinstall`**          | Reinstall all packages even if they are already up-to-date.                                                                                                                                                                                                                                                                                                                            | `false`     | **false**    |
| **`ignore-installed`**         | Ignore the installed packages, overwriting them. This can break your system if the existing package is of a different version or was installed with a different package manager!                                                                                                                                                                                                       | `false`     | **false**    |
| **`ignore-requires-python`**   | Ignore the Requires-Python information.                                                                                                                                                                                                                                                                                                                                                | `false`     | **false**    |
| **`no-build-isolation`**       | Disable isolation when building a modern source distribution. Build dependencies specified by PEP 518 must be already installed if this option is used.                                                                                                                                                                                                                                | `false`     | **false**    |
| **`use-pep517`**               | Use PEP 517 for building source distributions (use --no-use-pep517 to force legacy behaviour).                                                                                                                                                                                                                                                                                         | `false`     | **false**    |
| **`no-use-pep517`**            | Reverse of `use-pep517`.                                                                                                                                                                                                                                                                                                                                                               | `false`     | **false**    |
| **`check-build-dependencies`** | Check the build dependencies when PEP517 is used.                                                                                                                                                                                                                                                                                                                                      | `false`     | **false**    |
| **`break-system-packages`**    | Allow pip to modify an EXTERNALLY-MANAGED Python installation                                                                                                                                                                                                                                                                                                                          | `false`     | **false**    |
| **`config-settings`**          | Configuration settings to be passed to the PEP 517 build backend. Settings take the form KEY=VALUE. Use multiple `config-settings` options to pass multiple keys to the backend.                                                                                                                                                                                                       |             | **false**    |
| **`global-option`**            | Extra global options to be supplied to the setup.py call before the install or bdist_wheel command.                                                                                                                                                                                                                                                                                    |             | **false**    |
| **`compile`**                  | Compile Python source files to bytecode                                                                                                                                                                                                                                                                                                                                                | `false`     | **false**    |
| **`no-compile`**               | Do not compile Python source files to bytecode                                                                                                                                                                                                                                                                                                                                         | `false`     | **false**    |
| **`no-warn-script-location`**  | Do not warn when installing scripts outside PATH                                                                                                                                                                                                                                                                                                                                       | `false`     | **false**    |
| **`no-warn-conflicts`**        | Do not warn about broken dependencies                                                                                                                                                                                                                                                                                                                                                  | `false`     | **false**    |
| **`no-binary`**                | Do not use binary packages. Can be supplied multiple times, and each time adds to the existing value. Accepts either ":all:" to disable all binary packages, ":none:" to empty the set (notice the colons), or one or more package names with commas between them (no colons). Note that some packages are tricky to compile and may fail to install when this option is used on them. |             | **false**    |
| **`only-binary`**              | Do not use source packages. Can be supplied multiple times, and each time adds to the existing value. Accepts either ":all:" to disable all source packages, ":none:" to empty the set, or one or more package names with commas between them. Packages without binary distributions will fail to install when this option is used on them.                                            |             | **false**    |
| **`prefer-binary`**            | Prefer older binary packages over newer source packages.                                                                                                                                                                                                                                                                                                                               | `false`     | **false**    |
| **`require-hashes`**           | Require a hash to check each requirement against, for repeatable installs. This option is implied when any package in a requirements file has a --hash option.                                                                                                                                                                                                                         | `false`     | **false**    |
| **`progress-bar`**             | Specify whether the progress bar should be used [on, off] (default: on)                                                                                                                                                                                                                                                                                                                |             | **false**    |
| **`root-user-action`**         | Action if pip is run as a root user. By default, a warning message is shown.                                                                                                                                                                                                                                                                                                           |             | **false**    |
| **`report`**                   | Generate a JSON file describing what pip did to install the provided requirements. Can be used in combination with `dry-run` and `ignore-installed` to 'resolve' the requirements. When - is used as file name it writes to stdout. When writing to stdout, please combine with the `quiet` option to avoid mixing pip logging output with JSON output.                                |             | **false**    |
| **`no-clean`**                 | Don't clean up build directories.                                                                                                                                                                                                                                                                                                                                                      | `false`     | **false**    |

<!-- end inputs -->

## License

The pip-install action for GitHub Actions is licensed under the [BSD 3-Clause License](https://github.com/parafoxia/pip-install/blob/main/LICENSE).
