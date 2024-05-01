import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "../components/common/Form";

const CreateProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState({
    name: "",
    url: "",
  });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const onFinishHandler = () => {};
  const handleImageChange = () => {};

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      propertyImage={propertyImage}
      onFinishHandler={onFinishHandler}
      handleImageChange={handleImageChange}
    ></Form>
  );
};

export default CreateProperty;
