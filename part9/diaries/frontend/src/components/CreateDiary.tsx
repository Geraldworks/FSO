import { useState } from "react";
import { Weather, Visibility, DiaryFormState } from "../types";

const CreateDiary = ({
  errorMessage,
  handleSubmit,
}: {
  errorMessage: string;
  handleSubmit: CallableFunction;
}) => {
  const [newDiary, setNewDiary] = useState<DiaryFormState>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });
  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage !== "" ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : null}
      <form onSubmit={handleSubmit(newDiary)}>
        <div>
          date{" "}
          <input
            type="date"
            onChange={(event) =>
              setNewDiary({ ...newDiary, date: event.target.value })
            }
          />
        </div>
        <div>
          visibility{" "}
          {Object.values(Visibility).map((v, index) => (
            <span key={index}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={newDiary.visibility === v}
                onChange={(event) =>
                  setNewDiary({ ...newDiary, visibility: event.target.value })
                }
              />
              {v}
            </span>
          ))}
        </div>
        <div>
          weather{" "}
          {Object.values(Weather).map((w, index) => (
            <span key={index}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={newDiary.weather === w}
                onChange={(event) =>
                  setNewDiary({ ...newDiary, weather: event.target.value })
                }
              />
              {w}
            </span>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            type="text"
            onChange={(event) =>
              setNewDiary({ ...newDiary, comment: event.target.value })
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default CreateDiary;
