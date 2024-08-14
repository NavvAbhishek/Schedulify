"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClassDetails {
  className: string;
  roomCapacity: string;
  subject: string;
  teacherAvailability: string[];
  teacherId: string;
  teacherName: string;
}

type Schedule = {
  [day: string]: {
    [timeSlot: string]: ClassDetails[];
  };
};

interface ScheduleContextType {
  schedule: Schedule;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [schedule, setSchedule] = useState<Schedule>({});

  return (
    <ScheduleContext.Provider value={{ schedule, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
