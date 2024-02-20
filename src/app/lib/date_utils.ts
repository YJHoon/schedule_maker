import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  isSaturday,
  isSunday,
  startOfMonth,
} from "date-fns";
import _ from "lodash";

//   근무 시간: D, E, N, S, Off

// D, S, E, N, Off, Off가 나오는게 베스트

// 근무표를 짤거야.
// 근무 종류는 D, E, N, S, Off 총 5개야.
// 근무표를 짤 때는 몇 가지 규칙이 있어.

// 1. N 다음에는 D나 E가 나올 수 없음
// 2. 모든 인원들의 Off가 동일해야함.
// 3. 휴가 설정한 날은 쉬어야함
// 4. D, E, N도 동일해야함. 동일하지 못하면 최대한 비슷해야함.
// 5. 휴무날은 주말 및 연휴 기간 포함한 횟수
// 6. D 2, E 2, N 2, 휴무 다 채우고 남는 날은 S 넣기

// 인원 수 입력
// 이번달 근무 일수 계산 && 휴무 일수 계산
// 하루에 D2, E2, N2

// const data = [
//     Array.new(29),
//     Array.new(29),
//     Array.new(29),
//     Array.new(29),
// ]
// data.find((arr) => arr.name)[25] = "휴무"
// data.find((arr) => arr.name)[10] = "휴무"

export const dayToString: string[] = ["일", "월", "화", "수", "목", "금", "토"];

export const findMonthHoliday = (
  holidays: string[],
  startOfThisMonth: Date,
  endOfThisMonth: Date
) => {
  const holidayDateList = eachDayOfInterval({
    start: startOfThisMonth,
    end: endOfThisMonth,
  })
    .map((day) => format(day, "yyyy-MM-dd")) // 날짜를 YYYY-MM-DD 형식으로 포맷
    .filter(
      (dateStr) =>
        holidays.includes(dateStr) || isSaturday(dateStr) || isSunday(dateStr)
    );

  return holidayDateList.map((day) => format(day, "d"));
};

export const dateInfo = (date: Date) => {
  const monthNumber = getMonth(date) + 1;
  const startOfThisMonth = startOfMonth(date);
  const endOfThisMonth = endOfMonth(date);
  const daysInMonth = getDaysInMonth(date);

  return {
    monthNumber,
    startOfThisMonth,
    endOfThisMonth,
    daysInMonth,
  };
};
