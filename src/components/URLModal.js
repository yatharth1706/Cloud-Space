import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function URLModal(props) {
  const [copyText, setCopyText] = useState("Copy Link");

  const handleChangeText = () => {
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy Link");
    }, 1000);
  };
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex space-between">
          <Form.Control type="text" value={props.url} disabled />
          <span
            style={{ color: "blue", whiteSpace: "nowrap", marginTop: "6px", marginLeft: "6px" }}
            className="cursor-pointer"
            onClick={handleChangeText}
          >
            {copyText}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ background: "#1F6EF7", color: "white", border: "none", width: "100px" }}
          variant="secondary"
          onClick={props.handleClose}
        >
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default URLModal;
