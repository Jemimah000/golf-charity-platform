import React from "react";

const SubscriptionStatus = ({ isSubscribed }) => {
  return (
    <div className="p-4 border border-slate-700 rounded-xl">
      <h3 className="font-bold">Subscription</h3>
      <p>{isSubscribed ? "Active ✅" : "Not Active ❌"}</p>
    </div>
  );
};

export default SubscriptionStatus;