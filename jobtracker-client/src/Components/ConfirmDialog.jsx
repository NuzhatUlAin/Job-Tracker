import React from "react";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            justifyContent: "center", alignItems: "center"
        }}>
            <div style={{ background: "white", padding: "20px", borderRadius: "5px" }}>
                <h3>{title}</h3>
                <p>{message}</p>
                <button onClick={onConfirm} style={{ marginRight: "10px" }}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
}
