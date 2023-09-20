import Part from "./Part";

const Content = (props) => {
  let items = props.parts;
  return (
    <div>
      <Part part={items[0].name} exercises={items[0].exercises} />
      <Part part={items[1].name} exercises={items[1].exercises} />
      <Part part={items[2].name} exercises={items[2].exercises} />
    </div>
  );
};

export default Content;
