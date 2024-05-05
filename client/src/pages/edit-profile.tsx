import { useParams } from "react-router-dom";

const editProfile = () => {
    const { id } = useParams();
  return (
    <div>
      Edit your profile - {id}
    </div>
  )
}

export default editProfile;
