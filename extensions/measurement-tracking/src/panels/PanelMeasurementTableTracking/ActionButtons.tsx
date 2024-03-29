import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, ButtonEnums } from '@ohif/ui';

function ActionButtons({ onExportClick, onCreateReportClick, disabled }) {
  const { t } = useTranslation('MeasurementTable');

  return (
    <React.Fragment>
      <Button
        onClick={onExportClick}
        disabled={disabled}
        type={ButtonEnums.type.primary}
        size={ButtonEnums.size.small}
        className='bg-inputfield-disabled'
      >
        {t('Export')}
      </Button>
      {/* <Button
        className="ml-2 bg-inputfield-disabled"
        onClick={onCreateReportClick}
        type={ButtonEnums.type.primary}
        size={ButtonEnums.size.small}
        disabled={disabled}
      >
        {t('Create Report')}
      </Button> */}
    </React.Fragment>
  );
}

ActionButtons.propTypes = {
  onExportClick: PropTypes.func,
  onCreateReportClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ActionButtons.defaultProps = {
  onExportClick: () => alert('Export'),
  onCreateReportClick: () => alert('Create Report'),
  disabled: false,
};

export default ActionButtons;
