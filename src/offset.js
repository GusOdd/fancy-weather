import * as constant from './constants';

export default function getStartOffset() {
  const date = new Date();
  const offset = -date.getTimezoneOffset() * constant.MIN_IN_HOUR;
  return offset;
}
