async function getTroubleshooting(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  if (
    text.includes("internet") ||
    text.includes("wifi") ||
    text.includes("network") ||
    text.includes("vpn") ||
    text.includes("connection")
  ) {
    return {
      category: "Network",
      priority: "High",
      suggestions: [
        "Check internet connectivity",
        "Restart your router or modem",
        "Reconnect to the VPN or network",
        "Verify network credentials",
      ],
    };
  }


  if (
    text.includes("software") ||
    text.includes("application") ||
    text.includes("app") ||
    text.includes("crash") ||
    text.includes("error")
  ) {
    return {
      category: "Software",
      priority: "Medium",
      suggestions: [
        "Restart the application",
        "Clear application cache",
        "Update the software",
        "Reinstall if the issue persists",
      ],
    };
  }

  if (
    text.includes("printer") ||
    text.includes("keyboard") ||
    text.includes("mouse") ||
    text.includes("monitor") ||
    text.includes("hardware")
  ) {
    return {
      category: "Hardware",
      priority: "Medium",
      suggestions: [
        "Check physical connections",
        "Restart the device",
        "Verify power supply",
        "Update hardware drivers",
      ],
    };
  }

  if (
    text.includes("password") ||
    text.includes("login") ||
    text.includes("account") ||
    text.includes("authentication")
  ) {
    return {
      category: "Account",
      priority: "High",
      suggestions: [
        "Reset your password",
        "Verify account credentials",
        "Check account lock status",
        "Contact administrator if required",
      ],
    };
  }


  return {
    category: "Other",
    priority: "Low",
    suggestions: [
      "Restart the system",
      "Check system logs",
      "Verify recent changes",
      "Contact IT support if the issue continues",
    ],
  };
}

module.exports = {
  getTroubleshooting,
};