import React from "react";

import { Line, Text } from "components";

type DesktopTwentyThreeCol3Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ text: string }>;

const DesktopTwentyThreeCol3: React.FC<DesktopTwentyThreeCol3Props> = (
  props
) => {
  return (
    <>
      <div className={props.className}>
        <Line className="bg-white_A700 h-px w-[83%]" />
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start px-4 py-[15px] w-full">
            <Text
              className="font-inter font-normal text-gray_400 w-full"
              as="h4"
              variant="h4"
            >
              {props?.text}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

DesktopTwentyThreeCol3.defaultProps = { text: "May 27, 2023, 24:12" };

export default DesktopTwentyThreeCol3;
