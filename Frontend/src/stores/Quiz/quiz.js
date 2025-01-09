import { defineStore } from "pinia";
export const useIndexStore = defineStore("indexStore", {
  state: () => {
    return {
      quizzes: [],
    };
  },
  actions: {
    async getQuizzes() {
      const res = await fetch("api/quizzes");
      const data = await res.json();
      //   console.log(data);
      return data;
    },
    // Function to handle delete action
    async deleteQuiz(quizzes, quizId) {
      const confirmation = await this.showConfirmationPopup();
      if (confirmation) {
        const res = await fetch(`api/quizzes/${quizId}`, {
          method: "delete",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        window.location.reload(); // Reload the page after the alert
      }
    },
    showConfirmationPopup() {
      return new Promise((resolve) => {
        // Create a confirmation overlay
        const confirmOverlay = document.createElement("div");
        confirmOverlay.className =
          "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";

        const confirmDialog = document.createElement("div");
        confirmDialog.className =
          "bg-white rounded-md shadow-md p-6 w-96 text-center";

        const confirmMessage = document.createElement("p");
        confirmMessage.textContent =
          "Are you sure you want to delete this quiz?";
        confirmMessage.className = "text-gray-800 text-lg mb-4";

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex justify-around mt-4";

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Yes";
        confirmButton.className =
          "bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none";

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "No";
        cancelButton.className =
          "bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none";

        // Append elements
        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);
        confirmDialog.appendChild(confirmMessage);
        confirmDialog.appendChild(buttonContainer);
        confirmOverlay.appendChild(confirmDialog);
        document.body.appendChild(confirmOverlay);

        // Event Listeners
        confirmButton.addEventListener("click", () => {
          document.body.removeChild(confirmOverlay); // Remove the dialog
          resolve(true); // Return true when "Yes" is clicked
        });

        cancelButton.addEventListener("click", () => {
          document.body.removeChild(confirmOverlay); // Remove the dialog
          resolve(false); // Return false when "No" is clicked
        });
      });
    },
    goToRoute(routeName, quizId) {
      this.router.push({ name: routeName, params: { id: quizId } });
    },
  },
});
