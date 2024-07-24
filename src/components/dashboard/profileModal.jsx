import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

const ProfileModal = () => {
    const { user } = useContext(UserContext);
    const assetUrl = process.env.REACT_APP_ASSET_URL;

    return (
        <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="profileModalLabel">Profile</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="p-3 profile">
                            <img src={`${assetUrl}/admin.webp`} className="img-fluid w-75" alt="admim guys" style={{ borderRadius: '1000px', border: '0.5px solid #d9d9d9' }} />
                            <div className="form-group p-2 my-2">
                                <div className="input-group py-2">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    <input type="text" className="form-control" placeholder={user?.username} />
                                </div>
                                <div className="input-group py-2">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    <input type="text" className="form-control" placeholder={user?.role} />
                                </div>
                                <div className="input-group py-2">
                                    <span className="input-group-text"><i className="fas fa-at"></i></span>
                                    <input type="text" className="form-control" placeholder={user?.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
