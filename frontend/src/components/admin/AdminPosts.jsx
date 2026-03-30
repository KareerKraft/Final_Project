import React, { useMemo, useState } from "react";
import { ImagePlus, LayoutGrid, MapPinned, Megaphone, Plus, Table2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const announcementOptions = [
  {
    id: "shortlisted",
    title: "Shortlisted Students",
    description: "Announce shortlisted students with details, links, and supporting files.",
    icon: Megaphone,
  },
  {
    id: "venue",
    title: "Exam Venue Details",
    description: "Share exam venues and upload multiple PDFs or images for students.",
    icon: MapPinned,
  },
  {
    id: "custom",
    title: "Custom Announcement",
    description: "Build a flexible announcement with text, detail rows, tables, and photos.",
    icon: LayoutGrid,
  },
];

const createLinkItem = () => ({
  id: crypto.randomUUID(),
  label: "",
  url: "",
});

const createTextBlock = () => ({
  id: crypto.randomUUID(),
  type: "text",
  title: "",
  body: "",
});

const createPairBlock = () => ({
  id: crypto.randomUUID(),
  type: "pair",
  label: "",
  value: "",
});

const createTableBlock = (rows = 2, cols = 2) => ({
  id: crypto.randomUUID(),
  type: "table",
  rows,
  cols,
  cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")),
});

const createImageBlock = () => ({
  id: crypto.randomUUID(),
  type: "image",
  caption: "",
  files: [],
});

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 ${className}`}
    {...props}
  />
);

const FileList = ({ files, emptyLabel }) => {
  if (!files.length) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file, index) => (
        <span
          key={`${file.name}-${index}`}
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
        >
          {file.name}
        </span>
      ))}
    </div>
  );
};

const AttachmentManager = ({ title, description, files, links, onFilesChange, onLinkChange, onAddLink, onRemoveLink }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>

    <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-3">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-green-500 hover:bg-green-50">
          <Upload className="mb-3 h-6 w-6 text-green-600" />
          <span className="text-sm font-semibold text-slate-800">Upload PDFs or images</span>
          <span className="mt-1 text-xs text-slate-500">You can add zero, one, or many files here.</span>
          <input
            type="file"
            accept=".pdf,image/*"
            multiple
            className="hidden"
            onChange={(event) => onFilesChange(Array.from(event.target.files || []))}
          />
        </label>
        <FileList files={files} emptyLabel="No files added yet." />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">Links</p>
          <Button type="button" variant="outline" size="sm" onClick={onAddLink}>
            <Plus className="h-4 w-4" />
            Add Link
          </Button>
        </div>

        {links.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
            No links added yet.
          </p>
        ) : null}

        <div className="space-y-3">
          {links.map((link, index) => (
            <div key={link.id} className="rounded-2xl border border-slate-200 p-3">
              <div className="grid gap-3 md:grid-cols-[0.9fr,1.1fr,auto]">
                <Input
                  value={link.label}
                  onChange={(event) => onLinkChange(link.id, "label", event.target.value)}
                  placeholder={`Link ${index + 1} label`}
                />
                <Input
                  value={link.url}
                  onChange={(event) => onLinkChange(link.id, "url", event.target.value)}
                  placeholder="https://example.com"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => onRemoveLink(link.id)}>
                  <Trash2 className="h-4 w-4 text-slate-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CustomBlockEditor = ({ block, onUpdate, onRemove }) => {
  if (block.type === "text") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold text-slate-900">Text Block</h4>
          <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(block.id)}>
            <Trash2 className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
        <div className="space-y-3">
          <Input
            value={block.title}
            onChange={(event) => onUpdate(block.id, { title: event.target.value })}
            placeholder="Section title"
          />
          <Textarea
            value={block.body}
            onChange={(event) => onUpdate(block.id, { body: event.target.value })}
            placeholder="Write the announcement text here"
          />
        </div>
      </div>
    );
  }

  if (block.type === "pair") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold text-slate-900">Title + Answer Row</h4>
          <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(block.id)}>
            <Trash2 className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            value={block.label}
            onChange={(event) => onUpdate(block.id, { label: event.target.value })}
            placeholder="Title or field name"
          />
          <Input
            value={block.value}
            onChange={(event) => onUpdate(block.id, { value: event.target.value })}
            placeholder="Answer or value"
          />
        </div>
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold text-slate-900">Editable Table</h4>
          <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(block.id)}>
            <Trash2 className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600">
          <span>Rows: {block.rows}</span>
          <span>Columns: {block.cols}</span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full border-collapse">
            <tbody>
              {block.cells.map((row, rowIndex) => (
                <tr key={`${block.id}-row-${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <td key={`${block.id}-cell-${rowIndex}-${colIndex}`} className="border border-slate-200 p-1">
                      <input
                        value={cell}
                        onChange={(event) => {
                          const nextCells = block.cells.map((currentRow) => [...currentRow]);
                          nextCells[rowIndex][colIndex] = event.target.value;
                          onUpdate(block.id, { cells: nextCells });
                        }}
                        placeholder={`R${rowIndex + 1} C${colIndex + 1}`}
                        className="w-full min-w-[120px] rounded-md border border-transparent px-2 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-semibold text-slate-900">Image Block</h4>
        <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(block.id)}>
          <Trash2 className="h-4 w-4 text-slate-500" />
        </Button>
      </div>
      <div className="space-y-3">
        <Input
          value={block.caption}
          onChange={(event) => onUpdate(block.id, { caption: event.target.value })}
          placeholder="Image caption"
        />
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-green-500 hover:bg-green-50">
          <ImagePlus className="mb-2 h-5 w-5 text-green-600" />
          <span className="text-sm font-semibold text-slate-800">Add photos for this block</span>
          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            className="hidden"
            onChange={(event) => onUpdate(block.id, { files: Array.from(event.target.files || []) })}
          />
        </label>
        <FileList files={block.files} emptyLabel="No image or file added to this block." />
      </div>
    </div>
  );
};

