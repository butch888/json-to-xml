// DOM
document.addEventListener('DOMContentLoaded', () => {
  const jsonInput = document.getElementById('json');
  const xmlOutput = document.getElementById('xml');
  const convertBtn = document.getElementById('convertBtn');
  const clearBtn = document.getElementById('clearBtn');

  convertBtn.addEventListener('click', () => {
    if (jsonInput.value !== '') {
      try {
        const json = JSON.parse(jsonInput.value);
        xmlOutput.style.color = 'green';
        xmlOutput.value = jsonToXml(json);
      } catch (error) {
        xmlOutput.value = 'Invalid JSON format!';
        xmlOutput.style.color = 'red';
      }
    }
  });

  clearBtn.addEventListener('click', () => {
    jsonInput.value = '';
    xmlOutput.value = '';
    xmlOutput.style.color = '';
  });

  jsonToXml(json);
});

// Function JSON to XML
function jsonToXml(json, rootElement = 'root') {
  function convert(obj, indent = '') {
    let xml = '';
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      let value = obj[key];
      if (typeof value === 'object' && value !== null) {
        xml +=
          `${indent}<${key}>` +
          '\n' +
          convert(value, indent + '  ') +
          `${indent}</${key}>` +
          '\n';
      } else {
        xml += `${indent}<${key}>${value}</${key}>` + '\n';
      }
    }
    return xml;
  }
  let xmlString =
    `<?xml version="1.0" encoding="UTF-8" ?>\n<${rootElement}>\n` +
    convert(json, '  ') +
    `</${rootElement}>`;
  return xmlString;
}
