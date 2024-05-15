import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { Profile } from "../components";
import LoadingScreen from "../components/common/LoadingScreen";

const agentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });


  const agentProfile = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

  return (
    <Profile
      type="Agent"
      // @ts-ignore
      img={agentProfile.image}
      // @ts-ignore
      name={agentProfile.name}
      // @ts-ignore
      email={agentProfile.email}
      // @ts-ignore
      phone={agentProfile.phone || "not set"}
      // @ts-ignore
      location={agentProfile.location || "not set"}
      // @ts-ignore
      avatar={agentProfile.avatar}
      // @ts-ignore
      properties={agentProfile.allProperties}
      // @ts-ignore
      reviews={agentProfile.allReviews}
    />
  );
};

export default agentProfile;
