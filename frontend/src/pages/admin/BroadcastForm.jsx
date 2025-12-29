
import React from 'react'
import { useState } from 'react';

function BroadcastForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const sendEmail = async () => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("image", image);

    await fetch("/api/admin/broadcast", {
      method: "POST",
      body: formData
    });

    alert("Emails sent");
  };

  return (
    <div>
      <input placeholder="Subject" onChange={e => setSubject(e.target.value)} />
      <textarea placeholder="Message" onChange={e => setMessage(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={sendEmail}>Send</button>
    </div>
  );
}


export default BroadcastForm
