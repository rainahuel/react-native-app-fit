import helmsData from "./helms-routines-full";

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
    }
  };

export default methodsConfig;