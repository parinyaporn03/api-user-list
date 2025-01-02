import { Button, Form, Input, Modal, Table } from "antd";
import "./App.css";
import {
  useGetDataUserQuery,
  useDeleteUserMutation,
  usePostCreateUserMutation,
} from "./services/ExampleService/ExampleService";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface DataType {
  key: number;
  name: string;
  id: number;
  email: string;
  image: string;
}

function App() {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [id_user, setIdUser] = useState<number | undefined>();
  const [deleteUser, result_delete] = useDeleteUserMutation();
  const [createUser, result_create] = usePostCreateUserMutation();
  const [pagination_number, setPaginationNumber] = useState<{
    page: number;
    per_page: number;
  }>({
    page: 1,
    per_page: 4,
  });

  // -------query
  const {
    data: list_user, //การตั้งชื่อให้data
    isLoading,
    isFetching,
    refetch,
  } = useGetDataUserQuery(pagination_number);

  // --------Table Ant Design
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "image",
      width: 100,
      render: (image: string) => (
        <div className="flex justify-center items-center">
          <img
            src={image}
            alt="User Avatar"
            className="w-[60px] h-[60px] rounded-full"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 250,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record: { id: number }) => (
        <div key={record.id} className="flex gap-4 ">
          {/* ปุ่ม Detail */}
          <Link
            to={`user-detail/${record.id}`}
            className="bg-[#BBE1EC] text-[#004E65] p-2 rounded-lg flex-1 text-center"
          >
            Detail
          </Link>
          {/* ปุ่ม Delete */}
          <button
            className="bg-[#F8CACA] text-[#78191B] p-2 rounded-lg w-fit flex-1 "
            onClick={() => {
              setIsModalOpenDelete(true);
              setIdUser(record.id);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const dataSource =
    list_user?.data?.data.map((user) => ({
      key: user.id,
      name: user.first_name + " " + user.last_name,
      id: user.id,
      email: user.email,
      image: user.avatar,
    })) || [];

  //  Delete
  const fnDeleteUser = async () => {
    try {
      const result = await deleteUser({
        id: id_user || 99999,
      }).unwrap();

      if (result.code === 204) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpenDelete(false);
      setIdUser(undefined);
    }
  };

  // Create
  const fnCreateUser = async (name: string, job: string) => {
    try {
      const result = await createUser({
        name: name,
        job: job,
      }).unwrap();

      if (result.code === 201) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpenCreate(false);
    }
  };

  // --------
  if (isLoading || isFetching) {
    //isLoading ทำแค่ครั้งเดียว ดังนั้นต้องเอาisFetchingกับrefetchมาช่วยเวลาrefetch
    return <div className="text-xl">Loading...</div>;
  }
  // -------- modal
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCancelCreate = () => {
    setIsModalOpenCreate(false);
  };

  const onFinish = (values: { name: string; job: string }) => {
    fnCreateUser(values.name, values.job);
    console.log(values);
  };

  return (
    <div className="p-10">
      <div className="w-full flex justify-between items-center">
        <div className="text-[#004E65] font-bold text-2xl">List User</div>
        <button
          className="bg-[#F8CACA] text-[#78191B]  p-2 rounded-lg"
          onClick={() => setIsModalOpenCreate(true)}
        >
          Create User +
        </button>
      </div>
      <Table
        columns={columns}
        size="middle"
        dataSource={dataSource}
        pagination={false}
      />

      {/* -------------pagination-------- */}
      <div className="flex gap-3 justify-end">
        <div>
          <div>Page</div>
          <Input
            type="number"
            className="w-[80px]"
            defaultValue={pagination_number.page}
            onChange={(e) => {
              const number = parseInt(e.target.value);
              setPaginationNumber({
                page: number,
                per_page: pagination_number.per_page,
              });
            }}
          />
        </div>
        <div>
          <div>Per Page</div>
          <Input
            type="number"
            className="w-[80px]"
            defaultValue={pagination_number.per_page}
            onChange={(e) => {
              const number = parseInt(e.target.value);
              setPaginationNumber({
                page: pagination_number.page,
                per_page: number,
              });
            }}
          />
        </div>
      </div>

      {/* ------Modal Delete-------- */}
      <Modal
        open={isModalOpenDelete}
        okText="Delete"
        className="text-center"
        closeIcon={false}
        footer={() => (
          <div className="flex gap-4">
            <button
              className="flex-1 bg-gray-300  rounded-lg"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              className="bg-red-400 flex-1  rounded-lg p-2"
              onClick={fnDeleteUser}
            >
              Delete
            </button>
          </div>
        )}
      >
        <ExclamationCircleFilled className="text-red-400 text-4xl text-center" />
        <div className="text-2xl">Delete User</div>
        <p>Are you sure you want to delete user {id_user} </p>
      </Modal>

      {/* ------Modal Create-------- */}
      <Modal
        title="Create User +"
        open={isModalOpenCreate}
        closeIcon={false}
        footer={null}
        okText="OK"
      >
        <Form
          layout={"vertical"}
          name="wrap"
          labelAlign="left"
          labelWrap
          onFinish={onFinish}
        >
          <Form.Item
            label="Name :"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="formInput" />
          </Form.Item>

          <Form.Item
            label="Job :"
            name="job"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="formInput" />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-4 mt-8">
              <Button
                htmlType="submit"
                className="createbtn flex-1 bg-[#BBE1EC] text-[#004E65] py-5"
                loading={result_create.isLoading} //ถ้ามีการfetchข้อมูลในปุ่มจะทำการหมุน
              >
                OK
              </Button>
              <Button
                onClick={handleCancelCreate}
                className="cancelbtn flex-1 bg-[#F0F0F0] text-[#808285] py-5"
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
