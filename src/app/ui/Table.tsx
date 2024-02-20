import _ from "lodash";
import { findMonthHoliday, dateInfo, dayToString } from "../lib/date_utils";
import { eachDayOfInterval, format, getDay } from "date-fns";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { myCode } from "../lib/schedule_utils";
import { UserType } from "../common/schema";

const ScheduleTable = () => {
  const date = new Date();
  const { monthNumber, startOfThisMonth, endOfThisMonth, daysInMonth } =
    dateInfo(date);
  const holidayDateList = findMonthHoliday(
    [],
    startOfThisMonth,
    endOfThisMonth
  );
  const [usersSchedules, setUsersSchedules] = useState<UserType[]>();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    setUsersSchedules(myCode(daysInMonth, holidayDateList.length + 2));
  }, [holidayDateList.length, daysInMonth]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {monthNumber}월 스케줄
            </h1>
            <div className="mt-2 text-sm text-gray-700">테스트 중입니다.</div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    ></th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      이름
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      D
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      S
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      E
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      N
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sticky"
                    >
                      Off
                    </th>
                    {eachDayOfInterval({
                      start: startOfThisMonth,
                      end: endOfThisMonth,
                    }).map((day, index) => (
                      <th
                        key={`header_date_${index}`}
                        scope="col"
                        className={`px-4 py-3.5 text-center text-sm font-semibold whitespace-nowrap text-gray-900 ${
                          holidayDateList.includes((index + 1).toString())
                            ? "text-red-500"
                            : "text-gray-900"
                        }`}
                      >
                        {format(day, "d")}({dayToString[getDay(day)]})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {usersSchedules &&
                    usersSchedules.map((user) => (
                      <tr
                        key={user.id}
                        className={`divide-x divide-gray-200 ${
                          selectedUserId === user.id ? "bg-gray-50" : undefined
                        }`}
                      >
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          {selectedUserId === user.id && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            value={user.id}
                            checked={selectedUserId === user.id}
                            disabled={
                              selectedUserId === null
                                ? false
                                : selectedUserId === user.id
                                ? false
                                : true
                            }
                            onChange={(e) =>
                              setSelectedUserId(
                                e.target.checked ? user.id : null
                              )
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.id}
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.D}
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.S}
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.E}
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.N}
                        </td>
                        <td className="whitespace-nowrap text-center p-4 text-sm font-medium">
                          {user.Off}
                        </td>
                        {user.schedules.map((s, index) => (
                          <td
                            key={`${user.id}_${index}`}
                            className="whitespace-nowrap text-center p-4 text-sm text-gray-500"
                          >
                            {s}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleTable;
