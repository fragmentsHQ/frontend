import React from "react";

import { Img, Line, Text } from "components";

type DesktopTwentyThreeRowdividerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    selectlabel: string;
    gb: string;
    of100items: string;
    gb_One: string;
    totalpages: string;
  }>;

const DesktopTwentyThreeRowdivider: React.FC<
  DesktopTwentyThreeRowdividerProps
> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start pl-4 w-auto">
          <div className="flex flex-row items-center justify-start w-auto">
            <div className="bg-white_A700 flex flex-col items-start justify-start w-auto">
              <div className="flex flex-row gap-2 items-start justify-start">
                <div className="flex flex-col items-start justify-start py-[15px] w-auto">
                  <Text
                    className="font-inter font-normal text-gray_100 w-auto"
                    as="h4"
                    variant="h4"
                  >
                    {props?.selectlabel}
                  </Text>
                </div>
                <div className="flex flex-col items-start justify-start w-auto">
                  <div className="flex flex-col items-start justify-start w-auto">
                    <div className="bg-white_A700 flex flex-row gap-2 h-12 md:h-auto items-center justify-start px-2 py-3.5 w-auto">
                      <div className="flex flex-col h-[18px] md:h-auto items-start justify-start w-auto">
                        <Text
                          className="font-inter font-normal text-gray_100 w-auto"
                          as="h4"
                          variant="h4"
                        >
                          {props?.gb_One}
                        </Text>
                      </div>
                      <div className="flex flex-col items-start justify-start w-4">
                        <div className="bg-white_A700 flex flex-col h-4 items-center justify-start p-[3px] w-4">
                          <Img
                            src="images/img_arrowdown_gray_100.svg"
                            className="h-[5px] my-0.5"
                            alt="arrowdown_One"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Line className="bg-gray_800_01 h-12 w-px" />
          </div>
        </div>
        <div className="flex flex-1 flex-col h-full items-center justify-start pl-4 w-full">
          <Text
            className="font-inter font-normal text-gray_400_01 w-auto"
            as="h4"
            variant="h4"
          >
            {props?.of100items}
          </Text>
        </div>
        <div className="flex flex-row items-start justify-start w-auto">
          <Line className="bg-gray_800_01 h-12 w-px" />
          <div className="flex flex-row items-start justify-start pr-2 w-auto">
            <div className="bg-white_A700 flex flex-col items-start justify-start w-[47px]">
              <div className="flex flex-col items-start justify-start w-[47px]">
                <div className="flex flex-col items-start justify-start w-[47px]">
                  <div className="flex flex-col items-start justify-start w-[47px]">
                    <div className="bg-white_A700 flex flex-row gap-2 h-12 md:h-auto items-center justify-start px-2 py-3.5 w-[47px]">
                      <div className="flex flex-col h-[18px] md:h-auto items-start justify-start w-auto">
                        <Text
                          className="font-inter font-normal text-gray_100 w-auto"
                          as="h4"
                          variant="h4"
                        >
                          {props?.gb_One}
                        </Text>
                      </div>
                      <div className="flex flex-col items-start justify-start w-4">
                        <div className="bg-white_A700 flex flex-col h-4 items-center justify-start p-[3px] w-4">
                          <Img
                            src="images/img_arrowdown_gray_100.svg"
                            className="h-[5px] my-0.5"
                            alt="arrowdown_One"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-12 md:h-auto items-start justify-start py-[15px]">
              <Text
                className="font-inter font-normal text-gray_100 w-auto"
                as="h4"
                variant="h4"
              >
                {props?.totalpages}
              </Text>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end w-auto">
            <div className="bg-white_A700 flex flex-col items-start justify-start p-0.5 w-[49px]">
              <div className="flex flex-col items-center justify-start p-3.5 w-11">
                <div className="bg-white_A700 flex flex-col h-4 items-start justify-start p-1 w-4">
                  <Img
                    src="images/img_vector.svg"
                    className="h-2"
                    alt="vector"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white_A700 flex flex-col items-start justify-start p-0.5 w-[49px]">
              <div className="flex flex-col items-center justify-start p-3.5 w-11">
                <div className="bg-white_A700 flex flex-col h-4 items-end justify-start p-1 w-4">
                  <Img
                    src="images/img_vector.svg"
                    className="h-2"
                    alt="vector_One"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DesktopTwentyThreeRowdivider.defaultProps = {
  selectlabel: "Items per page:",
  gb: "1",
  of100items: "10 – 100 of 100 items",
  gb_One: "1",
  totalpages: "of 10 pages",
};

export default DesktopTwentyThreeRowdivider;
