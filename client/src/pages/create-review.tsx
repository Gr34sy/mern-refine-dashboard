
import { useParams } from "react-router-dom";

const createReview = () => {
  const { id } = useParams();

  return <div>Create review for {id}</div>;
};

export default createReview;
