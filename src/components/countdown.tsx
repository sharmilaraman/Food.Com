"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const endingDate = new Date("2025-09-01");

const CountDown = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Countdown
      className="font-bold text-5xl text-yellow-300"
      date={endingDate}
    />
  );
};

export default CountDown;
