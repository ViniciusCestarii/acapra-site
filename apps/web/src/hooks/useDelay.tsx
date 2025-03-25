"use client";

import React, { useEffect } from "react";

const useAfterEffect = (timeMs: number) => {
  const [isDelayFinished, setIsDelayFinished] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsDelayFinished(true), timeMs);
    return () => clearTimeout(timer);
  });

  return isDelayFinished;
};

export default useAfterEffect;
