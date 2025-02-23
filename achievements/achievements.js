// Get modal and its content elements
var modal = document.getElementById("myModal");
var modalText = document.getElementById("modalText");
var closeBtn = document.getElementsByClassName("close")[0];

// Get all the images
var badge = document.querySelectorAll(".badge");

// Add click event listeners to all images
badge.forEach(function(badge) {
    badge.addEventListener("click", function() {
        // Get the custom data from the image's data-text attribute
        // Set the text of the modal to the image's corresponding text
        modalText.textContent = badge.getAttribute("data-text");
        // Display the modal
        modal.style.display = "flex";
    });
});

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}