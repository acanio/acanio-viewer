const getToggledClassName = isToggled => {
  return isToggled
    ? '!bg-primary-light !text-black hover:!bg-primary-light'
    : '!text-primary-active hover:text-primary-light';
};

export { getToggledClassName };
