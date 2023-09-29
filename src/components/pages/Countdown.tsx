import React, { useState, useEffect } from 'react';

interface CountdownProps {
  timestamp: number;
}

const Countdown: React.FC<CountdownProps> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(timestamp - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timestamp - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes: number = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds: number = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (Date.now() > timestamp) {
    return null; // Atau bisa juga mengembalikan elemen kosong <></>
  }

  return (
    <div>
      {days} D : {hours} H : {minutes} M : {seconds} S
    </div>
  );
};

export default Countdown;
