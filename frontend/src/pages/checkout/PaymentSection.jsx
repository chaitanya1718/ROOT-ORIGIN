import { QRCodeCanvas } from "qrcode.react";

const PaymentSection = ({ total, onConfirm }) => {
  const upiLink = `upi://pay?pa=demo@upi&pn=DemoStore&am=${total}&cu=INR&tn=OrderPayment`;

  return (
    <div style={{ marginTop: "1rem" }}>
      <p className="font-semibold">Scan to Pay via UPI</p>

      {/* QR CODE */}
      <div style={{ margin: "10px 0" }}>
        <QRCodeCanvas value={upiLink} size={180} />
      </div>

      <p className="text-xs text-gray-600">
        Demo QR – payment will not be verified
      </p>

      <a href={upiLink}>
        <button className="bg-purple-600 text-white p-2 rounded mt-2">
          Open UPI App
        </button>
      </a>

      <br />

      <button
        onClick={onConfirm}
        className="bg-green-500 text-white p-2 rounded mt-3"
      >
        I have completed payment
      </button>
    </div>
  );
};

export default PaymentSection;
