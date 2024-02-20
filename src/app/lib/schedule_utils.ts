import { getDaysInMonth } from "date-fns";

export const defaultUserList = (
  user_list: string[],
  date: Date
): { id: number; name: string; schedules: string[] }[] => {
  const daysInMonth = getDaysInMonth(date);
  console.log(daysInMonth);

  return user_list.map((user, index) => ({
    id: index + 1,
    name: user,
    schedules: new Array(daysInMonth).fill("Off"),
  }));
};

export const makeSchedule = (
  users_schedule: { id: number; name: string; schedules: string[] }[]
) => {
  users_schedule.map((schedule) => {
    console.log(schedule);
  });
};
