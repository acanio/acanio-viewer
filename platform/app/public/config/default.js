/** @type {AppTypes.Config} */

// Secure, minimal default configuration.
//
// This is what a plain production build with no APP_CONFIG produces, so it is
// deliberately locked down:
//   - The local file data source (`dicomlocal`) and the runtime `?url=` sources
//     (`dicomjson`, `dicomwebproxy`) are NOT enabled — they widen the attack
//     surface of a default deployment.
//   - `?customization=` URL loading is OFF: no `customizationUrlPrefixes` are
//     configured, so any `?customization=` value is rejected (and aborts boot
//     rather than silently loading).
//   - `dangerouslyUseDynamicConfig` (the `configUrl` query parameter) is off.
//
// It does not need to "just work" untouched — point the data source below at
// your own DICOMweb server. For a fully-featured setup with every data source
// and customization loading enabled, see config/dev.js (local development) and
// config/netlify.js (the public demo deploy).
window.config = {
  name: 'config/default.js',
  routerBasename: null,
  extensions: [],
  modes: [],
  customizationService: [
    {
      'viewportOverlay.topLeft': [
        {
          id: 'PatientName',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          condition: ({ referenceInstance }) =>
            referenceInstance &&
            referenceInstance.PatientName &&
            (typeof referenceInstance.PatientName === 'string' ||
              referenceInstance.PatientName.Alphabetic),
          contentF: ({ referenceInstance, formatters: { formatPN } }) =>
            (typeof referenceInstance.PatientName === 'string'
              ? formatPN(referenceInstance.PatientName)
              : formatPN(referenceInstance.PatientName.Alphabetic)) +
            ' ' +
            (referenceInstance.PatientSex ? '(' + referenceInstance.PatientSex + ')' : ''),
        },
        {
          id: 'PID',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Patient PID',
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.PatientID,
          contentF: ({ referenceInstance }) => referenceInstance.PatientID,
        },
        {
          id: 'PatientBirthDate',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: 'DOB:',
          title: "Patient's Date of birth",
          condition: ({ referenceInstance }) =>
            referenceInstance && referenceInstance.PatientBirthDate,
          contentF: ({ referenceInstance }) => referenceInstance.PatientBirthDate,
        },
        {
          id: 'OtherPid',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: 'Other PID:',
          title: 'Other Patient IDs',
          condition: ({ referenceInstance }) =>
            referenceInstance && referenceInstance.OtherPatientIDs,
          contentF: ({ referenceInstance, formatters: { formatPN } }) =>
            formatPN(referenceInstance.OtherPatientIDs),
        },
      ],
      'viewportOverlay.topRight': [
        {
          id: 'SeriesDescription',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Series Description',
          condition: ({ referenceInstance }) =>
            referenceInstance && referenceInstance.SeriesDescription,
          contentF: ({ referenceInstance }) => referenceInstance.SeriesDescription,
        },
        {
          id: 'StudyDateTime',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Study date',
          condition: ({ referenceInstance }) =>
            referenceInstance && (referenceInstance.StudyDate || referenceInstance.StudyTime),
          contentF: ({ referenceInstance, formatters: { formatDate, formatTime } }) =>
            [
              referenceInstance.StudyDate ? formatDate(referenceInstance.StudyDate) : '',
              referenceInstance.StudyTime ? formatTime(referenceInstance.StudyTime) : '',
            ].join(' '),
        },
      ],
      'viewportOverlay.bottomLeft': [
        {
          id: 'SeriesNumber',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: 'Ser:',
          title: 'Series Number',
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.SeriesNumber,
          contentF: ({ referenceInstance }) => referenceInstance.SeriesNumber,
        },
        {
          id: 'InstanceNumber',
          inheritsFrom: 'ohif.overlayItem.instanceNumber',
          color: '#fff',
        },
        {
          id: 'ColumnsRows',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          condition: ({ referenceInstance }) =>
            referenceInstance && referenceInstance.Columns && referenceInstance.Rows,
          contentF: ({ referenceInstance }) =>
            `${referenceInstance.Columns} x ${referenceInstance.Rows}`,
        },
        {
          id: 'SliceLocation',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: 'Loc:',
          title: 'Slice Location',
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.SliceLocation,
          contentF: ({ referenceInstance, formatters: { formatNumberPrecision } }) =>
            formatNumberPrecision(referenceInstance.SliceLocation, 2) + ' mm',
        },
        {
          id: 'SliceThickness',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: 'Thick:',
          title: 'Slice Thickness',
          condition: ({ referenceInstance }) =>
            referenceInstance && referenceInstance.SliceThickness,
          contentF: ({ referenceInstance, formatters: { formatNumberPrecision } }) =>
            formatNumberPrecision(referenceInstance.SliceThickness, 2) + ' mm',
        },
      ],
      'viewportOverlay.bottomRight': [
        {
          id: 'ZoomLevel',
          inheritsFrom: 'ohif.overlayItem.zoomLevel',
          color: '#fff',
        },
        {
          id: 'WindowLevel',
          inheritsFrom: 'ohif.overlayItem.windowLevel',
          color: '#fff',
        },
      ],
    },
  ],

  // --- URL-driven customizations (?customization=) ----------------------------
  // OFF by default. To allow loading customization data files from the URL, set
  // `customizationUrlPrefixes` to a map of allowed prefixes. The `default` prefix
  // (no slashes) is used for values with no leading slash; every other prefix
  // must start AND end with a slash and is matched against the leading
  // `/segment/` of the value. Files are fetched and parsed as JSONC data — they
  // are never executed. Example (left disabled here on purpose):
  //
  // customizationUrlPrefixes: {
  //   default: './customizations/',                       // ?customization=tools/ctPresets
  //   '/remote/': 'https://cdn.example.com/ohif-custom/', // ?customization=/remote/siteA
  // },
  // ----------------------------------------------------------------------------

  // --- Native ("next") Generic Viewport --------------------------------------
  // OFF by default. Set `enabled: true` (or pass ?useNextViewports=true in the
  // URL) to drive viewports through cornerstone's native GenericViewport
  // ("next") API instead of the legacy Stack/Volume viewport classes.
  genericViewports: {
    enabled: false,
    // Render backend selection: 'cpu' | 'webgl' | 'auto' | a backend id
    // registered via cornerstone's registerRenderBackend (e.g. a webgpu
    // backend), or a map with per-viewport-type overrides, e.g.
    // { default: 'webgl', orthographic: 'cpu' }. The matching URL params take
    // precedence per-session: ?viewportRendering=cpu and
    // ?orthographic.viewportRendering=cpu.
    // viewportRendering: 'auto',
  },
  // ----------------------------------------------------------------------------
  showStudyList: true,
  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  experimentalStudyBrowserSort: false,
  strictZSpacingForVolumeViewport: true,
  groupEnabledModesFirst: true,
  allowMultiSelectExport: false,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 5,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },
  showErrorDetails: 'always', // 'always', 'dev', 'production'
  // `dangerouslyUseDynamicConfig` (load configuration from a `configUrl` query
  // parameter) is intentionally left OFF in the secure default build. See
  // config/dev.js for the documented shape.
  defaultDataSourceName: 'ohif',
  investigationalUseDialog: {
    option: 'configure',
    days: 90,
  },
  dataSources: [
    {
      // Read-only public demo server. Replace with your own DICOMweb server.
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'ohif',
      configuration: {
        friendlyName: 'AWS S3 Static wado server',
        name: 'aws',
        wadoUriRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        wadoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'thumbnail',
        thumbnailRequestStrategy: 'fetch',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        // Multiframe SEG loads fetch the whole instance as a single Part 10
        // object by default and wait for it: the per-frame endpoint is
        // efficient, but SEG frames are so small and numerous that one bulk
        // fetch beats hundreds of tiny requests. Per-frame loading is the
        // exception — set loadMultiframeAsPart10: false here to force it.
        singlepart: 'bulkdata,video',
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
          transform: url => url.replace('/pixeldata.mp4', '/rendered'),
        },
        omitQuotationForMultipartRequest: true,
      },
    },

    // The following data sources are intentionally NOT enabled in the secure
    // default because they broaden the attack surface of a default deployment.
    // Enable them only in a deployment you control (see config/dev.js):
    //   - dicomlocal:    loads DICOM files from the user's machine.
    //   - dicomjson:     loads metadata from an arbitrary `?url=` (gate with
    //                    `dangerouslyAllowedOriginsForAuthenticatedEnvironments`).
    //   - dicomwebproxy: delegating proxy driven by `?url=`.
  ],
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'a',
        {
          target: '_blank',
          href: 'https://acan.io',
        },
        React.createElement(
          'div',
          {
            className: 'h-8',
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            },
          },
          React.createElement('img', {
            src: './assets/acanio.svg',
            className: 'w-10 h-10',
            style: {
              display: 'inline-block',
            },
          }),
          React.createElement(
            'span',
            {
              className: 'ml-3 text-xl',
              style: {
                color: '#fff',
                marginRight: '250px',
              },
            },
            'Acan.io Viewer'
          )
        )
      );
    },
  },
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error.status);

    // Could use services manager here to bring up a dialog/modal if needed.
    console.warn('test, navigate to https://ohif.org/');
  },
};
