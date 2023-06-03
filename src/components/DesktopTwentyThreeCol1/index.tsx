import React from "react";

import { Line, Text } from "../";

type DesktopTwentyThreeCol1Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ datetext: string }>;

const DesktopTwentyThreeCol1: React.FC<DesktopTwentyThreeCol1Props> = (
  props
) => {
  return (
    <>
      <div className={props.className}>
        <Line className="bg-white_A700 h-px w-4/5" />
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start p-4 w-full">
            <Text
              className="font-inter font-semibold text-gray_100 w-auto"
              as="h4"
              variant="h4"
            >
              {props?.datetext}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

DesktopTwentyThreeCol1.defaultProps = { datetext: "Date" };

export default DesktopTwentyThreeCol1;
