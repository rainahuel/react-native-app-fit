import helmsData from "./helms-routines-full";
import hiitData from "./hiit-laursen-buchheit";
import broSplitData from "./bro-split-routines";
import gvtData from "./gvt-routines-full";
import mapsAnabolicData from "./maps-anabolic-routines";
import phulData from "./phul-routines-full";
import pplData from "./ppl-routines-full";
import schoenfeldData from "./schoenfeld-routines-full";
import startingStrengthData from "./starting-strength-routines";
import tabataData from "./tabata-izumi";
import wendlerData from "./wendler531-routines";

type GoalType = 'loseFat' | 'maintainMuscle' | 'gainStrength' | 'buildMuscle';
type WorkoutType = 'strength' | 'interval' | 'standard';

interface MethodConfig<T = any> {
  name: string;
  type?: WorkoutType;
  goals: GoalType[];
  defaultGoal: GoalType;
  daysPerWeek: number[];
  defaultDays: string;
  description: string;
  data: T;
}

interface MethodsConfigType {
  [key: string]: MethodConfig;
}

const methodsConfig: MethodsConfigType = {
  helms: {
    name: "Eric Helms",
    goals: ["loseFat", "maintainMuscle", "gainStrength", "buildMuscle"],
    defaultGoal: "maintainMuscle",
    daysPerWeek: [3, 4, 5, 6],
    defaultDays: "4",
    description:
      "This training plan is based on principles from 'The Muscle and Strength Pyramid – Training' by Eric Helms. It can be adjusted to your experience and preferences.",
    data: helmsData.helms
  },
  hiit: {
    name: "HIIT (Laursen & Buchheit)",
    type: "interval",
    goals: ["loseFat"],
    defaultGoal: "loseFat",
    daysPerWeek: [3, 4],
    defaultDays: "3",
    description:
      "High-Intensity Interval Training based on 'Science and Application of High-Intensity Interval Training' by Laursen & Buchheit. Ideal for fat loss and cardiovascular fitness improvements.",
    data: hiitData.hiit
  },
  broSplit: {
    name: "Bro Split",
    goals: ["buildMuscle"],
    defaultGoal: "buildMuscle",
    daysPerWeek: [5, 6],
    defaultDays: "5",
    description:
      "Classic bodybuilding-style training with each session focused on a specific muscle group. Ideal for those looking to isolate and maximize muscle growth with higher volume.",
    data: broSplitData.broSplit
  },
  gvt: {
    name: "German Volume Training",
    goals: ["buildMuscle"],
    defaultGoal: "buildMuscle",
    daysPerWeek: [4],
    defaultDays: "4",
    description:
      "Known as the '10 sets of 10' system, GVT is a high-volume approach designed to break through plateaus and stimulate new muscle growth through volume overload.",
    data: gvtData.gvt
  },
  mapsAnabolic: {
    name: "MAPS Anabolic",
    goals: ["buildMuscle"],
    defaultGoal: "buildMuscle",
    daysPerWeek: [3, 4],
    defaultDays: "4",
    description:
      "MAPS Anabolic focuses on building muscle mass through strategic exercise selection and progressive overload, inspired by the MAPS fitness methodology.",
    data: mapsAnabolicData.mapsAnabolic
  },
  phul: {
    name: "PHUL (Power Hypertrophy Upper Lower)",
    goals: ["buildMuscle"],
    defaultGoal: "buildMuscle",
    daysPerWeek: [4],
    defaultDays: "4",
    description:
      "Power Hypertrophy Upper Lower (PHUL) combines strength and hypertrophy training, dividing workouts into upper and lower body sessions with both power and volume focus.",
    data: phulData.phul
  },
  ppl: {
    name: "Push Pull Legs",
    goals: ["buildMuscle", "loseFat", "gainStrength"],
    defaultGoal: "buildMuscle",
    daysPerWeek: [3, 4, 5, 6],
    defaultDays: "6",
    description:
      "A training split that organizes exercises by movement pattern: pushing (chest, shoulders, triceps), pulling (back, biceps), and legs. Efficient and flexible for different goals.",
    data: pplData.ppl
  },
  schoenfeld: {
    name: "Schoenfeld Method",
    goals: ["loseFat", "maintainMuscle", "gainStrength", "buildMuscle"],
    defaultGoal: "buildMuscle",
    daysPerWeek: [3, 4, 5, 6],
    defaultDays: "3",
    description:
      "Based on Dr. Brad Schoenfeld's research on muscle hypertrophy, this method uses evidence-based approaches to optimize training volume, frequency, and intensity.",
    data: schoenfeldData.schoenfeld
  },
  startingStrength: {
    name: "Starting Strength",
    type: "strength",
    goals: ["gainStrength", "buildMuscle"],
    defaultGoal: "gainStrength",
    daysPerWeek: [3],
    defaultDays: "3",
    description:
      "Mark Rippetoe's minimalist strength program focused on compound barbell movements and linear progression, ideal for beginners looking to build a foundation of strength.",
    data: startingStrengthData.startingStrength
  },
  tabata: {
    name: "Tabata Protocol",
    type: "interval",
    goals: ["loseFat"],
    defaultGoal: "loseFat",
    daysPerWeek: [3, 4],
    defaultDays: "3",
    description:
      "A high-intensity interval training protocol featuring 20 seconds of maximum effort followed by 10 seconds of rest, repeated 8 times. Efficient for cardiovascular improvements and fat loss.",
    data: tabataData.tabata
  },
  wendler531: {
    name: "Wendler 5/3/1",
    type: "strength",
    goals: ["gainStrength"],
    defaultGoal: "gainStrength",
    daysPerWeek: [3, 4],
    defaultDays: "4",
    description:
      "Jim Wendler's submaximal training approach focuses on gradual progression with main lifts following specific percentage-based cycles and supplemental work for assistance.",
    data: wendlerData.wendler531
  }
};

export default methodsConfig;