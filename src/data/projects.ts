export default [
  //Game
  {
    title: "Flappy Ship",
    category: "Game",
    description:
      "Based on the classic flappy bird, but with a ship instead of a bird.",
    href: "/projects/games/flappy-ship/",
    tags: ["Endurance", "Bossfight", "Timing"],
    controls: { "Fly Up": "Hold", "Fly Down": "Release" },
  },
  {
    title: "Stellar Scrap",
    category: "Game",
    description:
      "Navigate through space on a rocket collecting scraps and fuel, shooting enemies along the way, and making sure you dont run out of oxygen.",
    href: "/projects/games/stellar-scrap/",
    tags: ["Endurance", "Waves", "Space"],
    controls: { Move: "WASD", Shoot: "Mouse", Shop: "P" },
    mobileWarning: true,
  },
  {
    title: "Grapple Spider",
    category: "Game",
    description: "Not really a finished game, but a prototype for a game idea.",
    href: "/projects/games/grapple-spider/",
    tags: ["Grapple", "Physics", "Movement"],
    controls: {
      Move: "WASD",
      "Shoot Web/Grapple": "Mouse",
      "Pull Grapple": "Space",
      "Create Web": "R",
      "Clear Webs": "T",
      "Spawn Block": "Enter",
    },
    mobileWarning: true,
  },
  {
    title: "Tower Defense One",
    category: "Game",
    description:
      "CURRENTLY IN BETA. Click on the shop to buy towers and select a difficulty to start.",
    href: "/projects/games/td1/",
    tags: ["Strategy", "Fast Paced", "Tower Defense"],
    controls: {
      "Select Tower": "1-9",
      "Sell Tower": "Q",
      "Upgrade Path 1": "E",
      "Upgrade Path 2": "R",
    },
    mobileWarning: true,
  },
  {
    title: "RPG Game",
    category: "Game",
    description:
      "CURRENTLY IN BETA. A basic RPG game, where you make decisions to survive throughout the story. Progress to the end to win.",
    href: "/projects/games/rpg-game/",
    tags: ["Role Play", "Action-Based Decisions", "Lore"],
    controls: { Progress: "Mouse" },
  },
  {
    title: "RPG Game 2",
    category: "Game",
    description:
      "NOT FINISHED. A maze exploration game. Interact with the NPC to get started.",
    href: "/projects/games/rpg-game2/",
    tags: ["Maze", "Exploration", "Lore"],
    controls: { Move: "WASD", Interact: "E" },
    mobileWarning: true,
  },
  //AI
  {
    title: "Simple Tensor Flow Adder Test",
    category: "AI",
    description:
      "An experiment on Tensor Flow to create a simple addition predictor neural network.",
    href: "/projects/ai/adder-neural-network/",
    tags: ["Tensor Flow", "Addition", "Neural Network"],
    controls: { "Run Command": "Enter" },
  },
  {
    title: "COCO-SSD Object Detection Test",
    category: "AI",
    description:
      "A test using Tensor Flow's COCO-SSD model to create a simple object detection AI model.",
    href: "/projects/ai/object-camera-detect/",
    tags: ["Prompting", "Browser", "Tech"],
    mobileWarning: true,
  },
  //Simulation
  {
    title: "Orbital",
    category: "Simulation",
    description:
      "A 2D planet simulator that simulates particles orbiting stationary planets.",
    href: "/projects/simulations/orbital/",
    tags: ["Space", "Planets", "Particles"],
    controls: {
      "Place Planet": "Mouse",
      "Move Camera": "Arrow Keys",
      "Zoom In": "E",
      "Zoom Out": "Q",
      "Reset Camera": "R",
    },
    mobileWarning: true,
  },
  {
    title: "Orbital 2",
    category: "Simulation",
    description:
      "A 2D planet simulator that simulates 2-3 planets orbiting eachother.",
    href: "/projects/simulations/orbital2/",
    tags: ["Space", "Planets", "BETA"],
    controls: {
      "Run Simulation": "Space",
      "Move Camera": "WASD",
      "Zoom In": "E",
      "Zoom Out": "Q",
      "Speed up Simulation": "[",
      "Speed up Simulation 2x": "]",
      "Reset Camera": "R",
    },
    mobileWarning: true,
  },
  {
    title: "Low Quality Water Simulation",
    category: "Simulation",
    description:
      "A very simple water simulation.",
    href: "/projects/simulations/first-ever-water-sim/",
    tags: ["Water Simulation", "Particles", "Physics"],
  },
  //Tool
  {
    title: "Ez Console",
    category: "Tool",
    description:
      "A copy of the Inspect Tool Console for users who can't access it. Also includes a beta elements viewer.",
    href: "/projects/tools/console/",
    tags: ["Browser", "Command Line"],
  },
  {
    title: "Ez GameMaker",
    category: "Tool",
    description:
      "CURRENTLY IN BETA. An editor for creating 2D levels. Converts into readable JSON for easy use in your game.",
    href: "/projects/tools/ez-gamemaker/",
    controls: { "Copy ": "Ctrl + C", "Paste": "Ctrl + V", "Undo": "Ctrl + Z", "Redo": "Ctrl + Y" },
    tags: ["Level Editor", "Translator"],
  },
  {
    title: "Flash Player",
    category: "Tool",
    description:
      "A copy of the Ruffle Flash Player, with a catalog of flash games for easy download.",
    href: "/projects/tools/flash-player/",
    tags: ["Game Catalog", "Flash Player"],
    mobileWarning: true,
  },
  {
    title: "Javascript From Blocks",
    category: "Tool",
    description:
      "NOT FINISHED. Converts block code to javascript.",
    href: "/projects/tools/javascript-from-blocks/",
    tags: ["Block Code", "Translator"],
    mobileWarning: true,
  },
  {
    title: "Javascript Runner",
    category: "Tool",
    description:
      "A browser editor for running javascript code.",
    href: "/projects/tools/js-runner/",
    tags: ["Code Editor"],
    mobileWarning: true,
  },
  {
    title: "HTML Runner",
    category: "Tool",
    description:
      "CURRENTLY IN BETA. Runs a folder containing HTML, Javascript, and CSS in your browser.",
    href: "/projects/tools/html-runner/",
    tags: ["Web Playground"],
  },
];
