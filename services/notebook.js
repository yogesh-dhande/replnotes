import marked from "marked";
import * as axios from "axios";
import { firebase } from "@firebase/app";
import "@firebase/firestore";

export function parseNbJson(nbJson) {
  nbJson.cells.forEach(cell => {
    // parseMagicCommands
    parseMagicMethods(cell);

    if (cell.cell_type == "markdown") {
      parseAttachments(cell);
    }
    cell.source = cell.source.filter(parseMagicTags);
  });
  return nbJson;
}

export async function getNbJsonFromUrl(url) {
  let res = await axios.get(url);
  let content = res.data;
  return parseNbJson(content);
}

export async function getNbJsonFromFile(file) {
  let text = await readFile(file);
  let content = JSON.parse(text);
  return parseNbJson(content);
}

export function downloadNotebook(url, callback) {
  return getNbJsonFromUrl(url, callback);
}

export async function downloadFileFromUrl(url) {
  let res = await axios({
    url: url,
    method: "GET",
    responseType: "blob" // important
  });

  return res.data;
}

export function getReadableDate(timeStamp) {
  if (timeStamp && timeStamp.seconds) {
    timeStamp = new firebase.firestore.Timestamp(
      timeStamp.seconds,
      timeStamp.nanoseconds
    );
    let date = timeStamp.toDate();
    let year = date.getFullYear();
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.getDate();
    return `${month} ${day}, ${year}`;
  }
  return null;
}

export function readFile(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}

export function parseMagicTags(line) {
  let commands = line.split(":");
  let key = commands[0]
    .trim()
    .replace(" ", "")
    .toLowerCase();
  if (key.includes("#title")) {
    return false;
  } else if (key.includes("#url")) {
    return false;
  } else if (key.includes("#description")) {
    return false;
  } else if (key.includes("#tags")) {
    return false;
  }
  return true;
}

export function getImageSrcFromBase64String(base64String, type) {
  return `data:${type};base64,${base64String}`;
}

export function parseAttachments(cell) {
  if (cell.attachments) {
    Object.keys(cell.attachments).forEach(attachmentName => {
      cell.source.forEach((source, i) => {
        cell.source[i] = source.replace(
          `attachment:${attachmentName}`,
          `${getImageSrcFromBase64String(
            Object.values(cell.attachments[attachmentName])[0]
          )}`
        );
      });
    });
  }
}

export function parseThumbnailsFromNbJson(nbJson) {
  let thumbnails = [];
  let cells = nbJson.cells;

  for (let i = cells.length - 1; i >= 0; i--) {
    let cell = cells[i];
    let outputs = cell.outputs;
    if (outputs) {
      for (let j = outputs.length - 1; j >= 0; j--) {
        let output = outputs[j];
        if (output.data) {
          Object.keys(output.data).forEach(key => {
            if (key.includes("image/")) {
              let imageString = output.data[key];

              if (!key.includes("svg+xml")) {
                thumbnails.push(getImageSrcFromBase64String(imageString, key));
              }
            }
          });
        }
      }
    }
    // find image src from markdown cells

    if (cell.cell_type == "markdown") {
      parseAttachments(cell);
      cell.source.forEach(source => {
        let html = document.createElement("div");
        html.innerHTML = marked(source);
        let images = html.getElementsByTagName("img");
        if (images.length > 0) {
          images.forEach(image => thumbnails.push(image.src));
        }
      });
    }
  }

  return thumbnails;
}

export function parseMagicMethods(cell) {
  cell.source.forEach(line => {
    let commands = line.split(":");
    let key = commands[0].trim().toLowerCase();

    if (key.includes("#hide-input")) {
      cell.source = [];
    }
    if (key.includes("#hide-output")) {
      cell.source = cell.source.slice(1);
      cell.outputs = [];
    }
    if (key.includes("#hide-cell")) {
      cell.source = [];
      cell.outputs = [];
    }

    // let value = commands.length > 1 ? commands[1].trim() : "";
    // if (key.includes("#collapse-input-show")) {
    //   console.log(key, value);
    // }
    // if (key.includes("#collapse-input-hide")) {
    //   console.log(key, value);
    // }
    // if (key.includes("#collapse-output-show")) {
    //   console.log(key, value);
    // }
    // if (key.includes("#collapse-output-hide")) {
    //   console.log(key, value);
    // }
  });
}
