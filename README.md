<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<div align="center">
  <h1>Acan.io, Medical Imaging (DICOM) Viewer</h1>
  <p><strong>Acan.io</strong> is a zero-footprint medical image viewer, built on top of OHIF Viewer v3
provided by the Open Health Imaging Foundation (OHIF). It is a configurable and extensible progressive web application with out-of-the-box support for image archives which support <a href="https://www.dicomstandard.org/using/dicomweb/">DICOMweb</a>.</p>
</div>

<hr />

[![Render Status][render-image]][render-url]

## About

Acan.io, built on top of the OHIF Viewer v3 that is for viewing medical images. 
It can retrieve and load images from most sources and formats; render sets in 2D, 3D, and
reconstructed representations; allows for the manipulation, annotation, and
serialization of observations; supports internationalization, OpenID Connect,
offline use, hotkeys, and many more features.

Apart from functioning as an individual medical image viewer, the most notable feature is 
its utilization of Nextcloud, facilitating medical image sharing, collaboration, and 
security within HIPAA-compliant platform.

Almost everything offers some degree of customization and configuration. If it
doesn't support something you need, we accept pull requests and have an ever
improving Extension System.

## Why Choose Us

### Community & Experience

Acan.io is an improved version of the OHIF Viewer v3 that is 
a collaborative effort that has served as the basis for many
active, production, and FDA Cleared medical imaging viewers. It benefits from
our extensive community's collective experience, and from the sponsored
contributions of individuals, research groups, and commercial organizations.

### Built to Adapt

After more than 8-years of integrating with many companies and organizations,
The OHIF Viewer has been rebuilt from the ground up to better address the
varying workflow and configuration needs of its many users. All of the Viewer's
core features are built using it's own extension system. The same extensibility
that allows us to offer:

- 2D and 3D medical image viewing
- Multiplanar Reconstruction (MPR)
- Maximum Intensity Project (MIP)
- Whole slide microscopy viewing
- PDF and Dicom Structured Report rendering
- Segmentation rendering as labelmaps and contours
- User Access Control (UAC)
- Context specific toolbar and side panel content
- and many others

Can be leveraged by you to customize the viewer for your workflow, and to add
any new functionality you may need (and wish to maintain privately without
forking).

### Support

- [Report a Bug 🐛](https://github.com/acanio/acanio-viewer/issues/new?assignees=&labels=Community%3A+Report+%3Abug%3A%2CAwaiting+Reproduction&projects=&template=bug-report.yml&title=%5BBug%5D+)
- [Request a Feature 🚀](https://github.com/acanio/acanio-viewer/issues/new?assignees=&labels=Community%3A+Request+%3Ahand%3A&projects=&template=feature-request.yml&title=%5BFeature+Request%5D+)

For commercial support, academic collaborations, and answers to common
questions; please use [Get Support](https://acanio.com/#contact-us) to contact
us.


## Developing

### Requirements

- [Yarn 1.17.3+](https://yarnpkg.com/en/docs/install)
- [Node 18+](https://nodejs.org/en/)
- Yarn Workspaces should be enabled on your machine:
  - `yarn config set workspaces-experimental true`

### Getting Started

1. [Fork this repository][how-to-fork]
2. [Clone your forked repository][how-to-clone]
   - `git clone https://github.com/YOUR-USERNAME/Viewers.git`
3. Navigate to the cloned project's directory
4. Add this repo as a `remote` named `upstream`
   - `git remote add upstream https://github.com/acanio/acanio-viewer.git`
5. `yarn install` to restore dependencies and link projects

#### To Develop

_From this repository's root directory:_

```bash
# Enable Yarn Workspaces
yarn config set workspaces-experimental true

# Restore dependencies
yarn install
```

## Commands

These commands are available from the root directory. Each project directory
also supports a number of commands that can be found in their respective
`README.md` and `package.json` files.

| Yarn Commands                | Description                                                   |
| ---------------------------- | ------------------------------------------------------------- |
| **Develop**                  |                                                               |
| `dev` or `start`             | Default development experience for Viewer                     |
| `test:unit`                  | Jest multi-project test runner; overall coverage              |
| **Deploy**                   |                                                               |
| `build`\*                    | Builds production output for our PWA Viewer                   |  |

\* - For more information on our different builds, check out our dependency, OHIF Viewer [Deploy
Docs][deployment-docs]

## Project

Acan.io is built on the OHIF Medical Image Viewing Platform that is maintained as a
[`monorepo`][monorepo]. This means that this repository, instead of containing a
single project, contains many projects. If you explore our project structure,
you'll see the following:

```bash
.
├── extensions                  #
│   ├── _example                # Skeleton of example extension
│   ├── default                 # basic set of useful functionalities (datasources, panels, etc)
│   ├── cornerstone             # image rendering and tools w/ Cornerstone3D
│   ├── cornerstone-dicom-sr    # DICOM Structured Report rendering and export
│   ├── cornerstone-dicom-sr    # DICOM Structured Report rendering and export
│   ├── cornerstone-dicom-seg   # DICOM Segmentation rendering and export
│   ├── cornerstone-dicom-rt    # DICOM RTSTRUCT rendering
│   ├── cornerstone-microscopy  # Whole Slide Microscopy rendering
│   ├── dicom-pdf               # PDF rendering
│   ├── dicom-video             # DICOM RESTful Services
│   ├── measurement-tracking    # Longitudinal measurement tracking
│   └── tmtv                    # Total Metabolic Tumor Volume (TMTV) calculation
│
├── modes                       #
│   ├── _example                # Skeleton of example mode
│   ├── basic-dev-mode          # Basic development mode
│   ├── longitudinal            # Longitudinal mode (measurement tracking)
│   ├── tmtv                    # Total Metabolic Tumor Volume (TMTV) calculation mode
│   └── microscopy              # Whole Slide Microscopy mode
│
├── platform                    #
│   ├── core                    # Business Logic
│   ├── i18n                    # Internationalization Support
│   ├── ui                      # React component library
│   ├── docs                    # Documentation
│   └── viewer                  # Connects platform and extension projects
│
├── ...                         # misc. shared configuration
├── lerna.json                  # MonoRepo (Lerna) settings
├── package.json                # Shared devDependencies and commands
└── README.md                   # This file
```

<!--
  Links
  -->

<!-- prettier-ignore-start -->
<!-- Badges -->
[render-image]: https://img.shields.io/badge/Render-Preview-4ea4c4
[render-url]: https://acanio-viewer.onrender.com
<!-- Links -->
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[how-to-fork]: https://help.github.com/en/articles/fork-a-repo
[how-to-clone]: https://help.github.com/en/articles/fork-a-repo#step-2-create-a-local-clone-of-your-fork
[deployment-docs]: https://docs.ohif.org/deployment/
<!-- prettier-ignore-end -->
