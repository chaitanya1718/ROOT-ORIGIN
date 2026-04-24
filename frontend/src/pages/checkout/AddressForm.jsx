import { useState } from "react";
import api from "../../api/axios";
import "../../components/css/header.css";

const AddressForm = ({ initialData, onSuccess, onCancel }) => {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      mobile: "",
      hno: "",
      street: "",
      city: "",
      pincode: "",
      isDefault: false,
    }
  );
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (initialData) {
      await api.put(`/users/address/${initialData._id}`, form);
    } else {
      await api.post("/users/address", form);
      showToast("address added");
    }

    onSuccess();
  };

  return (
    <form className="border p-3 mt-3" onSubmit={submitHandler}>
      {toast && <div className="cart-toast">{toast}</div>}

      <h4 className="font-semibold mb-2">
        {initialData ? "Edit Address" : "Add Address"}
      </h4>

      <input className="border!" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input className="border!" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <input className="border!" name="hno" placeholder="House No" value={form.hno} onChange={handleChange} required />
      <input className="border!" name="street" placeholder="Street" value={form.street} onChange={handleChange} required />
      <input className="border!" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
      <input className="border!" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />

      <label className="flex h-8 w-20 gap-2 mt-2">
        <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange} />
        Make default
      </label>

      <div className="flex gap-3 mt-3">
        <button className="bg-green-300 px-3 py-1 rounded" type="submit">
          Save
        </button>
        <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
