export const showToast = (setToasts, message, type) => {
  const id = Date.now();
  setToasts((prev) => [...prev, { id, message, type }]);

  setTimeout(() => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, 3000);
};
