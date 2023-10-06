const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Part = ({ partName, numExercises }) => {
  return (
    <p>
      {partName} {numExercises}
    </p>
  );
};

const Content = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(({ id, name, exercises }) => (
        <Part key={id} partName={name} numExercises={exercises} />
      ))}
      <h4>
        total of {courseParts.reduce((a, b) => a + b.exercises, 0)} exercises
      </h4>
    </div>
  );
};

const Course = ({ courseName, courseParts }) => {
  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(({ name, id, parts }) => (
        <Course key={id} courseName={name} courseParts={parts} />
      ))}
    </div>
  );
};

export default Courses;
