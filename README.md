<!-- start title -->

# Pip Install

<!-- end title -->

<!-- start description -->

Install Python packages using Pip

<!-- end description -->

## Inputs

<!-- start inputs -->

| **Input**          | **Description**                                                                                            | **Default** | **Required** |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | ----------- | ------------ |
| **`packages`**     | The packages to install                                                                                    |             | **false**    |
| **`requirements`** | Install from the given requirements files                                                                  |             | **false**    |
| **`constraints`**  | Constrain versions using the given constraints files                                                       |             | **false**    |
| **`no-deps`**      | Don't install package dependencies                                                                         | `false`     | **false**    |
| **`pre`**          | Include pre-release and development versions. By default, pip only finds stable versions                   | `false`     | **false**    |
| **`editable`**     | Install a project in editable mode (i.e. setuptools "develop mode") from a local project path or a VCS url |             | **false**    |

<!-- end inputs -->

## Inputs

<!-- start usage -->

```yaml
- uses: parafoxia/pip-install@main
  with:
    # The packages to install
    # Default:
    packages: ""

    # Install from the given requirements files
    # Default:
    requirements: ""

    # Constrain versions using the given constraints files
    # Default:
    constraints: ""

    # Don't install package dependencies
    # Default: false
    no-deps: ""

    # Include pre-release and development versions. By default, pip only finds stable
    # versions
    # Default: false
    pre: ""

    # Install a project in editable mode (i.e. setuptools "develop mode") from a local
    # project path or a VCS url
    # Default:
    editable: ""
```

<!-- end usage -->

## License

The pip-install action for GitHub is licensed under the [BSD 3-Clause License](https://github.com/parafoxia/pip-install/blob/main/LICENSE).
