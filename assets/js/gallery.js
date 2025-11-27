const filterBox = document.querySelectorAll(".events_box");
const filterButtons = document.querySelectorAll(".events_block button");

document.querySelector(".events_block").addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const clickedButton = event.target;
  const filterClass = clickedButton.dataset.filter;
  const showAll = filterClass === "all";

  filterButtons.forEach((btn) => btn.classList.remove("active"));
  clickedButton.classList.add("active");

  filterBox.forEach((elem) => {
    const shouldHide = !showAll && !elem.classList.contains(filterClass);

    if (shouldHide) {
      elem.classList.add("hide");
    } else {
      elem.classList.remove("hide");
    }
  });
});

const headers = document.querySelectorAll(".news_header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".news_item");

    item.classList.toggle("active1");

    document.querySelectorAll(".news_item").forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active1")) {
        otherItem.classList.remove("active1");
      }
    });
  });
});