const AdminPosts = () => {
  const [selectedType, setSelectedType] = useState("shortlisted");
  const [shortlistedDraft, setShortlistedDraft] = useState({
    title: "",
    description: "",
    files: [],
    links: [createLinkItem()],
  });
  const [venueDraft, setVenueDraft] = useState({
    title: "",
    description: "",
    files: [],
    links: [createLinkItem()],
  });
  const [customDraft, setCustomDraft] = useState({
    title: "",
    summary: "",
    blocks: [],
    files: [],
    links: [],
  });

  const currentDraft = useMemo(() => {
    if (selectedType === "shortlisted") return shortlistedDraft;
    if (selectedType === "venue") return venueDraft;
    return customDraft;
  }, [selectedType, shortlistedDraft, venueDraft, customDraft]);

  const updateLinks = (setter) => ({
    add: () => setter((prev) => ({ ...prev, links: [...prev.links, createLinkItem()] })),
    change: (id, field, value) =>
      setter((prev) => ({
        ...prev,
        links: prev.links.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
      })),
    remove: (id) =>
      setter((prev) => ({ ...prev, links: prev.links.filter((link) => link.id !== id) })),
  });

  const shortlistedLinks = updateLinks(setShortlistedDraft);
  const venueLinks = updateLinks(setVenueDraft);
  const customLinks = updateLinks(setCustomDraft);

  const addCustomTable = () => {
    const rowsInput = window.prompt("Enter number of rows", "2");
    const colsInput = window.prompt("Enter number of columns", "2");
    const rows = Number(rowsInput);
    const cols = Number(colsInput);

    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
      toast.error("Please enter valid row and column counts.");
      return;
    }

    setCustomDraft((prev) => ({
      ...prev,
      blocks: [...prev.blocks, createTableBlock(rows, cols)],
    }));
  };

  const updateCustomBlock = (id, patch) => {
    setCustomDraft((prev) => ({
      ...prev,
      blocks: prev.blocks.map((block) => (block.id === id ? { ...block, ...patch } : block)),
    }));
  };

  const removeCustomBlock = (id) => {
    setCustomDraft((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((block) => block.id !== id),
    }));
  };

  const publishCurrentDraft = () => {
    toast.success(`Your ${selectedType} announcement draft is ready.`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-green-900 px-6 py-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-200">Recruiter Post Center</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold sm:text-4xl">Create announcement posts for students from one admin page.</h1>
              <p className="mt-3 text-sm leading-7 text-slate-200 sm:text-base">
                Use ready-made posting flows for shortlisted students and venue updates, or build a fully customizable
                announcement with text blocks, answer rows, editable tables, photos, PDFs, and links.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur">
              Active mode: <span className="font-semibold text-white">{announcementOptions.find((option) => option.id === selectedType)?.title}</span>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {announcementOptions.map((option) => {
            const Icon = option.icon;
            const isActive = selectedType === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedType(option.id)}
                className={`rounded-3xl border p-5 text-left transition ${
                  isActive
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-green-300 hover:shadow-sm"
                }`}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-slate-900 p-3 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{option.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
              </button>
            );
          })}
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            {selectedType === "shortlisted" ? (
              <>
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">Shortlisted Students Announcement</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Add the announcement title, details, and upload PDFs, images, or result links for shortlisted student names.
                  </p>
                  <div className="mt-5 space-y-4">
                    <Input
                      value={shortlistedDraft.title}
                      onChange={(event) => setShortlistedDraft((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="Example: Shortlisted Students for Round 2"
                    />
                    <Textarea
                      value={shortlistedDraft.description}
                      onChange={(event) => setShortlistedDraft((prev) => ({ ...prev, description: event.target.value }))}
                      placeholder="Write details about the shortlist, next steps, reporting time, and any notes."
                    />
                  </div>
                </section>

                <AttachmentManager
                  title="Attachments and Links"
                  description="Upload PDFs, student lists, screenshots, or photos. You can also attach result links."
                  files={shortlistedDraft.files}
                  links={shortlistedDraft.links}
                  onFilesChange={(files) => setShortlistedDraft((prev) => ({ ...prev, files }))}
                  onAddLink={shortlistedLinks.add}
                  onLinkChange={shortlistedLinks.change}
                  onRemoveLink={shortlistedLinks.remove}
                />
              </>
            ) : null}

            {selectedType === "venue" ? (
              <>
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">Exam Venue Details</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Share venue instructions, timings, and room details. Multiple PDFs and images are supported here too.
                  </p>
                  <div className="mt-5 space-y-4">
                    <Input
                      value={venueDraft.title}
                      onChange={(event) => setVenueDraft((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="Example: Aptitude Test Venue Details"
                    />
                    <Textarea
                      value={venueDraft.description}
                      onChange={(event) => setVenueDraft((prev) => ({ ...prev, description: event.target.value }))}
                      placeholder="Add venue location, reporting instructions, exam schedule, or travel notes."
                    />
                  </div>
                </section>

                <AttachmentManager
                  title="Venue Files and Supporting Material"
                  description="Attach seating plans, maps, entry gate instructions, hall tickets, or venue circulars."
                  files={venueDraft.files}
                  links={venueDraft.links}
                  onFilesChange={(files) => setVenueDraft((prev) => ({ ...prev, files }))}
                  onAddLink={venueLinks.add}
                  onLinkChange={venueLinks.change}
                  onRemoveLink={venueLinks.remove}
                />
              </>
            ) : null}

            {selectedType === "custom" ? (
              <>
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">Custom Announcement Builder</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Create your own layout with text sections, title-answer rows, editable tables, photos, PDFs, and links.
                  </p>

                  <div className="mt-5 grid gap-4">
                    <Input
                      value={customDraft.title}
                      onChange={(event) => setCustomDraft((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="Main announcement title"
                    />
                    <Textarea
                      value={customDraft.summary}
                      onChange={(event) => setCustomDraft((prev) => ({ ...prev, summary: event.target.value }))}
                      placeholder="Optional introduction or summary"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="button" variant="outline" onClick={() => setCustomDraft((prev) => ({ ...prev, blocks: [...prev.blocks, createTextBlock()] }))}>
                      <Plus className="h-4 w-4" />
                      Text Button
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setCustomDraft((prev) => ({ ...prev, blocks: [...prev.blocks, createPairBlock()] }))}>
                      <Plus className="h-4 w-4" />
                      Title + Answer
                    </Button>
                    <Button type="button" variant="outline" onClick={addCustomTable}>
                      <Table2 className="h-4 w-4" />
                      Create Table
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setCustomDraft((prev) => ({ ...prev, blocks: [...prev.blocks, createImageBlock()] }))}>
                      <ImagePlus className="h-4 w-4" />
                      Add Photo Box
                    </Button>
                  </div>
                </section>

                <div className="space-y-4">
                  {customDraft.blocks.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
                      No custom sections added yet. Use the buttons above to start building the announcement.
                    </div>
                  ) : null}

                  {customDraft.blocks.map((block) => (
                    <CustomBlockEditor
                      key={block.id}
                      block={block}
                      onUpdate={updateCustomBlock}
                      onRemove={removeCustomBlock}
                    />
                  ))}
                </div>

                <AttachmentManager
                  title="Global Attachments"
                  description="Add any extra PDFs, photos, or links that should appear with the whole announcement."
                  files={customDraft.files}
                  links={customDraft.links}
                  onFilesChange={(files) => setCustomDraft((prev) => ({ ...prev, files }))}
                  onAddLink={customLinks.add}
                  onLinkChange={customLinks.change}
                  onRemoveLink={customLinks.remove}
                />
              </>
            ) : null}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Live Summary</h3>
            <p className="mt-2 text-sm text-slate-600">This preview helps recruiters check what has been added before publishing.</p>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Announcement title</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{currentDraft.title || "No title added yet"}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Main content</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {currentDraft.description || currentDraft.summary || "No description added yet."}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Attachments</p>
                <div className="mt-3">
                  <FileList files={currentDraft.files || []} emptyLabel="No top-level files added." />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Links</p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {(currentDraft.links || []).filter((link) => link.label || link.url).length === 0 ? (
                    <p className="text-slate-500">No links added.</p>
                  ) : (
                    (currentDraft.links || [])
                      .filter((link) => link.label || link.url)
                      .map((link) => (
                        <div key={link.id} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                          <p className="font-medium text-slate-900">{link.label || "Untitled link"}</p>
                          <p className="break-all text-xs text-slate-500">{link.url || "No URL added"}</p>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {selectedType === "custom" ? (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Custom sections</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {customDraft.blocks.length === 0 ? (
                      <p className="text-slate-500">No custom blocks added.</p>
                    ) : (
                      customDraft.blocks.map((block, index) => (
                        <div key={block.id} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                          <p className="font-medium text-slate-900">Block {index + 1}: {block.type}</p>
                          <p className="text-xs text-slate-500">
                            {block.type === "table"
                              ? `${block.rows} rows x ${block.cols} columns`
                              : block.type === "image"
                                ? `${block.files.length} file(s)`
                                : "Editable content added"}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : null}

              <Button type="button" className="w-full bg-[#499428] hover:bg-[#3d7d20]" onClick={publishCurrentDraft}>
                Publish Draft
              </Button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default AdminPosts;
