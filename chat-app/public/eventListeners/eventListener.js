const loginDialog = document.querySelector("#loginDialog");
const messageDialog = document.querySelector("#messageDialog");
const membershipDialog = document.querySelector("#membershipDialog");
const loginBtnNodeList = document.querySelectorAll(".loginBtn");
const createMessageBtnNodeList = document.querySelectorAll(".createMessageBtn");
const membershipBtnNodeList = document.querySelectorAll(
  ".membershipBtnListener"
);

addEventListenerToNodeList(loginBtnNodeList, loginDialog);
addEventListenerToNodeList(createMessageBtnNodeList, messageDialog);
addEventListenerToNodeList(membershipBtnNodeList, membershipDialog);

function addEventListenerToNodeList(nodeList, dialog) {
  if (dialog && nodeList.length > 0) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].addEventListener("click", () => openModal(dialog));
      dialog.addEventListener("click", (e) => closeModal(e, dialog));
    }
  }
}

function openModal(dialog) {
  dialog.showModal();
}

function closeModal(e, dialog) {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
}
