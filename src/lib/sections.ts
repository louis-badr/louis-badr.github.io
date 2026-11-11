// The sections of the site, in menu order. Listed in the parts list stacked
// on the title block, numbered from the bottom up like on a real drawing.

export type SectionId = "projects" | "publications" | "desk" | "contact";

export interface Section {
  id: SectionId;
  name: string;
  href: string;
}

export const sections: Section[] = [
  { id: "projects", name: "Projects", href: "/projects/" },
  { id: "publications", name: "Publications", href: "/publications/" },
  { id: "contact", name: "Contact", href: "/contact/" },
  // The desk, with the notebook and the prints on it
  { id: "desk", name: "Gallery & Notes", href: "/desk/" },
];
