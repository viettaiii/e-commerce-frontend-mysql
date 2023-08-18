import httpRequest from "../../api/httpRequest";

export const handleFiles = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("multiple", file));
    const { data } = await httpRequest.post("/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data.map((file) => file.filename);
  } catch (error) {
    console.log(error);
  }
};
