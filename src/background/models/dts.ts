export const functionsForInjector:any = {
    example: ():any => {
        (():any => {
            // Create the modal element
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.backgroundColor = 'white';
            modal.style.padding = '20px';
            modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            modal.style.zIndex = '1000';

            // Add content to the modal
            const content = document.createTextNode('Hello from injected');
            modal.appendChild(content);

            // Append the modal to the body
            document.body.appendChild(modal);

            // Optional: Handle closing the modal
            modal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        })();
    }
};
