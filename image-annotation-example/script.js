const imageInput = document.getElementById('imageInput');
const uploadedImage = document.getElementById('uploadedImage');
const annotationContainer = document.getElementById('annotationContainer');
const annotationButtons = document.querySelectorAll('.annotation-button');
const saveButton = document.getElementById('saveButton');

let selectedButton = null;

// Function to handle image upload
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        uploadedImage.src = event.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Function to handle button selection
annotationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        selectedButton = button;
    });
});

// Function to handle button drag and drop
annotationContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

function createButton(e){
    console.log("Inside create button")
    const { offsetX,offsetY,clientX, clientY } = e;
    const button = document.createElement('button');
    button.id="sign-field-1"
    button.innerText = "Sign Here";
    button.draggable = true;
    button.style.position = 'absolute';
    button.style.left = offsetX + 'px';
    button.style.top = offsetY + 'px';
    button.ondragover = (e) => {
        e.preventDefault();
    };
    button.onclick  = (event) => {
        event.preventDefault();
        alert("Signature Dialog")
    }
    console.log("left: " + clientX+"px");
    console.log("top: " + clientY+"px");

    annotationContainer.appendChild(button);
    selectedButton = null;
}

function recreateButton(e) {
    console.log("Recreating button");
    let el = document.getElementById('sign-field-1');
    el.remove();
    createButton(e);
}

annotationContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    if (selectedButton) {
        createButton(e);
        
    } else{
        recreateButton(e);
    }
});

// Function to save the annotated image
saveButton.addEventListener('click', () => {
    html2canvas(uploadedImage).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'annotated_image.png';
        link.click();
    });
});
