const getToggledClassName = isToggled => {
  return isToggled
    ? '!text-primary-active'
    : '!text-primary-active hover:text-primary-light';
};

export { getToggledClassName };
