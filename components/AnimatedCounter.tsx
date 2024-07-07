"use client";

import React from "react";
import CountUp from "react-countup";

type AnimatedCounterProps = {
  duration: number;
  end: number;
  decimals: number;
  prefix: string;
};

const AnimatedCounter = ({
  decimals,
  duration,
  end,
  prefix,
}: AnimatedCounterProps) => {
  return (
    <CountUp
      className="w-full"
      decimals={decimals}
      duration={duration}
      end={end}
      prefix={prefix}
    />
  );
};

export default AnimatedCounter;
