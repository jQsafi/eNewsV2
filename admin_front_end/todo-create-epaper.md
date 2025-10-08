# Todo List for "Create Epaper" Route

1.  **Refactor Step Components:**
    *   [x] Extract the JSX for each step into its own component file within the `src/components/createEpaper/steps/` directory.

2.  **Global Drag and Drop for Upload:**
    *   [ ] Implement a global drop zone that covers the entire page.
    *   [ ] When files are dropped, automatically navigate to the "Upload" step (step 2).
    *   [ ] The "Upload" step should handle the files dropped from anywhere.

3.  **Simplify Upload Step:**
    *   [ ] Remove the distinction between "Main Pages" and "Additional Pages" in the `UploadStep` component. There should be only one upload area.

4.  **Improve State Management:**
    *   [ ] Consider using `useReducer` for more complex state logic, or a state management library if the application is expected to grow. For now, we can keep `useState` but be mindful of its complexity.
    *   [ ] The form state is not saved when the user navigates away or refreshes the page. Implement saving the form data to `localStorage` to persist it across sessions. This will prevent users from losing their work.

5.  **Enhance the Upload Step:**
    *   [ ] Allow users to rename the uploaded files.
    *   [ ] The UI for displaying uploaded files could be improved. A drag-and-drop reordering of files is implemented, which is good.

6.  **Dynamic Checklist:**
    *   [ ] The checklist items in the `Checklist` component are hardcoded.
    *   [ ] The checklist items should be configurable, perhaps fetched from a backend or a configuration file, depending on the publication type.

7.  **Backend Integration:**
    *   [ ] The `handleSubmit` function only logs the data to the console.
    *   [ ] Implement the actual API call to the backend to save the epaper data. This will involve using `fetch` or a library like `axios` to send a POST request to the backend API.
    *   [ ] The "Save Draft" button currently does nothing. Implement functionality to save the form data as a draft, which would likely involve a different API endpoint.

8.  **UI/UX Improvements:**
    *   [ ] The date picker is functional but could be visually improved.
    *   [ ] Add validation to the form fields and provide clear error messages. For example, ensure that the publication date is not in the past.
    *   [ ] Provide feedback to the user during and after form submission (e.g., loading spinners, success/error messages).