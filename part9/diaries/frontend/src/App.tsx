import axios from "axios";
import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry, DiaryFormState} from "./types";
import { createDiary, getAllDiaries } from "./diaryService";
import Diaries from "./components/Diaries";
import CreateDiary from "./components/CreateDiary";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit =
    (newDiary: DiaryFormState) => (event: React.SyntheticEvent) => {
      event.preventDefault();
      createDiary(newDiary)
        .then((data) => {
          setDiaries(diaries.concat(data));
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.response!.data);
            setTimeout(() => setErrorMessage(""), 5000);
          } else {
            console.error(error);
          }
        });
    };

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <CreateDiary errorMessage={errorMessage} handleSubmit={handleSubmit} />
      <Diaries diaryList={diaries} />
    </div>
  );
}

export default App;
