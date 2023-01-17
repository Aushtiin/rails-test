import { isToday, isTomorrow, isBefore, parseISO } from "date-fns";
import * as R from "ramda";
import moment from "moment";
import { baseTheme } from "~/themes/base";

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

export const dateStringToSeconds = dateString => {
  return new Date(dateString).getTime() / MILLISECONDS_PER_SECOND;
};

export const nowInSeconds = () => Math.round(Date.now() / MILLISECONDS_PER_SECOND);

export const nowAsUTCString = () => new Date().toUTCString();

export const noonTodayInSeconds = () => new Date().setHours(12, 0, 0, 0) / MILLISECONDS_PER_SECOND;

export const daysInMilliseconds = days =>
  days * MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;

export const parseKeyActivityDueDate = keyActivity => {
  const dueDate = keyActivity.dueDate;
  const parsedDate = parseISO(dueDate);
  const { cautionYellow, greyActive, warningRed, successGreen } = baseTheme.colors;

  if (R.isNil(dueDate)) {
    return { text: "", color: greyActive };
  } else if (isToday(parsedDate)) {
    return { text: "Today", color: cautionYellow };
  } else if (isTomorrow(parsedDate)) {
    return { text: "Tomorrow", color: successGreen };
  } else if (isBefore(parsedDate, new Date())) {
    return { text: "Overdue", color: warningRed };
  } else {
    return { text: moment(parsedDate).format("MMM Do, YYYY"), color: greyActive };
  }
};
