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
  strictZSpacingForVolumeViewport: true,
  // filterQueryParam: false,
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'AWS S3 Static wado server',
        name: 'aws',
        wadoUriRoot: 'https://d33do7qe4w26qo.cloudfront.net/dicomweb',
        qidoRoot: 'https://d33do7qe4w26qo.cloudfront.net/dicomweb',
        wadoRoot: 'https://d33do7qe4w26qo.cloudfront.net/dicomweb',

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
        },
        omitQuotationForMultipartRequest: true,
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb2',
      configuration: {
        friendlyName: 'AWS S3 Static wado secondary server',
        name: 'aws',
        wadoUriRoot: 'https://d28o5kq0jsoob5.cloudfront.net/dicomweb',
        qidoRoot: 'https://d28o5kq0jsoob5.cloudfront.net/dicomweb',
        wadoRoot: 'https://d28o5kq0jsoob5.cloudfront.net/dicomweb',
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
};
