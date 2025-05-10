import helmsData from "./helms-routines-full";
import hiitData from "./hiit-laursen-buchheit";

const methodsConfig = {
    helms: {
      name: "Eric Helms",
      goals: ["loseFat", "maintainMuscle", "gainStrength", "buildMuscle"],
      defaultGoal: "maintainMuscle",
      daysPerWeek: [3, 4, 5, 6],
      defaultDays: "4",
      description:
        "This training plan is based on principles from 'The Muscle and Strength Pyramid – Training' by Eric Helms. It can be adjusted to your experience and preferences.",
      data: helmsData["helms"]
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
        data: hiitData["hiit"]
      },
  };

export default methodsConfig;