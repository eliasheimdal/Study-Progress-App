import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SliderLoadProps = {
  name: string;
  value: number;
  onChange?: (value: number) => void; // Still expect a number here
}

export type ProgressBarProps = {
  name: string;
  code: string;
  value: number;
  effort: number;
  full: number;
}

export type Lecture = {
  courseCode: string;
  type: string;
  day: string;
  time: string;
  durationHours: number;
  checked: boolean;
}

export type Activity = {
  course: string;
  duration: string;
}
export type ActivityFormProps = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  onActivitySubmit: (activity: Activity) => void;
  deleteCourse: (activity: Activity, index: number) => void;
};
export type CoursePageProps = {
  id: number,
  courseCode: string,
  name: string,
  description: string,
  src: string,
};

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    id: string;
  }
}