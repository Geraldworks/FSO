interface Measurements {
  height: number;
  weight: number;
}

interface ExerciseInputs {
  target: number;
  exercises: number[];
}

export const parseBmiArguments = (args: string[]): Measurements => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const isNotNumber = (stringNum: string): boolean => {
  return isNaN(Number(stringNum));
};

export const parseManyNumberArguments = (args: string[]): ExerciseInputs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const anyNotNumber: boolean = args
    .slice(2)
    .some((stringNum) => isNotNumber(stringNum));
  if (anyNotNumber) {
    throw new Error("Some input numbers are not numbers");
  }
  const numberArray = args.slice(2).map((stringNum) => Number(stringNum));

  return { target: numberArray[0], exercises: numberArray.slice(1) };
};

export const parseBmiQueryParams = (
  weight: string,
  height: string
): Measurements => {
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    throw new Error("malformatted parameters");
  } else {
    return { weight: Number(weight), height: Number(height) };
  }
};
