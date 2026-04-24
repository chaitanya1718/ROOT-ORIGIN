import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddressForm from "../checkout/AddressForm";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadAddresses = async () => {
    const { data } = await api.get("/users/profile");
    setAddresses(data.addresses || []);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    await api.delete(`/users/address/${id}`);
    loadAddresses();
  };

  return (
    <div className="p-3">
      <h3 className="font-semibold mb-3">Saved Addresses</h3>

      {addresses.length === 0 && <p>No addresses found</p>}

      {addresses.map((addr) => (
        <div key={addr._id} className="border border-cyan-300 rounded-lg p-3 mb-3">
          {addr.isDefault && <span className="text-xs bg-cyan-300 px-2 rounded">DEFAULT</span>}

          <p className="font-medium">{addr.name}</p>
          <p>{addr.hno}, {addr.street}</p>
          <p>{addr.city} - {addr.pincode}</p>
          <p>Mobile: {addr.mobile}</p>

          <div className="flex gap-3 mt-2">
            <button
              className="text-cyan-600"
              onClick={() => {
                setEditingAddress(addr);
                setShowForm(true);
              }}
            >
              Edit
            </button>

            <button className="text-red-500" onClick={() => deleteAddress(addr._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        className="bg-cyan-200 p-2 rounded mt-2"
        onClick={() => {
          setEditingAddress(null);
          setShowForm(true);
        }}
      >
        Add New Address
      </button>

      {showForm && (
        <AddressForm
          initialData={editingAddress}
          onSuccess={() => {
            setShowForm(false);
            setEditingAddress(null);
            loadAddresses();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      )}
    </div>
  );
};

export default Address;
