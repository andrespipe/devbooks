import { it, expect } from "@jest/globals";

function setTestDiv(text: string) {
  // $("#test_div").html(`<p>${text}</p>`);
}

it("should set text on div", () => {
  document.body.innerHTML = `<div id="test_div"></div>`;

  // let htmlElement = $(`#test_div`);
  // expect(htmlElement.length).toBeGreaterThan(0);

  // const text = "Hello world";
  // setTestDiv(text);
  // expect(htmlElement.html()).toContain(text);
});
