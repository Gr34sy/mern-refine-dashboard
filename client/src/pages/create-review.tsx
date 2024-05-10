import { useParams } from "react-router-dom";
import { useOne } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";
import ReviewForm from "../components/common/ReviewForm";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const createReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const { data, isLoading, isError } = useOne({
    resource: "properties",
    id: id as string,
  });

  const property = data?.data ?? [];

  const onFinishHandler = async (data: FieldValues) => {

  }

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

    return (
      // @ts-ignore
      <ReviewForm propertyName={property.name} goBackFunction={() => navigate(`/properties/show/${id}`)}/>
  );
};

export default createReview;
