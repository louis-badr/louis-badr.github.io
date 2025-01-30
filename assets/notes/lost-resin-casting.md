# From 3D model to solid metal: Lost-resin vacuum casting

## Craft detailed metal parts using castable resin 3D printing and vacuum casting

Sand casting and lost-wax casting are two, accessible to DIYers, manufacturing processes to create metal parts.
However, these processes may not be suitable for small, intricate and/or accurate parts.
The process presented here is an alternative method I introduced at the Institute for Future Technologies (IFT).
It is mostly used for jewelry making and is based on resin 3D printing and vacuum casting.
This note contains instructions (mainly for those who want to replicate them at the IFT), my experience and references. I've also tried to address the cheaper or faster alternatives to each step.

Bonne lecture !

## WARNINGS

Most of the steps of this tutorial are dangerous (toxic resins, high temperatures, molten metal, ...).

**Please wear protective equipment.**

**Please follow the safety guidelines provided by the manufacturers of the equipment and materials you are using.**

If you plan on using the equipment at the IFT, **please ask for authorization and guidance from a staff member** and **please be respectful of the equipment and space**.

Thank you, let's begin!

## Overview of the process

In this tutorial, we will:

1. Create wax / resin masters
2. Build a wax sprue tree
3. Make and bake a ceramic mold
4. Cast the metal
5. Post-process the metal parts

## Materials (used in this tutorial)

