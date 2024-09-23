import { Text } from "@src/components";
import { formatDate } from "libs/helper";
import moment from "moment";
import { FC } from "react";

interface IDuration {
  date: Date;
  duration: number;
}
const Duration: FC<IDuration> = ({ date, duration }) => {
  let startTime = formatDate(date, "time");
  if (!duration) return <Text>{startTime}</Text>;

  let endTime = formatDate(moment(date).add(duration, "hours"), "time");

  return (
    <Text>{startTime} - {endTime}</Text>
  );
};

export default Duration;
