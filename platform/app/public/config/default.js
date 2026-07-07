/** @type {AppTypes.Config} */

window.config = {
  name: 'config/default.js',
  routerBasename: null,
  extensions: [],
  modes: [],
  customizationService: [
    {
      cornerstoneViewportActionBar: {
        disabled: true,
      },
      'viewportOverlay.topLeft': [
        {
          id: 'PatientName',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          condition: ({ referenceInstance }) =>
            referenceInstance && referenceInstance.PatientName && (typeof referenceInstance.PatientName === 'string' || referenceInstance.PatientName.Alphabetic),
          contentF: ({ referenceInstance, formatters: { formatPN } }) =>
            (typeof referenceInstance.PatientName === 'string' ? formatPN(referenceInstance.PatientName) : formatPN(referenceInstance.PatientName.Alphabetic)) +
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
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.PatientBirthDate,
          contentF: ({ referenceInstance }) => referenceInstance.PatientBirthDate,
        },
        {
          id: 'OtherPid',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: 'Other PID:',
          title: 'Other Patient IDs',
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.OtherPatientIDs,
          contentF: ({ referenceInstance, formatters: { formatPN } }) => formatPN(referenceInstance.OtherPatientIDs),
        },
      ],
      'viewportOverlay.topRight': [
        {
          id: 'SeriesDescription',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Series Description',
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.SeriesDescription,
          contentF: ({ referenceInstance }) => referenceInstance.SeriesDescription,
        },
        {
          id: 'StudyDateTime',
          inheritsFrom: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Study date',
          condition: ({ referenceInstance }) => referenceInstance && (referenceInstance.StudyDate || referenceInstance.StudyTime),
          contentF: ({ referenceInstance, formatters: { formatDate, formatTime } }) =>
            [
              referenceInstance.StudyDate ? formatDate(referenceInstance.StudyDate) : '',
              referenceInstance.StudyTime ? formatTime(referenceInstance.StudyTime) : ''
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
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.Columns && referenceInstance.Rows,
          contentF: ({ referenceInstance }) => `${referenceInstance.Columns} x ${referenceInstance.Rows}`,
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
          condition: ({ referenceInstance }) => referenceInstance && referenceInstance.SliceThickness,
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
    thumbnail: 75,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },
  showErrorDetails: 'always', // 'always', 'dev', 'production'
  // filterQueryParam: false,
  // Defines multi-monitor layouts
  multimonitor: [
    {
      id: 'split',
      test: ({ multimonitor }) => multimonitor === 'split',
      screens: [
        {
          id: 'ohif0',
          screen: null,
          location: {
            screen: 0,
            width: 0.5,
            height: 1,
            left: 0,
            top: 0,
          },
          options: 'location=no,menubar=no,scrollbars=no,status=no,titlebar=no',
        },
        {
          id: 'ohif1',
          screen: null,
          location: {
            width: 0.5,
            height: 1,
            left: 0.5,
            top: 0,
          },
          options: 'location=no,menubar=no,scrollbars=no,status=no,titlebar=no',
        },
      ],
    },

    {
      id: '2',
      test: ({ multimonitor }) => multimonitor === '2',
      screens: [
        {
          id: 'ohif0',
          screen: 0,
          location: {
            width: 1,
            height: 1,
            left: 0,
            top: 0,
          },
          options: 'fullscreen=yes,location=no,menubar=no,scrollbars=no,status=no,titlebar=no',
        },
        {
          id: 'ohif1',
          screen: 1,
          location: {
            width: 1,
            height: 1,
            left: 0,
            top: 0,
          },
          options: 'fullscreen=yes,location=no,menubar=no,scrollbars=no,status=no,titlebar=no',
        },
      ],
    },
  ],
  defaultDataSourceName: 'ohif',
  investigationalUseDialog: {
    option: 'configure',
    days: 90,
  },
  /* Dynamic config allows user to pass "configUrl" query string this allows to load config without recompiling application. The regex will ensure valid configuration source */
  // dangerouslyUseDynamicConfig: {
  //   enabled: true,
  //   // regex will ensure valid configuration source and default is /.*/ which matches any character. To use this, setup your own regex to choose a specific source of configuration only.
  //   // Example 1, to allow numbers and letters in an absolute or sub-path only.
  //   // regex: /(0-9A-Za-z.]+)(\/[0-9A-Za-z.]+)*/
  //   // Example 2, to restricts to either hosptial.com or othersite.com.
  //   // regex: /(https:\/\/hospital.com(\/[0-9A-Za-z.]+)*)|(https:\/\/othersite.com(\/[0-9A-Za-z.]+)*)/
  //   regex: /.*/,
  // },
  dataSources: [
    {
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
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: false,
        staticWado: true,
        singlepart: 'bulkdata,video',
        // whether the data source should use retrieveBulkData to grab metadata,
        // and in case of relative path, what would it be relative to, options
        // are in the series level or study level (some servers like series some study)
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
          transform: url => url.replace('/pixeldata.mp4', '/rendered'),
        },
        omitQuotationForMultipartRequest: true,
      },
    },

    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'ohif2',
      configuration: {
        friendlyName: 'AWS S3 Static wado secondary server',
        name: 'aws',
        wadoUriRoot: 'https://dd14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoRoot: 'https://dd14fa38qiwhyfd.cloudfront.net/dicomweb',
        wadoRoot: 'https://dd14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: false,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video',
        // whether the data source should use retrieveBulkData to grab metadata,
        // and in case of relative path, what would it be relative to, options
        // are in the series level or study level (some servers like series some study)
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
        },
        omitQuotationForMultipartRequest: true,
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'ohif3',
      configuration: {
        friendlyName: 'AWS S3 Static wado secondary server',
        name: 'aws',
        wadoUriRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
        qidoRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
        wadoRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: false,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video',
        // whether the data source should use retrieveBulkData to grab metadata,
        // and in case of relative path, what would it be relative to, options
        // are in the series level or study level (some servers like series some study)
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
        },
        omitQuotationForMultipartRequest: true,
      },
    },

    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'local5000',
      configuration: {
        friendlyName: 'Static WADO Local Data',
        name: 'DCM4CHEE',
        qidoRoot: 'http://localhost:5000/dicomweb',
        wadoRoot: 'http://localhost:5000/dicomweb',
        qidoSupportsIncludeField: false,
        supportsReject: true,
        supportsStow: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'video',
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
        },
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'orthanc',
      configuration: {
        friendlyName: 'local Orthanc DICOMWeb Server',
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://localhost/pacs/dicom-web',
        qidoRoot: 'http://localhost/pacs/dicom-web',
        wadoRoot: 'http://localhost/pacs/dicom-web',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        dicomUploadEnabled: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        omitQuotationForMultipartRequest: true,
        bulkDataURI: {
          enabled: true,
          // This is an example config that can be used to fix the retrieve URL
          // where it has the wrong prefix (eg a canned prefix).  It is better to
          // just use the correct prefix out of the box, but that is sometimes hard
          // when URLs go through several systems.
          // Example URLS are:
          // "BulkDataURI" : "http://localhost/dicom-web/studies/1.2.276.0.7230010.3.1.2.2344313775.14992.1458058363.6979/series/1.2.276.0.7230010.3.1.3.1901948703.36080.1484835349.617/instances/1.2.276.0.7230010.3.1.4.1901948703.36080.1484835349.618/bulk/00420011",
          // when running on http://localhost:3003 with no server running on localhost.  This can be corrected to:
          // /orthanc/dicom-web/studies/1.2.276.0.7230010.3.1.2.2344313775.14992.1458058363.6979/series/1.2.276.0.7230010.3.1.3.1901948703.36080.1484835349.617/instances/1.2.276.0.7230010.3.1.4.1901948703.36080.1484835349.618/bulk/00420011
          // which is a valid relative URL, and will result in using the http://localhost:3003/orthanc/.... path
          // startsWith: 'http://localhost/',
          // prefixWith: '/orthanc/',
        },
      },
    },

    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomwebproxy',
      sourceName: 'dicomwebproxy',
      configuration: {
        friendlyName: 'dicomweb delegating proxy',
        name: 'dicomwebproxy',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {
        friendlyName: 'dicom local',
      },
    },
  ],
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error);
  },
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
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
  tours: [
    {
      id: 'basicViewerTour',
      route: '/viewer',
      steps: [
        {
          id: 'scroll',
          title: 'Scrolling Through Images',
          text: 'You can scroll through the images using the mouse wheel or scrollbar.',
          attachTo: { element: '.viewport-element', on: 'top' },
          advanceOn: { selector: '.cornerstone-viewport-element', event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL' },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'zoom',
          title: 'Zooming In and Out',
          text: 'You can zoom the images using the right click.',
          attachTo: { element: '.viewport-element', on: 'left' },
          advanceOn: { selector: '.cornerstone-viewport-element', event: 'CORNERSTONE_TOOLS_MOUSE_UP' },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'pan',
          title: 'Panning the Image',
          text: 'You can pan the images using the middle click.',
          attachTo: { element: '.viewport-element', on: 'top' },
          advanceOn: { selector: '.cornerstone-viewport-element', event: 'CORNERSTONE_TOOLS_MOUSE_UP' },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'windowing',
          title: 'Adjusting Window Level',
          text: 'You can modify the window level using the left click.',
          attachTo: { element: '.viewport-element', on: 'left' },
          advanceOn: { selector: '.cornerstone-viewport-element', event: 'CORNERSTONE_TOOLS_MOUSE_UP' },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'length',
          title: 'Using the Measurement Tools',
          text: 'You can measure the length of a region using the Length tool.',
          attachTo: { element: '[data-cy="MeasurementTools-split-button-primary"]', on: 'bottom' },
          advanceOn: { selector: '[data-cy="MeasurementTools-split-button-primary"]', event: 'click' },
          beforeShowPromise: () => waitForElement('[data-cy="MeasurementTools-split-button-primary]'),
        },
        {
          id: 'drawAnnotation',
          title: 'Drawing Length Annotations',
          text: 'Use the length tool on the viewport to measure the length of a region.',
          attachTo: { element: '.viewport-element', on: 'right' },
          advanceOn: { selector: 'body', event: 'event::measurement_added' },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'trackMeasurement',
          title: 'Tracking Measurements in the Panel',
          text: 'Click yes to track the measurements in the measurement panel.',
          attachTo: { element: '[data-cy="prompt-begin-tracking-yes-btn"]', on: 'bottom' },
          advanceOn: { selector: '[data-cy="prompt-begin-tracking-yes-btn"]', event: 'click' },
          beforeShowPromise: () => waitForElement('[data-cy="prompt-begin-tracking-yes-btn"]'),
        },
        {
          id: 'openMeasurementPanel',
          title: 'Opening the Measurements Panel',
          text: 'Click the measurements button to open the measurements panel.',
          attachTo: { element: '#trackedMeasurements-btn', on: 'left-start' },
          advanceOn: { selector: '#trackedMeasurements-btn', event: 'click' },
          beforeShowPromise: () => waitForElement('#trackedMeasurements-btn'),
        },
        {
          id: 'scrollAwayFromMeasurement',
          title: 'Scrolling Away from a Measurement',
          text: 'Scroll the images using the mouse wheel away from the measurement.',
          attachTo: { element: '.viewport-element', on: 'left' },
          advanceOn: { selector: '.cornerstone-viewport-element', event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL' },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'jumpToMeasurement',
          title: 'Jumping to Measurements in the Panel',
          text: 'Click the measurement in the measurement panel to jump to it.',
          attachTo: { element: '[data-cy="data-row"]', on: 'left-start' },
          advanceOn: { selector: '[data-cy="data-row"]', event: 'click' },
          beforeShowPromise: () => waitForElement('[data-cy="data-row"]'),
        },
        {
          id: 'changeLayout',
          title: 'Changing Layout',
          text: 'You can change the layout of the viewer using the layout button.',
          attachTo: { element: '[data-cy="Layout"]', on: 'bottom' },
          advanceOn: { selector: '[data-cy="Layout"]', event: 'click' },
          beforeShowPromise: () => waitForElement('[data-cy="Layout"]'),
        },
        {
          id: 'selectLayout',
          title: 'Selecting the MPR Layout',
          text: 'Select the MPR layout to view the images in MPR mode.',
          attachTo: { element: '[data-cy="MPR"]', on: 'left-start' },
          advanceOn: { selector: '[data-cy="MPR"]', event: 'click' },
          beforeShowPromise: () => waitForElement('[data-cy="MPR"]'),
        },
      ],
      tourOptions: {
        useModalOverlay: true,
        defaultStepOptions: {
          buttons: [
            {
              text: 'Skip all',
              action() { this.complete(); },
              secondary: true,
            },
          ],
        },
      },
    },
  ],
};

function waitForElement(selector, maxAttempts = 20, interval = 25) {
  return new Promise(resolve => {
    let attempts = 0;

    const checkForElement = setInterval(() => {
      const element = document.querySelector(selector);

      if (element || attempts >= maxAttempts) {
        clearInterval(checkForElement);
        resolve();
      }

      attempts++;
    }, interval);
  });
}
