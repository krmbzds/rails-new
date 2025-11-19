// Rails Command Controller
class RailsCommandController {
  constructor() {
    // Don't initialize DOM elements in constructor
    // Initialize them in a separate method called after DOM is ready
    this.resetState = "initial"; // 'initial', 'confirming', 'complete'
    this.resetTimeout = null;
    this.skipOptions = [];
  }

  initialize() {
    // Initialize DOM elements
    this.appName = document.getElementById("app_name");
    this.database = document.getElementById("database");
    this.javascript = document.getElementById("javascript");
    this.css = document.getElementById("css");
    this.template = document.getElementById("template");
    this.api = document.getElementById("api");
    this.minimal = document.getElementById("minimal");
    this.commandOutput = document.getElementById("commandOutput");
    this.copyIcon = document.getElementById("copyIcon");
    this.skipOptionsContainer = document.getElementById("skipOptionsContainer");
    this.resetButton = document.getElementById("resetButton");

    // Store original values
    this.originalJavascriptValue = this.javascript.value;
    this.originalCssValue = this.css.value;

    this.initializeEventListeners();
    this.initializeTabs();
    this.renderSkipOptions();
    this.updateCommand();
    this.initializeTheme();
  }

  initializeEventListeners() {
    // Configuration options
    this.appName.addEventListener("input", () => this.updateCommand());
    this.database.addEventListener("change", () => this.updateCommand());
    this.javascript.addEventListener("change", () => this.updateCommand());
    this.css.addEventListener("change", () => this.updateCommand());
    this.template.addEventListener("input", () => this.updateCommand());
    this.minimal.addEventListener("change", () => this.updateCommand());

    // API mode change listener
    this.api.addEventListener("change", () => this.handleApiModeChange());

    // Copy icon
    this.copyIcon.addEventListener("click", () => this.copyToClipboard());

    // Reset button
    this.resetButton.addEventListener("click", () => this.handleResetClick());
  }

  handleResetClick() {
    if (this.resetState === "initial") {
      // First click - show confirmation
      this.resetState = "confirming";
      this.resetButton.innerHTML = "Sure?";
      this.resetButton.classList.add("confirm");

      // Set timeout to revert back to initial state after 3 seconds
      this.resetTimeout = setTimeout(() => {
        this.resetState = "initial";
        this.resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset';
        this.resetButton.classList.remove("confirm");
      }, 3000);
    } else if (this.resetState === "confirming") {
      // Second click - perform reset
      clearTimeout(this.resetTimeout);
      this.resetState = "complete";
      this.performReset();
    }
  }

  performReset() {
    // Reset application name
    this.appName.value = "myapp";

    // Reset database
    this.database.value = "postgresql";

    // Reset application type checkboxes
    this.api.checked = false;
    this.minimal.checked = false;

    // Reset JavaScript and CSS (re-enable if disabled)
    this.javascript.disabled = false;
    this.javascript.value = "importmap";

    this.css.disabled = false;
    this.css.value = "tailwind";

    // Reset template
    this.template.value = "";

    // Reset all skip options
    this.skipOptions.forEach((option) => {
      option.checked = false;
    });

    // Update visual state of skip option cards
    const excludeOptionCards = document.querySelectorAll(
      ".exclude-option-card",
    );
    excludeOptionCards.forEach((card) => {
      card.classList.remove("excluded");
    });

    // Update command
    this.updateCommand();

    // Visual feedback for reset
    this.resetButton.innerHTML = '<i class="fas fa-check"></i> Reset';
    this.resetButton.classList.remove("confirm");
    this.resetButton.classList.add("complete");

    setTimeout(() => {
      this.resetState = "initial";
      this.resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset';
      this.resetButton.classList.remove("complete");
    }, 1500);
  }

  handleApiModeChange() {
    if (this.api.checked) {
      // Store current values if not already stored
      if (this.javascript.value !== "importmap") {
        this.originalJavascriptValue = this.javascript.value;
      }
      if (this.css.value !== "") {
        this.originalCssValue = this.css.value;
      }

      // Set JavaScript to default and disable
      this.javascript.value = "importmap";
      this.javascript.disabled = true;

      // Set CSS to None and disable
      this.css.value = "";
      this.css.disabled = true;
    } else {
      // Re-enable both and restore original values
      this.javascript.disabled = false;
      this.javascript.value = this.originalJavascriptValue;

      this.css.disabled = false;
      this.css.value = this.originalCssValue;
    }

    // Update command
    this.updateCommand();
  }

  initializeTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.dataset.tab;

        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked button and corresponding content
        button.classList.add("active");
        document.getElementById(`${targetTab}-tab`).classList.add("active");
      });
    });
  }

  renderSkipOptions() {
    let html = "";

    // Loop through each category
    for (const [categoryName, categoryData] of Object.entries(
      skipOptionsData,
    )) {
      html += `
                <div class="exclude-category">
                    <h3 class="exclude-category-title">
                        <i class="${categoryData.icon}"></i>
                        ${categoryName}
                    </h3>
                    <div class="exclude-options-grid">
            `;

      // Loop through each option in the category
      categoryData.options.forEach((option) => {
        html += `
                    <div class="exclude-option-card">
                        <div class="exclude-option-header">
                            <div class="exclude-option-icon">
                                <i class="${option.icon}"></i>
                            </div>
                            <div>
                                <div class="exclude-option-title">${option.name}</div>
                                <div class="exclude-option-description">${option.description}</div>
                            </div>
                        </div>
                        <div class="exclude-option-checkbox">
                            <div class="exclude-checkbox-custom">
                                <input type="checkbox" data-skip-option="${option.value}">
                                <span class="exclude-checkmark"></span>
                            </div>
                        </div>
                    </div>
                `;
      });

      html += `
                    </div>
                </div>
            `;
    }

    // Set the HTML
    this.skipOptionsContainer.innerHTML = html;

    // Get all skip options
    this.skipOptions = document.querySelectorAll("[data-skip-option]");

    // Add event listeners to skip options
    this.skipOptions.forEach((option) => {
      option.addEventListener("change", () => this.updateCommand());
    });

    // Initialize exclude option cards
    this.initializeExcludeOptionCards();
  }

  initializeExcludeOptionCards() {
    const excludeOptionCards = document.querySelectorAll(
      ".exclude-option-card",
    );

    excludeOptionCards.forEach((card) => {
      const checkbox = card.querySelector('input[type="checkbox"]');

      // Set initial state
      if (checkbox.checked) {
        card.classList.add("excluded");
      }

      // Add click event to the card
      card.addEventListener("click", (e) => {
        // Don't toggle if clicking on the checkbox directly
        if (e.target.type !== "checkbox") {
          checkbox.checked = !checkbox.checked;
        }

        // Update card appearance
        if (checkbox.checked) {
          card.classList.add("excluded");
        } else {
          card.classList.remove("excluded");
        }

        // Update command
        this.updateCommand();
      });
    });
  }

  updateCommand() {
    const appName = this.appName.value.trim() || "myapp";
    const database = this.database.value;
    const javascript = this.javascript.value;
    const css = this.css.value;
    const template = this.template.value.trim();
    const api = this.api.checked;
    const minimal = this.minimal.checked;

    let command = `rails new ${appName}`;

    // Add database option
    if (database && database !== "sqlite3") {
      command += ` --database=${database}`;
    }

    // Add JavaScript option (only if not API mode)
    if (javascript && !api && javascript !== "importmap") {
      command += ` --javascript=${javascript}`;
    }

    // Add CSS option (only if not API mode)
    if (css && !api) {
      command += ` --css=${css}`;
    }

    // Add template option
    if (template) {
      command += ` --template=${template}`;
    }

    // Add API mode
    if (api) {
      command += " --api";
    }

    // Add minimal mode
    if (minimal) {
      command += " --minimal";
    }

    // Add skip options
    this.skipOptions.forEach((option) => {
      if (option.checked) {
        command += ` --${option.dataset.skipOption}`;
      }
    });

    // Update the terminal with non-selectable dollar sign
    this.commandOutput.innerHTML = `
            <span class="terminal-prompt">$</span>
            <span class="terminal-command">${command}</span>
        `;
  }

  async copyToClipboard() {
    try {
      // Get only the command text (without the dollar sign)
      const commandText =
        this.commandOutput.querySelector(".terminal-command").textContent;
      await navigator.clipboard.writeText(commandText);

      // Visual feedback
      this.copyIcon.classList.remove("fa-copy");
      this.copyIcon.classList.add("fa-check", "copied");

      setTimeout(() => {
        this.copyIcon.classList.remove("fa-check", "copied");
        this.copyIcon.classList.add("fa-copy");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  initializeTheme() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    let currentTheme = savedTheme || systemTheme;

    // Apply initial theme
    this.setTheme(currentTheme);

    // Event listener for theme toggle
    themeToggleBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      this.setTheme(currentTheme);
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.updateThemeIcon(theme);
  }

  updateThemeIcon(theme) {
    const themeIcon = document.getElementById("themeIcon");
    if (theme === "dark") {
      themeIcon.innerHTML =
        '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
      themeIcon.innerHTML =
        '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    }
  }
}

// Initialize when DOM is ready (scripts have defer attribute)
// Since we're using defer, the DOM is already parsed when this runs
const controller = new RailsCommandController();

// Check if all resources (including stylesheets) are loaded
if (document.readyState === "complete") {
  // Everything is already loaded
  controller.initialize();
  hidePreloader();
} else {
  // Wait for all resources to load
  window.addEventListener("load", () => {
    controller.initialize();
    hidePreloader();
  });
}

// Function to hide preloader and show content
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Add a small delay to ensure everything is properly rendered
    setTimeout(() => {
      preloader.classList.add("hidden");
      document.body.classList.add("ready");

      // Remove preloader from DOM after transition
      setTimeout(() => {
        preloader.remove();
      }, 300);
    }, 100);
  } else {
    // If preloader doesn't exist, just make content visible
    document.body.classList.add("ready");
  }
}
