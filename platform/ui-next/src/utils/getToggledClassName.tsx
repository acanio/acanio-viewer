const getToggledClassName = isToggled => {
  return isToggled
    ? '!text-primary-active'
    : '!text-primary-active hover:!bg-primary-dark hover:text-primary-light';
};

export { getToggledClassName };
