import Modal from "react-bootstrap/Modal";
import "./imageCropper.css";
import { downloadProfileImage } from "./cropperfunction";
import { Spinner } from "react-bootstrap";
import { useState } from "react";

function DownloadModal(props) {
  const { downModal, onCancel, fileName } = props;
  const [downloading, setDownloading] = useState(false);
  const [imageloading, setImageloading] = useState(true);

  const handleClose = () => onCancel({ show: false, url: "" });
  const downloadImage = async () => {
    await setDownloading(true);
    downloadProfileImage(downModal?.url, fileName, () => setDownloading(false));
  };

  const loadingMessage = (h = "300px") => (
    <div
      className="d-flex justify-content-center align-items-end h-100"
      style={{ minHeight: h }}
    >
      <h4 className="mx-2">Please Wait Image Is Loading ...</h4>
      <Spinner />
    </div>
  );

  return (
    <>
      <Modal show={downModal?.show} onHide={handleClose} size="md">
        <Modal.Body>
          <div className="col-md-12 text-center">
            <div id="image_demo" className="croppie-container">
              <div className="cr-boundary">
                <div className="_innerCr_Bx" style={{ minHeight: "300px" }}>
                  {downModal?.url ? (
                    <>
                      <img
                        src={downModal?.url}
                        alt="img"
                        width="100%"
                        onLoad={() => setImageloading(false)}
                      />
                      {imageloading && loadingMessage(0)}
                    </>
                  ) : (
                    loadingMessage()
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 footer_buttons">
            <button className="btn btn-default " onClick={() => handleClose()}>
              CLOSE !
            </button>
            <button
              type="button"
              className="btn btn-success d-flex align-items-center"
              onClick={() => downloadImage()}
              disabled={downloading}
            >
              <span className="px-3">DOWNLOAD IMAGE</span>
              {downloading && <Spinner />}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DownloadModal;
