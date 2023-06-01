import React, { useState } from "react";
import CropperModal from "../../component/CropperModal";
import { submitForm } from "../../services/uploader";
import DownloadModal from "../../component/DownloadModal";
import { Spinner } from "react-bootstrap";
const initialValue = { name: "", designation: "", region_or_branch: "" };
function Home() {
  const [cropModal, setImageModal] = useState({ show: false, url: "" });
  const [downModal, setDownloadModal] = useState({ show: false, url: "" });
  const [range, setRange] = useState();
  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setErrors] = useState();
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImageModal({ show: true, url: reader.result });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formValue.name ||
      !formValue.designation ||
      !formValue.region_or_branch ||
      !formValue.profile_image
    ) {
      setErrors("Please fill in all required fields");
      return;
    }
    // Check if designation exceeds 20 characters
    if (formValue.designation.length > 20) {
      setErrors("Designation should not exceed 20 characters");
      return;
    }
    setDownloadModal({ show: true, url: "" });
    setloading(true);
    const res = await submitForm(formValue);
    if (res?.success) {
      setDownloadModal({ show: true, url: res?.results?.image_url });
    }
    setloading(false);
    setErrors("");
  };
  const property = formValue?.profile_null === "" ? { value: "" } : "";
  return (
    <section className="multistep_form " id="introduction">
      <div id="msform">
        <div className="progressbar_div vaccination_banner">
          <div className="mx-width_div">
            <p className="logo_vaccine">
              <img src="asset/image/logo.png" alt="logo" height={"150px"} />
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-10">
              <div className="form_outer">
                <fieldset id="step1" className="step">
                  <form id="form_vac" onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="border-1">
                          <img
                            className="profile-pic "
                            src="asset/image/banner_img.jpg"
                            alt="no-img"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12 d-flex justify-content-center">
                        <div className="form-control w-full max-w-sm profile_form">
                          <div className="frmCtl_head">
                            <label className="label">
                              <span className="label-text font-bold capitalize">
                                Profile Image
                                <span className="text-red-500"> *</span>
                              </span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="file-input file-input-bordered file-input-primary w-full max-w-sm"
                              {...property}
                              name="profile"
                              onChange={(e) => {
                                setFormValue((s) => ({
                                  ...s,
                                  [e.target.name]: e.target.files[0],
                                  profile_null: undefined,
                                }));
                                handleChange(e);
                              }}
                            />
                          </div>
                          <div className="frmCtl_head">
                            <label className="label">
                              <span className="label-text font-bold capitalize">
                                name<span className="text-red-500"> *</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Your Name"
                              autoComplete="off"
                              className="input input-bordered w-full max-w-sm"
                              name="name"
                              value={formValue?.name}
                              onChange={(e) =>
                                setFormValue((s) => ({
                                  ...s,
                                  [e.target.name]: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="frmCtl_head">
                            <label className="label">
                              <span className="label-text font-bold capitalize">
                                designation
                                <span className="text-red-500"> *</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Your designation"
                              autoComplete="off"
                              className="input input-bordered w-full max-w-sm"
                              name="designation"
                              value={formValue?.designation}
                              onChange={(e) =>
                                setFormValue((s) => ({
                                  ...s,
                                  [e.target.name]: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="frmCtl_head">
                            <label className="label">
                              <span className="label-text font-bold capitalize">
                                region / branch / organisation
                                <span className="text-red-500"> *</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder="Your region / branch / organisation"
                              className="input input-bordered w-full max-w-sm"
                              name="region_or_branch"
                              value={formValue?.region_or_branch}
                              onChange={(e) =>
                                setFormValue((s) => ({
                                  ...s,
                                  [e.target.name]: e.target.value,
                                }))
                              }
                            />
                          </div>
                          {formError && (
                            <div className="d-flex text-danger mt-2">
                              <p className="mb-0">{formError}</p>
                            </div>
                          )}
                          <button
                            type="submit"
                            className="mt-7 space-x-2 btn btn-primary text-white text-base d-flex align-items-center justify-content-center"
                            // onClick={() => {
                            //   handleSubmit();
                            // }}
                            disabled={loading}
                          >
                            {/**/}
                            <span className="px-3">Submit</span>
                            {/* {loading && <Spinner />} */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
              </div>
              {cropModal?.show && (
                <CropperModal
                  setFormValue={(obj) =>
                    setFormValue((s) => ({ ...s, ...obj }))
                  }
                  cropModal={cropModal}
                  setImageModal={(obj) =>
                    setImageModal((s) => ({ ...s, ...obj }))
                  }
                  range={range}
                  setRange={(e) => setRange(e)}
                />
              )}
              {downModal?.show && (
                <DownloadModal
                  setFormValue={(obj) =>
                    setFormValue((s) => ({ ...s, ...obj }))
                  }
                  downModal={downModal}
                  onCancel={(obj) => {
                    setDownloadModal((s) => ({ ...s, ...obj }));
                    setFormValue({
                      ...initialValue,
                      profile_null: "",
                      profile_image: "",
                      profile: "",
                    });
                  }}
                  fileName={formValue?.name}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
