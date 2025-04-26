import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../services/ExampleService/ExampleService";
import { Link } from "react-router-dom";
import { Avatar, Skeleton } from "antd";
const UserDetail = () => {
  const { id } = useParams();
  const number_id = parseInt(id || "999");
  const { data, isLoading, isFetching } = useGetSingleUserQuery({
    id: number_id,
  });

  return (
    <div>
      {isLoading || isFetching ? (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          {/* Skeleton Loading */}
          <div
            className="w-[350px] h-[290px] z-10 relative flex flex-col p-8 text-center rounded-xl pt-20"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <Skeleton.Avatar
              active
              size={100}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3"
            />
            <Skeleton active />
          </div>
          <div className="flex justify-center">
            <Skeleton.Button className="w-[160px] h-[40px]" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          {/* User Details */}
          <div
            className="w-[350px] h-[290px] z-10 relative flex flex-col p-8 text-center rounded-xl pt-20"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3">
              <Avatar
                src={data?.data?.data?.avatar}
                shape="circle"
                size={100}
              />
              <div className="absolute bottom-0 left-2/3 bg-blue-200 border-4 border-white rounded-full w-8 aspect-square text-white">
                #{data?.data?.data?.id}
              </div>
            </div>
            <div className="text-4xl py-4 text-[#004E65]">
              {data?.data?.data?.first_name} {data?.data?.data?.last_name}
            </div>
            <div>Email: {data?.data?.data?.email}</div>
            <div className="text-sm mt-10">
              <div className="bg-gray-300 p-[1px]"></div>
              <div>Tired of writing endless social media content?</div>
              <div>Let Content Caddy generate it for you</div>
            </div>
          </div>
          <Link
            to="/api-user-list"
            className="bg-blue-200 text-[#004E65] p-2 w-fit rounded-lg"
          >
            Go To List User Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
