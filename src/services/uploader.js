import axios from "axios";

export const submitForm = async (formData) => {
  const form = new FormData();

  form.append(
    "profile_image",
    formData.profile_image,
    `${formData.name || "profile"}.png`
  );
  form.append("name", formData.name);
  form.append("designation", formData.designation);
  form.append("region_or_branch", formData.region_or_branch);

  let headers = {
    "Content-Type": "multipart/form-data",
  };
  return axios
    .post("https://getai.life/image", form, {
      headers,
    })
    .then((resp) => {
      return resp?.data;
      // downloadImage()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
