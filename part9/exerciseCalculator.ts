import { parseManyNumberArguments } from "./utils";

type Rating = 1 | 2 | 3;

interface ExerciseBreakdown {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

const determineRating = (actual: number, target: number): Rating => {
  const proportionOfGoal: number = actual / target;

  if (proportionOfGoal < 0.7) {
    return 1;
  } else if (proportionOfGoal < 1) {
    return 2;
  } else {
    return 3;
  }
};

const determineRatingDescription = (rating: Rating): string => {
  switch (rating) {
    case 1:
      return "keep trying and do not give up";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "you're doing amazing!";
    default:
      return "your rating cannot be understood by the system";
  }
};

const computeAverage = (numArr: number[]): number => {
  return numArr.reduce((acc, curr) => acc + curr, 0) / numArr.length;
};

const calculateExercises = (
  dailyAmount: number[],
  targetAmount: number
): ExerciseBreakdown => {
  const averageAmount = computeAverage(dailyAmount);
  const rating = determineRating(averageAmount, targetAmount);
  return {
    periodLength: dailyAmount.length,
    trainingDays: dailyAmount.reduce(
      (prev, curr) => prev + (curr > 0 ? 1 : 0),
      0
    ),
    success: averageAmount >= targetAmount,
    rating: rating,
    ratingDescription: determineRatingDescription(rating),
    target: targetAmount,
    average: averageAmount,
  };
};

try {
  const { target, exercises } = parseManyNumberArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