-   A resin 3D printer and castable resin
-   Wax lines
-   Investment powder
-   A (perforated) flask
-   A vacuum casting machine - the [Kaya Cast](https://pepetools.com/products/tabletop-vacuum-investing-and-casting-machine-system-arbe-kayacast) one here
-   A vacuum pump and chamber (or the Kaya Cast machine)
-   A programmable kiln / furnace
-   Metal melting equipment (furnace / torch, crucible, tongs, ...)
-   Safety equipment (gloves, apron, respirator, eye protection, a fire extinguisher, ...)
-   A large bucket
-   The metal of your liking

## Creating a wax / resin master

The first step is to create a positive of the part - later we will cast a ceramic mold around it then bake the mold to leave only the negative in which we will cast the metal.
The main requirement for this positive is that it must be made of a material that will burn during the firing of the mold while leaving as little residue as possible.
Jewelers traditionally use [different types of microcrystalline wax](https://www.waxcarvers.com/blog/post/what-wax-color-should-I-get/) for this purpose and shape it by carving or molding it.
Recently, new resins for 3D printing have emerged, designed specifically for this kind of manufacturing process.
Whereas sculpting makes a type of craftsmanship possible and molding makes it possible to batch produce parts (from a sculpted wax piece, an original, a 3D print or other), castable resin 3D printing makes it possible to go directly from a 3D model to a "wax" master.
3D printing makes it possible to produce parts that would otherwise be complex or impossible to manufacture in wax and saves considerable time especially for one-offs and small runs.

Here's a table of some of the resins I came across during my research:

| Product Name                                                                                        | Printer compatibility | Price      | Notes                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------- | --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [BlueCast X-One V2](https://www.bluecast.info/x-one)                                                | DLP & LCD             | 285.60€/kg | This is the resin I use in the rest of the tutorial, it's on the pricier side but it prints easily and gives excellent results.                                                                                                            |
| [BlueCast X-Filgree V2](https://www.bluecast.info/x-fil)                                            | DLP & LCD             | 285.60€/kg | X-One V2 is supposed to be BlueCast's most versatile castable resin, and they have a whole range of resins on their website. This one is supposed to be more suitable for fine details incuding filigree.                                  |
| [BlueCast X-NOVA](https://www.bluecast.info/x-nova)                                                 | DLP & LCD             | 239.98€/kg | This version also looks interesting: it's a little more flexible to allow stones to be integrated into the 3D print.                                                                                                                       |
| [Formlabs Castable Wax 40 Resin](https://formlabs.com/fr/boutique/materials/castable-wax-40-resin/) | Formlabs Form 2 & 3   | 298.20€/L  | Formlabs offers two castable resins, one blue with 20% wax and the other violet with 40%, which could allow more detail. I was able to test the blue one and would only recommend it if you only have a Formlabs printer at your disposal. |
| [Formlabs Castable Wax Resin](https://formlabs.com/fr/boutique/materials/castable-wax-resin/)       | Formlabs Form 3 & 4   | 358.80€/L  |                                                                                                                                                                                                                                            |
| [Siraya Tech Cast - Castable Resin Purple](https://siraya.tech/products/cast-castable-resin)        | DLP & LCD             | 75€/kg     | I haven't tested it, it's apparently not the easiest to print but its price could justify the trouble.                                                                                                                                     |
| [Siraya Tech Cast - Castable Resin True Blue](https://siraya.tech/products/cast-castable-resin)     | DLP & LCD             | 80€/kg     |                                                                                                                                                                                                                                            |
| [BURNAWAY Castable Resin](https://monocure3d.com.au/product/burnaway-castable-resin/)               | DLP & LCD             | 108.54€/kg |                                                                                                                                                                                                                                            |

Profiles for different printers and instructions for printing and post-processing the X-One V2 are available on [BlueCast's website](https://www.bluecast.info/x-one).

In the rest of the tutorial, we'll create a sprue tree to be able to cast several parts in a single mold but it can be useful to integrate small sprues directly into the 3D models to ensure that all the details come out nicely without having to cut and weld small wax sticks.
Especially for rings, the sprue tree will generally be welded on the less detailed side so it's important to ensure that the metal flows properly to the other side.
I invite you to take a look at Formlabs' tutorial [1], which addresses this point, and BlueCast's datasheet (X-One V1) [2], which has several examples.

## Building the sprue tree

To cast more than one part at a time, we'll build a sprue tree to connect the mold opening, through which the metal will flow, to all the different parts.
To do this, it's best to use wax lines, made for jewelry, of different diameters. I found mine on AliExpress, the wax is generally blue or green and I only needed two diameters here, 3 and 6mm.
It's certainly possible to use other types of wax but impurities can be carried over to our parts.
The flask comes with a silicone cap to seal the base in order to pour the plaster, and a hole at the end of a cone (which will create a funnel shape at the opening of the mold) to attach the sprue tree.
I did use beeswax to connect the sprue tree base to the silicone cap, as I don't have wax lines the exact diameter of the cap hole and beeswax is easy to work with.
Connect a thick wax line securely to the hole in the cap, and weld branches to it, to which we'll attach the parts.
The branches point upwards because the mold is upside down, the angle is a also a bit arbitrary, ~45 degrees here.
If this is something you'll have to do often, it may be worth investing in a hot thread pen to save you some time.
**Be careful, not to bring the individual parts too close to each other or too close to the edge of the flask.**
A wall that's too thin could burst and, at best, your pieces will be ruined.

![Sprue Tree](/assets/notes/sprue_tree.jpg)

## Making the mold

Now we can pour our plaster on top and put the whole thing in the kiln.
Once again, there are several brands of investment plaster, the two I've come across the most are the different Prestige Optima ones and the BlueCast X-Vest.
I think that as long as you use investment plaster suitable for your metal and not regular/casting plaster, the result will be good.
Investement plaster is made to withstand wide temperature fluctuations without deforming or breaking, which is not the case with all plasters.

You'll also need a flask, perforated or not.
I'll be using the Kaya Cast machine in the rest of the tutorial with which you can do vacuum casting by putting a _perforated_ flask in the right-hand side of the machine, or table vacuum casting (less efficient and more dangerous) with a _solid_ flask and one of the adapter plates.

I am using the BlueCast X-Vest investment powder here, let's start!

1. If your flask is perforated, cover the sides with (painter's) tape to make it plaster-tight - you can extend the tape higher than the edges to prevent overflow under vacuum.

2. Fit the silicone cap with the sprue tree onto the flask.

3. For mixing the investment powder with water, pick a container that fits into your vacuum chamber. For the BlueCast X-Vest and if you're mixing by hand, the ratio is 1kg of powder for 300cc of water. There should be enough mixture to reach the flat bar of the flask (1kg of powder for the small flask if I recall correctly). Mix vigorously, ensuring there are no lumps or clumps.

We next remove as many bubbles as possible from the mixture by passing it under vacuum.
If you're using the Kaya Cast machine, the left-hand side of the machine serves as a vacuum chamber and the whole thing is spring-mounted so you can shake the container to speed up the process.
To start the vacuum, turn the machine on, put the bell jar on the platform and flip the switch to “Investment Table”.
To release the air, flip the switch to “Vacuum Release”, turn the machine off only when you are done and with the air released.

4. Remove as many bubbles as possible from the mixture, switching the pump on and off several times if necessary. Carefully pour the mixture into the flask to avoid damaging the tree, then vacuum the mixture a second time.

5. The mold needs to stay at room temperature for at least 2 hours before firing it, 3 for short burnouts according to BlueCast, but the longer, the better.

The next step is to bake the mold according to a burnout cycle.
Choosing the right cycle can be tricky, as resin and investment manufacturers generally provide their own instructions.
The burnout cycle is used to dry the plaster, melt the wax, burn off any residues and then maintain the mold at a certain temperature for casting.
**The most important thing is not to let the mold cool down, but to keep it warm after firing and until casting, so that there is no humidity in the mold and to prevent the metal from cooling down too quickly on contact with the mold.**

5. Place the mould in the kiln - with the opening facing downwards but not flat against the surface of the oven - and program the cycle.

![X-Vest Recommended Burnout Cycles](/assets/notes/X-Vest_Recommended_Burnout_Cycles.webp)

BlueCast gives two burnout cycles for the X-Vest, a fast one and a longer but safer one.
Note that the Carbolite kiln at the IFT can only go up by 8°C/min, so you may have to adjust the curve a bit.

## Casting

Our mold is ready and waiting in the kiln, we'll melt the metal and get ready to cast.

<p style="color:#2e45ed; font-style: italic;">
    To give some context, we can pour the metal directly into our mold but for small parts, the low hydrostatic pressure and surface tension of the molten metal mean that it won't properly fill the thinner parts of the mold.
    So we have to exert pressure on the molten metal.
    In entry-level machines, there are two methods of doing this: centrifugation and vacuum casting.
    I'm not a big fan of spinning molten metal at high speed and vacuum casting machines are very efficient and machines like the Kaya Cast are reasonably priced.
    The idea is to suck air through the pores of the plaster so that the metal follows and fills in all the details.
<p>

<img src="/assets/notes/vacuum_casting_diagram.png" alt="Vacuum Casting Diagram" style="display: block; margin: auto; width: 40%; height: auto;">
<p style="text-align: center; font-weight: bold;">Vacuum Casting Diagram [3]</p>

1. We can put our metal in the crucible and heat up the furnace.

Note that the casting temperature is higher than the melting temperature of the metal so that it is more fluid.
For example, for the 925 silver I'm using here, the manufacturer indicates a melting range of 820 to 880°C and a casting temperature of 970 to 1040°C.
You can add flux/borax to separate impurities from the metal if necessary.

2. Check the machine's oil level - it should be at the line and not cloudy. The oil can be drained and replaced with pump oil (see manual [4]).

3. Fit the correct adapter plate and silicone gasket to the machine for the type of flask you are using.

<p style="color:#2e45ed; font-style: italic;">
    Note that the silicone is used to seal the flask so that the vacuum is properly made, it wears out quickly but this is normal. Apparently there are graphite gaskets that last longer but I haven't tested them.
<p>

4. Place a large bucket of water next to the machine to put the flask in after the casting process.

5. After the furnace/metal has reached the casting temperature, turn on the Kaya Cast machine, bring the flask from the kiln to the machine and turn the switch to “Casting Chamber”. Wait a few seconds for the pressure to stabilize then pour the metal into the mold.

6. Once the metal has solidified you can put the flask into the water. If you take the flask out of the machine too quickly, there's a risk that the metal won't solidify properly and if you wait too long, the plaster will be very hard to remove (thermal shock usually causes it to break by itself).

7. Take a well-deserved break.

## Post-processing

For mechanical parts, this is not necessarily desirable if dimensional accuracy is important, but here it's mainly for aesthetics!

You can start by sawing off the sprues and brushing the parts to remove large plaster pieces
If large pieces of plaster are stucks to the parts, you can leave them in water for a while to soften them.
You can then file the part's soldering point and move on to polishing.
I used polishing paste with a brush attached to a dremel.

Félicitations, you've made it to the end of the tutorial!   

## References

[1] [BlueCast X-One V1 Datasheet](https://cdn.shopify.com/s/files/1/1339/4265/files/Features-BC-X-one_eng.pdf)

[2] [Introduction to Casting for 3D Printed Jewelry Patterns - Formlabs](https://formlabs-media.formlabs.com/filer_public/cb/16/cb16362f-506a-4b40-bee3-d67b33aefdf7/castable_wax_casting_guide.pdf)

[3] Gainsbury, P. E. (1979). Jewellery investment casting machines. Gold Bulletin, 12(1), 2-8.

[4] [Kaya Cast Instruction Manual](https://pepetools.com/cdn/shop/files/kayacast_instructions.pdf)

Cool YouTube channels to follow:

-   [Paul's Garage](https://www.youtube.com/@PaulsGarage)
-   [Mitera Made Jewelry](https://www.youtube.com/@MiteraMade)
