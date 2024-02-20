"use client";
import {
  endOfMonth,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  startOfMonth,
} from "date-fns";
import ScheduleTable from "../ui/Table";

const SchedulePage = () => {
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

  const now = new Date();
  const startOfThisMonth = startOfMonth(now);
  const endOfThisMonth = endOfMonth(now);
  const daysInMonth = getDaysInMonth(now);
  const monthName = getMonth(now) + 1;
  const dateqw = getDate(format(now, "yyyy-MM-dd"));
  const dateqw1 = getDate(format(now, "dd"));

  return (
    <div className="">
      <div className="mt-12">
        <ScheduleTable />
      </div>
    </div>
  );
};

export default SchedulePage;
