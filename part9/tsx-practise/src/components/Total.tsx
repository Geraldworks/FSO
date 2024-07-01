interface totalProps {
  totalExercises: number;
}

const Total = (props: totalProps): JSX.Element => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

export default Total;
