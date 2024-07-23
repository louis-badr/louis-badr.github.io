#let accent = rgb("#2E45ED")
#let light = luma(150)

#set text(
  font: "Roboto",
  size: 9pt
)
#show link: underline
#set page(
  margin: (x: 0.9cm, y: 1.3cm),
)
#set par(justify: true)
#let chiline() = {v(-3pt); line(length: 100%, stroke: light); v(-5pt)}

#show heading: set text(accent)
= Louis Badr

CREATIVE TECHNOLOGY ENGINEER
#h(1fr)
contact\@louis-badr.fr |
#link("louis-badr.fr")[louis-badr.fr]
\
\
=== EDUCATION
#chiline()

#set rect(stroke: none)

#grid(
  columns: (2.6cm, 15.4cm),
  rect[2018-2023],
  rect[#text(weight:"semibold")[Master's Degree in Engineering at ESILV & Creative Technology Master of Science at IFT]],
  rect[],
  rect(inset: 0pt)[
    #grid(
      columns: (0.5cm, 1fr),
      rect[#text(accent)[⤷]],
      rect[Master focused on innovation, research and manufacturing on the format\ and in collaboration with the MIT MediaLab\ Leonard de Vinci Graduate School of Engineering - Paris La Défense - #link("esilv.fr")[esilv.fr]\ Institute for Future Techologies - DeVinci Innovation Center - #link("https://x.com/IFT_devinci")[\@IFT_devinci]]
    )
  ],
  rect[2018-2023],
  rect[#text(weight:"semibold")[Engineer-Manager double degree program at EMLV - Marketing master program]],
  rect[],
  rect(inset: 0pt)[
    #grid(
      columns: (0.5cm, 1fr),
      rect[#text(accent)[⤷]],
      rect[Leonard de Vinci Business School - Paris La Défense - #link("emlv.fr")[emlv.fr]],
    )
  ],
  rect[2020],
  rect[#text(weight:"semibold")[Semester at Dorset College Dublin]],
  rect[],
  rect(inset: 0pt)[
    #grid(
      columns: (0.5cm, 1fr),
      rect[ #text(accent)[⤷]],
      rect[International exchange - Dublin - Irlande - #link("dorset.ie")[dorset.ie]],
    )
  ],
)

=== EXPERIENCE
#chiline()

#grid(
  columns: (2.6cm, 15.5cm),
  rect[2023-2024],
  rect[#text(weight:"semibold")[Intern > Research Engineer - HapTID: Haptic technology for recovery of dexterity after stroke]],
  rect[],
  rect(inset: 0pt)[
    #grid(
      columns: (0.5cm, 1fr),
      rect[#text(accent)[⤷]],
      rect[Design and production of vibro-tactile stimulation devices for researchers and medical professionals to evaluate haptics in post-stroke rehabilitation - Study on different hypotheses in healthy subjects\ UMR 8002 – Integrative Neuroscience and Cognition Center - CNRS\ U 1266 - Institute of Psychiatry and Neuroscience of Paris - INSERM]
    )
  ],
  rect[2022-2023],
  rect[#text(weight:"semibold")[Master's Project - AugmenTip: Fingertip haptic feedback on a budget]],
  rect[#text(light)[3 weeks]],
  rect(inset: 0pt)[
  #grid(
    columns: (0.5cm, 1fr),
    rect[#text(accent)[⤷]],
    rect[Human-Computer Interaction project - Development of a low-cost and DIY haptic device to augment\ popular kinesthetic feedback devices with fingertip cutaneous feedback (1DOF contact/pressure and\ vibrations) - Development of a demo experience with #link("https://cables.gl/view/YxIQUk")[Cables.gl]],
    )
  ],

  rect[2022],
  rect[#text(weight:"semibold")[Internship - Smart Lock IoT device development]],
  rect[#text(light)[4 months]],
  rect(inset: 0pt)[
  #grid(
    columns: (0.5cm, 1fr),
    rect[#text(accent)[⤷]],
    rect[Touchscreen devices attached on cabinets to secure and regulate access to lab equipement with\ employees and students access cards\ Teacher for the #link("https://youtu.be/Y-JBQNnKEQ0?si=o5zsn4Jhlcl-3w-i")[How to Make Almost Everything elective week]\ Institute for Future Techologies - DeVinci Innovation Center - #link("https://x.com/IFT_devinci")[\@IFT_devinci]],
    )
  ],

  rect[2022],
  rect[#text(weight:"semibold")[Kickstarter Project - #link("https://www.kickstarter.com/projects/decide/quickstarter-decide")[DECIDE]],],
  rect[],
  rect(inset: 0pt)[
  #grid(
    columns: (0.5cm, 1fr),
    rect[#text(accent)[⤷]],
    rect[Succesfully crowdfunded product design challenge (1 material, 1 factory, 1000€ raised) - 12-sided origami-inspired dice, covered with whiteboard material to make decision making fun, stimulate creativity and create original games],
    )
  ],

  rect[2019-2020],
  rect[#text(weight:"semibold")[Student Project - DeVinci3D Big Printer]],
  rect[],
  rect(inset: 0pt)[
  #grid(
    columns: (0.5cm, 1fr),
    rect[#text(accent)[⤷]],
    rect[Development of large format 3D printers used for student projects\ Optimization of a 1m³ printer designed in 2018 - 2019\ Design and fabrication of a second revamped version],
    )
  ],

  rect[2019-2020],
  rect[#text(weight:"semibold")[Charity Mission - Secours Populaire]],
  rect[#text(light)[3 weeks]],
  rect(inset: 0pt)[
  #grid(
    columns: (0.5cm, 1fr),
    rect[#text(accent)[⤷]],
    rect[Fitting out premises for a new Secours Populaire reception center in Angers - France],
    )
  ],
)

=== SKILLS
#chiline()

#text(weight: "semibold")[French (native)]\
#text(weight: "semibold")[English (fluent)] #h(1fr) TOEFL ITP: 657/677 C1 - First Certificate of Cambridge: 183/190 C1\

#text(weight: "semibold")[3D/CAD/CAM] #h(1fr) Fusion 360 - Blender\
#text(weight: "semibold")[Manufacturing] #h(1fr) 3D printing (FDM & Resin) - Laser Cutting - CNC Machining\
#text(weight: "semibold")[Software Dev] #h(1fr) Python - Arduino - HTML/CSS/JS - Unity - Linux - Git\
#text(weight: "semibold")[Electronics] #h(1fr) Prototyping - Arduino compatible MCUs - PCB design - Electronics assembly\
#text(weight: "semibold")[Graphic Design] #h(1fr) Figma - Adobe Illustrator - Adobe Photoshop\
#text(weight: "semibold")[Office Software] #h(1fr) Microsoft Office - LaTeX - Zotero\

=== INTERESTS
#chiline()

Scientific & Maker Culture\
Arts - Product Design - Video Games\
Aeronautics #text(light)[\- Student pilot (PPL) at the Aero Club of Angers Marcé
]\