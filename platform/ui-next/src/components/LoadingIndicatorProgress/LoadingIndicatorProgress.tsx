import React from 'react';
import classNames from 'classnames';

import ProgressLoadingBar from '../ProgressLoadingBar';
/**
 *  A React component that renders a loading indicator.
 * if progress is not provided, it will render an infinite loading indicator
 * if progress is provided, it will render a progress bar
 * Optionally a textBlock can be provided to display a message
 */
function LoadingIndicatorProgress({ className, textBlock, progress }) {
  return (
    <div
      className={classNames(
        'absolute top-0 left-0 z-50 flex flex-col items-center justify-center space-y-5',
        className
      )}
    >
      <img
        src={`${(process.env.PUBLIC_URL || '').replace(/\/$/, '')}/assets/acanio.svg`}
        alt="Acan.io"
        className="h-12 w-12"
      />
      <div className="w-48">
        <ProgressLoadingBar progress={progress} />
      </div>
      {textBlock}
    </div>
  );
}

export default LoadingIndicatorProgress;
