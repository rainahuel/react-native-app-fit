interface HiitExercise {
  name: string;
  work: string;
  rest: string;
  rounds: number;
}

interface HiitBlock {
  name: string;
  exercises: HiitExercise[];
}

interface HiitWorkoutDay {
  day: string;
  focus: string;
  blocks: HiitBlock[];
}

type ExperienceLevel = 'beginner' | 'intermediate';
type Goal = 'loseFat';

interface HiitGoalData {
  beginner?: { [days: number]: HiitWorkoutDay[] };
  intermediate?: { [days: number]: HiitWorkoutDay[] };
}

export interface HiitData {
  hiit: {
    loseFat: HiitGoalData;
  };
}
export interface HiitData {
  hiit: {
    [goal in Goal]: HiitGoalData;
  };
}
const hiitData: HiitData = {
  hiit: {
    loseFat: {
      beginner: {
        3: [
          {
            day: "Day 1",
            focus: "Lower Body HIIT",
            blocks: [
              {
                name: "Tabata Block",
                exercises: [
                  { name: "Jump Squats", work: "20 sec", rest: "10 sec", rounds: 8 },
                  { name: "Lunges", work: "20 sec", rest: "10 sec", rounds: 8 }
                ]
              }
            ]
          },
          {
            day: "Day 2",
            focus: "Rest or Light Walking",
            blocks: []
          },
          {
            day: "Day 3",
            focus: "Core & Conditioning",
            blocks: [
              {
                name: "Interval Block",
                exercises: [
                  { name: "Mountain Climbers", work: "30 sec", rest: "30 sec", rounds: 5 },
                  { name: "Plank to Push-up", work: "30 sec", rest: "30 sec", rounds: 5 }
                ]
              }
            ]
          }
        ],
        4: [
          {
            day: "Day 1",
            focus: "Upper Body & Cardio",
            blocks: [
              {
                name: "Power Block",
                exercises: [
                  { name: "Push-ups", work: "30 sec", rest: "15 sec", rounds: 6 },
                  { name: "Burpees", work: "30 sec", rest: "30 sec", rounds: 4 }
                ]
              }
            ]
          },
          {
            day: "Day 2",
            focus: "Active Recovery",
            blocks: []
          },
          {
            day: "Day 3",
            focus: "HIIT Total Body",
            blocks: [
              {
                name: "Mixed Block",
                exercises: [
                  { name: "High Knees", work: "20 sec", rest: "10 sec", rounds: 8 },
                  { name: "Jumping Jacks", work: "20 sec", rest: "10 sec", rounds: 8 }
                ]
              }
            ]
          },
          {
            day: "Day 4",
            focus: "Mobility or Stretching",
            blocks: []
          }
        ]
      },
      intermediate: {
        3: [
          {
            day: "Day 1",
            focus: "Advanced Cardio Blast",
            blocks: [
              {
                name: "HIIT Block A",
                exercises: [
                  { name: "Sprint Intervals", work: "40 sec", rest: "20 sec", rounds: 4 },
                  { name: "Skater Jumps", work: "30 sec", rest: "15 sec", rounds: 4 },
                  { name: "Lateral Bounds", work: "30 sec", rest: "15 sec", rounds: 4 }
                ]
              }
            ]
          },
          {
            day: "Day 2",
            focus: "Core Stability & HIIT",
            blocks: [
              {
                name: "HIIT Block B",
                exercises: [
                  { name: "Bicycle Crunches", work: "30 sec", rest: "15 sec", rounds: 3 },
                  { name: "Plank Jacks", work: "30 sec", rest: "15 sec", rounds: 3 },
                  { name: "Burpee to Tuck Jump", work: "20 sec", rest: "20 sec", rounds: 3 }
                ]
              }
            ]
          },
          {
            day: "Day 3",
            focus: "Full Body Power HIIT",
            blocks: [
              {
                name: "HIIT Block C",
                exercises: [
                  { name: "Jump Lunges", work: "30 sec", rest: "15 sec", rounds: 4 },
                  { name: "Push-up to Shoulder Tap", work: "30 sec", rest: "15 sec", rounds: 4 },
                  { name: "Squat to Press", work: "30 sec", rest: "20 sec", rounds: 4 }
                ]
              }
            ]
          }
        ]
      }
    }
  }
};

export default hiitData;
