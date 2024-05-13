import { useParams } from "react-router-dom"

const EditReview = () => {

  const { id } = useParams();

  return (
    <div>
      Edit review with {id}
    </div>
  )
}

export default EditReview
