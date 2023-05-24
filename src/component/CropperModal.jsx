import Modal from "react-bootstrap/Modal";
import "./imageCropper.css";
import { Form, Spinner } from "react-bootstrap";
import { useCallback, useState } from "react";
import getCroppedImg from "./cropperfunction";
import Cropper from "react-easy-crop";

function ImageCropper(props) {
  const { setFormValue, cropModal, setImageModal, range, setRange } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setloading] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const handleClose = () => {
    setFormValue({ profile_null: "" });
    setImageModal({ show: false });
  };

  const showCroppedImage = async () => {
    setloading(true);
    try {
      const croppedImage = await getCroppedImg(
        cropModal?.url,
        croppedAreaPixels,
        0
      );
      setFormValue({ profile_image: croppedImage });
      setloading(false);
      setImageModal({ show: false });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Modal show={cropModal?.show} onHide={handleClose}>
        <Modal.Body>
          <div className="col-md-12 text-center">
            <div id="image_demo" className="croppie-container">
              <div
                className="cr-boundary"
                style={{ width: "380px", height: "380px" }}
              >
                <div className="_innerCr_Bx">
                  {cropModal?.url && (
                    <Cropper
                      image={cropModal?.url}
                      crop={crop}
                      cropShape="round"
                      zoom={range}
                      aspect={4 / 4}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setRange}
                      onInitialized={(instance) => {
                        setFormValue({ instance });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Form.Range
            step={0.1}
            min={1}
            max={10}
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
          <div className="col-md-12 footer_buttons">
            <button className="btn btn-default " onClick={() => handleClose()}>
              CLOSE !
            </button>
            <button
              type="button"
              className="btn btn-success d-flex align-items-center"
              onClick={() => showCroppedImage()}
              disabled={loading}
            >
              <span className="px-3">Submit</span>
              {loading && <Spinner />}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageCropper;
