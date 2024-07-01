import { NonSensitiveDiaryEntry } from "../types";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  const { date, weather, visibility } = diary;
  return (
    <div>
      <h3>{date}</h3>
      <p>visibility: {visibility}</p>
      <p>weather: {weather}</p>
    </div>
  );
};

const Diaries = ({ diaryList }: { diaryList: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryList.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default Diaries;
