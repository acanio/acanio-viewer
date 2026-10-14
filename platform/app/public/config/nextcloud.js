/** @type {AppTypes.Config} */
window.config = {
  routerBasename: '__NEXTCLOUD_BASE_PATH__/apps/dicomviewer/ncviewer',
  // whiteLabeling: {},
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
  showStudyList: false,
  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },
  // filterQueryParam: false,
  defaultDataSourceName: 'dicomjson',
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
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    }
  ],
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error);
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
};
