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


  const myProfile = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

  return (
    <Profile
      type="Agent"
      // @ts-ignore
      img={myProfile.image}
      // @ts-ignore
      name={myProfile.name}
      // @ts-ignore
      email={myProfile.email}
      // @ts-ignore
      phone={myProfile.phone || "not set"}
      // @ts-ignore
      location={myProfile.location || "not set"}
      // @ts-ignore
      avatar={myProfile.avatar}
      // @ts-ignore
      properties={myProfile.allProperties}
    />
  );
};

export default agentProfile;
