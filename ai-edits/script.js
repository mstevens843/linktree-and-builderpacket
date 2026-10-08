(() => {
  "use strict";

  const config = window.AI_EDIT_PAYMENTS || {};
  const stages = {
    deposit: {
      label: "LET’S GET STARTED",
      title: "Your deposit.",
      description: "The first half of your $50 edit. Pay after we’ve agreed on your scene and delivery date.",
      agreement: "Matt and I have confirmed my edit and delivery date.",
      note: "AI edit deposit",
      url: config.depositUrl,
      squareUrl: config.squareDepositUrl,
      step: "01 / 02"
    },
    final: {
      label: "THE FINISHING TOUCH",
      title: "Your final payment.",
      description: "The remaining $25. Pay after you’ve approved your watermarked preview to receive the finished video.",
      agreement: "I’ve approved my watermarked preview and already paid my deposit.",
      note: "AI edit final payment",
      url: config.finalUrl,
      squareUrl: config.squareFinalUrl,
      step: "02 / 02"
    }
  };

  const form = document.getElementById("payment-form");
  const tabs = [...document.querySelectorAll("[role=tab]")];
  const handle = document.getElementById("tiktok-handle");
  const agreement = document.getElementById("agreement");
  const payButton = document.getElementById("pay-button");
  const status = document.getElementById("form-status");
  const copyLabel = document.getElementById("copy-label");
  const deliveryFields = document.getElementById("delivery-fields");
  const deliveryEmail = document.getElementById("delivery-email");
  const deliveryMethods = [...form.querySelectorAll('[name="Delivery_method"]')];
  const paymentSent = document.getElementById("payment-sent");
  const sender = document.getElementById("cashapp-sender");
  const notifyButton = document.getElementById("notify-payment");
  const noticeStatus = document.getElementById("payment-notice-status");
  const providers = [...form.querySelectorAll('[name="Payment_provider"]')];
  let stage = "deposit";
  let provider = "cashapp";
  let copyReset;

  const source = new URL(location.href);
  source.hash = "";
  source.search = "";
  document.getElementById("payment-source-url").value = source.href;
  document.getElementById("payment-return-url").value = new URL("payment-thanks.html", source).href;

  function updateDeliveryMethod() {
    const dropbox = deliveryMethods.find(input => input.checked).value === "Dropbox link";
    document.getElementById("delivery-email-label").textContent = dropbox ? "Email for your Dropbox link" : "Google account email";
    deliveryEmail.placeholder = dropbox ? "you@example.com" : "you@gmail.com";
    document.getElementById("delivery-email-help").textContent = dropbox
      ? "I’ll email you a Dropbox download link. No Dropbox account or username needed."
      : "Use the email you sign in to Google Drive with. It doesn’t have to be a Gmail address.";
  }
  deliveryMethods.forEach(input => input.addEventListener("change", updateDeliveryMethod));
  deliveryEmail.addEventListener("blur", () => { deliveryEmail.value = deliveryEmail.value.trim(); });

  function cashAppRequest(value) {
    // Only seller-supplied, HTTPS Cash App profile or request links are accepted.
    if (typeof value !== "string" || !/^https:\/\/cash\.app\/(?:\$[A-Za-z0-9_]+|pay\/link\/[A-Za-z0-9_-]+)\/?$/.test(value)) return null;
    return value;
  }

  function squareRequest(value) {
    return typeof value === "string" && /^https:\/\/square\.link\/u\/[A-Za-z0-9]+\/?$/.test(value) ? value : null;
  }

  function paymentUrl() {
    return provider === "square" ? squareRequest(stages[stage].squareUrl) : cashAppRequest(stages[stage].url);
  }

  function updateProvider() {
    const square = provider === "square";
    form.querySelectorAll(".cashapp-only").forEach(section => {
      section.hidden = square;
      section.querySelectorAll("input, button").forEach(input => { input.disabled = square; });
    });
    deliveryFields.hidden = square || stage !== "final";
    deliveryFields.disabled = square || stage !== "final";
    document.getElementById("square-info").hidden = !square;
    document.getElementById("square-details").textContent = stage === "final"
      ? "At checkout, enter the name or username from your request, then Google Drive or Dropbox and your delivery email. I’ll send your finished video after confirming payment."
      : "Enter the name or username from your request at checkout. Square collects your contact details and sends your receipt.";
    document.getElementById("pay-button-label").textContent = square ? "Continue to Square · $25" : "Open Cash App · $25";
    payButton.classList.toggle("is-square", square);
    document.getElementById("cashapp-return-help").textContent = square
      ? "Complete payment on Square. No Cash App notice is needed. Available wallets depend on your device."
      : "Keep this page open. After paying in Cash App, come back and notify me below.";
    const configured = Boolean(paymentUrl() && (square || (typeof config.recipient === "string" && config.recipient.trim())));
    payButton.disabled = !configured;
    notifyButton.disabled = square || !configured;
    document.getElementById("payment-availability").hidden = configured;
    const recipient = document.getElementById("payment-recipient");
    recipient.hidden = !configured;
    recipient.textContent = configured ? (square ? "Paying Mathew Stevens through Square" : `Paying ${config.recipient.trim()}`) : "";
    status.textContent = "";
    noticeStatus.textContent = "";
    paymentSent.checked = false;
  }

  providers.forEach(input => input.addEventListener("change", () => {
    provider = input.value;
    agreement.checked = false;
    updateProvider();
  }));

  function username() {
    return handle.value.trim().replace(/^@/, "");
  }

  function note() {
    return `${stages[stage].note} · @${username() || "yourusername"}`;
  }

  function updateNote() {
    document.getElementById("payment-note").textContent = note();
    document.getElementById("payment-note-value").value = note();
    copyLabel.textContent = "Copy";
    status.textContent = "";
    clearTimeout(copyReset);
  }

  function setStage(next, updateLocation = false) {
    if (next !== "request" && !Object.hasOwn(stages, next)) return;
    tabs.forEach(tab => {
      const selected = tab.dataset.stage === next;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const requesting = next === "request";
    document.getElementById("payment-panel").hidden = requesting;
    document.getElementById("request-panel").hidden = !requesting;
    document.querySelector(".checkout").classList.toggle("is-request", requesting);
    if (updateLocation) history.replaceState(null, "", `#${next}`);
    if (requesting) {
      document.querySelector(".checkout-number").textContent = "THE BRIEF";
      const requestContact = document.getElementById("request-contact");
      const contactMethod = document.querySelector('[name="Reply_via"]:checked').value;
      if (contactMethod === "TikTok" && !requestContact.value && username()) requestContact.value = username();
      return;
    }
    stage = next;
    const current = stages[stage];
    document.getElementById("payment-panel").setAttribute("aria-labelledby", `${stage}-tab`);
    document.getElementById("stage-label").textContent = current.label;
    document.getElementById("checkout-title").textContent = current.title;
    document.getElementById("stage-description").textContent = current.description;
    document.getElementById("deposit-turnaround").hidden = stage !== "deposit";
    const final = stage === "final";
    document.getElementById("payment-email-subject").value = `[AI Edits] ${final ? "Final payment" : "Deposit"} reported — verify in Cash App`;
    document.getElementById("payment-stage-value").value = final ? "Final payment" : "Deposit";
    document.getElementById("payment-recipient-value").value = config.recipient || "";
    document.getElementById("payment-sent-label").textContent = `I completed my $25 ${final ? "final payment" : "deposit"} to ${config.recipient || "Matt"} in Cash App.`;
    paymentSent.checked = false;
    noticeStatus.textContent = "";
    document.getElementById("agreement-label").textContent = current.agreement;
    document.querySelector(".checkout-number").textContent = current.step;
    agreement.checked = false;
    updateNote();
    updateProvider();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setStage(tab.dataset.stage, true));
    tab.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      setStage(tabs[next].dataset.stage, true);
      tabs[next].focus();
    });
  });

  handle.addEventListener("input", updateNote);
  handle.addEventListener("blur", () => {
    handle.value = username();
    updateNote();
  });

  document.getElementById("copy-note").addEventListener("click", async () => {
    if (!handle.reportValidity()) return;
    if (!navigator.clipboard || !window.isSecureContext) {
      status.textContent = "Select and copy the payment note above, then paste it in Cash App.";
      return;
    }
    try {
      await navigator.clipboard.writeText(note());
      copyLabel.textContent = "Copied";
      status.textContent = "Payment note copied. Paste it into Cash App when you pay.";
      copyReset = setTimeout(() => { copyLabel.textContent = "Copy"; }, 3000);
    } catch {
      status.textContent = "Copy wasn’t available. Select the note above and copy it manually.";
    }
  });

  payButton.addEventListener("click", () => {
    const url = paymentUrl();
    if (payButton.disabled || !url) return;
    // The sender name and payment-sent checkbox are completed after paying.
    const beforePayment = provider === "square" ? [agreement] : stage === "final" ? [handle, deliveryEmail, agreement] : [handle, agreement];
    if (!beforePayment.every(input => input.reportValidity())) return;
    // Keep the form open while the customer completes payment separately.
    // Opening checkout never sends a form email or marks a payment as completed.
    window.open(url, "_blank", "noopener,noreferrer");
    status.replaceChildren(document.createTextNode(provider === "square" ? "Complete your payment on Square to receive your receipt. " : "After paying, return here and send the notice below. "));
    const fallback = document.createElement("a");
    fallback.href = url;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.textContent = provider === "square" ? "Square didn’t open? Open checkout here." : "Cash App didn’t open? Open it here.";
    status.append(fallback);
  });

  form.addEventListener("formdata", event => {
    const data = event.formData;
    data.set("username", `@${username()}`);
    data.set("Cash_App_sender", sender.value.trim());
    data.set("Payment_note", note());
    if (stage === "final") data.set("Delivery_email", deliveryEmail.value.trim());
  });

  form.addEventListener("submit", event => {
    sender.value = sender.value.trim();
    deliveryEmail.value = deliveryEmail.value.trim();
    if (provider !== "cashapp" || notifyButton.disabled || !cashAppRequest(stages[stage].url) || !form.reportValidity()) {
      event.preventDefault();
      return;
    }
    if (!/^https?:$/.test(location.protocol)) {
      event.preventDefault();
      noticeStatus.textContent = "Open this form from the website, or email your payment details to mathew@solpulse.trade.";
      return;
    }
    // This email is explicitly a customer-reported payment, never a verified receipt.
    notifyButton.disabled = true;
    noticeStatus.textContent = "Opening the submission service. Complete any confirmation on the next screen to send your notice.";
  });

  window.addEventListener("pageshow", () => {
    notifyButton.disabled = provider !== "cashapp" || payButton.disabled;
    noticeStatus.textContent = "";
  });

  function stageFromHash() {
    return location.hash === "#request" ? "request" : location.hash === "#final" ? "final" : "deposit";
  }
  window.addEventListener("hashchange", () => setStage(stageFromHash()));
  updateDeliveryMethod();
  setStage(stageFromHash());
})();
