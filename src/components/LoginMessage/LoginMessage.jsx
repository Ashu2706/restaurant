import React, { useState } from 'react';
const LoginMessage = () => {
    return (
        <div className="modal fade" id="loginMsgModal" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Please Sign In</h5>
                        <button type="button" className="btn-close" id="close-loginMsg-modal" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>
                    <div className="modal-body">
                        <p>You need to sign in to access this page.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginMessage