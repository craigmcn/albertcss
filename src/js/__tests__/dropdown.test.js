import { describe, it, expect, beforeEach } from "vitest";
import { initDropdown } from "../dropdown";

const buildDropdown = ({ id = "test-menu", right = false } = {}) => {
  const dropdown = document.createElement("div");
  dropdown.className = right ? "dropdown dropdown--right" : "dropdown";

  const trigger = document.createElement("button");
  trigger.className = "dropdown__trigger";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", id);
  dropdown.appendChild(trigger);

  const menu = document.createElement("ul");
  menu.className = "dropdown__menu";
  menu.id = id;
  menu.setAttribute("role", "menu");
  menu.hidden = true;

  const items = ["Action", "Settings", "Delete"].map((label, i) => {
    const li = document.createElement("li");
    li.className = "dropdown__item";
    li.setAttribute("role", "none");
    const btn = document.createElement("button");
    btn.className = "dropdown__button";
    btn.setAttribute("role", "menuitem");
    btn.textContent = label;
    if (label === "Delete") btn.className += " dropdown__button--danger";
    li.appendChild(btn);
    menu.appendChild(li);
    return btn;
  });

  dropdown.appendChild(menu);
  document.body.appendChild(dropdown);
  return { dropdown, trigger, menu, items };
};

const keydown = (target, key) =>
  target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));

describe("initDropdown", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("does nothing when no dropdowns are present", () => {
    initDropdown();
    // no error thrown
  });

  it("opens the menu on trigger click", () => {
    const { trigger, menu } = buildDropdown();
    initDropdown();

    trigger.click();

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(menu.hidden).toBe(false);
  });

  it("closes the menu on a second trigger click", () => {
    const { trigger, menu } = buildDropdown();
    initDropdown();

    trigger.click();
    trigger.click();

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(menu.hidden).toBe(true);
  });

  it("focuses the first menu item when opened", () => {
    const { trigger, items } = buildDropdown();
    initDropdown();

    trigger.click();

    expect(document.activeElement).toBe(items[0]);
  });

  it("closes the menu on Escape and returns focus to trigger", () => {
    const { trigger, menu } = buildDropdown();
    initDropdown();

    trigger.click();
    keydown(menu, "Escape");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(menu.hidden).toBe(true);
    expect(document.activeElement).toBe(trigger);
  });

  it("moves focus to the next item on ArrowDown", () => {
    const { trigger, menu, items } = buildDropdown();
    initDropdown();

    trigger.click();
    items[0].focus();
    keydown(menu, "ArrowDown");

    expect(document.activeElement).toBe(items[1]);
  });

  it("wraps ArrowDown from last item to first", () => {
    const { trigger, menu, items } = buildDropdown();
    initDropdown();

    trigger.click();
    items[items.length - 1].focus();
    keydown(menu, "ArrowDown");

    expect(document.activeElement).toBe(items[0]);
  });

  it("moves focus to the previous item on ArrowUp", () => {
    const { trigger, menu, items } = buildDropdown();
    initDropdown();

    trigger.click();
    items[1].focus();
    keydown(menu, "ArrowUp");

    expect(document.activeElement).toBe(items[0]);
  });

  it("wraps ArrowUp from first item to last", () => {
    const { trigger, menu, items } = buildDropdown();
    initDropdown();

    trigger.click();
    items[0].focus();
    keydown(menu, "ArrowUp");

    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  it("focuses the first item on Home", () => {
    const { trigger, menu, items } = buildDropdown();
    initDropdown();

    trigger.click();
    items[2].focus();
    keydown(menu, "Home");

    expect(document.activeElement).toBe(items[0]);
  });

  it("focuses the last item on End", () => {
    const { trigger, menu, items } = buildDropdown();
    initDropdown();

    trigger.click();
    items[0].focus();
    keydown(menu, "End");

    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  it("closes the menu on Tab", () => {
    const { trigger, menu } = buildDropdown();
    initDropdown();

    trigger.click();
    keydown(menu, "Tab");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(menu.hidden).toBe(true);
  });

  it("closes the menu on an outside click", () => {
    const { trigger, menu } = buildDropdown();
    initDropdown();

    trigger.click();
    document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(menu.hidden).toBe(true);
  });

  it("does not close the menu when clicking inside the dropdown", () => {
    const { trigger, menu } = buildDropdown();
    initDropdown();

    trigger.click();
    menu.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(menu.hidden).toBe(false);
  });

  it("closes other open dropdowns when one is opened", () => {
    const first = buildDropdown({ id: "menu-1" });
    const second = buildDropdown({ id: "menu-2" });
    initDropdown();

    first.trigger.click();
    second.trigger.click();

    expect(first.trigger.getAttribute("aria-expanded")).toBe("false");
    expect(first.menu.hidden).toBe(true);
    expect(second.trigger.getAttribute("aria-expanded")).toBe("true");
    expect(second.menu.hidden).toBe(false);
  });

  it("skips disabled items in keyboard navigation", () => {
    const { dropdown, trigger, menu } = buildDropdown();

    // Disable the second item
    const items = menu.querySelectorAll('[role="menuitem"]');
    items[1].setAttribute("disabled", "");

    initDropdown();
    trigger.click();
    items[0].focus();
    keydown(menu, "ArrowDown");

    // Should skip items[1] and land on items[2]
    expect(document.activeElement).toBe(items[2]);
  });
});
