import api from "../api/axios";

export const downloadInvoice = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/invoice`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    alert("Failed to download invoice");
  }
};
