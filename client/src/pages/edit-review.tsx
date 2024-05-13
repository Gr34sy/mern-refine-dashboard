import { useParams } from "react-router-dom";
import { useOne } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";
import ReviewForm from "../components/common/ReviewForm";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const editReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({refineCoreProps: {  
    resource: "reviews", 
    id: id,
    action: 'edit', 
    },  
   });

  const { data, isLoading, isError } = useOne({
    resource: "properties",
    id: id as string,
  });

  const property = data?.data ?? [];

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data, 
    })
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

  return (
    <ReviewForm
    // @ts-ignore
      propertyName={property.title}
      onFinishHandler={onFinishHandler}
      handleSubmit={handleSubmit}
      register={register}
      type="Edit"
      formLoading={formLoading}
      goBackFunction={() => navigate(`/properties/show/${id}`)}
    />
  );
};

export default editReview;
