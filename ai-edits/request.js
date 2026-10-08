(() => {
  "use strict";

  const form = document.getElementById("request-form");
  const photoError = document.getElementById("photo-error");
  const submitButton = document.getElementById("request-submit");
  const status = document.getElementById("request-status");
  const start = document.getElementById("request-start");
  const end = document.getElementById("request-end");
  const methods = [...form.querySelectorAll('[name="Photo_delivery"]')];
  const folderLink = document.getElementById("photo-folder-link");
  const folderConfirmation = document.getElementById("folder-confirmation");
  const MAX_BYTES = 10000000;
  const photos = { front: [], side: [], wardrobe: [] };
  const previews = { front: [], side: [], wardrobe: [] };
  const labels = { front: "Front-facing", side: "Side-profile", wardrobe: "Wardrobe" };
  const contact = document.getElementById("request-contact");
  const contactMethods = [...form.querySelectorAll('[name="Reply_via"]')];
  const contactValues = { TikTok: "", Instagram: "", Email: "" };
  let contactMethod = contactMethods.find(input => input.checked).value;

  function updateContactMethod() {
    const email = contactMethod === "Email";
    contact.type = email ? "email" : "text";
    contact.inputMode = email ? "email" : "text";
    contact.autocomplete = email ? "email" : "off";
    contact.maxLength = email ? 254 : contactMethod === "Instagram" ? 31 : 25;
    contact.placeholder = email ? "you@example.com" : "yourusername";
    if (email) contact.removeAttribute("pattern");
    else contact.pattern = contactMethod === "Instagram" ? "@?[A-Za-z0-9._]{1,30}" : "@?[A-Za-z0-9._]{1,24}";
    document.getElementById("request-contact-at").hidden = email;
    document.getElementById("request-contact-mail").toggleAttribute("hidden", !email);
    document.getElementById("request-contact-label").textContent = email ? "Email address" : `${contactMethod} username`;
    document.getElementById("request-contact-help").textContent = email
      ? "I’ll email your confirmation and next steps here."
      : `I’ll message you on ${contactMethod}. Make sure you can receive DMs.`;
  }

  contactMethods.forEach(input => input.addEventListener("change", () => {
    contactValues[contactMethod] = contact.value;
    contactMethod = input.value;
    contact.value = contactValues[contactMethod];
    updateContactMethod();
  }));
  contact.addEventListener("blur", () => {
    contact.value = contactMethod === "Email" ? contact.value.trim() : contact.value.trim().replace(/^@/, "");
  });
  updateContactMethod();

  const source = new URL(location.href);
  source.hash = "";
  source.search = "";
  document.getElementById("request-source-url").value = source.href;
  document.getElementById("request-return-url").value = new URL("thanks.html", source).href;

  function usingFolder() {
    return methods.find(input => input.checked).value === "Shared folder";
  }

  function photoStats() {
    const all = Object.values(photos).flat();
    return { count: all.length, size: all.reduce((total, file) => total + file.size, 0) };
  }

  function showPhotoError(message) {
    photoError.textContent = message;
    photoError.hidden = !message;
  }

  function updateTotals() {
    const { count, size } = photoStats();
    document.getElementById("photo-count").textContent = count ? `${count} photo${count === 1 ? "" : "s"} selected` : "No photos selected";
    document.getElementById("photo-size").textContent = `${(size / 1000000).toFixed(size ? 1 : 0)} / 10 MB`;
    document.querySelector(".upload-meter").classList.toggle("over-limit", size > MAX_BYTES);
    if (size > MAX_BYTES) showPhotoError("These photos exceed the 10 MB email limit. Remove some extras or choose “Share a folder” to send your full-quality originals.");
  }

  function renderPhotos(group) {
    previews[group].forEach(url => URL.revokeObjectURL(url));
    previews[group] = [];
    const list = document.getElementById(`${group}-file-list`);
    list.replaceChildren();
    photos[group].forEach((file, index) => {
      const row = document.createElement("div");
      row.className = "file-row";
      const thumb = document.createElement("div");
      thumb.className = "file-thumbnail";
      thumb.textContent = String(index + 1).padStart(2, "0");
      if (/\.(jpe?g|png|webp)$/i.test(file.name)) {
        const url = URL.createObjectURL(file);
        previews[group].push(url);
        const image = document.createElement("img");
        image.src = url;
        image.alt = "";
        image.loading = "lazy";
        image.addEventListener("error", () => image.remove(), { once: true });
        thumb.append(image);
      }
      const filename = document.createElement("span");
      filename.textContent = file.name;
      filename.title = file.name;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-photo";
      remove.textContent = "×";
      remove.setAttribute("aria-label", `Remove ${labels[group].toLowerCase()} photo ${file.name}`);
      remove.addEventListener("click", () => {
        photos[group].splice(index, 1);
        showPhotoError("");
        renderPhotos(group);
        updateTotals();
      });
      row.append(thumb, filename, remove);
      list.append(row);
    });
  }

  for (const group of Object.keys(photos)) {
    const input = document.getElementById(`${group}-photos`);
    input.addEventListener("change", () => {
      const rejected = [];
      for (const file of input.files) {
        if (!/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name) || !file.size) {
          rejected.push(file.name);
          continue;
        }
        const duplicate = photos[group].some(existing => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified);
        if (!duplicate) photos[group].push(file);
      }
      // The collection above allows adding photos in multiple picker visits.
      // formdata below attaches each file separately for the email provider.
      input.value = "";
      showPhotoError(rejected.length ? "Some files weren’t added. Choose non-empty JPG, PNG, WebP, HEIC, or HEIF photos." : "");
      renderPhotos(group);
      updateTotals();
    });
  }

  function setPhotoMethod() {
    const folder = usingFolder();
    document.getElementById("photo-upload-fields").hidden = folder;
    document.getElementById("photo-folder-fields").hidden = !folder;
    folderLink.disabled = !folder;
    folderLink.required = folder;
    folderConfirmation.disabled = !folder;
    folderConfirmation.required = folder;
    for (const group of Object.keys(photos)) document.getElementById(`${group}-photos`).disabled = folder;
    showPhotoError("");
    if (!folder) updateTotals();
  }

  methods.forEach(input => input.addEventListener("change", setPhotoMethod));
  document.getElementById("use-folder").addEventListener("click", () => {
    methods.find(input => input.value === "Shared folder").checked = true;
    setPhotoMethod();
    folderLink.focus();
  });

  function timestampSeconds(value) {
    if (!/^\d{1,3}:[0-5]\d(?::[0-5]\d)?(?:\.\d{1,3})?$/.test(value.trim())) return null;
    return value.trim().split(":").reduce((total, part) => total * 60 + Number(part), 0);
  }

  function validateTimestamps() {
    const from = timestampSeconds(start.value);
    const to = timestampSeconds(end.value);
    start.setCustomValidity(start.value && from === null ? "Enter a timestamp like 0:12 or 1:02:12." : "");
    end.setCustomValidity(end.value && to === null ? "Enter a timestamp like 0:21 or 1:02:21." : "");
    if (from !== null && to !== null && to <= from) end.setCustomValidity("The end timestamp must come after the start timestamp.");
  }

  [start, end].forEach(input => input.addEventListener("input", validateTimestamps));
  [document.getElementById("request-video"), folderLink].forEach(input => {
    input.addEventListener("blur", () => {
      const value = input.value.trim();
      input.value = value && !/^[a-z][a-z0-9+.-]*:/i.test(value) ? `https://${value}` : value;
    });
  });

  form.addEventListener("formdata", event => {
    const data = event.formData;
    const details = contact.value.trim();
    data.set("Contact_details", contactMethod === "Email" ? details : `@${details.replace(/^@/, "")}`);
    // Only actual email addresses become the provider's reply-to address.
    if (contactMethod === "Email") data.set("email", details);
    for (const group of Object.keys(photos)) data.delete(`${group}_photos`);
    if (usingFolder()) return;
    const summary = [];
    for (const [group, files] of Object.entries(photos)) {
      summary.push(`${labels[group]}: ${files.length} photo(s)`);
      files.forEach((file, index) => {
        const field = `attachment_${group}_${String(index + 1).padStart(2, "0")}`;
        data.append(field, file, `${group}_${String(index + 1).padStart(2, "0")}_${file.name}`);
      });
    }
    data.set("Photos_included", summary.join("; "));
  });

  form.addEventListener("submit", event => {
    validateTimestamps();
    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }
    if (!usingFolder()) {
      let error = "";
      if (photos.front.length < 2 || photos.side.length < 2) error = "Please add at least 2 front-facing photos and 2 side-profile photos, or share a folder containing them.";
      else if (photoStats().size > MAX_BYTES) error = "Your photos exceed 10 MB combined. Remove some extras or choose “Share a folder” to send your original photos.";
      if (error) {
        event.preventDefault();
        showPhotoError(error);
        photoError.scrollIntoView({ block: "center", behavior: "auto" });
        return;
      }
    }
    if (!/^https?:$/.test(location.protocol)) {
      event.preventDefault();
      status.textContent = "Please open this form from the website, or email mathew@solpulse.trade directly.";
      return;
    }
    showPhotoError("");
    submitButton.disabled = true;
    status.textContent = "Opening the submission service. Complete any confirmation on the next screen to send your request.";
    // Use native multipart POST so photos are delivered as email attachments.
    // No success state is shown until the provider completes its own flow.
  });

  window.addEventListener("pageshow", () => {
    submitButton.disabled = false;
    status.textContent = "";
  });
  setPhotoMethod();
})();
