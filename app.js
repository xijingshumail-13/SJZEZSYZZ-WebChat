import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBFbCfpfKyOVfEKKYT3lJkXNQ6KaVdHuB8",
  authDomain: "sjzezsyzz-webchat.firebaseapp.com",
  projectId: "sjzezsyzz-webchat",
  storageBucket: "sjzezsyzz-webchat.firebasestorage.app",
  messagingSenderId: "667685035159",
  appId: "1:667685035159:web:abd009aaea1b03610bddd2",
  measurementId: "G-0WYZYW78ZW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const chatDiv = document.getElementById("chat");

window.sendMessage = async function () {

  const input =
    document.getElementById("messageInput");

  if (!input.value.trim()) return;

  await addDoc(
    collection(db, "messages"),
    {
      text: input.value,
      time: Date.now()
    }
  );

  input.value = "";
};

const q =
  query(
    collection(db, "messages"),
    orderBy("time")
  );

onSnapshot(q, (snapshot) => {

  chatDiv.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    const div =
      document.createElement("div");

    div.className = "message";

    div.textContent = data.text;

    chatDiv.appendChild(div);
  });

});
