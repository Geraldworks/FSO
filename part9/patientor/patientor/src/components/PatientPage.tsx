import { useParams } from "react-router";
import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface Props {
  patients: Patient[];
}

const decideIcon = (gender: string) => {
  if (gender === "male") {
    return <MaleIcon />;
  } else if (gender === "female") {
    return <FemaleIcon />;
  } else {
    return <TransgenderIcon />;
  }
};

const PatientPage = ({ patients }: Props) => {
  const id = useParams().id;

  const patient = patients.find((p) => p.id === id);
  
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name} {decideIcon(patient.gender)}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
