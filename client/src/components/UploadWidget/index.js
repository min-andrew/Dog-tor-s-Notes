import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { useQuery } from "@apollo/client";

import { QUERY_GET_ENV } from "../../utils/queries";
import { Container, Segment, Button, Form, Input } from "semantic-ui-react";

const UploadWidget = () => {
  const { loading, data } = useQuery(QUERY_GET_ENV);

  // image uploading
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    console.log(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Something went wrong");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
    } catch (err) {
      console.error(err);
    }
  };

  // Image posting
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <Container>
      <Segment basic textAlign={"center"}>
        <h1>Cloudinary Gallery</h1>
        <h3>Upload an Image</h3>
        <Form onSubmit={handleSubmitFile}>
          <Input
            transparent
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
          <Button type="submit" primary>
            Submit
          </Button>
        </Form>
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </Segment>
      <Segment textAlign={"center"}>
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              cloudName={data.environment.cloudinaryApiName}
              publicId={imageId}
              width="300"
              height="300"
              crop="scale"
            />
          ))}
      </Segment>
    </Container>
  );
};

export default UploadWidget;
