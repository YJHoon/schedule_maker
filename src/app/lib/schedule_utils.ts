import { getDaysInMonth } from "date-fns";
import _ from "lodash";
import { UserType } from "../common/schema";

export const makeSchedule = (
  users_schedule: { id: number; name: string; schedules: string[] }[]
) => {
  //   users_schedule.map((schedule) => {
  //     console.log(schedule);
  //   });
};

export const myCode = (monthDays: number, holidays: number) => {
  const users: UserType[] = [
    {
      id: 1,
      name: "이름1",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "N",
    },
    {
      id: 2,
      name: "이름2",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "E",
    },
    {
      id: 3,
      name: "이름3",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "N",
    },
    {
      id: 4,
      name: "이름4",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "D",
    },
    {
      id: 5,
      name: "이름5",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "D",
    },
    {
      id: 6,
      name: "이름6",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "E",
    },
    {
      id: 7,
      name: "이름7",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "Off",
    },
    {
      id: 8,
      name: "이름8",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "Off",
    },
    {
      id: 9,
      name: "이름9",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "Off",
    },
    {
      id: 10,
      name: "이름10",
      D: 0,
      E: 0,
      N: 0,
      Off: 0,
      S: 0,
      schedules: new Array(monthDays).fill(""),
      lastWork: "Off",
    },
  ];

  const availableSchedule: Record<string, string[]> = {
    D: ["D", "E", "N", "Off"],
    E: ["E", "N", "Off"],
    N: ["N", "Off"],
    Off: ["D", "E", "N", "Off"],
    undefined: ["D", "E", "N", "Off"],
  };
  const totalWork = monthDays - holidays;
  const averageWork = totalWork / 3;

  for (let i = 0; i < monthDays; i++) {
    const dayCount: Record<string, number> = { D: 0, E: 0, N: 0 };

    users.map((user, index) => {
      //   const prevSchedule: string = user.lastWork ? user.lastWork : "None";
      sheduleCondition(user, i, dayCount, averageWork, holidays);

      // const nextAvailableList: string[] = availableSchedule[prevSchedule];
      // const sampleShedule = _.sample(nextAvailableList) as string;
      // user.lastWork = sampleShedule;

      // if (dayCount[sampleShedule] < 2 && user[sampleShedule] < averageWork) {
      //   user.schedules[i] = sampleShedule;
      //   user[sampleShedule] += 1;
      //   dayCount[sampleShedule] += 1;
      //   return;
      // }
    });
  }

  console.log(users.map((user) => user.schedules));

  return users;
};

const sheduleCondition = (
  user: UserType,
  index: number,
  dayCount: Record<string, number>,
  averageWork: number,
  holidays: number
) => {
  const availableSchedule: Record<string, string[]> = {
    D: ["D", "E"],
    E: ["E", "N"],
    N: ["N", "Off"],
    Off: ["D", "E", "N", "Off"],
    None: ["D", "E", "N", "Off"],
  };
  //   const availableSchedule: Record<string, string[]> = {
  //     D: ["D", "E", "N", "Off"],
  //     E: ["E", "N", "Off"],
  //     N: ["N", "Off"],
  //     Off: ["D", "E", "N", "Off"],
  //     undefined: ["D", "E", "N", "Off"],
  //   };
  const prevSchedule: string = user.lastWork ? user.lastWork : "None";
  const nextAvailableList: string[] = availableSchedule[prevSchedule];
  let sampleShedule = _.sample(nextAvailableList) as string;
  let count = 0;

  const repeatCount = countLastNumberRepetitions(
    user.lastWork,
    user.schedules.slice(0, index)
  );

  while (["D", "E", "N", "Off"].includes(sampleShedule)) {
    if (user.lastWork === sampleShedule && repeatCount >= 2) {
      sampleShedule = _.sample(nextAvailableList) as string;
      count += 1;
      continue;
    }

    if (sampleShedule === "Off" && user["Off"] < holidays) break;
    if (dayCount[sampleShedule] < 2 && user[sampleShedule] < averageWork) break;
    if (count > 100) {
      sampleShedule = "None";
      break;
    }

    sampleShedule = _.sample(nextAvailableList) as string;
    count += 1;
  }

  if (sampleShedule === "None") {
    user.lastWork = "None";
    return;
  }

  user.lastWork = sampleShedule;
  user.schedules[index] = sampleShedule;
  user[sampleShedule] += 1;
  dayCount[sampleShedule] += 1;
};

const countLastNumberRepetitions = (
  lastWork: string,
  arr: string[]
): number => {
  let count = 0;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === lastWork) {
      count++;
    } else {
      break;
    }
  }

  return count;
};
