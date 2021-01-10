let enabledButton = document.getElementById('button-form');

enabledButton.addEventListener('click', deactivate);

function deactivate(e){
    e.preventDefault();
    return alert(`I'm sorry about this inconvenience but the form isn't available right now since I don't have any server yet. Meanwhile, I invite you to send me a message directly in my email address which you'll find in the footer. Thank you very much for your patience.`);
} 