"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "empty" | "opened" | "blocked";

type ContactFormProps = {
  /** Prefills mailto subject; default is general inquiry. */
  intent?: "general" | "install";
};

export default function ContactForm({ intent = "general" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const subject =
    intent === "install"
      ? "Plasmoid X install inquiry"
      : "PlasmoidX inquiry";

  const placeholder =
    intent === "install"
      ? "Kit you own or plan to buy, vehicle/equipment, location (US), and what help you need."
      : "What are you studying or hoping to explore?";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedNote = note.trim();

    if (!trimmedName && !trimmedNote) {
      setStatus("empty");
      return;
    }

    const body = [
      trimmedName ? `Name: ${trimmedName}` : "",
      intent === "install" ? "Intent: install / commissioning inquiry" : "",
      trimmedNote ? `Note:\n${trimmedNote}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const url = `mailto:contact@plasmoidx.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = url;
      setStatus("opened");
    } catch {
      setStatus("blocked");
    }
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-mist-200">
          Name <span className="text-mist-400">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (status === "empty") setStatus("idle");
          }}
          placeholder="Your name"
          className="field-input"
          aria-invalid={status === "empty" ? true : undefined}
        />
      </div>
      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm text-mist-200">
          Note <span className="text-mist-400">(optional, but helpful)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            if (status === "empty") setStatus("idle");
          }}
          placeholder={placeholder}
          className="field-input resize-y"
          aria-invalid={status === "empty" ? true : undefined}
          aria-describedby="note-hint"
        />
        <p id="note-hint" className="mt-1.5 text-xs leading-relaxed text-mist-400">
          This site is static — submit opens your mail app with the fields
          filled in. Nothing is sent to a server from here.
        </p>
      </div>

      {status === "empty" ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/5 px-3 py-2 text-sm text-mist-100"
        >
          Add a name or a short note so the message isn’t empty.
        </p>
      ) : null}

      {status === "opened" ? (
        <p
          role="status"
          className="rounded-lg border border-aurora/35 bg-aurora/5 px-3 py-2 text-sm text-mist-100"
        >
          Mail app should open next. If nothing happened, email{" "}
          <a href="mailto:contact@plasmoidx.com" className="link-aurora">
            contact@plasmoidx.com
          </a>{" "}
          directly.
        </p>
      ) : null}

      {status === "blocked" ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/5 px-3 py-2 text-sm text-mist-100"
        >
          Couldn’t open a mail app. Copy{" "}
          <a href="mailto:contact@plasmoidx.com" className="link-aurora">
            contact@plasmoidx.com
          </a>{" "}
          and send from your usual client.
        </p>
      ) : null}

      <button type="submit" className="btn-ghost w-full sm:w-auto">
        Open mail client
      </button>
    </form>
  );
}
