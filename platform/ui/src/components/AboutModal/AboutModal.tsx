import React from 'react';
import PropTypes from 'prop-types';
import detect from 'browser-detect';
import { useTranslation } from 'react-i18next';

import Typography from '../Typography';
import Icon from '../Icon';

const Link = ({ href, children, showIcon = false }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Typography
        variant="subtitle"
        component="p"
        color="primaryActive"
        className="flex items-center"
      >
        {children}
        {!!showIcon && (
          <Icon
            name="external-link"
            className="ml-2 w-5 text-white"
          />
        )}
      </Typography>
    </a>
  );
};

const Row = ({ title, value, link }) => {
  return (
    <div className="mb-4 flex ml-2">
      <Typography
        variant="subtitle"
        component="p"
        className="w-64 text-white"
      >
        {title}
      </Typography>

      {link ? (
        <Link href={link}>{value}</Link>
      ) : (
        <Typography
          variant="subtitle"
          component="p"
          className="w-48 text-white"
        >
          {value}
        </Typography>
      )}
    </div>
  );
};

const AboutModal = ({ productVersionNumber, versionNumber }) => {
  const { os, version, name } = detect();
  const browser = `${name[0].toUpperCase()}${name.substr(1)} ${version}`;
  const { t } = useTranslation('AboutModal');

  const renderRowTitle = title => (
    <div className="mb-3 border-b-2 border-black pb-3">
      <Typography
        variant="inherit"
        color="primaryLight"
        className="text-[16px] font-semibold !leading-[1.2]"
      >
        {title}
      </Typography>
    </div>
  );
  return (
    <div>
      {renderRowTitle(t('Version information'))}
      <div className="flex flex-col">
        <Row
          title={t('Product Version Number')}
          value={productVersionNumber}
        />
        <Row
          title={t('Dependency Version Number')}
          value={versionNumber}
        />
        <Row
          title={t('Browser')}
          value={browser}
        />
        <Row
          title={t('OS')}
          value={os}
        />
      </div>

      {renderRowTitle(t('Important links'))}
      <div className="mb-8 flex">
        <span className="ml-2">
          <Link
              href="https://github.com/acanio/acanio-viewer/issues/new/choose"
              showIcon={true}
          >
            {t('Report an issue')}
          </Link>
        </span>
        <span className="ml-4">
          <Link
              href="https://acan.io"
              showIcon={true}
          >
          {t('More details')}
          </Link>
        </span>
      </div>
    </div>
  );
};

AboutModal.propTypes = {
  buildNumber: PropTypes.string,
  versionNumber: PropTypes.string,
};

export default AboutModal;
