import fs from "fs";

export const getHome = (req, res) => {
  res.send("Welcome to my website");
};

export const getImage = (req, res) => {
  const imagePath = "public/image.png";
  fs.readFile(imagePath, (err, data) => {
    console.log(err);
    if (err) return res.status(500).send("Error loading image");
    res.contentType("image/jpeg").send(data);
  });
};

export const getPDF = (req, res) => {
  const pdfPath = "public/document.pdf";
  fs.readFile(pdfPath, (err, data) => {
    if (err) return res.status(500).send("Error loading PDF");
    res.contentType("application/pdf").send(data);
  });
};

export const getAbout = (req, res) => {
  const aboutPath = "public/about.txt";
  fs.readFile(aboutPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error loading about file");
    res.type("text").send(data);
  });
};
