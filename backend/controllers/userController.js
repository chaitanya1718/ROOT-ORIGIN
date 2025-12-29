const User = require("../models/User");

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const addUserAddress = async (req, res) => {
    const user = await User.findById(req.user.id);
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // If new address is default, unset old defaults
    if (req.body.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
  
    user.addresses.push(req.body);
  
    await user.save();
  
    res.status(201).json(user.addresses);
  };
  const updateUserAddress = async (req, res) => {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });
  
    // handle default logic
    if (req.body.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }
  
    Object.assign(address, req.body);
  
    await user.save();
    res.json(user.addresses);
  };
  
  // DELETE ADDRESS
  const deleteUserAddress = async (req, res) => {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );
  
    await user.save();
    res.json(user.addresses);
  };

module.exports = { getUserProfile,  addUserAddress, updateUserAddress, deleteUserAddress };
