const getToggledClassName = isToggled => {
  return isToggled
    ? '!text-primary'
    : '!text-common-bright hover:text-primary-light';
};

export { getToggledClassName };
