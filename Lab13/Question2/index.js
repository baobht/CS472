import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/" || url === "/home") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my website");
  } else if (url === "/image" && method === "GET") {
    const imagePath = "public/image.png";
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading image");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  } else if (url === "/pdf" && method === "GET") {
    const pdfPath = "public/document.pdf";
    fs.readFile(pdfPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading PDF");
      } else {
        res.writeHead(200, { "Content-Type": "application/pdf" });
        res.end(data);
      }
    });
  } else if (url === "/about" && method === "GET") {
    const aboutPath = "public/about.txt";
    fs.readFile(aboutPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading about file");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3001, () =>
  console.log("Server running on http://localhost:3001")
);
