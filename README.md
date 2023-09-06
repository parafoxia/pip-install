<!-- start title -->

# pip-install

<!-- end title -->

<!-- start description -->

A fully-featured `pip install` wrapper for GitHub Actions.

<!-- end description -->

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

...or as an editable install.

```yaml
- uses: parafoxia/pip-install@v1
  with:
    editable: '.'
```

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

| **Input**          | **Description**                                                                                             | **Default** | **Required** |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ----------- | ------------ |
| **`packages`**     | The packages to install.                                                                                    |             | **false**    |
| **`requirements`** | Install from the given requirements file. Multiple files can be provided.                                   |             | **false**    |
| **`constraints`**  | Constrain versions using the given constraints file. Multiple files can be provided.                        |             | **false**    |
| **`no-deps`**      | Don't install package dependencies.                                                                         | `false`     | **false**    |
| **`pre`**          | Include pre-release and development versions. By default, pip only finds stable versions.                   | `false`     | **false**    |
| **`editable`**     | Install a project in editable mode (i.e. setuptools "develop mode") from a local project path or a VCS url. |             | **false**    |

<!-- end inputs -->

## License

The pip-install action for GitHub is licensed under the [BSD 3-Clause License](https://github.com/parafoxia/pip-install/blob/main/LICENSE).
