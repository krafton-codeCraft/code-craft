export function renderCode(data) {
    // Check if the data is valid
    if (typeof data !== 'object' || data === null) {
      console.error('Invalid data: ', data);
      return;
    }
  
    // Set each HTML element's text content
    if (data.robotId != null) {
      robotIdElement.textContent = data.robotId;
    } else {
      robotIdElement.textContent = 'No robot ID';
    }
    nameElement.textContent = data.name;
    usernameElement.textContent = data.username;
    codeElement.textContent = data.code;
  
    console.log("hi");
  
  }