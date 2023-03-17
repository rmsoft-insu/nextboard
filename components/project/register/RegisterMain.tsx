import { useForm } from "react-hook-form";
import CompanyArray from "./company/CompanyArray";
import ProjectInfo from "./projectInfo/ProjectInfo";
import ProjectManager from "./manager/ProjectManager";

const postSubmit = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `http://192.168.0.22:8087/v1/api/admin/project`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: data,
    }
  );
  const json = await response.json();
  return json;
};

const RegisterMain = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      projectName: null,
      projectManager: null,
      projectContents: null,
      projectStatus: null,
      projectType: null,
      startDate: null,
      endDate: null,
      company: [{ compName: null }],
    },
  });

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("projectContents", data.projectContents);
    formData.append("projectType", data.projectType);
    formData.append("projectStatus", data.projectStatus);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("projectManager", JSON.stringify(data.projectManager));
    data.company.forEach((item) =>
      formData.append("fileList", item.stampImg[0])
    );
    data.company.forEach((item) => delete item.stampImg);
    formData.append("company", JSON.stringify(data.company));
    await postSubmit(formData).then((res) => console.log(res));
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div>프로젝트 등록</div>
      <ProjectInfo
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        setValue={setValue}
        setError={setError}
      />

      <CompanyArray
        register={register}
        control={control}
        errors={errors}
        setValue={setValue}
      />

      <ProjectManager
        setProjectAdmin={setValue}
        error={errors.projectManager}
      />

      <button style={{ padding: "20px" }}>등록하기</button>
    </form>
  );
};

export default RegisterMain;
