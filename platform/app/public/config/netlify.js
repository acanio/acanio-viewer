/** @type {AppTypes.Config} */

window.config = {
  routerBasename: '/',
  extensions: [],
  modes: [],
  customizationService: {
    cornerstoneViewportActionBar: {
      disabled: true,
    },
    cornerstoneOverlayTopLeft: {
      id: 'cornerstoneOverlayTopLeft',
      items: [
        {
          id: 'PatientName',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          condition: ({ instance }) =>
              instance && instance.PatientName && (typeof instance.PatientName === 'string' || instance.PatientName.Alphabetic),
          contentF: ({ instance, formatters: { formatPN } }) =>
              (typeof instance.PatientName === 'string' ? formatPN(instance.PatientName) : formatPN(instance.PatientName.Alphabetic)) +
              ' ' +
              (instance.PatientSex ? '(' + instance.PatientSex + ')' : ''),
        },
        {
          id: 'PID',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Patient PID',
          condition: ({ instance }) => instance && instance.PatientID,
          contentF: ({ instance }) => instance.PatientID,
        },
        {
          id: 'PatientBirthDate',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: 'DOB:',
          title: "Patient's Date of birth",
          condition: ({ instance }) => instance && instance.PatientBirthDate,
          contentF: ({ instance }) => instance.PatientBirthDate,
        },
        {
          id: 'OtherPid',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: 'Other PID:',
          title: 'Other Patient IDs',
          condition: ({ instance }) => instance && instance.OtherPatientIDs,
          contentF: ({ instance, formatters: { formatPN } }) => formatPN(instance.OtherPatientIDs),
        },
      ],
    },
    cornerstoneOverlayTopRight: {
      id: 'cornerstoneOverlayTopRight',

      items: [
        {
          id: 'SeriesDescription',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Series Description',
          condition: ({ instance }) => instance && instance.SeriesDescription,
          contentF: ({ instance }) => instance.SeriesDescription,
        },
        {
          id: 'StudyDateTime',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          title: 'Study date',
          condition: ({ instance }) => instance && (instance.StudyDate || instance.StudyTime),
          contentF: ({ instance, formatters: { formatDate, formatTime } }) =>
              [
                instance.StudyDate ? formatDate(instance.StudyDate) : '',
                instance.StudyTime ? formatTime(instance.StudyTime) : ''
              ].join(' '),
        },
      ],
    },
    cornerstoneOverlayBottomLeft: {
      id: 'cornerstoneOverlayBottomLeft',

      items: [
        {
          id: 'SeriesNumber',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: 'Ser:',
          title: 'Series Number',
          condition: ({ instance }) => instance && instance.SeriesNumber,
          contentF: ({ instance }) => instance.SeriesNumber,
        },
        {
          id: 'InstanceNmber',
          customizationType: 'ohif.overlayItem.instanceNumber',
          color: '#fff',
        },
        {
          id: 'ColumnsRows',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: '',
          condition: ({ instance }) => instance && instance.Columns && instance.Rows,
          contentF: ({ instance }) => `${instance.Columns} x ${instance.Rows}`,
        },
        {
          id: 'SliceLocation',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: 'Loc:',
          title: 'Slice Location',
          condition: ({ instance }) => instance && instance.SliceLocation,
          contentF: ({ instance, formatters: { formatNumberPrecision } }) =>
              formatNumberPrecision(instance.SliceLocation, 2) + ' mm',
        },
        {
          id: 'SliceThickness',
          customizationType: 'ohif.overlayItem',
          color: '#fff',
          label: 'Thick:',
          title: 'Slice Thickness',
          condition: ({ instance }) => instance && instance.SliceThickness,
          contentF: ({ instance, formatters: { formatNumberPrecision } }) =>
              formatNumberPrecision(instance.SliceThickness, 2) + ' mm',
        },
      ],
    },
    cornerstoneOverlayBottomRight: {
      id: 'cornerstoneOverlayBottomRight',

      items: [
        {
          id: 'ZoomLevel',
          customizationType: 'ohif.overlayItem.zoomLevel',
          color: '#fff',
        },
        {
          id: 'WindowLevel',
          customizationType: 'ohif.overlayItem.windowLevel',
          color: '#fff',
        },
      ],
    },
  },
  showStudyList: true,
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  experimentalStudyBrowserSort: false,
  strictZSpacingForVolumeViewport: true,
  groupEnabledModesFirst: true,
  // filterQueryParam: false,
  defaultDataSourceName: 'ohif',
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
    console.warn(error.status);

    // Could use services manager here to bring up a dialog/modal if needed.
    console.warn('test, navigate to https://ohif.org/');
  },
  whiteLabeling: {
    /* Optional: Should return a React component to be rendered in the "Logo" section of the application's Top Navigation bar */
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
              React.createElement(
                  'img',
                  {
                    src: '/assets/acanio.svg',
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
                  'Acan.io'
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
    // {
    //   commandName: 'previousViewportDisplaySet',
    //   label: 'Previous Series',
    //   keys: ['pagedown'],
    // },
    // {
    //   commandName: 'nextViewportDisplaySet',
    //   label: 'Next Series',
    //   keys: ['pageup'],
    // },
    { commandName: 'setZoomTool', label: 'Zoom', keys: ['z'] },
    // ~ Window level presets
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
          attachTo: {
            element: '.viewport-element',
            on: 'top',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'zoom',
          title: 'Zooming In and Out',
          text: 'You can zoom the images using the right click.',
          attachTo: {
            element: '.viewport-element',
            on: 'left',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_UP',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'pan',
          title: 'Panning the Image',
          text: 'You can pan the images using the middle click.',
          attachTo: {
            element: '.viewport-element',
            on: 'top',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_UP',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'windowing',
          title: 'Adjusting Window Level',
          text: 'You can modify the window level using the left click.',
          attachTo: {
            element: '.viewport-element',
            on: 'left',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_UP',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'length',
          title: 'Using the Measurement Tools',
          text: 'You can measure the length of a region using the Length tool.',
          attachTo: {
            element: '[data-cy="MeasurementTools-split-button-primary"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="MeasurementTools-split-button-primary"]',
            event: 'click',
          },
          beforeShowPromise: () =>
            waitForElement('[data-cy="MeasurementTools-split-button-primary]'),
        },
        {
          id: 'drawAnnotation',
          title: 'Drawing Length Annotations',
          text: 'Use the length tool on the viewport to measure the length of a region.',
          attachTo: {
            element: '.viewport-element',
            on: 'right',
          },
          advanceOn: {
            selector: 'body',
            event: 'event::measurement_added',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'trackMeasurement',
          title: 'Tracking Measurements in the Panel',
          text: 'Click yes to track the measurements in the measurement panel.',
          attachTo: {
            element: '[data-cy="prompt-begin-tracking-yes-btn"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="prompt-begin-tracking-yes-btn"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="prompt-begin-tracking-yes-btn"]'),
        },
        {
          id: 'openMeasurementPanel',
          title: 'Opening the Measurements Panel',
          text: 'Click the measurements button to open the measurements panel.',
          attachTo: {
            element: '#trackedMeasurements-btn',
            on: 'left-start',
          },
          advanceOn: {
            selector: '#trackedMeasurements-btn',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('#trackedMeasurements-btn'),
        },
        {
          id: 'scrollAwayFromMeasurement',
          title: 'Scrolling Away from a Measurement',
          text: 'Scroll the images using the mouse wheel away from the measurement.',
          attachTo: {
            element: '.viewport-element',
            on: 'left',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'jumpToMeasurement',
          title: 'Jumping to Measurements in the Panel',
          text: 'Click the measurement in the measurement panel to jump to it.',
          attachTo: {
            element: '[data-cy="measurement-item"]',
            on: 'left-start',
          },
          advanceOn: {
            selector: '[data-cy="measurement-item"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="measurement-item"]'),
        },
        {
          id: 'changeLayout',
          title: 'Changing Layout',
          text: 'You can change the layout of the viewer using the layout button.',
          attachTo: {
            element: '[data-cy="Layout"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Layout"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Layout"]'),
        },
        {
          id: 'selectLayout',
          title: 'Selecting the MPR Layout',
          text: 'Select the MPR layout to view the images in MPR mode.',
          attachTo: {
            element: '[data-cy="MPR"]',
            on: 'left-start',
          },
          advanceOn: {
            selector: '[data-cy="MPR"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="MPR"]'),
        },
      ],
      tourOptions: {
        useModalOverlay: true,
        defaultStepOptions: {
          buttons: [
            {
              text: 'Skip all',
              action() {
                this.complete();
              },
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
